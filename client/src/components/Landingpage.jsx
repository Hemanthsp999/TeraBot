import './css/App.css';
import { useRef } from "react";
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import carsouel1 from './images/Carsouel1.jpg';
import carsouel2 from './images/Carsouel2.jpg';
import carsouel3 from './images/Carsouel.webp';
import carsouel from './images/Bot_Human.png';
import Carsouel5 from './images/stress.jpg';

// This page is not fitting to mobie screen correctly
const LandingPage = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    };

    const navigate = useNavigate();
    const sectionRef = useRef(null);

    const scrollToSection = () => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        

        <div className="Landingpage min-h-screen max-w-full overflow-x-hidden bg-white" >
            <div className="w-screen animate-fadeInDown lg:w-full md:w-full px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
                {/* Hero Section */}
                <section className="max-w-6xl justify-center  w-full mx-auto text-center py-8 sm:py-12">
                    <h1 className="text-xl sm:text-xl md:text-3xl lg:text-4xl font-bold text-blue-700 px-2">
                        🤖 Meet <span className="text-indigo-800">TheraBot</span>: Your AI Mental Health Companion
                    </h1>
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg italic text-gray-700 px-4">
                        A safe space to express, reflect, and heal — anytime, anywhere.
                    </p>
                    
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-800 font-medium px-4">
                        Whether you're feeling overwhelmed, anxious, or just need someone to listen, 
                        <span className="text-indigo-800 font-semibold"> TherBot</span> is here for you.
                    </p>

                    <button 
                        onClick={scrollToSection} 
                        className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm sm:text-base rounded-full shadow-md transition"
                    >
                        💬 Get Started Journey
                    </button>
                </section>

                {/* Carousel Section */}
                <div className="w-screen max-w-lg mx-auto px-2 sm:px-4 mb-8 sm:mb-12">
                    <Slider {...settings}>
                        {[carsouel, carsouel1, carsouel2, carsouel3, Carsouel5].map((image, index) => (
                            <div key={index} className="outline-none" >
                                <img 
                                    className=" w-screen h-auto max-h-[400px] sm:h-64 md:h-80 lg:h-96 sm:object-cover rounded-lg"
                                    src={image} 
                                    alt={`Slide ${index + 1}`}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Why TherBot? */}
                <section className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-800 text-center">
                        Why Choose TherBot?
                    </h2>
                    <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-700 text-center">
                        Because your mental well-being matters. TherBot is here to:
                    </p>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {[
                            { icon: "💡", text: "Provide evidence-based mental health support" },
                            { icon: "🗣️", text: "Offer a judgment-free listening space" },
                            { icon: "🧘", text: "Help with mindfulness, stress, and anxiety" },
                            { icon: "🔄", text: "Available anytime — no appointments needed" }
                        ].map((item, index) => (
                            <div key={index} className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
                                <span className="text-xl sm:text-2xl block mb-2">{item.icon}</span>
                                <p className="text-xs sm:text-sm md:text-base text-gray-800">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonials */}
                <section className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12">
                    <div className="bg-gray-50 rounded-xl p-4 sm:p-8">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-800 text-center">
                            What Users Say
                        </h2>
                        <div className="mt-4 sm:mt-6">
                            <p className="text-sm sm:text-base md:text-lg italic text-gray-700 text-center">
                                "TherBot feels like a true friend. It helped me manage my anxiety better than I ever imagined."
                            </p>
                            <p className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-700 text-center">
                                — A grateful user
                            </p>
                        </div>
                    </div>
                </section>

                {/* Support Section */}
                <div ref={sectionRef} className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-700 text-center">
                        🧠 Find the Right Support for Your Mental Wellness
                    </h1>
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg italic text-gray-700 text-center">
                        Your Safe Space to Heal, Reflect & Grow
                    </p>

                    <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-800 font-medium text-center">
                        We all have moments when we need someone to listen. Whether you prefer an
                        <span className="text-indigo-800 font-semibold"> AI-powered companion </span> 
                        for instant support or a
                        <span className="text-green-800 font-semibold"> certified therapist </span>
                        for personalized guidance, we're here for you.
                    </p>

                    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => navigate("/chatbot")}  
                            className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base rounded-lg shadow-md transition"
                        >
                            🤖 Talk to AI Chatbot
                        </button>

                        <button 
                            onClick={() => navigate("/therapist")}  
                            className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm sm:text-base rounded-lg shadow-md transition"
                        >
                            👨‍⚕️ Connect with a Therapist
                        </button>
                    </div>

                    <section className="mt-8 sm:mt-12">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-800 text-center">
                            How It Works?
                        </h2>
                        <div className="mt-4 sm:mt-6 space-y-4">
                            <div className="p-4 sm:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition">
                                <p className="text-sm sm:text-base text-gray-700">
                                    🌟 <b>AI Chatbot:</b> Get instant, 24/7 support with our AI-powered mental wellness assistant. Share your thoughts freely, anytime.
                                </p>
                            </div>
                            <div className="p-4 sm:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition">
                                <p className="text-sm sm:text-base text-gray-700">
                                    💬 <b>Therapist:</b> Book a session with a professional therapist for personalized guidance and in-depth conversations.
                                </p>
                            </div>
                        </div>
                        <p className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg italic text-gray-700 text-center">
                            ✨ Your well-being is important. Let's take a step towards a healthier mind together.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
