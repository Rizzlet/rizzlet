import { recordHello } from "./hello";
import { jest } from "@jest/globals";

beforeEach(() => {
  jest.useFakeTimers();
});

test("passed", () => {
  expect(recordHello("test"));
});
