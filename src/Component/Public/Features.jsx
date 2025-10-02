import React from "react";
import { Users, Droplet, Heart } from "lucide-react";

const featuresData = [
  {
    id: 1,
    icon: <Users className="w-12 h-12 text-red-600 mx-auto mb-4" />,
    title: "10K+ Donors",
    description: "Active registered blood donors",
  },
  {
    id: 2,
    icon: <Droplet className="w-12 h-12 text-red-600 mx-auto mb-4" />,
    title: "5K+ Donations",
    description: "Successful donations completed",
  },
  {
    id: 3,
    icon: <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />,
    title: "Thousands Saved",
    description: "Lives touched with your help",
  },
];

const Features = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 text-center">
      {/*  Main Title */}
      <h2 className="text-3xl font-bold mb-10">Features</h2>

      {/*  Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuresData.map((feature) => (
          <div
            key={feature.id}
            className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition-all"
          >
            {feature.icon}
            <h3 className="text-xl text-teal-500 font-bold">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
