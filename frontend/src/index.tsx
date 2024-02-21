import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserInput } from "./TakeUserInput";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ClassSearch from "./ClassSearch";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./Login";
import { AuthProvider } from "./AuthContext";
import { AuthGuard } from "./AuthenticationGuard";
import FlashcardField from "./components/questionRender";

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
    element: <UserInput />,
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
