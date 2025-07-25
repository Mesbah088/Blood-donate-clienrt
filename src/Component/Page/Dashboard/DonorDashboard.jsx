import React from 'react';
import { Link, Outlet } from 'react-router';
import { HeartHandshake, PlusCircle, FileText, LogOut, User } from 'lucide-react';

const DonorDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r px-6 py-8 shadow-md">
        <div className="text-2xl font-bold text-red-600 mb-6">Donor Panel</div>

        <nav className="flex flex-col space-y-4 text-gray-700 font-medium">
          <Link to="/dashboard/donor/profile" className="flex items-center gap-2 hover:text-red-600">
            <User className="w-5 h-5" /> Profile
          </Link>
          <Link to="/dashboard/donor/my-donations" className="flex items-center gap-2 hover:text-red-600">
            <HeartHandshake className="w-5 h-5" /> My Donations
          </Link>
          <Link to="/dashboard/donor/create-request" className="flex items-center gap-2 hover:text-red-600">
            <PlusCircle className="w-5 h-5" /> Create Donation Request
          </Link>
          <Link to="/dashboard/donor/blogs" className="flex items-center gap-2 hover:text-red-600">
            <FileText className="w-5 h-5" /> My Blogs
          </Link>
          <Link to="/" className="flex items-center gap-2 hover:text-red-500">
            <LogOut className="w-5 h-5" /> Exit Dashboard
          </Link>
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DonorDashboard;
