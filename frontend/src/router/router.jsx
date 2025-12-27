import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Agents from "../pages/Agents";
import PropertiesList from "../pages/PropertiesList";
import PropertyDetails from "../pages/PropertyDetails";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Login from "../pages/Login";
import UpdateProfile from "../pages/UpdateProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "agents",
        element: <Agents />,
      },
      {
        path: "properties-list",
        element: <PropertiesList />,
      },
      {
        path: "property/:id",
        element: <PropertyDetails />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path:  '/profile/update',
        element: <UpdateProfile />
      }
    ],
  },
]);

export default router;
