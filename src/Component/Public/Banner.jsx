import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-red-100 py-16 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-red-700 mb-6">
        Save Lives, Be a Blood Donor
      </h1>

      <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
        <button
          onClick={() => navigate("/register")}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full transition"
        >
          Join as a Donor
        </button>
        <button
          onClick={() => navigate("/search")}
          className="bg-white border border-red-600 hover:bg-red-50 text-red-600 font-semibold py-2 px-6 rounded-full transition"
        >
          Search Donors
        </button>
      </div>
    </div>
  );
};

export default Banner;
