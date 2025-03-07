import { Testimonials } from "@/components/Testimonials";
import Projects from "@/components/Projects";

const ContentSection = () => {
  return (
    <div className="relative bg-white flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5" data-cursor="view">
      <Testimonials />
      <Projects />
    </div>
  );
};

export default ContentSection; 