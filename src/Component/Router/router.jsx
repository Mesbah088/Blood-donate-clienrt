import {
  createBrowserRouter

} from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import ErrorPage from "../MainLayout/Errorpage";
import Home from "../Public/Home";
import Login from "../Page/Login";
import Register from "../Page/Register";
import AdminDashboard from "../Page/Dashboard/AdminDashboard";
import DonorDashboard from "../Page/Dashboard/DonorDashboard";
import BlogPage from "../Public/BlogPage";
import BlogDetails from "../Public/BlogDetails";
import SearchPage from "../Public/SearchPage";

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
        path: "/search" ,
        element: <SearchPage/>

      },
      {
        path: "/dashboard",
        element: <AdminDashboard/>
      },
      {
        path: "/dashboard",
        element: <DonorDashboard/>
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
  }

]);