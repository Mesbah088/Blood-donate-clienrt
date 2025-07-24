import {
  createBrowserRouter

} from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import ErrorPage from "../MainLayout/Errorpage";
import Home from "../Page/Home";

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
    element: <Login></Login>
  },
  {
    path: '/register',
    element: <Register></Register>
  }

]);