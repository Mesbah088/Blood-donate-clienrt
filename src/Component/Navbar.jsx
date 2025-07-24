import { Link, NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider/authprovider";
import { LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch(err => console.error(err));
  };

  const navLinks = (
    <>
      <li><NavLink to="/" className="hover:text-red-600">Home</NavLink></li>
      <li><NavLink to="/donation-requests" className="hover:text-red-600">Donation Requests</NavLink></li>
      <li><NavLink to="/blogs" className="hover:text-red-600">Blogs</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/dashboard" className="hover:text-red-600">Dashboard</NavLink></li>
          <li><NavLink to="/funding" className="hover:text-red-600">Funding</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-red-600">
          🩸 BloodConnect
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 items-center font-medium text-gray-700">
          {navLinks}
          {user ? (
            <div className="relative group">
              <img
                src={user.photoURL || "https://i.ibb.co/2nzwRr8/default-avatar.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-red-500"
              />
              <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md hidden group-hover:block">
                <li className="px-4 py-2 hover:bg-gray-100 text-gray-800">
                  <Link to="/dashboard/profile">Profile</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 text-gray-800">
                  <button onClick={handleLogout} className="flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <li>
              <Link to="/login" className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600">
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <ul className="md:hidden px-4 pb-4 space-y-2 font-medium text-gray-700 bg-white shadow">
          {navLinks}
          {user ? (
            <>
              <li><Link to="/dashboard/profile">Profile</Link></li>
              <li>
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-600">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600 block text-center">
                Login
              </Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
