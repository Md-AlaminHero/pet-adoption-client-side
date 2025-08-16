import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaBars,
  FaHome,
  FaBookOpen,
  FaPlusCircle,
  FaFolderOpen,
  FaTimes,
} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import ToggleTheme from "../../Shared/ToggleTheme/ToggleTheme";

const UserDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden absolute top-4 left-4 z-50 text-white bg-gray-800 p-2 rounded"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:flex transition-transform duration-300`}
      >
        <div className="flex flex-col h-full">
          {/* Close Button (Mobile Only) */}
          <div className="md:hidden flex justify-end p-4">
            <button onClick={() => setIsSidebarOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-4">
            <div className="flex justify-between items-center">
              <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FaHome />
              Home
            </NavLink>
            <ToggleTheme></ToggleTheme>
            </div>

            <NavLink
              to="profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <CgProfile />
              Profile
            </NavLink>

            <NavLink
              to="add-pet"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FaBookOpen />
              Add a pet
            </NavLink>

            <NavLink
              to="my-pets"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FaPlusCircle />
              My added pets
            </NavLink>

            <NavLink
              to="create-donation-campaign"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FaFolderOpen />
              Create Donation Campaign
            </NavLink>
            <NavLink
              to="my-campaign"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FaFolderOpen />
              My Donation Campaigns
            </NavLink>
            
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6  overflow-auto w-full md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
