import axios from "axios";
import React, { createContext, useContext, useEffect } from "react";

const AuthContext = createContext<AuthState | null>(null);

type AuthState = {
  authUserFullName: string;
  setAuthUserFullName: React.Dispatch<React.SetStateAction<string>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  profileColor: string;
  updateProfileColor: (color: string) => void;
  authUserId: string;
  setAuthUserId: React.Dispatch<React.SetStateAction<string>>;
  streak: number | null;
};

interface StreakResponse {
  streak: number;
}

export function AuthProvider({
  children,
}: {
  children: React.ReactNode | null;
}) {
  const [authUserFullName, setAuthUserFullName] = React.useState<string>(
    localStorage.getItem("fullName") || ""
  );
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    document.cookie.includes("token")
  );

  if (!localStorage.getItem("profileColor")) {
    localStorage.setItem(
      "profileColor",
      "#" + Math.floor(Math.random() * 16777215).toString(16)
    );
  }

  const [profileColor, setProfileColor] = React.useState<string>(
    localStorage.getItem("profileColor") ?? "#000000"
  );

  const updateProfileColor = (color: string) => {
    localStorage.setItem("profileColor", color);
    setProfileColor(color);
  };

  const [authUserId, setAuthUserId] = React.useState<string>(
    localStorage.getItem("authUserId") || ""
  );

  const [streak, setStreak] = React.useState<number | null>(null)

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        if (!isLoggedIn) {
          console.log('User not logged in.');
        }
        else {
          const url = new URL(`/api/user/streak`, process.env.REACT_APP_BACKEND_URL!);
          const response = await axios.get<StreakResponse>(url.href, {
            withCredentials: true,
          });
          setStreak(response.data.streak);
        }
      } catch (error) {
        console.error('Error fetching streak:', error);
      }
    };

    if (isLoggedIn) {
      fetchStreak();
    }
  }, [authUserId, isLoggedIn]);

  const value: AuthState = {
    authUserFullName,
    setAuthUserFullName,
    isLoggedIn,
    setIsLoggedIn,
    profileColor,
    updateProfileColor,
    authUserId,
    setAuthUserId,
    streak,
  };

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const maybeAuth = useContext(AuthContext);

  if (!maybeAuth) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  console.log(`Color: ${maybeAuth.profileColor}`);

  return maybeAuth;
}
