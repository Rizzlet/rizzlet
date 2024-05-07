import { addAnsweredQuestion, checkAnswered } from "./answeredQuestion";

test("can add answered question", async () => {
  await addAnsweredQuestion(
    "65e2688f29d9685a38616ee5",
    "65e2688f29d9685a38616ee6",
  );

  expect(
    await checkAnswered("65e2688f29d9685a38616ee5", "65e2688f29d9685a38616ee6"),
  ).toBe(true);

  expect(
    await checkAnswered("25e2688f29d9685a38616ee5", "65e2688f29d9685a38616ee6"),
  ).toBe(false);

  expect(
    await checkAnswered("65e2688f29d9685a38616ee5", "25e2688f29d9685a38616ee6"),
  ).toBe(false);
});
