import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { recentWork } from "../constants";

const panelVariants = {
  hidden: { opacity: 0, y: 14 },
  shown: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: "easeOut" },
  }),
};

const Panel = ({ index, label, className = "", children }) => (
  <motion.section
    className={`panel p-5 ${className}`}
    variants={panelVariants}
    initial="hidden"
    animate="shown"
    custom={index}
  >
    <div className="panel-label mb-4">
      <span className="idx">{`0${index}`}</span>
      <span>{label}</span>
    </div>
    {children}
  </motion.section>
);

const HomePage = () => {
  return (
    // pointer-events-none lets the mouse reach the WebGL scene beside the
    // panels; the grid re-enables events for its own content
    <div className="relative z-10 min-h-screen flex px-5 pb-12 pt-24 sm:px-8 sm:pt-24 sm:pb-8 pointer-events-none">
      <div className="grid grid-cols-1 sm:grid-cols-6 auto-rows-min gap-4 max-w-3xl w-full m-auto pointer-events-auto">
        {/* Intro */}
        <Panel index={1} label="ident" className="sm:col-span-6">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white">
                Hey, I'm Satya
                <span className="mono text-[#6f6f6f] font-normal">_</span>
              </h1>
              <p className="mt-3 text-[#8a8a8a] leading-relaxed max-w-lg">
                Passionate Electronics and Software Engineer.
              </p>
            </div>
            <div className="flex gap-3 shrink-0 pt-1">
              <a
                href="https://github.com/rates37"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 border border-[#2c2c2c] flex items-center justify-center text-[#8a8a8a] transition-all duration-150 hover:text-black hover:bg-white hover:border-white"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/satya-jhaveri-4a31b4288/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 border border-[#2c2c2c] flex items-center justify-center text-[#8a8a8a] transition-all duration-150 hover:text-black hover:bg-white hover:border-white"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </Panel>

        {/* Current roles */}
        <Panel index={2} label="status" className="sm:col-span-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="status-square" />
            <span className="mono text-[0.65rem] tracking-[0.18em] uppercase text-[#ececec]">
              currently working as
            </span>
          </div>
          <ul className="space-y-2 text-[#ececec]">
            <li className="flex items-baseline gap-3">
              <span className="mono text-[0.7rem] text-[#6f6f6f]">&gt;</span>
              <span>Software Engineer @ Canonical</span>
            </li>
          </ul>
        </Panel>

        {/* Navigation */}
        <Panel index={3} label="goto" className="sm:col-span-2">
          <div className="flex flex-col justify-center h-full">
            <Link to="/about" className="trace-btn">
              <span>About me</span>
              <span aria-hidden>-&gt;</span>
            </Link>
            <Link to="/projects" className="trace-btn">
              <span>Projects</span>
              <span aria-hidden>-&gt;</span>
            </Link>
            <br/>
          </div>
        </Panel>

        {/* Recent work */}
        <Panel index={4} label="recent work" className="sm:col-span-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recentWork.map((project, index) => (
              <Link
                key={index}
                to={project.link}
                className="group block p-4 border border-[#2c2c2c] transition-all duration-150 hover:border-white hover:shadow-[3px_3px_0_0_rgba(255,255,255,0.25)]"
              >
                <div className="font-medium text-[#ececec] group-hover:text-white transition-colors duration-150">
                  {project.title}
                </div>
                <div className="mt-1 text-sm text-[#8a8a8a] leading-snug">
                  {project.desc}
                </div>
              </Link>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default HomePage;