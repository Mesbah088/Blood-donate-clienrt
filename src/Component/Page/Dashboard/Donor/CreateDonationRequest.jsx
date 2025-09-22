import { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider/authprovider";
import { useNavigate } from "react-router";

const CreateDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.email) {
      alert("⚠️ You must be logged in to create a request.");
      return;
    }

    const request = {
      ...formData,
      requesterName: user.displayName || "Unknown Donor",
      requesterEmail: user.email,
      donationStatus: "pending", // default
    };

    try {
      const res = await fetch("http://localhost:3000/donation-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });

      if (res.ok) {
        alert("✅ Donation request created successfully!");
        navigate("/dashboard/donor/my-donations");
      } else {
        alert("❌ Failed to create request.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-red-600">Create Donation Request</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Requester Info */}
        <div>
          <label className="block font-medium">Requester Name</label>
          <input
            value={user?.displayName || ""}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-medium">Requester Email</label>
          <input
            value={user?.email || ""}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        {/* Recipient */}
        <div>
          <label className="block font-medium">Recipient Name</label>
          <input
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* District & Upazila */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Recipient District</label>
            <input
              name="recipientDistrict"
              value={formData.recipientDistrict}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium">Recipient Upazila</label>
            <input
              name="recipientUpazila"
              value={formData.recipientUpazila}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Hospital */}
        <div>
          <label className="block font-medium">Hospital Name</label>
          <input
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
            placeholder="e.g. Dhaka Medical College"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Full Address */}
        <div>
          <label className="block font-medium">Full Address</label>
          <input
            name="fullAddress"
            value={formData.fullAddress}
            onChange={handleChange}
            placeholder="e.g. Zahir Raihan Rd, Dhaka"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="block font-medium">Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
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

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Donation Date</label>
            <input
              type="date"
              name="donationDate"
              value={formData.donationDate}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium">Donation Time</label>
            <input
              type="time"
              name="donationTime"
              value={formData.donationTime}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Request Message */}
        <div>
          <label className="block font-medium">Request Message</label>
          <textarea
            name="requestMessage"
            value={formData.requestMessage}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border rounded px-3 py-2"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          Create Request
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
