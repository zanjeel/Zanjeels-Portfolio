import React, { useState } from 'react';
import { ExternalLink, Globe, Code2, Boxes } from 'lucide-react';
import Underline from './ui/Underline';
import RiseOnScroll from './ui/RiseOnScroll';

interface Project {
  title: string;
  description: string;
  link: string;
  category: 'Data' | 'Software' | 'other';
  technologies: {
    name: string;
    icon: string;
  }[],
  projimg: string;
}

const projects: Project[] = [
    {
    title: "Voice to Voice LLM Chatbot",
    description: "A witty conversational AI assistant powered by Google's Gemini AI, gTTS, and pydub for speech-to-text and text-to-speech, with a React frontend for natural, engaging interactions.",
    link: "https://voice-to-voice-llm.vercel.app",
    category: 'Software',
    technologies: [
      { name: "Gemini AI", icon: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" },
      { name: "Python", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png" },
      { name: "React", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png" }
    ],
     projimg: "/proj-voice.jpeg"
  },
  {
    title: "Zeej Codes",
    description: "Zeej Codes is a platform offering UI components for developers, with live previews, customizable backgrounds, editable code, and responsive design previews.",
    link: "https://zeej-codes.vercel.app",
    category: 'Software',
    technologies: [
      { name: "React.js", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png" },
      { name: "TailwindCSS", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png" },
      { name: "JavaScript", icon: "/js.png" }
    ],
    projimg: "/proj-zeejcodes.jpeg"
  },
  {
    title: "Zeej AI",
    description: "A 3D AI avatar that answers queries in real time with interactive lip syncing and facial expressions with Three.js, React, Node.js and API integration.",
    link: "https://threed-chatbot-zoe-frontend.onrender.com",
    category: 'Software',
    technologies: [
      { name: "Three.js", icon: "/three-js-icon.png" },
      { name: "Node.js", icon: "/nodejs.png" },
      { name: "Gemini", icon: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" }
    ],
    projimg: "/proj-zeejai.jpeg"
  },
  {
    title: "Zanjeel's Portfolio",
    description: "An interactive visually detailed portfolio with framer motion, Three.js, and React for an immersive experience.",
    link: "https://zanjeel-portfolio.netlify.app",
    category: 'Software',
    technologies: [
      { name: "Three.js", icon: "/three-js-icon.png" },
      { name: "React.js", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png" },
       { name: "Framer Motion", icon: "/framer-motion.svg" }
    ],
     projimg: "/proj-portfolio1.jpeg"
  },
  {
    title: "Data Analytics Pro",
    description: "A powerful web-based Excel file analyzer that provides instant data analysis and beautiful visualizations, directly in the browser.",
    link: "https://data-analyser-pro.netlify.app",
    category: 'Software',
    technologies: [
      { name: "TypeScript", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png" },
      { name: "TailwindCSS", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png" },
      { name: "Vercel", icon: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" }
    ],
     projimg: "/proj-excel.jpeg"
  },
  {
    title: "React UI",
    description: "A collection of modern, responsive, customizable and Ready-to-use React components with stunning animations and effects.",
    link: "https://react-ui-awesome.netlify.app",
    category: 'Software',
    technologies: [
      { name: "TailwindCSS", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png" },
      { name: "React.js", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png" },
      { name: "TypeScript", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png" }
    ],
    projimg: "/proj-reactui2.jpeg"
  },
  {
    title: "Predictive ML - Hillingdon Council",
    description: "An in-depth, rigorous application of machine learning algorithms like LSTM, XGBoost and more for prediction based on historical data from Hillingdon Council, UK.",
    link: "https://zanjeel.github.io/Weather-Prediction-MachineLearningAlgorithms-HillingdonCouncilUK/MachineLearningModelsforWeatherPrediction.html",
    category: 'Data',
    technologies: [
      { name: "Tensorflow", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/1915px-Tensorflow_logo.svg.png" },
      { name: "Google Cloud", icon: "/gcp.png" },
      { name: "Scikit-learn", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Scikit_learn_logo_small.svg/2560px-Scikit_learn_logo_small.svg.png" }
    ],
    projimg: "/proj-hillingdon.jpeg"
  },
  {
    title: "NasaAI- Space Lovers RAG",
    description: "A RAG based nerdy, AI chatbot that provides every information about NASA's space explorations, for space lovers like me.",
    link: "https://rag-nasaai-spacelovers.onrender.com",
    category: 'Data',
    technologies: [
      { name: "Next.js", icon: "https://seeklogo.com/images/N/next-js-icon-logo-EE302D5DBD-seeklogo.com.png" },
      { name: "Astra DB", icon: "astra.png" },
      { name: "Gemini", icon: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" }
    ],
    projimg: "proj-nasa-data.jpeg"
  },
  {
    title: "Data Analysis using Machine Learning",
    description: "An in-depth data analysis and machine learning approach for predicting automobile prices based on various features and variables.",
    link: "https://zanjeel.github.io/Automobile-Predictive-Data-Analysis-RStudio/Automobile-Price-Prediction.nb.html",
    category: 'Data',
    technologies: [
      { name: "R", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/R_logo.svg/1280px-R_logo.svg.png" },
      { name: "Pandas", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Pandas_mark.svg/1200px-Pandas_mark.svg.png" },
      { name: "Matplotlib", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Matplotlib_icon.svg/1200px-Matplotlib_icon.svg.png" }
    ],
    projimg: "/proj-automobile-data.jpeg"
  },
  {
    title: "Customer Data Insights Dashboard",
    description: "An interactive Dashboard to obtain Data Visualisation on heaps of Excel customer datasets, implemented in both Power BI and Tableau.",
    link: "https://public.tableau.com/shared/NRTQ73KXK?:display_count=n&:origin=viz_share_link",
    category: 'Data',
    technologies: [
      { name: "Tableau", icon: "https://logos-world.net/wp-content/uploads/2021/10/Tableau-Symbol.png" },
      { name: "Power BI", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/2048px-New_Power_BI_Logo.svg.png" },
      { name: "Excel", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/2203px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png" }
    ],
    projimg: "/proj-dashboard-data.jpeg"
  },
];

type Category = 'all' | 'Software' | 'Data';

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const filteredProjects = projects.filter(project => 
    selectedCategory === 'all' || project.category === selectedCategory
  );

  const CategoryButton = ({ category, icon }: { category: Category; icon: React.ReactNode }) => (
    <button
      onClick={() => setSelectedCategory(category)}
      className={`flex items-center gap-2 px-4 py-2 rounded-3xl transition-colors 
        ${selectedCategory === category 
          ? ' bg-gray-100 text-violet-600 font-medium rounded-3xl  hover:bg-gray-100 ' 
          : ' text-gray-600 hover:bg-gray-100'}`}
    >
      {icon}
      <span className="capitalize">
        {category === 'all' ? 'All Projects' : 
         category === 'Data' ? 'Data' : 
         'Software'}
      </span>
    </button>
  );

  return (
    <div id="projects" className="min-h-screen  bg-white">
      {/* Header */}
      <header className="py-16 px-4 md:px-8 text-center">
        <RiseOnScroll delay={0.2}>
          <h1 className="text-4xl md:text-5xl font-bold heading text-gray-900 mb-4 relative inline-block">
            Selected{" "}
            <span className="relative inline-block">
              <span className='relative z-10 text-purple'>Projects</span>
            </span>
          </h1>
        </RiseOnScroll>

        <RiseOnScroll delay={0.3}>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            A collection of projects that showcase my expertise in software development, data and AI. Each project represents a unique challenge and solution.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            <CategoryButton category="all" icon={<Globe className="w-5 h-5" />} />
            <CategoryButton category="Software" icon={<Boxes className="w-5 h-5" />} />
            <CategoryButton category="Data" icon={<Code2 className="w-5 h-5" />} />
          </div>
        </RiseOnScroll>
      </header>

      {/* Projects Grid */}
      <main className="px-4 md:px-8 max-w-6xl mx-auto pb-16 md:mb-32 sm:mb-14" data-cursor="projects">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {filteredProjects.map((project, index) => (
            <RiseOnScroll key={index} delay={0.2 + (index * 0.05)}>
              <div
                className={`bg-gray-50 rounded-3xl overflow-hidden shadow-sm transform transition-all duration-1000 ease-out
                  ${index % 2 === 1 ? 'md:translate-y-24' : ''}`}
              >
                {/* EVEN */}
                {index % 2 === 0 ? (
                  <>
                    {/* Left Column: Image at top */}
                    <div className="px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 overflow-hidden">
                      <div className="aspect-[9:16] rounded-3xl bg-gray-100 transform transition-all duration-700 overflow-hidden">
                        <div className="w-full h-full rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-full h-full">
                            <img 
                              src={project.projimg} 
                              alt={project.title}
                              className="object-contain rounded-3xl transition-all duration-700 hover:scale-110 w-full h-full"
                            />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Content below image */}
                    <div className="p-6 sm:p-8 space-y-6">
                      <h2 className="text-2xl font-bold text-gray-900 text-center">
                        {project.title}
                      </h2>
                      <p className="text-gray-600 text-center">
                        {project.description}
                      </p>
                      
                      {/* Technologies */}
                      <div className="flex text-center items-center justify-center flex-wrap gap-4 py-4">
                        {project.technologies.map((tech, techIndex) => (
                          <div key={techIndex} className="flex items-center gap-2">
                            <img
                              src={tech.icon}
                              alt={tech.name}
                              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                            />
                            <span className="text-sm sm:text-base text-gray-600">{tech.name}</span>
                          </div>
                        ))}
                      </div>

                      {/* Project Link */}
                      <div className="flex justify-center pt-2">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border-2 border-white inline-flex items-center gap-2 px-6 py-3 bg-violet-600 font-semibold text-white rounded-3xl hover:bg-white hover:text-violet-600 hover:border-violet-600 transition-colors"
                        >
                          View Live
                          <ExternalLink className="w-4 h-4 font-bold" />
                        </a>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Right Column: Content at top */}
                    <div className="p-6 sm:p-8 space-y-6">
                      <h2 className="text-2xl font-bold text-gray-900 text-center">
                        {project.title}
                      </h2>
                      <p className="text-gray-600 text-center">
                        {project.description}
                      </p>

                      {/* Project Link */}
                      <div className="flex justify-center pt-2">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border-2 border-white inline-flex items-center gap-2 px-6 py-3 bg-violet-600 font-semibold text-white rounded-3xl hover:bg-white hover:text-violet-600 hover:border-violet-600 transition-colors"
                        >
                          View Live
                          <ExternalLink className="w-4 h-4 font-bold" />
                        </a>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap text-center items-center justify-center gap-4 py-4">
                        {project.technologies.map((tech, techIndex) => (
                          <div key={techIndex} className="flex items-center gap-2">
                            <img
                              src={tech.icon}
                              alt={tech.name}
                              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                            />
                            <span className="text-sm sm:text-base text-gray-600">{tech.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Image at bottom */}
                    <div className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 overflow-hidden">
                      <div className="aspect-[9:16] rounded-3xl bg-gray-100 transform transition-all duration-700 overflow-hidden">
                        <div className="w-full h-full rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-full h-full">
                            <img 
                              src={project.projimg} 
                              alt={project.title}
                              className="object-contain rounded-3xl transition-all duration-700 hover:scale-110 w-full h-full"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </RiseOnScroll>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Projects;