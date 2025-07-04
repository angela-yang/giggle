// SideBar.js
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Briefcase, List, Mic } from "react-feather";

export default function SideBar() {
  return (
    <div className="group fixed h-screen transition-all duration-300 w-16 hover:w-64 bg-white dark:bg-gray-800 text-black dark:text-white rounded-r-2xl overflow-hidden z-40">
      <div className="flex flex-col h-full">
        {/* Home Button */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-3 transition-colors hover:bg-blue-700 ${
              isActive ? "bg-blue-600 text-white" : "text-gray-800 dark:text-gray-200"
            }`
          }
        >
          <Home size={20} />
          <span className="absolute left-14 opacity-0 group-hover:opacity-100 transition-opacity delay-300 duration-200 whitespace-nowrap">
            Home
          </span>
        </NavLink>

        <NavLink
          to="/level/1"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-3 transition-colors hover:bg-blue-700 ${
              isActive ? "bg-blue-600 text-white" : "text-gray-800 dark:text-gray-200"
            }`
          }
        >
          <Briefcase size={20} />
          <span className="absolute left-14 opacity-0 group-hover:opacity-100 transition-opacity delay-300 duration-200 whitespace-nowrap">
            Level 1: Find Jobs
          </span>
        </NavLink>

        <NavLink
          to="/level/2"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-3 transition-colors hover:bg-blue-700 ${
              isActive ? "bg-blue-600 text-white" : "text-gray-800 dark:text-gray-200"
            }`
          }
        >
          <List size={20} />
          <span className="absolute left-14 opacity-0 group-hover:opacity-100 transition-opacity delay-300 duration-200 whitespace-nowrap">
            Level 2: Organize
          </span>
        </NavLink>

        <NavLink
          to="/level/3"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-3 transition-colors hover:bg-blue-700 ${
              isActive ? "bg-blue-600 text-white" : "text-gray-800 dark:text-gray-200"
            }`
          }
        >
          <Mic size={20} />
          <span className="absolute left-14 opacity-0 group-hover:opacity-100 transition-opacity delay-300 duration-200 whitespace-nowrap">
            Level 3: Interview
          </span>
        </NavLink>
      </div>
    </div>
  );
}