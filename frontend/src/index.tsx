

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
    path: "/questions/:id",
    element: < />,
  }
 {
  path: "/healthBar",
  element: <HealthBarPage />,
 },
 {
  path: "/timer",
  element: <TimerPage />,
 },
  {
    path: "/peoplePicker",
    element: (
      <AuthGuard>
        <PeoplePicker />
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
