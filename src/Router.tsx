import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Animals } from "./pages/Animals";
import { Animal } from "./pages/Animal";

export const router = createBrowserRouter ([
    {
        path: "/",
        element: <Layout></Layout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/about",
                element: <About></About>,
            },
            {
                path: "/animals",
                element: <Animals></Animals>,
            },
            {
                path: "/animal/:id",
                element: <Animal></Animal>,
            },
        ],
    },
]);