import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/authprovider"; // তোমার AuthProvider path

const DonorProfile = () => {
  const { user } = useContext(AuthContext); // Firebase + backend synced user
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // backend থেকে ইউজার ডাটা আনবো
  useEffect(() => {
    if (user && user.email) {
      fetch(`http://localhost:3000/users?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data._id) {
            setFormData(data);
          } else {
            // fallback যদি DB user না থাকে
            setFormData({
              name: user.displayName || "",
              email: user.email,
              bloodGroup: "",
              district: "",
              upazila: "",
            });
          }
          setLoading(false);
        });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formData._id) {
      alert("⚠️ User not found in database.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/users/${formData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ Profile updated successfully!");
        setEditing(false);
      } else {
        alert("❌ Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-10">Loading profile...</div>;
  if (!formData.email) return <div className="text-center py-10">⚠️ No user data available</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-red-600">My Profile</h2>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium">Name</label>
          <input
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            readOnly={!editing}
            className={`w-full border rounded px-3 py-2 ${
              !editing ? "bg-gray-100" : ""
            }`}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            name="email"
            value={formData.email || ""}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="block font-medium">Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup || ""}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border rounded px-3 py-2 bg-white"
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        {/* District */}
        <div>
          <label className="block font-medium">District</label>
          <input
            name="district"
            value={formData.district || ""}
            onChange={handleChange}
            readOnly={!editing}
            className={`w-full border rounded px-3 py-2 ${
              !editing ? "bg-gray-100" : ""
            }`}
          />
        </div>

        {/* Upazila */}
        <div>
          <label className="block font-medium">Upazila</label>
          <input
            name="upazila"
            value={formData.upazila || ""}
            onChange={handleChange}
            readOnly={!editing}
            className={`w-full border rounded px-3 py-2 ${
              !editing ? "bg-gray-100" : ""
            }`}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DonorProfile;
