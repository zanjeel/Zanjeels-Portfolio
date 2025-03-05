import { gridItems } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import RiseOnScroll from "./ui/RiseOnScroll";
import { Spotlight } from "./ui/Spotlight";

const Grid = () => {
  return (
    <section id="grid" className="relative min-h-screen overflow-visible">
      <div className="absolute inset-0 overflow-visible">
        <Spotlight />
      </div>
      <div className="relative z-[1]">
        <RiseOnScroll delay={0.2}>
          <h1 className="heading mt-20">
            A little bit{" "}
            <span className="text-purple">About Me</span>
          </h1>
        </RiseOnScroll>
        
        <BentoGrid className="w-full py-20">
          {gridItems.map((item, i) => (
            <BentoGridItem
              id={item.id}
              key={i}
              title={item.title}
              description={item.description}
              className={item.className}
              img={item.img}
              imgClassName={item.imgClassName}
              titleClassName={item.titleClassName}
              spareImg={item.spareImg}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default Grid;
