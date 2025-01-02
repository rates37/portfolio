import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="header">
      <NavLink
        to="/"
        className="w-10 h-10 rounded-lg bg-zinc-850 items-center justify-center flex font-bold border-2  border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_10px_#08f,0_0_20px_#08f]"
      >
        <p className="blue-gradient_text text-xl">S</p>
      </NavLink>

      <nav className="flex text-lg gap-7 font-medium">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-cyan-500" : "text-white"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? "text-cyan-500" : "text-white"
          }
        >
          Projects
        </NavLink>
        {/* <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-cyan-500" : "text-white"
          }
        >
          Contact
        </NavLink> */}
      </nav>
    </header>
  );
};

export default NavBar;
