import { jest } from "@jest/globals";
import { recordHello } from "./hello";

beforeEach(() => {
  jest.useFakeTimers();
});

test("passed", () => {
  expect(recordHello("test"));
});
