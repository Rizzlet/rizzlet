import React, { createContext, useContext } from "react";

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
};

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

  const value: AuthState = {
    authUserFullName,
    setAuthUserFullName,
    isLoggedIn,
    setIsLoggedIn,
    profileColor,
    updateProfileColor,
    authUserId,
    setAuthUserId,
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
