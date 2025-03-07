import { LogoTicker } from "@/components/LogoTicker";
import Grid from "@/components/Grid";
import Experience2 from "@/components/Experience2";

const ExperienceSection = () => {
  return (
    <div className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5" data-theme="dark" data-cursor="pointer">
      <LogoTicker />
      <Grid />
      <Experience2 />
    </div>
  );
};

export default ExperienceSection; 