"use client";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import RiseOnScroll from "./ui/RiseOnScroll";

const testimonials = [
  {
    text: "Zanjeel did a great job as our Developer and helped build our product from the ground up. She was a great asset to our team and we look forward to working with her again in the future.",
    imageSrc: "/new-robot-pink.png",
    name: "Peter Ponton",
    username: "CEO, Risidio",
    bgColor: "bg-pink-100",
  },
  {
    text: "I love your Chatbot ZeejAI and the way it responds.",
    imageSrc: "/new-circle-pink.png",
    name: "Xavier Anguera",
    username: "Co-founder, Elsa Corp",
    bgColor: "bg-blue-100",
  },
  {
    text: "Zanjeel has an exceptional character and a positive, determined approach to challenges. As her mentor, I was impressed by her dedication and commitment to her work.",
    imageSrc: "/new-spiral-pink.png",
    name: "Elizabeth Thuo",
    username: "Sr. Data Scientist, Bentley",
    bgColor: "bg-purple-100",
  },
  {
    text: "Managing Zanjeel at Devsinc was a pleasure. She was a great asset to the team.",
    imageSrc: "/new-square-pink.png",
    name: "Zain Mirza",
    username: "Sr Software Engineer, Devsinc",
    bgColor: "bg-yellow-100",
  },
  {
    text: "There are few times when you come across such bright minds like Zanjeel.",
    imageSrc: "/new-donut-pink.png",
    name: "Ali Haider",
    username: "Software Engineer, Devsinc",
    bgColor: "bg-green-100",
  },
  {
    text: "Your Artifical Intelligence Chatbot is fantastic work!",
    imageSrc: "/new-3d-woman-yellow-on-computer.png",
    name: "Clyde Johnson",
    username: "CEO, In2netCISO",
    bgColor: "bg-indigo-100",
  },
  {
    text: "Zanjeel is a wonderful Role Model and a great mentee",
    imageSrc: "/new-woman-purple-trouser.png",
    name: "Giselle Hayward",
    username: "Mentor, Brunel University",
    bgColor: "bg-orange-100",
  },
     {
    text: "Zanjeel did a great job as our Developer and helped build our product from the ground up. She was a great asset to our team and we look forward to working with her again in the future.",
    imageSrc: "/new-robot-pink.png",
    name: "Peter Ponton",
    username: "CEO, Risidio",
    bgColor: "bg-pink-100",
  },
   {
    text: "Managing Zanjeel at Devsinc was a pleasure. She was a great asset to the team.",
    imageSrc: "/new-square-pink.png",
    name: "Zain Mirza",
    username: "Sr Software Engineer, Devsinc",
    bgColor: "bg-yellow-100",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const isMobile = props.className?.includes('md:hidden');

  useEffect(() => {
    setShouldAnimate(true);
  }, []);

  return (
    <div className={props.className}>
      <motion.div
        animate={shouldAnimate ? {
          translateY: isMobile ? "-33.33%" : "-50%",
        } : { translateY: "0%" }}
        initial={{ translateY: "0%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(isMobile ? 4 : 2)].fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, imageSrc, name, username, bgColor }) => (
              <div key={index} className="card">
                <div>{text}</div>
                <div className="flex items-center gap-2 mt-5">
                  <div className={`relative h-10 w-10 rounded-full ${bgColor} flex items-center justify-center overflow-hidden`}>
                    <Image
                      src={imageSrc}
                      alt={name}
                      width={40}
                      height={40}
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="font-medium tracking-tight leading-5">
                      {name}
                    </div>
                    <div className="leading-5 tracking-tight">{username}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-white mb-9">
      <div className="container">
        <div className="section-heading mb-24">
          <RiseOnScroll delay={0.2}>
            <h1 className="heading text-black-100 mt-20">
              What Others{" "}
              <span className="text-purple">Say</span>
            </h1>
          </RiseOnScroll>

          <RiseOnScroll delay={0.3}>
            <p className="section-description mt-5">
              From people I have worked with, supervisors, mentors and users of my projects.
            </p>
          </RiseOnScroll>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] overflow-hidden">
          <TestimonialsColumn testimonials={testimonials} duration={45} className="md:hidden" />
          <TestimonialsColumn testimonials={firstColumn} duration={15} className="hidden md:block" />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};
