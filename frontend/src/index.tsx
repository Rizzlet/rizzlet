import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/auth/AuthContext";
import { AuthGuard } from "./context/auth/AuthenticationGuard";

import MyClasses from "./pages/MyClasses";
import QuestionSubmission from "./pages/FormSubmitQuestions";
import Login from "./pages/Login";
import FlashcardField from "./pages/AnswerQuestion";
import NavBar from "./components/Navbar";
import HomePage from "./pages/Homepage";
import QuestionOverview from "./pages/QuestionOverviewBeta";
import ProfilePage from "./pages/ProfilePage";

import "./index.css";
import RatingPage from "./pages/RatingPage";
import LeaderBoard from "./pages/LeaderBoardPage";
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
        path: "/myclasses",
        element: (
          <AuthGuard>
            <MyClasses />
          </AuthGuard>
        ),
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
        children: [
          {
            path: "/answerQuestions",
            element: (
              <AuthGuard>
                <NoClasses />
              </AuthGuard>
            ),
          },
          {
            path: "/answerQuestions/:id",
            element: (
              <AuthGuard>
                <FlashcardField />
              </AuthGuard>
            ),
          },
        ],
      },
      {
        path: "/ratingSample",
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
      {
        path: "/leaderBoard",
        element: <LeaderBoard />,
      },
      {
        path: "/profilePage",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
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
