import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import WelcomePage from "./pages/WelcomePage";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import MainPage from "./pages/MainPage";
import LoggedInLayout from "./components/LoggedInLayout";
import Upload from "./pages/Upload";
import PropertyView from "./pages/PropertyView";

import "./main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <WelcomePage />,
      },
    ],
  },
  {
    path: "/main",
    element: <LoggedInLayout />,
    // errorElement: <ErrorPage/>,
    children: [
      {
        path: "/main",
        element: <MainPage />,
      },
      {
        path: "/main/upload",
        element: <Upload></Upload>,
      },
      {
        path: "/main/property/:id",
        element: <PropertyView></PropertyView>
      },
    ],
  },
  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "registration",
    element: <Registration></Registration>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);
