import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Waves from './ui/Waves';
import RiseOnScroll from './ui/RiseOnScroll';




// EmailJS credentials
// Public key: kqQOE6NdiMFHanr5l
// Template ID: template_qnfqr2p
// Service ID: service_7e1fwg7

const Contact = () => {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState({ visible: false, success: false, message: "" });

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            name: "",
            email: "",
            message: ""
        };

        // Name validation
        if (!form.name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!emailRegex.test(form.email)) {
            newErrors.email = "Please enter a valid email";
            isValid = false;
        }

        // Message validation
        if (!form.message.trim()) {
            newErrors.message = "Message is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const { target } = e;
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value,
        });
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ""
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        emailjs
            .send(
                'service_7e1fwg7',
                'template_qnfqr2p',
                {
                    from_name: form.name,
                    to_name: "Zanjeel",
                    from_email: form.email,
                    to_email: "zanjeel123@gmail.com",
                    message: form.message,
                },
                'kqQOE6NdiMFHanr5l'
            )
            .then(() => {
                setLoading(false);
                setFeedback({
                    visible: true,
                    success: true,
                    message: "Thanks for your message. I will get back to you as soon as possible.",
                });
                setForm({
                    name: "",
                    email: "",
                    message: "",
                });
            })
            .catch((error) => {
                setLoading(false);
                console.error("EmailJS Error:", error);
                setFeedback({
                    visible: true,
                    success: false,
                    message: "Something went wrong. Please try again later.",
                });
            });
    };

    const closeFeedback = () => {
        setFeedback({ visible: false, success: false, message: "" });
    };

    return (
        <section id="contact" className="relative w-full lg:min-h-screen">
            {/* Base container that fills the entire viewport */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Waves
                    lineColor="#fff"
                    backgroundColor="rgba(255, 255, 255, 0.2)"
                    waveSpeedX={0.03}
                    waveSpeedY={0.03}
                    waveAmpX={40}
                    waveAmpY={20}
                    friction={0.9}
                    tension={0.01}
                    maxCursorMove={120}
                    xGap={12}
                    yGap={36}
                />
            </div>

            {/* Content overlay */}
            <div className="relative w-full min-h-screen flex items-center justify-center px-10 sm:px-2">
                <div className="w-full max-w-2xl bg-black/80 backdrop-blur-sm p-8 rounded-3xl mt-24 mb-24">
                    <RiseOnScroll>
                        <h3 className='justify-center items-center text-center head-text'>Let's Talk</h3>
                    </RiseOnScroll>

                    <RiseOnScroll delay={0.2}>
                        <p className='md:text-lg text-white-600 mt-3 xs:text-xs sm:text-sm text-center md:px-14'>
                            What led you here? What are you looking for? I would love to hear from you over a virtual coffee chat!
                        </p>
                    </RiseOnScroll>

                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className='mt-12 flex flex-col gap-8'
                    >
                        <RiseOnScroll delay={0.3}>
                            <label className='flex flex-col'>
                                <span className='text-white font-medium mb-4'>Your Name</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="What's your name?"
                                    className={`bg-gray py-4 px-6 placeholder:text-secondary rounded-lg outlined-none border-2 font-medium text-white transition-colors ${errors.name ? 'border-red-500' : 'border-transparent'
                                        }`}
                                />
                                {errors.name && (
                                    <span className="text-red-500 text-sm mt-1">{errors.name}</span>
                                )}
                            </label>
                        </RiseOnScroll>

                        <RiseOnScroll delay={0.4}>
                            <label className='flex flex-col'>
                                <span className='text-white font-medium mb-4'>Your Email</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="What's your email?"
                                    className={`bg-gray py-4 px-6 placeholder:text-secondary rounded-lg outlined-none border-2 font-medium text-white transition-colors ${errors.email ? 'border-red-500' : 'border-transparent'
                                        }`}
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-sm mt-1">{errors.email}</span>
                                )}
                            </label>
                        </RiseOnScroll>

                        <RiseOnScroll delay={0.5}>
                            <label className='flex flex-col'>
                                <span className='text-white font-medium mb-4'>Your Message</span>
                                <textarea
                                    rows={3}
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="What do you want to say?"
                                    className={`bg-gray py-4 px-6 placeholder:text-secondary rounded-lg outlined-none border-2 font-medium text-white transition-colors ${errors.message ? 'border-red-500' : 'border-transparent'
                                        }`}
                                />
                                {errors.message && (
                                    <span className="text-red-500 text-sm mt-1">{errors.message}</span>
                                )}
                            </label>
                        </RiseOnScroll>

                        <RiseOnScroll delay={0.6}>
                            <div className='flex justify-center items-center'>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="relative py-3 px-8 outline-none w-fit font-bold rounded-xl overflow-hidden group transition-all duration-300 hover:scale-105 bg-gray-800"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-100 group-hover:opacity-90 transition-opacity duration-300" />
                                    <span className="relative z-10 text-white">
                                        {loading ? 'Sending...' : 'Send Message'}
                                    </span>
                                </button>
                            </div>
                        </RiseOnScroll>
                    </form>
                </div>
            </div>

            {/* Modal */}
            {feedback.visible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-[100]">
                    <div className="bg-slate-950 p-8 rounded-2xl shadow-lg w-96 border border-white/10">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${feedback.success ? 'bg-gradient-to-r from-green-600/20 to-green-500/20' : 'bg-gradient-to-r from-red-600/20 to-red-500/20'
                            }`}>
                            {feedback.success ? (
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </div>
                        <h3 className={`text-xl font-bold text-center mb-2 ${feedback.success ? "text-green-500" : "text-red-500"
                            }`}>
                            {feedback.success ? "Message Sent!" : "Error"}
                        </h3>
                        <p className="text-white/90 text-center mb-6">{feedback.message}</p>
                        <button
                            onClick={closeFeedback}
                            className="w-full py-3 px-4 bg-gradient-to-r from-purple-900 to-blue-900 text-white rounded-xl font-medium hover:scale-[1.02] transition-all duration-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Contact
