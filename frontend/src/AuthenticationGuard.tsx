// import { createContext, useContext } from "react";

// const AuthContext = createContext<null | any>(localStorage.getItem("token"));

// export const useAuthContext = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuthContext must be used within an AuthProvider");
//   }
//   return context;
// };

// // AUth stored as a JWT in a cookie
// const AuthProvider = ({ children }) => {
//   return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
// };

export {};
