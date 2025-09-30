import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/authprovider";
import Swal from "sweetalert2";

const DonorProfile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // District → Upazila mapping
  const districtData = {
    Dhaka: ["Mirpur", "Savar", "Uttara", "Dhanmondi"],
    Chattogram: ["Patenga", "Pahartali", "Halishahar", "Rangunia"],
    Khulna: ["Batiaghata", "Dumuria", "Phultala"],
    Rajshahi: ["Godagari", "Paba", "Bagha"],
    Sylhet: ["Beanibazar", "Golapganj", "Jaintiapur"],
  };

  const districts = Object.keys(districtData);

  // Backend থেকে user data আনবো
  useEffect(() => {
    if (user?.email) {
      fetch(`https://blood-donate-server-two.vercel.app/donor/profile/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?._id) {
            setFormData(data);
          } else {
            // যদি DB তে না থাকে
            setFormData({
              name: user.displayName || "",
              email: user.email,
              bloodGroup: "",
              district: "",
              upazila: "",
              phone: "",
              lastDonationDate: "",
              role: "donor",
              status: "active",
            });
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
          setLoading(false);
        });
    }
  }, [user]);

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // যদি district change হয় → upazila reset
    if (name === "district") {
      setFormData({ ...formData, district: value, upazila: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Save changes
  const handleSave = async () => {
    try {
      const res = await fetch(
        `https://blood-donate-server-two.vercel.app/donor/profile/${formData.email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        Swal.fire("✅ Success", "Profile updated successfully!", "success");
        setEditing(false);
      } else {
        Swal.fire("❌ Error", "Failed to update profile", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "Something went wrong!", "error");
    }
  };

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500 animate-pulse">
        ⏳ Loading profile...
      </div>
    );

  if (!formData.email)
    return (
      <div className="text-center py-10 text-red-500">
        ⚠️ No user data available
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-red-600 mb-6">🩸 My Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <input
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            readOnly={!editing}
            className={`mt-1 w-full border rounded-lg px-3 py-2 ${
              !editing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            }`}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            name="email"
            value={formData.email || ""}
            readOnly
            className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Phone</label>
          <input
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            readOnly={!editing}
            className={`mt-1 w-full border rounded-lg px-3 py-2 ${
              !editing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            }`}
          />
        </div>

        {/* Blood Group Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Blood Group
          </label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup || ""}
            onChange={handleChange}
            disabled={!editing}
            className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
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

        {/* District Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            District
          </label>
          <select
            name="district"
            value={formData.district || ""}
            onChange={handleChange}
            disabled={!editing}
            className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
          >
            <option value="">Select</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Upazila Dropdown (depends on District) */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Upazila
          </label>
          <select
            name="upazila"
            value={formData.upazila || ""}
            onChange={handleChange}
            disabled={!editing || !formData.district}
            className="mt-1 w-full border rounded-lg px-3 py-2 bg-white"
          >
            <option value="">Select</option>
            {formData.district &&
              districtData[formData.district]?.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
          </select>
        </div>

        {/* Last Donation Date */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Last Donation Date
          </label>
          <input
            type="date"
            name="lastDonationDate"
            value={formData.lastDonationDate || ""}
            onChange={handleChange}
            readOnly={!editing}
            className={`mt-1 w-full border rounded-lg px-3 py-2 ${
              !editing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            }`}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-3">
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition"
          >
            ✏️ Edit Profile
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
            >
              💾 Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-500 transition"
            >
              ❌ Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DonorProfile;
