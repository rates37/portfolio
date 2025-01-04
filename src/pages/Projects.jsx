import React from "react";

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
          <p>Over the years, I've had the privilege of working on a wide range
            of projects, each offering its own unique challenges and learning
            experiences. Among them, these are the ones I'm most passionate
            about. Many are open-source, and I encourage you to explore the
            codebase if one of them catches your interest. Contributions and
            feedback are always welcome, as I believe in the power of 
            collaboration to drive continuous development.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Projects;
