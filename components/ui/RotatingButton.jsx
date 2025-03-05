import React from "react";

const RotatingButton = () => {
    const text = "HEY LETS* CONNECT * ";

    return (
        <button className="relative  w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden grid place-content-center bg-gradient-to-t from-pink-500 via-pink-400 to-indigo-400 text-white font-semibold transition-transform duration-200 hover:scale-105">
            <p className="absolute inset-0 animate-[spin_8s_linear_infinite]">
                {text.split("").map((char, index) => (
                    <span
                        key={index}
                        className="absolute"
                        style={{
                            transform: `rotate(${index * 19}deg)`,
                            inset: "5px",
                        }}
                    >
                        {char}
                    </span>
                ))}
            </p>

            <div className="relative w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white text-black overflow-hidden">
                <svg
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-[150%] group-hover:-translate-y-[150%]"
                >
                    <path
                        d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                        fill="currentColor"
                    />
                </svg>
            </div>
        </button>
    );
};

export default RotatingButton;
