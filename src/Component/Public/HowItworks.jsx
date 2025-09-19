import React from "react";
import { Search, Users, Droplet } from "lucide-react";

const stepsData = [
  {
    id: 1,
    icon: <Search className="w-10 h-10 text-red-600 mx-auto mb-4" />,
    title: "Search Donors",
    description: "Find nearby donors easily",
  },
  {
    id: 2,
    icon: <Users className="w-10 h-10 text-red-600 mx-auto mb-4" />,
    title: "Register",
    description: "Become a part of our community",
  },
  {
    id: 3,
    icon: <Droplet className="w-10 h-10 text-red-600 mx-auto mb-4" />,
    title: "Donate Blood",
    description: "Save lives through donation",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 text-center">
      <h2 className="text-3xl text-teal-500 font-bold mb-10">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stepsData.map((step) => (
          <div
            key={step.id}
            className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition-all"
          >
            {step.icon}
            <h4 className="text-lg text-teal-500 font-semibold">{step.title}</h4>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
