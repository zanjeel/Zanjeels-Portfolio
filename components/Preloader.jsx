// import React, { useEffect } from "react";
// import { Html, useProgress } from "@react-three/drei";
// import gsap from "gsap";

// // Preloader component with GSAP animations
// const Preloader = () => {
//   const { progress } = useProgress();

//   useEffect(() => {
//     if (progress === 0) return;

//     // GSAP animations for loader and counters
//     gsap.from(".loader-1", {
//       width: 0,
//       duration: 6,
//       ease: "power2.inOut",
//     });

//     gsap.from(".loader-2", {
//       width: 0,
//       delay: 1.9,
//       duration: 2,
//       ease: "power2.inOut",
//     });

//     gsap.to(".loader", {
//       background: "none",
//       delay: 6,
//       duration: 0.1,
//     });

//     gsap.to(".loader-1", {
//       rotate: 90,
//       y: -50,
//       duration: 0.5,
//       delay: 6,
//     });

//     gsap.to(".loader-2", {
//       x: -75,
//       y: 75,
//       duration: 0.5,
//       delay: 6,
//     });

//     gsap.to(".loader", {
//       scale: 40,
//       duration: 1,
//       delay: 7,
//       ease: "power2.inOut",
//     });

//     gsap.to(".loader", {
//       rotate: 45,
//       y: 500,
//       x: 2000,
//       duration: 1,
//       delay: 7,
//       ease: "power2.inOut",
//     });

//     gsap.to(".loading-screen", {
//       opacity: 0,
//       duration: 0.5,
//       delay: 7.5,
//       ease: "power1.inOut",
//     });

//     gsap.to("h1", {
//       delay: 7,
//       y: -80,
//       ease: "power4.inOut",
//       stagger: {
//         amount: 0.1,
//       },
//       duration: 1.5,
//     });

//     // Animation for number counters
//     const animateCounter = (counter, duration, delay = 0) => {
//       const numHeight = counter.querySelector(".num").clientHeight;
//       const totalDistance = (counter.querySelectorAll(".num").length - 1) * numHeight;
//       gsap.to(counter, {
//         y: -totalDistance,
//         duration: duration,
//         delay: delay,
//         ease: "power2.inOut",
//       });
//     };

//     const counter3 = document.querySelector(".counter-3");
//     const counter2 = document.querySelector(".counter-2");
//     const counter1 = document.querySelector(".counter-1");

//     animateCounter(counter3, 5);
//     animateCounter(counter2, 6);
//     animateCounter(counter1, 2, 4);

//     // Add new digits to counter 3 dynamically
//     for (let i = 0; i < 2; i++) {
//       for (let j = 0; j < 10; j++) {
//         const div = document.createElement("div");
//         div.className = "num";
//         div.textContent = j;
//         counter3.appendChild(div);
//       }
//     }

//     const finalDiv = document.createElement("div");
//     finalDiv.className = "num";
//     finalDiv.textContent = "0";
//     counter3.appendChild(finalDiv);
//   }, [progress]);

//   return (
//     <Html
//       as="div"
//       center
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "column",
//         background: "black"
//       }}
//     >
//       <div className="loading-screen bg-black">
//         <div className="loader">
//           <div className="loader-1 bar"></div>
//           <div className="loader-2 bar"></div>
//         </div>

//         <div className="counter">
//           <div className="counter-1 digit">
//             <div className="num">0</div>
//             <div className="num num1offset1">1</div>
//           </div>
//           <div className="counter-2 digit">
//             <div className="num">0</div>
//             <div className="num num1offset2">1</div>
//             <div className="num">2</div>
//             <div className="num">3</div>
//             <div className="num">4</div>
//             <div className="num">5</div>
//             <div className="num">6</div>
//             <div className="num">7</div>
//             <div className="num">8</div>
//             <div className="num">9</div>
//             <div className="num">0</div>
//           </div>

//           <div className="counter-3 digit">
//             <div className="num">0</div>
//             <div className="num">1</div>
//             <div className="num">2</div>
//             <div className="num">3</div>
//             <div className="num">4</div>
//             <div className="num">5</div>
//             <div className="num">6</div>
//             <div className="num">7</div>
//             <div className="num">8</div>
//             <div className="num">9</div>
//           </div>
//         </div>
//         <p
//           style={{
//             fontSize: 14,
//             color: "#F1F1F1",
//             fontWeight: 800,
//             marginTop: 40,
//           }}
//         >
//           {progress !== 0 ? `${progress.toFixed(2)}%` : "Loading..."}
//         </p>
//       </div>
//     </Html>
//   );
// };

// export default Preloader;


import { Html, useProgress } from "@react-three/drei"


const PreLoader= ()=>{
    const {progress} = useProgress()

    return(
        <Html
            as="div"
            center
            style= {{
                display: 'flex',
                justifyContent: 'center',
                alignItems:'center',
                flexDirection:'column'
            }}
        >

            <span/>
            <p 
            style ={{
                fontSize: 14, 
                color:'#F1F1F1', 
                fontWeight: 800,
                marginTop:40
            }}
            >
                {progress != 0 ? `${progress.toFixed(2)}%`: 'Loading...'}

            </p>
        </Html>
    )
}

export default PreLoader
