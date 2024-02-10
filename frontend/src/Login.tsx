import {
  CodeResponse,
  GoogleLogin,
  useGoogleLogin,
  useGoogleOneTapLogin,
} from "@react-oauth/google";
import axios from "axios";

export default function LoginPage() {
  const handleSuccess = (credentialResponse: CodeResponse) => {
    const authorizationCode = credentialResponse.code;

    axios
      .post(
        new URL("/api/auth/google", process.env.REACT_APP_BACKEND_URL!).href,
        { authorizationCode },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Logged in!", response.data);
      })
      .catch((error) => {
        console.error("Unable to contact backend for log in", error);
      });
  };

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: () => console.error("Error logging in"),
    flow: "auth-code",
  });

  return <button onClick={() => login()}>Sign in with Google</button>;
}
