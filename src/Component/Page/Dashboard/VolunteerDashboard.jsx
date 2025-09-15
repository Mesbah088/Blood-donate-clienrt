import { Link, Outlet } from "react-router";
import { LogOut } from "lucide-react";

const VolunteerDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-red-600 text-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8">Volunteer Panel</h2>
          <nav className="flex flex-col gap-4">
            <Link
              to="/dashboard/volunteer/requests"
              className="hover:bg-red-500 px-3 py-2 rounded-md transition"
            >
              📋 Manage Requests
            </Link>
            <Link
              to="/dashboard/volunteer/donors"
              className="hover:bg-red-500 px-3 py-2 rounded-md transition"
            >
              🩸 Donor List
            </Link>
            <Link
              to="/dashboard/volunteer/events"
              className="hover:bg-red-500 px-3 py-2 rounded-md transition"
            >
              🎉 Events
            </Link>
          </nav>
        </div>

        {/* Logout */}
        <button className="flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded-md hover:bg-gray-100 transition">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
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
