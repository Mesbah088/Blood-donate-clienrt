import React from "react";
import { Link } from "react-router";

const CTASection = () => {
  return (
    <section className="bg-red-600 text-white py-16 text-center">
      <h2 className="text-3xl font-bold mb-6">Be a Hero. Donate Blood.</h2>
      <p className="mb-8">Register now and help save lives today.</p>
      <Link
        to="/register"
        className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
      >
        Get Started
      </Link>
    </section>
  );
};

export default CTASection;
