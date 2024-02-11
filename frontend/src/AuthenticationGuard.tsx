import {
  createSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate(
        {
          pathname: "/login",
          search: createSearchParams({
            from: location.pathname,
          }).toString(),
        },
        { replace: true }
      );
    }
  }, [auth.isLoggedIn, navigate, location]);

  return <>{children}</>;
}
