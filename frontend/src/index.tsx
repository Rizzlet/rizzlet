import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ClassSearch from "./ClassSearch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/classSearch",
    element: <ClassSearch />,
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);


