import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function App() {
  const [open, setOpen] = useState(false); // mobile menu state

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* 🔥 NAVBAR */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* LOGO */}
          <div className="text-2xl font-bold text-blue-400 tracking-wide">
            UserManager
          </div>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex gap-8 text-lg font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `pb-1 border-b-2 transition ${
                  isActive
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent hover:border-blue-500 hover:text-blue-400"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/users"
              className={({ isActive }) =>
                `pb-1 border-b-2 transition ${
                  isActive
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent hover:border-blue-500 hover:text-blue-400"
                }`
              }
            >
              Users
            </NavLink>

            <NavLink
              to="/users/add"
              className={({ isActive }) =>
                `pb-1 border-b-2 transition ${
                  isActive
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent hover:border-blue-500 hover:text-blue-400"
                }`
              }
            >
              Add User
            </NavLink>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <XMarkIcon className="w-7 h-7" />
            ) : (
              <Bars3Icon className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {open && (
          <nav className="md:hidden bg-gray-900 border-t border-gray-800">
            <div className="flex flex-col px-6 py-4 gap-4 text-lg">
              <NavLink
                to="/"
                className="py-1 text-gray-300 hover:text-blue-400"
                onClick={() => setOpen(false)}
              >
                Home
              </NavLink>

              <NavLink
                to="/users"
                className="py-1 text-gray-300 hover:text-blue-400"
                onClick={() => setOpen(false)}
              >
                Users
              </NavLink>

              <NavLink
                to="/users/add"
                className="py-1 text-gray-300 hover:text-blue-400"
                onClick={() => setOpen(false)}
              >
                Add User
              </NavLink>
            </div>
          </nav>
        )}
      </header>

      {/* PAGE CONTENT */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
