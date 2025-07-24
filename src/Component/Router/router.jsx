import {
  createBrowserRouter

} from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import ErrorPage from "../MainLayout/Errorpage";
import Home from "../Page/Home";
import Login from "../Page/Login";
import Register from "../Page/Register";

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