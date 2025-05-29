import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";

import "./main.css"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        // errorElement: <ErrorPage/>,
        children: [
            {
                path:"login",
                element: <Login></Login>
            },
            {
                path: "/",
                element: <MainPage/>
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
