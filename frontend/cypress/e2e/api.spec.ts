describe("Game Item Fetching", () => {
  it("GIVEN the game page is selected", () => {});

  it("WHEN the game starts to load", () => {
    cy.request("/api/items").then((response) => {
      assert.isNotNull(response.body, "THEN it does not smoke");

      assert.equal(
        response.body[0].name,
        "Magic Wand",
        "AND it returns the magic wand"
      );

      assert.equal(
        response.body[1].name,
        "Flame Spell",
        "AND it returns the flame spell"
      );

      assert.equal(
        response.body[2].name,
        "Health Potion",
        "AND it returns the health potion"
      );

      assert.equal(
        response.body[3].name,
        "Damage Spell",
        "AND it returns the damage spell"
      );

      assert.equal(
        response.body[4].name,
        "Health Spell",
        "AND it returns the health spell"
      );
    });
  });
});

describe("Posting a class", () => {
  it("GIVEN there's a class we want to add", () => {});

  it("WHEN the class is formatted correctly", () => {
    const newClass = { name: "test class" };

    cy.request("POST", "/api/class", newClass).then((response) => {
      assert.equal(response.status, 201, "THEN a successful 201 postresponse");

      assert.exists(
        response.body.scores,
        "THEN it has an array of students in that class"
      );

      assert.equal(
        response.body.scores.length,
        0,
        "AND it has no students in it because it's an newly created class"
      );

      assert.exists(
        response.body.name,
        "AND it contains the name of the class that we want"
      );
    });
  });

  it("WHEN the class is formatted incorrectly", () => {
    const invalidClass = {};

    cy.request({
      method: "POST",
      url: "/api/class",
      body: invalidClass,
      failOnStatusCode: false,
    }).then((response) => {
      assert.equal(
        response.status,
        422,
        "THEN a 422 failed request due to invalid data"
      );
    });
  });
});
