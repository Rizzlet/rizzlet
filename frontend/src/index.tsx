import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/auth/AuthContext";
import { AuthGuard } from "./context/auth/AuthenticationGuard";

import ClassSearch from "./pages/ClassSearch";
import QuestionSubmission from "./pages/QuestionSubmission";
import App from "./pages/Homepage";
import Login from "./pages/Login";
import FlashcardField from "./pages/AnswerQuestion";
import Profilebar from "./components/Profilebar";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/classSearch",
    element: <ClassSearch />,
  },
  {
    path: "/submitQuestion",
    element: <QuestionSubmission />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/answerQuestion",
    element: (<div>
    <Profilebar/>
    <FlashcardField />
    </div>),
  },
  {
    path: "/protected",
    element: (
      <AuthGuard>
        <App />
      </AuthGuard>
    ),
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </AuthProvider>
  </React.StrictMode>
);
