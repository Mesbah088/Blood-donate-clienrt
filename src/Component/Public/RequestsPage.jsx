import { useEffect, useState } from "react";

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/donation-requests") // ✅ তোমার backend route হবে
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching donation requests:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">
        Active Donation Requests
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
                {req.patientName}
              </h3>
              <p className="text-gray-700">
                <strong>Blood Group:</strong> {req.bloodGroup}
              </p>
              <p className="text-gray-700">
                <strong>Location:</strong> {req.location}
              </p>
              <p className="text-gray-700">
                <strong>Hospital:</strong> {req.hospital || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Date:</strong>{" "}
                {new Date(req.date).toLocaleDateString()}
              </p>
              <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
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
