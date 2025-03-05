import React, { useState, useEffect } from "react";
import Image from "next/image";
import Memoji from "@/public/memoji.svg";

const RotatingButton2 = () => {
    const text = "contact*me*contact*";
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isDark, setIsDark] = useState(false);

    const handleClick = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Calculate relative mouse position (-1 to 1)
            const x = (clientX / innerWidth) * 2 - 1;
            const y = (clientY / innerHeight) * 2 - 1;

            setMousePosition({ x, y });

            // Convert to rotation degrees (limit to ±15°)
            setRotation({
                x: y * -15, // Inverted for natural feel
                y: x * 15
            });
        };

        // Check if button is over a dark background
        const checkBackground = () => {
            const button = document.querySelector('.rotating-button');
            if (button) {
                const rect = button.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const elementAtCenter = document.elementFromPoint(centerX, centerY);

                // Check if the button is over a dark section
                const isDarkSection = elementAtCenter?.closest('[data-theme="dark"]');
                setIsDark(!!isDarkSection);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', checkBackground);
        checkBackground(); // Initial check

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', checkBackground);
        };
    }, []);

    return (
        <button
            onClick={handleClick}
            className='rotating-button relative w-44 h-44 hidden lg:block rounded-full overflow-hidden text-xs place-items-center transition-all duration-200 hover:scale-105 text-gray-300 cursor-pointer'
        >
            <p className="absolute inset-0 animate-[spin_8s_linear_infinite]">
                {text.split("").map((char, index) => (
                    <span
                        key={index}
                        className="absolute"
                        style={{
                            transform: `rotate(${index * 19}deg)`,
                            inset: "10px",
                        }}
                    >
                        {char}
                    </span>
                ))}
            </p>

            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 flex items-center justify-center rounded-full overflow-hidden bg-gray-100'>
                <div
                    style={{
                        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                        transition: 'transform 0.1s ease-out'
                    }}
                >
                    <Memoji
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </button>
    );
};

export default RotatingButton2;
