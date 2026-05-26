import { useMemo, useState, useRef, useEffect } from "react";
import { projects } from "../constants";
import { Link, useSearchParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedTags = useMemo(() => {
    const tags = searchParams.get("tags");
    return tags ? tags.split(",") : [];
  }, [searchParams]);

  const allTags = useMemo(() => {
    const tags = new Set();
    projects.forEach((project) => {
      project.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return projects;
    return projects.filter((project) =>
      selectedTags.some((tag) => project.tags?.includes(tag))
    );
  }, [selectedTags]);

  const handleTagToggle = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    if (newTags.length === 0) {
      setSearchParams({});
    } else {
      setSearchParams({ tags: newTags.join(",") });
    }
  };

  const handleClear = () => {
    setSearchParams({});
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

          <div className="mt-10 mb-10 flex justify-end">
            <div ref={dropdownRef} className="relative w-full sm:w-64">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-4 py-2 bg-slate-700 text-slate-200 hover:bg-slate-600 rounded-lg font-semibold transition-all duration-200 text-left flex items-center justify-between"
              >
                <span>
                  {selectedTags.length === 0
                    ? "Filter by tag"
                    : `${selectedTags.length} tag${selectedTags.length > 1 ? "s" : ""} selected`}
                </span>
                <span className="text-sm">▼</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50 w-full">
                  <div className="p-3 max-h-64 overflow-y-auto">
                    {allTags.map((tag) => (
                      <label
                        key={tag}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-slate-700 rounded cursor-pointer transition-colors group"
                      >
                        <div className="relative flex items-center justify-center w-4 h-4">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes(tag)}
                            onChange={() => handleTagToggle(tag)}
                            className="appearance-none w-4 h-4 border-2 border-slate-500 rounded transition-all duration-200 cursor-pointer checked:bg-blue-500 checked:border-blue-500"
                          />
                          {selectedTags.includes(tag) && (
                            <svg
                              className="absolute w-3 h-3 text-white pointer-events-none"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="text-slate-200 group-hover:text-slate-100">{tag}</span>
                      </label>
                    ))}
                  </div>
                  {selectedTags.length > 0 && (
                    <div className="border-t border-slate-700 p-2">
                      <button
                        onClick={handleClear}
                        className="w-full px-3 py-1 text-sm text-slate-300 hover:text-slate-100 hover:bg-slate-700 rounded transition-colors"
                      >
                        Clear filters
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              <p>No projects found with the selected filters</p>
            </div>
          ) : (
            <div className="flex flex-wrap my-20 gap-16">
              {filteredProjects.map((project) => (
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
                    {project.tags && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleTagToggle(tag)}
                            className={`text-xs px-2 py-1 rounded transition-colors duration-200 ${
                              selectedTags.includes(tag)
                                ? "bg-blue-500 text-white"
                                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="mt-5 flex items-center gap-2 font-poppins">
                      {project.links &&
                        project.links.map((l, i) => (
                          <Link
                            to={l.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-blue-400 inline-display underline"
                            key={i}
                          >
                            {l.linkText}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <hr className="border-slate-200" />

          <CallToAction />
        </section>
      </div>
    </>
  );
};

export default Projects;
