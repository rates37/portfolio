import React from "react";
import { projects } from "../constants";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";

const Projects = () => {
  return (
    <div className="bg-zinc-900 text-white w-full h-[100%] relative">
      <section className="max-container bg-zinc-900 h-screen">
        {/* weird css thing here with h-screen */}
        <h1 className="head-text">
          My{" "}
          <span className="blue-gradient_text font-semibold drop-shadow">
            Projects
          </span>
        </h1>
        <div className="mt-5 flex flex-col gap-3 text-slate-400">
          <p>
            Over the years, I've had the privilege of working on a wide range of
            projects, each offering its own unique challenges and learning
            experiences. Among them, these are the ones I'm most passionate
            about. Many are open-source, and I encourage you to explore the
            codebase if one of them catches your interest. Contributions and
            feedback are always welcome.
          </p>
        </div>

        <div className="flex flex-wrap my-20 gap-16">
          {projects.map((project) => (
            <div className="lg:w-[400px] w-full" key={project.name}>
              <div className="block-container w-12 h-12">
                <div className={`btn-back rounded-xl ${project.theme}`} />
                <div className="btn-front rounded-xl flex justify-center items-center">
                  <img
                    src={project.iconUrl}
                    alt="Project Icon"
                    className="w-1/2 h-1/2 object-contain"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col">
                <h4 className="text-2xl font-poppins font-semibold">
                  {project.name}
                </h4>
                <p className="mt-2 text-slate-400">{project.description}</p>
                <div className="mt-5 flex items-center gap-2 font-poppins">
                  <Link
                    to={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-400 inline-display underline"
                  >
                    Link
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr className="border-slate-200" />

        <CallToAction />
      </section>
    </div>
  );
};

export default Projects;
