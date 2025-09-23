import {
  createBrowserRouter

} from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import ErrorPage from "../MainLayout/Errorpage";
import Home from "../Public/Home";
import Login from "../Page/Login";
import Register from "../Page/Register";
import AdminDashboard from "../Page/Dashboard/Admin/AdminDashboard";
import DonorDashboard from "../Page/Dashboard/Donor/DonorDashboard";
import BlogPage from "../Public/BlogPage";
import BlogDetails from "../Public/BlogDetails";
import SearchPage from "../Public/SearchPage";
import VolunteerDashboard from "../Page/Dashboard/VolunteerDashboard";
import RequestsPage from "../Public/RequestsPage";
import ManageUsers from "../Page/Dashboard/Admin/ManageUsers";
import BloodRequests from "../Page/Dashboard/Admin/BloodRequests";
import DonorProfile from "../Page/Dashboard/Donor/DonorProfile";
import MyDonations from "../Page/Dashboard/Donor/MyDonations";
import CreateDonationRequest from "../Page/Dashboard/Donor/CreateDonationRequest";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
        {
        path: "/blogs",
        element: <BlogPage/>
      },
        {
       path: "/blogs/:id",
        element: <BlogDetails/>
      },
      {
        path:"/donation-requests",
        element: <RequestsPage/>
      },
    
      {
        path: "/dashboard/admin",
        element: <AdminDashboard/>,
        children : [
      { path: "users", element: <ManageUsers /> },
      { path: "requests", element: <BloodRequests/> },
      //{ path: "blogs", element: <ManageBlogs /> },
      //{ path: "settings", element: <SiteSettings /> },
    ],
      },
      {
        path: "/dashboard/donor",
        element: <DonorDashboard/>,
        children: [
          {path: "profile", element: <DonorProfile />},
          {path: "my-donations", element: <MyDonations/>},
          {path: "create-request", element: <CreateDonationRequest/>}
        ],

      },
      {
        path: "/dashboard/volunteer",
        element: <VolunteerDashboard/>
      },
    
    ]

  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  

]);