import React, { useState, useEffect } from "react";
import { BentoGrid } from "react-bento";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { socials } from "../constants";

const BentoHome = () => {

    const SMALL_SCREEN_BOUNDARY = 700;
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < SMALL_SCREEN_BOUNDARY);
  
    // Update `isMobile` on window resize
    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < SMALL_SCREEN_BOUNDARY);
      };
  
      window.addEventListener("resize", handleResize);
  
      // Cleanup the event listener on component unmount
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  const bentoItems = [
    {
      id: "welcome",
      title: "Welcome",
      color: "bg-zinc-800",
      element: (
        <div className="flex flex-col justify-between h-full p-4 text-slate-400">
          <div>
            <p className="text-sm">welcome</p>
            <h1 className="text-lg text-slate-200">
              Hi, my name is <b className="blue-gradient_text">Satya</b>, an electronics and software engineer with a strong focus in Artificial Intelligence, Web Development, and Computer Systems.
            </h1>
            
          </div>
          <div className="flex ">
            <a href={socials.linkedin.link} target="_blank" rel="noopener noreferrer" className="px-2 ">
              <FaLinkedin size={24} />
            </a>
            <a href={socials.github.link} target="_blank" rel="noopener noreferrer" className="px-2">
              <FaGithub size={24} />
            </a>
          </div>
        </div>
      ),
      width: 3,
      height: 2,
    },
    {
      id: "about-me",
      title: "About Me",
      color: "bg-zinc-800",
      element: (
        <div className="flex flex-col justify-start h-full p-4 text-slate-400">
          <h2 className="text-lg font-bold text-slate-200">About Me</h2>
          <p className="mb-2">I'm a passionate developer who loves creating solutions.</p>
          <ul className="list-disc list-inside text-cyan-300">
            <li>JavaScript</li>
            <li>React</li>
            <li>Tailwind CSS</li>
            <li>Python</li>
          </ul>
          <p className="mt-2 text-sm">
            Outside of work, I enjoy hiking, photography, and gaming.
          </p>
        </div>
      ),
      width: 1,
      height: 2,
    },
    {
      id: "call-to-action",
      title: "Get in Touch",
      color: "bg-zinc-800",
      element: (
        <div className="flex justify-center items-center h-full p-4 text-slate-400">
          <button className="border-cyan-200 border-2 text-white px-4 py-2 rounded hover:bg-cyan-400">
            Contact Me
          </button>
        </div>
      ),
      width: 1,
      height: 1,
    },
    {
      id: "timezone",
      title: "Timezone",
      color: "bg-zinc-900",
      element: (
        <div className="flex flex-col justify-center items-center h-full p-4 text-cyan-300">
          <h3 className="text-lg font-bold">Current Time</h3>
          <p className="text-2xl">
            {new Date().toLocaleTimeString("en-AU", { timeZone: "Australia/Melbourne" })}
          </p>
        </div>
      ),
      width: 1,
      height: 1,
    },
    {
      id: "now",
      title: "What I'm Doing",
      color: "bg-zinc-800",
      element: (
        <div className="flex justify-between items-center h-full p-4 text-cyan-400">
          <p>Currently working as [Your Current Job Title]</p>
          <span className="bg-green-500 rounded-full h-4 w-4 animate-pulse"></span>
        </div>
      ),
      width: 1,
      height: 1,
    },
  ].map(g => isSmallScreen ? {...g, width: 1} : g);

  return (
    <>
    {/* <div className="blur-backdrop fixed top-0 left-0 w-full h-full overflow-hidden z-10"></div> */}
    <div className="max-container-wide min-h-screen bg-zinc-900 flex justify-center items-center p-8 z-100">
    <div className="relative z-20">
        <BentoGrid
          items={bentoItems}
          gridCols={isSmallScreen ? 1 : 4} // Adjust gridCols responsively
          rowHeight={150}
          classNames={{
            container: "gap-4",
            elementContainer:
              "rounded-lg shadow-md overflow-hidden border border-zinc-500 hover:border-cyan-400 transition duration-300",
          }}
        />
      </div>
    </div></>
  );
};

export default BentoHome;
