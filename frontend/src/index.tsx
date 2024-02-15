import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {UserInput} from "./TakeUserInput";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/submitQuestion",
    element: <UserInput />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
