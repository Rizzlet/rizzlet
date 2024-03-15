import { addQuestionRating } from "./questionRatings";
import { jest } from "@jest/globals";

beforeEach(() => {
  jest.useFakeTimers();
});

test("create a class", () => {
  const run = async () => {
    expect(addQuestionRating("test", 1, 1, "test"));
  };

  run();
});
