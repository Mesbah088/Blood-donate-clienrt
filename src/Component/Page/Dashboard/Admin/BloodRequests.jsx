import React, { useEffect, useState } from "react";

export default function BloodRequests() {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // সব রিকোয়েস্ট লোড করা
  useEffect(() => {
    fetch("https://blood-donate-server-two.vercel.app/donation-requests") // ✅ ঠিক করা হলো
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading requests:", err);
        setLoading(false);
      });
  }, []);

  // Action handler (status change)
  const handleAction = async (id, donationStatus) => {
    const res = await fetch(
      `https://blood-donate-server-two.vercel.app/donation-requests/status/${id}`, // ✅ ঠিক করা হলো
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ donationStatus }),
      }
    );

    if (res.ok) {
      const updated = requests.map((r) =>
        r._id === id ? { ...r, donationStatus } : r
      );
      setRequests(updated);
    }
  };

  // Filter করা
  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter((r) => r.donationStatus === filter);

  if (loading) return <div className="p-6">Loading blood requests...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl text-emerald-500 font-semibold">Manage Blood Requests</h1>
        <select
          className="border px-3 py-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="inprogress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-cyan-500 rounded-xl shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left text-gray-600">
            <tr>
              <th className="p-3">Recipient</th>
              <th className="p-3">Blood Group</th>
              <th className="p-3">Location</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((r) => (
              <tr key={r._id} className="border-t">
                <td className="p-3">{r.recipientName}</td>
                <td className="p-3">{r.bloodGroup}</td>
                <td className="p-3">{r.hospitalName}</td>
                <td className="p-3">
                  {new Date(r.donationDate).toLocaleDateString()}
                </td>
                <td className="p-3 capitalize">{r.donationStatus}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleAction(r._id, "approved")}
                    className="px-2 py-1 text-xs border rounded hover:bg-gray-100"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(r._id, "inprogress")}
                    className="px-2 py-1 text-xs border rounded hover:bg-gray-100"
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => handleAction(r._id, "completed")}
                    className="px-2 py-1 text-xs border rounded hover:bg-gray-100"
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => handleAction(r._id, "cancelled")}
                    className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-400">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
