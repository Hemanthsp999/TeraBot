from django.core.cache import cache
import random
from django.conf import settings
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models import User
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from django.utils.timezone import now
from datetime import timedelta
# Load model directly
# from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
# import torch

'''
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True  # Enables 8-bit quantization
)

model_name = "victunes/TherapyBeagle-11B-v2"

model = AutoModelForCausalLM.from_pretrained(
    model_name,
    quantization_config=bnb_config,
    device_map="auto"
)

tokenizer = AutoTokenizer.from_pretrained(model_name)
'''


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'phone_number', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return User.objects.create(**validated_data)


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Both username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        print(f'Login: {email, check_password(password, user.password)}')

        if not check_password(password, user.password):
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        access_token_expiry = now() + timedelta(minutes=30)

        return Response({'refresh': str(refresh), 'access_token': str(refresh.access_token),
                         'redirect_url': '/', 'expires_at': access_token_expiry}, status=status.HTTP_200_OK)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        try:
            refresh_token = request.data.get('refresh_token')
            if not refresh_token:
                return Response({'error:' 'Refresh token is required'}, status=400)

            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"message": "Logged out successfully"}, status=200)

        except Exception as e:
            return Response({"error": f"Invalid token {e}"}, status=400)


'''

class ChatbotView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        query = request.data.get('query')

        if not query:
            return Response('Query Required', status=400)

        input_ids = tokenizer(query, return_tensors='pt').input_ids

        with torch.no_grad():
            output = model.generate(input_ids, max_length=200, do_sample=True, top_p=0.9)

        # Decode the generated response
        response_text = tokenizer.decode(output[0], skip_special_tokens=True)

        return Response({"response": response_text})
'''


class SendOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'User with this email does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        otp = random.randint(100000, 999999)
        cache.set(email, otp, timeout=300)  # Store OTP in cache for 5 minutes

        send_mail(
            subject="Password Reset OTP",
            message=f"Your OTP for password reset is {otp}. It will expire in 5 minutes.",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=False
        )

        return Response({'message': 'OTP sent to email'}, status=status.HTTP_200_OK)


class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        new_password = request.data.get('new_password')

        cached_otp = cache.get(email)

        if not cached_otp or str(cached_otp) != str(otp):
            return Response({'error': 'Invalid or expired OTP'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
            user.password = make_password(new_password)
            user.save()

            cache.delete(email)  # Remove OTP after successful reset
            return Response({'message': 'Password reset successfully'}, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)

