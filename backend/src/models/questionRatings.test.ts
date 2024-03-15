import { addQuestionRating } from "./questionRatings";
import { jest } from "@jest/globals";

beforeEach(() => {
  jest.useFakeTimers();
});

test("create a class", () => {
  const run = async () => {
    expect(
      addQuestionRating(
        "65e2688f29d9685a38616ee5",
        1,
        1,
        "65e2688f29d9685a38616ee5",
      ),
    );
  };

  run();
});
