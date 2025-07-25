import { useContext } from "react";
import { Outlet } from "react-router";
import { AuthContext } from "../AuthProvider/authprovider";
import useUserRole from "../hooks/useUserRole";
import AdminDashboard from "./AdminDashboard";
import DonorDashboard from "./DonorDashboard";
import VolunteerDashboard from "./VolunteerDashboard";
import Loader from "../components/Shared/Loader";

const Dashboard = () => {
  const { useContext, loading } = useContext(AuthContext);
  const [role, roleLoading] = useUserRole(); // custom hook to fetch role

  if (loading || roleLoading) return <Loader />;

  return (
    <>
      {role === "admin" && <AdminDashboard />}
      {role === "donor" && <DonorDashboard />}
      {role === "volunteer" && <VolunteerDashboard />}
    </>
  );
};

export default Dashboard;
