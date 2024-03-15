import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/auth/AuthContext";
import { AuthGuard } from "./context/auth/AuthenticationGuard";

import ClassSearch from "./pages/ClassSearch";
import QuestionSubmission from "./pages/FormSubmitQuestions";
import Login from "./pages/Login";
import FlashcardField from "./pages/AnswerQuestion";
import NavBar from "./components/Navbar";
import HomePage from "./pages/Homepage";
import QuestionOverview from "./pages/QuestionOverview";
// import Page from "./components/Pagination";

import "./index.css";
import RatingPage from "./pages/RatingPage";
import NoClasses from "./pages/AnswerQuestionNoClasses";

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
        children: [
          {
            path: "/answerQuestion",
            element: (
              <AuthGuard>
                <NoClasses />
              </AuthGuard>
            ),
          },
          {
            path: "/answerQuestion/:id",
            element: (
              <AuthGuard>
                <FlashcardField />
              </AuthGuard>
            ),
          },
        ],
      },
      {
        path: "/protected",
        element: (
          <AuthGuard>
            <RatingPage />
          </AuthGuard>
        ),
      },
      {
        path: "/overview/:pageNumber",
        element: <QuestionOverview />,
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
