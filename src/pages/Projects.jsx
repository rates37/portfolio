import React from "react";
import { projects } from "../constants";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";

const Projects = () => {
  return (
    <>
      <div className="blur-backdrop fixed top-0 left-0 w-full h-full overflow-hidden z-10"></div>

      <div className=" text-white w-full h-full relative z-20">
        <section className="max-container ">
          <h1 className="head-text">
            My{" "}
            <span className="blue-gradient_text font-semibold drop-shadow">
              Projects
            </span>
          </h1>
          <div className="mt-5 flex flex-col gap-3 text-slate-400">
            <p>
              Over the years, I've had the privilege of working on a wide range
              of projects, each offering its own unique challenges and learning
              experiences. Among them, these are the ones I'm most passionate
              about. Many are open-source, and I encourage you to explore the
              codebase if one of them catches your interest. Contributions and
              feedback are always welcome.
            </p>
          </div>

          <div className="flex flex-wrap my-20 gap-16">
            {projects.map((project) => (
              <div className="lg:w-[400px] w-full" key={project.name}>
                <div className="block-container w-20 h-20">
                  <div className={`btn-back rounded-xl ${project.theme}`} />
                  <div className="btn-front rounded-xl flex justify-center items-center">
                    <img
                      src={project.iconUrl}
                      alt="Project Icon"
                      className="w-3/4 h-3/4 object-contain"
                    />
                  </div>
                </div>

                <div className="mt-5 flex flex-col">
                  <h4 className="text-2xl font-poppins font-semibold">
                    {project.name}
                  </h4>
                  <p className="mt-2 text-slate-400">{project.description}</p>
                  <div className="mt-5 flex items-center gap-2 font-poppins">
                    {project.links &&
                      project.links.map((l) => (
                        <Link
                          to={l.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-blue-400 inline-display underline"
                        >
                          {l.linkText}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr className="border-slate-200" />

          <CallToAction />
        </section>
      </div>
    </>
  );
};

export default Projects;
