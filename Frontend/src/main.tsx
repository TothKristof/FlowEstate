import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import WelcomePage from "./pages/WelcomePage";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import MainPage from "./pages/MainPage";

import "./main.css"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        // errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <WelcomePage />
            },
        ],
    },
    {
        path: "/content",
        element: <MainPage></MainPage>
    },
    {
        path: "login",
        element: <Login></Login>
    },
    {
        path: "registration",
        element: <Registration></Registration>
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
