import { Link } from "react-router";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-red-50 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2 space-y-6" data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl font-bold text-red-600 leading-tight">
              Donate Blood, Save Lives 🩸
            </h1>
            <p className="text-gray-700 text-lg">
              Join our life-saving community and help those in need. Become a donor or request blood today.
            </p>
            <div className="flex gap-4">
              <Link to="/register" className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
                Join as a Donor
              </Link>
              <Link to="/search" className="border border-red-600 text-red-600 px-6 py-2 rounded hover:bg-red-100">
                Search Donors
              </Link>
            </div>
          </div>
          <div className="md:w-1/2" data-aos="fade-left">
            <img
              src="https://i.ibb.co/J3XPvwL/blood-donation-hero.png"
              alt="Blood Donation Illustration"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-white px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center space-y-8" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-red-600">Why Donate Blood?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Save Lives</h3>
              <p>Each donation can save up to three lives. Be the hero someone is waiting for.</p>
            </div>
            <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p>Our platform connects thousands of donors with patients across the country.</p>
            </div>
            <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Track Your Impact</h3>
              <p>View your donation history, manage requests, and see the lives you've touched.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-red-50 px-4 md:px-8">
        <div className="max-w-4xl mx-auto" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">Contact Us</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder="Full Name" className="input" />
              <input type="email" placeholder="Email Address" className="input" />
            </div>
            <input type="text" placeholder="Subject" className="input w-full" />
            <textarea rows="5" placeholder="Your Message..." className="input w-full" />
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
            >
              Send Message
            </button>
          </form>
          <div className="text-center mt-6 text-gray-600">
            📞 Contact: +880 1234-567890
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="font-semibold text-white text-lg mb-2">BloodConnect</h4>
            <p>Connecting donors with those in need — together we can save lives.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white text-lg mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/donation-requests">Donation Requests</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white text-lg mb-2">Follow Us</h4>
            <ul className="space-y-2">
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">YouTube</a></li>
            </ul>
          </div>
        </div>
        <p className="text-center mt-6 text-sm text-gray-500">© {new Date().getFullYear()} BloodConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
