import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuth } from "../context/auth/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type BackendLoginResponse = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  sub: string;
};

const DEFAULT_ROUTE_AFTER_LOGIN = "/";

export default function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const locationToGoTo =
      new URLSearchParams(window.location.search).get("from") ||
      DEFAULT_ROUTE_AFTER_LOGIN;

    if (auth.isLoggedIn) {
      navigate(locationToGoTo, { replace: true });
    }
  }, [auth.isLoggedIn, navigate]);

  
  const handleSuccess = (credentialResponse: CodeResponse) => {
    const authorizationCode = credentialResponse.code;

    // Set the token in local storage so we can persist reload
    axios
      .post(
        new URL("/api/auth/google", process.env.REACT_APP_BACKEND_URL!).href,
        { authorizationCode },
        { withCredentials: true }
      )
      .then((response) => {
        const data = response.data as BackendLoginResponse;

        console.log("Logged in!", response.data);
        auth.setIsLoggedIn(true);

        auth.setAuthUserFullName(`${data.firstName} ${data.lastName}`);
        localStorage.setItem("fullName", `${data.firstName} ${data.lastName}`);

        // auth.setAuthUserId(`${data.id}`);
        // localStorage.setItem("authUserId", data.id);
        //set userID as mongoDB id
        // axios.get('/api/user/curUser') 
        // .then(userResponse => {
        //   const userData = userResponse.data;
        //   auth.setAuthUserId(userData.googleUserId);
        //   localStorage.setItem("authUserId", userData.googleUserId);
        //   console.log("AUTHuserData", userData);
        // })


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

  // return
  return (
    <section className="bg-white">
      <div className="lg:py-100 top-20 mx-auto flex flex-col items-center justify-center px-6 py-8 pb-12">
        <a
          href="/"
          className="mb-6 flex items-center text-2xl font-semibold text-gray-900"
        >
          <img
            className="mr-2 h-8 w-8"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Rizzlet
        </a>
        <div className="w-full  rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in or Register
            </h1>
            <hr className="bg- " />
            <div className="flex items-center justify-center">
              <button
                className="flex items-center rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-800 shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={() => login()}
              >
                <svg
                  className="mr-2 h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="800px"
                  height="800px"
                  viewBox="-0.5 0 48 48"
                  version="1.1"
                >
                  {" "}
                  <title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
                  <defs> </defs>{" "}
                  <g
                    id="Icons"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    {" "}
                    <g
                      id="Color-"
                      transform="translate(-401.000000, -860.000000)"
                    >
                      {" "}
                      <g
                        id="Google"
                        transform="translate(401.000000, 860.000000)"
                      >
                        {" "}
                        <path
                          d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                          id="Fill-1"
                          fill="#FBBC05"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                          id="Fill-2"
                          fill="#EB4335"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                          id="Fill-3"
                          fill="#34A853"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                          id="Fill-4"
                          fill="#4285F4"
                        >
                          {" "}
                        </path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
