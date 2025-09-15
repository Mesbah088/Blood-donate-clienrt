import { Link, NavLink, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider/authprovider";
import { LogOut, Menu, X } from "lucide-react";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDashboardOpen, setMobileDashboardOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Logout error:", err);
        toast.error("Logout failed");
      });
  };

  const navLinks = (
    <>
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/donation-requests" className="nav-link">
        Donation Requests
      </NavLink>
      <NavLink to="/blogs" className="nav-link">
        Blogs
      </NavLink>

      {user && (
        <>
          {/* Dashboard Dropdown (Desktop) */}
          <div className="relative group hidden md:block">
            <span className="nav-link cursor-pointer">Dashboard</span>
            <div className="absolute left-0 mt-0 hidden group-hover:block bg-white shadow-lg rounded-md w-56 z-50">
              <Link
                to="/dashboard-admin"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Admin Dashboard
              </Link>
              <Link
                to="/dashboard-donor"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Donor Dashboard
              </Link>
              <Link
                to="/dashboard-volunteer"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Volunteer Dashboard
              </Link>
            </div>
          </div>

          {/* Dashboard Dropdown (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileDashboardOpen(!mobileDashboardOpen)}
              className="nav-link flex justify-between w-full"
            >
              Dashboard
              <span>{mobileDashboardOpen ? "▲" : "▼"}</span>
            </button>
            {mobileDashboardOpen && (
              <div className="ml-4 flex flex-col gap-2">
                <Link
                  to="/dashboard/admin"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
                <Link
                  to="/dashboard/donor"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Donor Dashboard
                </Link>
                <Link
                  to="/dashboard/volunteer"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Volunteer Dashboard
                </Link>
              </div>
            )}
          </div>

          <NavLink to="/funding" className="nav-link">
            Funding
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <header className="shadow sticky top-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-red-600 flex items-center gap-2"
        >
          🩸 BloodConnect
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          {navLinks}
          {user ? (
            <div className="relative group">
              <img
                src={user.photoURL || "https://i.ibb.co/2nzwRr8/default-avatar.png"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-red-500 cursor-pointer"
              />
              <div className="absolute right-0 mt-0 bg-white shadow-lg rounded-md w-48 hidden group-hover:block transition-all duration-200 z-50">
                <Link
                  to="/dashboard/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-red-600"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6 text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="flex flex-col gap-3 p-4 text-gray-900 font-medium">
            {navLinks}
            {user ? (
              <>
                <Link to="/dashboard/profile" className="nav-link">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-red-500 text-white px-4 py-2 rounded text-center hover:bg-red-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
