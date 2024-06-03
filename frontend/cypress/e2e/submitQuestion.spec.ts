describe("GIVEN a user has a question they want to submit", () => {
  it("WHEN the user is on the submit question tab in the dashboard", () => {
    cy.request({
      method: "POST",
      url: "/api/auth/google/refresh",
      body: {
        refreshToken: Cypress.env("googleRefreshToken"),
      },
    }).then((response) => {
      const { id } = response.body;
      localStorage.setItem("authUserId", id);
      // localStorage.setItem("token", response.header("X-"));

      // cy.intercept("GET", "/api/**", {
      //   headers: { Authorization: `Bearer ${xtoken}` },
      // }).as("addAuth");

      // cy.visit("http://127.0.0.1:3000/", {
      //   headers: {
      //     authorization: `Bearer ${xtoken}`,
      //   },
      // });

      // cy.request({
      //   method: "GET",
      //   url: "/api/user/streak",
      //   headers: { Authorization: `Bearer ${xtoken}` },
      // }).then((response) => {
      //   console.log(response.body);
      // });
    });
  });
});
