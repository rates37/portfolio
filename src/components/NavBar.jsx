import React from "react";
import { NavLink } from "react-router-dom";

// const NavBar = () => {
//   return (
//     <header className="header">
//       <NavLink
//         to="/"
//         className="w-10 h-10 rounded-lg bg-sky-100 items-center justify-center flex font-bold border-2  border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_10px_#08f,0_0_20px_#08f]"
//       >
//         <p className="blue-gradient_text text-xl">S</p>
//       </NavLink>

//       <nav className="flex text-lg gap-7 font-medium">
//         <NavLink
//           to="/about"
//           className={({ isActive }) =>
//             isActive ? "text-cyan-500" : "text-white"
//           }
//         >
//           About
//         </NavLink>
//         <NavLink
//           to="/projects"
//           className={({ isActive }) =>
//             isActive ? "text-cyan-500" : "text-white"
//           }
//         >
//           Projects
//         </NavLink>
//         {/* <NavLink
//           to="/contact"
//           className={({ isActive }) =>
//             isActive ? "text-cyan-500" : "text-white"
//           }
//         >
//           Contact
//         </NavLink> */}
//       </nav>
//     </header>
//   );
// };

const NavBar = () => {
  return (
    <header className="fixed w-full top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink
          to="/"
          className="w-10 h-10 rounded-lg bg-sky-100 items-center justify-center flex font-bold border-2  border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_10px_#08f,0_0_20px_#08f]"
        >
          <p className="blue-gradient_text text-xl">S</p>
        </NavLink>

        <nav className="flex space-x-6">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `relative text-gray-400 hover:text-white transition-colors duration-300 before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-cyan-500 before:transition-all before:duration-300 hover:before:w-full ${
                isActive ? "text-white before:w-full" : ""
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `relative text-gray-400 hover:text-white transition-colors duration-300 before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-cyan-500 before:transition-all before:duration-300 hover:before:w-full ${
                isActive ? "text-white before:w-full" : ""
              }`
            }
          >
            Projects
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
