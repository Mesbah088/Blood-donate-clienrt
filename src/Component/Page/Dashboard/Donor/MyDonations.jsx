import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/authprovider";

const MyDonations = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://blood-donate-server-two.vercel.app/donation-requests?requesterEmail=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setRequests(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching donation requests:", err);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-red-600">
        🩸 My Donation Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t created any requests yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200 rounded-lg shadow">
            <thead>
              <tr className="bg-red-600 text-white">
                <th className="px-4 py-2 text-left">Recipient</th>
                <th className="px-4 py-2 text-left">Blood Group</th>
                <th className="px-4 py-2 text-left">Hospital</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{req.recipientName}</td>
                  <td className="px-4 py-2">{req.bloodGroup}</td>
                  <td className="px-4 py-2">{req.hospitalName}</td>
                  <td className="px-4 py-2">
                    {new Date(req.donationDate).toLocaleDateString()} <br />
                    <span className="text-sm text-gray-500">{req.donationTime}</span>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        req.donationStatus === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : req.donationStatus === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {req.donationStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => alert(`Edit ${req._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={async () => {
                        if (window.confirm("Are you sure you want to delete this request?")) {
                          const res = await fetch(`https://blood-donate-server-two.vercel.app/donation-requests/${req._id}`, {
                            method: "DELETE",
                          });
                          if (res.ok) {
                            setRequests((prev) => prev.filter((r) => r._id !== req._id));
                          }
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyDonations;
