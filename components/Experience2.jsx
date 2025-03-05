import { Canvas } from '@react-three/fiber'
import React, { Suspense, useState } from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import SwipeAction from "../public/horizontal-swipe.png"
import Model from './ui/Model'
import Preloader from './Preloader'
import { workExperiences } from "./constants/index2"
import RiseOnScroll from './ui/RiseOnScroll'
import { Spotlight } from './ui/Spotlight'

const Experience2 = () => {
    const [animationName, setAnimationName] = useState('Idle2')
    const [hasInteracted, setHasInteracted] = useState(false)

    const handleModelInteraction = () => {
        setHasInteracted(true)
    }

    return (
        <section id="work" className="relative min-h-screen overflow-visible my-20 xl:mb-20 mx-2 sm:mx-7 xl:mx-28" >
            <div className="absolute inset-0 overflow-visible">
                <Spotlight className="opacity-70 left-[20rem] md:left-[40rem] xl:left-[70rem]" direction="left" />
            </div>
            <div className='w-full text-white relative z-[1]' >
                <RiseOnScroll delay={0.2}>
                    <h1 className="heading mb-22 mt-10">
                        Professional{" "}
                        <span className="text-purple">Experience</span>
                    </h1>
                </RiseOnScroll>

                <div className='work-container lg:flex lg:items-start'>
                    <div className='work-canvas min-h-96 ' style={{ height: "600px" }}>
                        <Canvas>
                            <ambientLight intensity={0.2} />
                            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                            <directionalLight position={[10, 10, 10]} intensity={1} />
                            <Environment preset="sunset" />
                            <OrbitControls
                                enableZoom={false}
                                maxPolarAngle={Math.PI / 2}
                                onChange={handleModelInteraction}
                            />
                            <Suspense fallback={<Preloader />}>

                                <Model scale={2.6}
                                    position={[0, -1.9, -0.2]}
                                    rotation={[-1.2, 0, 0]}
                                    animationName={animationName} />

                            </Suspense>
                        </Canvas>
                        {/* Hand Swipe Animation */}
                        {!hasInteracted && (
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                                <div className="hand-swipe-animation">
                                    <div className="relative">
                                        <img
                                            src="/swipe.svg"
                                            alt="Swipe to rotate"
                                            className="w-32 h-32 animate-swipe-horizontal opacity-70"
                                            style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.2))' }}
                                        />
                                    </div>
                                    <p className="text-white/70 text-sm mt-4 text-center animate-pulse font-medium tracking-wide">
                                        Drag to rotate model
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='work-content items-center justify-start flex'>
                        <div className='sm:py-10 py-5 sm:px-5 px-2.5 flex-auto'>
                            <div className=''>
                                {workExperiences.map
                                    (({ id, icon, name, pos, duration, title, animation }, index) =>
                                    (
                                        <div key={id} className='work-content_container group'
                                            onClick={() => setAnimationName(animation)}
                                            onPointerOver={() => setAnimationName(animation)}
                                            onPointerOut={() => setAnimationName("Idle2")}
                                        >
                                            <div className='flex flex-col h-full justify-start items-center py-2'>
                                                <RiseOnScroll delay={0.3 + (index * 0.1)}>
                                                    <div className='work-content_logo'>
                                                        <img src={icon} alt="logo" className='rounded-2xl' />
                                                    </div>
                                                </RiseOnScroll>
                                                <div className='work-content_bar' />
                                            </div>

                                            <div className='sm:p-5 px-2.5 py-5'>
                                                <RiseOnScroll delay={0.4 + (index * 0.1)}>
                                                    <p className='font-bold text-white-800'>
                                                        {name}
                                                    </p>
                                                </RiseOnScroll>

                                                <RiseOnScroll delay={0.5 + (index * 0.1)}>
                                                    <div className='space-y-1 mb-5'>
                                                        <p className='text-sm font-medium'>{pos}</p>
                                                        <p className='text-sm text-gray-400'>{duration}</p>
                                                    </div>
                                                </RiseOnScroll>

                                                <RiseOnScroll delay={0.6 + (index * 0.1)}>
                                                    <div className='space-y-2 group-hover:text-white transition ease-in-out duration-500'>
                                                        {title.map((line, i) => (
                                                            <p key={i} className='text-sm'>
                                                                {line}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </RiseOnScroll>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Experience2