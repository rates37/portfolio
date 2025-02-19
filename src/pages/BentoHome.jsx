import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaPython, FaJs, FaReact } from "react-icons/fa";
import { SiCplusplus, SiGnubash, SiPytorch } from "react-icons/si";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { recentWork, socialLinks } from "../constants";

const techstackIcons = [
  { Icon: FaJs, label: "JavaScript", hoverColour: "javascript-yellow" },
  { Icon: FaPython, label: "Python", hoverColour: "python-yellow" },
  { Icon: FaReact, label: "React", hoverColour: "react-blue" },
  { Icon: SiPytorch, label: "PyTorch", hoverColour: "pytorch-orange" },
  { Icon: SiCplusplus, label: "C++", hoverColour: "cpp-blue" },
  { Icon: SiGnubash, label: "Bash", hoverColour: "bash-green" },
];

const HomePage = () => {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-AU", {
      timeZone: "Australia/Melbourne",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-AU", {
          timeZone: "Australia/Melbourne",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const cardVariants = {
    offscreen: { opacity: 0, y: 20 },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  const iconVariants = {
    hover: { scale: 1.2, rotate: 5 },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative z-10 min-h-screen text-gray-200 flex justify-center items-center p-8">
      <div className="grid grid-cols-2 auto-rows-min gap-6 max-w-3xl w-full">
        {/* Intro Card - Full width */}
        <motion.div
          className="col-span-2 bg-gray-800/50 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-700/30"
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Hey, I'm Satya
          </h1>
          <p className="mt-3 text-gray-300 leading-relaxed">
            Passionate Electronics and Software Engineer. I love creating
            elegant solutions for complex problems through code.
          </p>
        </motion.div>

        {/* Role Card with Active Status */}
        <motion.div
          className="bg-gray-800/50 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-700/30 relative row-span-2"
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <motion.div
              variants={pulseVariants}
              animate="animate"
              className="w-3 h-3 rounded-full bg-green-400"
            />
            {/* <span className="text-green-400 text-sm">Active</span> */}
          </div>
          <h2 className="text-xl font-semibold text-purple-300">
            Currently working as:
          </h2>
          <ul className="mt-3 text-gray-300 space-y-2">
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
              <span>Deputy Unit Coordinator</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
              <span>Teaching Associate</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
              <span>AI Engineer</span>
            </li>
          </ul>
        </motion.div>

        {/* Melbourne Time Card */}
        <motion.div
          className="bg-gray-800/50 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-700/30 row-span-2 flex flex-col justify-center"
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">
              Local Time
            </h2>
            <div className="text-5xl font-bold text-gray-200 mb-4">{time}</div>
            <p className="text-gray-400">Melbourne, Australia</p>
          </div>
        </motion.div>

        {/* Projects Preview */}
        <motion.div
          className="col-span-2 bg-gray-800/50 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-700/30"
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-semibold text-green-300 mb-3">
            Recent Work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recentWork.map((project, index) => (
              <Link
                key={index}
                to={project.link}
                className="block p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
              >
                <div className="font-medium text-white">{project.title}</div>
                <div className="text-sm text-gray-400">{project.desc}</div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          className="bg-gray-800/50 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-700/30"
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-semibold text-cyan-300 mb-4">
            Tech Stack
          </h2>
          <div className="grid grid-cols-3 gap-4 text-3xl text-gray-400">
            {techstackIcons.map(({ Icon, label, hoverColour }, index) => (
              <motion.div
                key={index}
                variants={iconVariants}
                whileHover="hover"
                className="flex justify-center"
              >
                <Icon
                  className={`transition-colors duration-300 ${hoverColour}`}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Connect */}
        <motion.div
          className="bg-gray-800/50 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-700/30"
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-center space-x-4">
              <motion.a
                href="https://github.com/rates37"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-white text-2xl"
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/satya-jhaveri-4a31b4288/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-white text-2xl"
              >
                <FaLinkedin />
              </motion.a>
            </div>
            <div className="flex flex-col space-y-2">
              <Link
                to="/about"
                className="px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 transition-colors text-center"
              >
                More About Me
              </Link>
              <Link
                to="/projects"
                className="px-4 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 transition-colors text-center"
              >
                View Projects
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
