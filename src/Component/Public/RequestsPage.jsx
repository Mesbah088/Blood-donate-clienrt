import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("http://localhost:3000/donation-requests"); // backend route
        if (!res.ok) throw new Error("Failed to fetch donation requests");
        const data = await res.json();

        // শুধু pending requests দেখাবে
        const pending = data.filter((req) => req.donationStatus === "pending");
        setRequests(pending);
      } catch (err) {
        console.error("Error fetching donation requests:", err);
        setError("Failed to load donation requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-20">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-red-600">
        🩸 Active Donation Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No active requests right now.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-red-600 mb-2">
                {req.recipientName}
              </h3>
              <p className="text-gray-700">
                <strong>Blood Group:</strong> {req.bloodGroup}
              </p>
              <p className="text-gray-700">
                <strong>Location:</strong> {req.recipientDistrict}, {req.recipientUpazila}
              </p>
              <p className="text-gray-700">
                <strong>Hospital:</strong> {req.hospitalName || "Not specified"}
              </p>
              <p className="text-gray-700">
                <strong>Date:</strong>{" "}
                {req.donationDate
                  ? new Date(req.donationDate).toLocaleDateString()
                  : "N/A"}{" "}
                <br />
                <strong>Time:</strong> {req.donationTime || "N/A"}
              </p>
              <button
                onClick={() => navigate(`/donation-request/${req._id}`)}
                className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
              >
                Donate Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestsPage;
