import { useRef, useLayoutEffect, useState } from "react";
import RotatingButton from "./RotatingButton";

import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
} from "framer-motion";

function useElementWidth(ref) {
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        function updateWidth() {
            if (ref.current) {
                setWidth(ref.current.offsetWidth);
            }
        }
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, [ref]);

    return width;
}

export const ScrollVelocity = ({
    scrollContainerRef,
    texts = [],
    velocity = 100,
    className = "",
    damping = 50,
    stiffness = 400,
    numCopies = 6,
    velocityMapping = { input: [0, 1000], output: [0, 5] },
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle,
}) => {
    function VelocityText({
        children,
        baseVelocity = velocity,
        scrollContainerRef,
        className = "",
        damping,
        stiffness,
        numCopies,
        velocityMapping,
        parallaxClassName,
        scrollerClassName,
        parallaxStyle,
        scrollerStyle,
    }) {
        const baseX = useMotionValue(0);
        const scrollOptions = scrollContainerRef
            ? { container: scrollContainerRef }
            : {};
        const { scrollY } = useScroll(scrollOptions);
        const scrollVelocity = useVelocity(scrollY);
        const smoothVelocity = useSpring(scrollVelocity, {
            damping: damping ?? 50,
            stiffness: stiffness ?? 400,
        });
        const velocityFactor = useTransform(
            smoothVelocity,
            velocityMapping?.input || [0, 1000],
            velocityMapping?.output || [0, 5],
            { clamp: false }
        );

        const copyRef = useRef(null);
        const copyWidth = useElementWidth(copyRef);

        function wrap(min, max, v) {
            const range = max - min;
            const mod = (((v - min) % range) + range) % range;
            return mod + min;
        }

        const x = useTransform(baseX, (v) => {
            if (copyWidth === 0) return "0px";
            return `${wrap(-copyWidth, 0, v)}px`;
        });

        const directionFactor = useRef(1);
        useAnimationFrame((t, delta) => {
            let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

            if (velocityFactor.get() < 0) {
                directionFactor.current = -1;
            } else if (velocityFactor.get() > 0) {
                directionFactor.current = 1;
            }

            moveBy += directionFactor.current * moveBy * velocityFactor.get();
            baseX.set(baseX.get() + moveBy);
        });

        const spans = [];
        for (let i = 0; i < (numCopies ?? 1); i++) {
            spans.push(
                <span
                    className={`flex items-center space-x-10 lg:text-9xl text-6xl  `}
                    key={i}
                    ref={i === 0 ? copyRef : null}
                >
                    <span>{children}</span>

                    <div className="w-24 h-24 relative text-sm">
                        <RotatingButton />

                    </div>
                    <span>{"   "}</span>
                    <span>{"   "}</span>

                </span>
            );

        }

        return (
            <div
                className={` relative overflow-x-hidden  overflow-y-visible h-96`}

            >
                <motion.div
                    className={`flex whitespace-nowrap text-center font-sans font-normal`}
                    style={{ x }}
                >
                    {spans}
                </motion.div>
            </div>
        );
    }

    return (
        <section>
            <VelocityText
                className={className}
                baseVelocity={velocity}
                scrollContainerRef={scrollContainerRef}
                damping={damping}
                stiffness={stiffness}
                numCopies={numCopies}


            >
                {texts}&nbsp;
            </VelocityText>

        </section>
    );
};

export default ScrollVelocity;
