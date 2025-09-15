import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import { Users, List, FileText, LogOut, Settings, Menu, X } from "lucide-react";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Mobile Navbar */}
      <div className="flex items-center justify-between bg-white px-4 py-3 shadow-md md:hidden">
        <h2 className="text-xl font-bold text-emerald-600">Admin Panel</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-white shadow-md px-6 py-8 space-y-6`}
      >
        <div className="hidden md:block text-2xl font-bold text-emerald-600">
          Admin Panel
        </div>

        <nav className="flex flex-col space-y-4">
          <Link
            to="/dashboard/admin/users"
            className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600"
          >
            <Users className="h-5 w-5" />
            <span>Manage Users</span>
          </Link>
          <Link
            to="/dashboard/admin/requests"
            className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600"
          >
            <List className="h-5 w-5" />
            <span>Blood Requests</span>
          </Link>
          <Link
            to="/dashboard/admin/blogs"
            className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600"
          >
            <FileText className="h-5 w-5" />
            <span>Manage Blogs</span>
          </Link>
          <Link
            to="/dashboard/admin/settings"
            className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600"
          >
            <Settings className="h-5 w-5" />
            <span>Site Settings</span>
          </Link>
          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-700 hover:text-red-500"
          >
            <LogOut className="h-5 w-5" />
            <span>Exit Dashboard</span>
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
