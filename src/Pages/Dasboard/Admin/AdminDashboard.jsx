import React, { useState } from "react";
import { NavLink, Outlet } from "react-router"; // ✅ use react-router-dom
import {
  FaUsers,
  FaChalkboardTeacher,
  FaFolderOpen,
  FaHome,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden absolute top-4 left-4 z-50 text-white bg-blue-900 p-2 rounded"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-blue-900 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:flex transition-transform duration-300`}
      >
        <div className="flex flex-col h-full">
          {/* Close Button for Mobile */}
          <div className="md:hidden flex justify-end p-4">
            <button onClick={() => setIsSidebarOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-700 ${
                  isActive ? "bg-blue-700" : ""
                }`
              }
            >
              <FaHome />
              Home
            </NavLink>

            <NavLink
              to="/dashboard/admin/users"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-700 ${
                  isActive ? "bg-blue-700" : ""
                }`
              }
            >
              <FaUsers />
              View All Users
            </NavLink>

            <NavLink
              to="sessions"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-700 ${
                  isActive ? "bg-blue-700" : ""
                }`
              }
            >
              <FaChalkboardTeacher />
              View All Study Sessions
            </NavLink>

            <NavLink
              to="materials"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-700 ${
                  isActive ? "bg-blue-700" : ""
                }`
              }
            >
              <FaFolderOpen />
              View All Materials
            </NavLink>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto w-full md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
