import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../AuthProvider/authprovider";
import { useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: "",
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return Swal.fire("Error", "Passwords do not match!", "error");
    }

    try {
      const res = await createUser(formData.email, formData.password);
      await updateUserProfile(formData.name, formData.photo);

      // Store user in DB
      const newUser = {
        name: formData.name,
        email: formData.email,
        photo: formData.photo,
        bloodGroup: formData.bloodGroup,
        district: formData.district,
        upazila: formData.upazila,
        role: "donor",
        status: "active",
      };

      await axios.post("http://localhost:3000/users", newUser);

      Swal.fire("Success!", "Account created successfully!", "success");
      navigate("/dashboard/profile");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Register New Account</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="input input-bordered"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <input
            name="photo"
            type="url"
            placeholder="Photo URL"
            className="input input-bordered"
            value={formData.photo}
            onChange={handleChange}
          />
          <select
            name="bloodGroup"
            className="input input-bordered"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option><option value="A-">A-</option>
            <option value="B+">B+</option><option value="B-">B-</option>
            <option value="AB+">AB+</option><option value="AB-">AB-</option>
            <option value="O+">O+</option><option value="O-">O-</option>
          </select>
          <input
            name="district"
            type="text"
            placeholder="District"
            className="input input-bordered"
            value={formData.district}
            onChange={handleChange}
            required
          />
          <input
            name="upazila"
            type="text"
            placeholder="Upazila"
            className="input input-bordered"
            value={formData.upazila}
            onChange={handleChange}
            required
          />
          <div className="col-span-full">
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 font-medium hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
