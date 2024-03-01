import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/auth/AuthContext";
import { AuthGuard } from "./context/auth/AuthenticationGuard";

import ClassSearch from "./pages/ClassSearch";
import QuestionSubmission from "./pages/FormSubmitQuestions";
import App from "./pages/Homepage";
import Login from "./pages/Login";
import FlashcardField from "./pages/AnswerQuestion";
import NavBar from "./components/Navbar";
import HomePage from "./pages/Homepage";

import "./index.css";
import RateExamplePage from "./pages/RateExample";

const router = createBrowserRouter([
  {
    element: <NavbarWrapper />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/classSearch",
        element: <ClassSearch />,
      },
      {
        path: "/submitQuestion",
        element: (
          <AuthGuard>
            <QuestionSubmission />
          </AuthGuard>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/answerQuestion",
        element: <FlashcardField />,
      },
      {
        path: "/protected",
        element: (
          <AuthGuard>
            <RateExamplePage />
          </AuthGuard>
        ),
      },
    ],
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

function NavbarWrapper() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
