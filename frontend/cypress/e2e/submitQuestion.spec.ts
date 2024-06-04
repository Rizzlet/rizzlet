describe("GIVEN a user has a question they want to submit", () => {
  beforeEach(() => {
    cy.request({
      method: "POST",
      url: "/api/auth/google/refresh",
      body: {
        refreshToken: Cypress.env("googleRefreshToken"),
      },
    }).then((response) => {
      const { id } = response.body;
      localStorage.setItem("authUserId", id);
      localStorage.setItem("token", response.headers["x-token-set"] as string);
    });
  });

  it("WHEN the user is on the submit question tab in the dashboard", () => {});

  it("THEN the user should be able to fill out the question and clear the form", () => {
    cy.visit("http://127.0.0.1:3000");
    cy.get("ul > li > a").eq(1).click();
    // make sure csc309 class is there and the first class
    cy.get("div[class=m-5] > a").click();
    cy.get("button").eq(8).click();

    cy.get("select").should("be.visible").select("Multiple Choice");

    //fills in question
    cy.get("input[id=question]").type("Which one is the right answer?");

    // gets the first checkbox
    cy.get("input[type=checkbox]").eq(0).check();

    // fills in answer field

    cy.get("input[id=answer0]").type("This is the right answer");
    cy.get("input[id=answer1]").type("This is the wrong answer");
    cy.get("input[id=answer2]").type("This is definitely the wrong answer");
    cy.get("input[id=answer3]").type("This is not the right answer");
    cy.intercept("POST", "/api/question").as("postQuestion");
    cy.get("button[type=submit]").click();
    cy.wait("@postQuestion").then((res) => {
      cy.get("input[id=question]").should("have.value", "");
    });
  });
});
