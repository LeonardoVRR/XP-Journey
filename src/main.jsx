import { createBrowserRouter, RouterProvider } from "react-router";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./Pages/Home/App.jsx";
import CreateNewAccount from "./Pages/CreateNewAccount/CreateNewAccount.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateNewAccount />,
  },
  {
    path: "/home",
    element: <App />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
