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
import QuestionOverview from "./pages/QuestionOverview";
import ClassDashboard from "./pages/ClassDashboard";
import ProfilePage from "./pages/ProfilePage";

import "./index.css";
import RatingPage from "./pages/RatingPage";
import LeaderBoard from "./pages/LeaderBoardPage";
import NoClasses from "./pages/AnswerQuestionNoClasses";
import HealthBarPage from "./components/game/HealthBarPage";
import GamePage from "./components/game/gamePage";

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
            path: "/classDashboard/:id",
            element: (
              <AuthGuard>
                <ClassDashboard />
              </AuthGuard>
            ),
          },
        ],
      },
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
      {
        path: "/ratingSample",
        element: (
          <AuthGuard>
            <RatingPage />
          </AuthGuard>
        ),
      },
      {
        path: "/overview",
        element: <QuestionOverview />,
      },
      {
        path: "/leaderBoard/:classId",
        element: (
          <AuthGuard>
            <LeaderBoard />
          </AuthGuard>
        ),
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
  {
    path: "/healthBar",
    element: <HealthBarPage />,
  },
  {
    path: "/gamePage/:classId",
    element: (
      <AuthGuard>
        <GamePage />
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
function NavbarWrapper() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
