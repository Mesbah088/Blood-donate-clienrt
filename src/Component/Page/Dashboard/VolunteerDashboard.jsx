import { useState } from "react";
import { Link, Outlet } from "react-router";
import { LogOut, Menu, X } from "lucide-react";

const VolunteerDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-30 top-0 left-0 h-full md:h-auto w-64 bg-red-600 text-white shadow-lg p-6 flex flex-col justify-between transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div>
          <h2 className="text-2xl font-bold mb-8">Volunteer Panel</h2>
          <nav className="flex flex-col gap-4">
            <Link
              to="/dashboard/volunteer/requests"
              className="hover:bg-red-500 px-3 py-2 rounded-md transition"
              onClick={() => setIsOpen(false)}
            >
              📋 Manage Requests
            </Link>
            <Link
              to="/dashboard/volunteer/donors"
              className="hover:bg-red-500 px-3 py-2 rounded-md transition"
              onClick={() => setIsOpen(false)}
            >
              🩸 Donor List
            </Link>
            <Link
              to="/dashboard/volunteer/events"
              className="hover:bg-red-500 px-3 py-2 rounded-md transition"
              onClick={() => setIsOpen(false)}
            >
              🎉 Events
            </Link>
          </nav>
        </div>

        <button className="flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded-md hover:bg-gray-100 transition mt-4 md:mt-0">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 bg-red-600 text-white p-2 rounded-md shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-64 mt-16 md:mt-0">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome, Volunteer 👋
        </h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default VolunteerDashboard;
