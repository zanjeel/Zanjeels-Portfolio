import dynamic from 'next/dynamic'
import { StatsData } from './constants/index2';
import { useState, useEffect } from 'react';


const CountUp = dynamic(() => import("./ui/CountUp"), { src: false });

const Ballpit = dynamic(() => import("./ui/Ballpit"), { src: false });

const Stats = () => {
    // const [isSmallScreen, setIsSmallScreen] = useState(false);

    // useEffect(() => {
    //     const handleResize = () => {
    //         if (window.innerWidth < 640) { // Tailwind's sm breakpoint is 640px
    //             setIsSmallScreen(true);
    //         } else {
    //             setIsSmallScreen(false);
    //         }
    //     };

    //     window.addEventListener('resize', handleResize);
    //     handleResize(); // Check initial size

    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);
    return (
        <>
            <div className="bg-black-100  relative lg:min-h-screen flex items-center justify-center w-full px-10 sm:px-2 overflow-hidden z-50">
                {/* Background container with higher z-index */}
                <div className="absolute inset-0 bg-black-100 z-40" />

                {/* Ballpit container with even higher z-index */}
                <div className="absolute top-0 justify-start left-0 w-full h-full overflow-hidden pointer-events-auto z-50">
                    <Ballpit
                        count={50}
                        gravity={0.2}
                        friction={1}
                        wallBounce={0.9}
                        followCursor={true} />
                </div>

                {/* Content container with highest z-index */}
                <div className="px-12 mb-96 mt-32 lg:mt-0 xl:-mt-20 lg:-mb-14 xl:mb-20 md:mb-44 lg:min-h-screen relative flex lg:flex-row flex-col items-center justify-between w-full gap-y-24 sm:max-w-sm md:max-w-full lg:max-w-full z-50">
                    {StatsData.map(({ id, types, num }) => (
                        <div key={id} className='flex flex-col items-center text-center px-12 md:px-16 lg:px-24'>
                            <div className="flex items-center">
                                <CountUp
                                    from={0}
                                    to={num}
                                    separator=","
                                    direction="up"
                                    duration={1}
                                    className="font-bold text-4xl md:text-5xl lg:text-6xl text-center text-purple"
                                />
                                    <span className="font-bold text-4xl md:text-5xl lg:text-6xl text-purple ml-1">+</span>
                            </div>

                            <div className="font-bold text-xl md:text-2xl lg:text-3xl text-center mt-2">
                                <p>{types}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Stats