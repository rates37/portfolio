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
          <p>
            Some description about projects
          </p>
        </div>
      </section>
    </div>
  );
};

export default Projects;
