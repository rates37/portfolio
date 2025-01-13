import React, { useState, useEffect } from "react";
import { BentoGrid } from "react-bento";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { socials } from "../constants";
import CallToAction from "../components/CallToAction";
import { Link, NavLink } from "react-router-dom";

const BentoHome = () => {
  const SMALL_SCREEN_BOUNDARY = 700;
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.innerWidth < SMALL_SCREEN_BOUNDARY
  );

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
              Hi, my name is <b className="blue-gradient_text">Satya</b>, an
              electronics and software engineer with a strong focus in
              Artificial Intelligence, Web Development, and Computer Systems.
            </h1>
          </div>
          <div className="flex ">
            <a
              href={socials.linkedin.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 "
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href={socials.github.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2"
            >
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
        <div className="flex flex-col justify-start h-full p-4 text-slate-200 text-sm">
          <h2 className="text-lg font-bold text-slate-200">About Me</h2>
          <p className="text-sm">
            I'm a passionate developer who loves creating solutions.
          </p>
          <br />
          <p>My primary tools of choice include:</p>
          <ul className="list-disc list-inside text-xs text-white">
            <li>Typescript</li>
            <li>Python</li>
            <li>PyTorch</li>
            <li>C/C++</li>
          </ul>
          <br />
          <p>
            While I have some preferred tools, I always carefully choose the
            best one for the job, even if its not one of my go-to's. I ensure to
            find the right solution for each project.
          </p>
          <br />
          <div className="flex justify-center align-middle">
            <NavLink
              className=" border-cyan-200 border-2 text-white px-4 py-2 rounded hover:bg-cyan-300 hover:text-slate-900 transition duration-300"
              to="/projects"
            >
              My Projects
            </NavLink>
          </div>
        </div>
      ),
      width: 1,
      height: 3,
    },
    {
      id: "call-to-action",
      title: "Get in Touch",
      color: "bg-zinc-800",
      element: (
        <div className="justify-center items-center h-full p-2 text-slate-400">
          <h1 className="text-xl text-white">Want to know more?</h1>
          <br />
          <div className="flex justify-center align-middle">
            <NavLink
              className=" border-cyan-200 border-2 text-white px-4 py-2 rounded hover:bg-cyan-300 hover:text-slate-900 transition duration-300"
              to="/about"
            >
              My Experience
            </NavLink>
          </div>
        </div>
      ),
      width: 1,
      height: 1,
    },
    {
      id: "timezone",
      title: "Timezone",
      color: "bg-zinc-800",
      element: (
        <div className="flex flex-col justify-center items-center h-full p-4 text-slate-200">
          <h3 className="text-lg font-bold">Time zone</h3>
          <p className="text-2xl">
            {new Date().toLocaleTimeString("en-AU", {
              timeZone: "Australia/Melbourne",
            })}
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
        <div className="relative justify-between items-center h-full p-4 text-white">
          <p>Currently working as:</p>
          <ul className="list-disc list-inside text-sm text-white">
            <li>Deputy Unit Coordinator</li>
            <li>Freelancer</li>
            <li>Teaching Associate</li>
          </ul>
          <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
        </div>
      ),
      width: 1,
      height: 1,
    },
  ].map((g) => (isSmallScreen ? { ...g, width: 1 } : g));

  return (
    <>
      <div className="max-container-wide min-h-screen bg-zinc-900 flex justify-center items-center p-8 z-100">
        <div className="relative z-20">
          <BentoGrid
            items={bentoItems}
            gridCols={isSmallScreen ? 1 : 4}
            rowHeight={150}
            classNames={{
              container: "gap-4",
              elementContainer:
                "rounded-lg shadow-md overflow-hidden border border-zinc-500 hover:border-cyan-400 transition duration-300",
            }}
          />

          <hr className="border-slate-200" />
          <CallToAction />
        </div>
      </div>
    </>
  );
};

export default BentoHome;
