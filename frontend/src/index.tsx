import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import {QuestionForm} from "./SubmitQuestion";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <App />,
    element: <QuestionForm />,
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
