import React from "react";
import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `mono text-[0.72rem] tracking-[0.18em] uppercase transition-colors duration-200 ${
    isActive ? "text-white" : "text-[#8a8a8a] hover:text-white"
  }`;

const NavBar = () => {
  return (
    <header className="fixed w-full top-0 z-50 border-b border-[#2c2c2c]/70 bg-[#070707]/70 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">
        <NavLink
          to="/"
          className="mono flex items-center gap-3 text-sm text-[#ececec] group"
        >
          <span className="w-8 h-8 border border-[#6f6f6f] flex items-center justify-center font-semibold text-white transition-all duration-150 group-hover:bg-white group-hover:text-black group-hover:shadow-[3px_3px_0_0_rgba(255,255,255,0.3)]">
            SJ
          </span>
          <span className="hidden sm:inline text-[0.7rem] tracking-[0.2em] uppercase text-[#8a8a8a]">
            satya.jhaveri
          </span>
        </NavLink>

        <nav className="flex items-center space-x-7">
          <NavLink to="/about" className={linkClass}>
            <span className="text-[#6f6f6f] mr-1">./</span>about
          </NavLink>
          <NavLink to="/projects" className={linkClass}>
            <span className="text-[#6f6f6f] mr-1">./</span>projects
          </NavLink>
          <NavLink to="https://rates37.github.io/blog" className={linkClass}>
            <span className="text-[#6f6f6f] mr-1">./</span>blog
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;