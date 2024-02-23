import React, { createContext, useContext } from "react";

const AuthContext = createContext<AuthState | null>(null);

type AuthState = {
  authUserFullName: string;
  setAuthUserFullName: React.Dispatch<React.SetStateAction<string>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
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

  const value: AuthState = {
    authUserFullName,
    setAuthUserFullName,
    isLoggedIn,
    setIsLoggedIn,
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

  return maybeAuth;
}
