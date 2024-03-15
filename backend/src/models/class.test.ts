import { newClass, getClassNames } from "./class";
import { jest } from "@jest/globals";

beforeEach(() => {
  jest.useFakeTimers();
});

test("create a class", () => {
  const run = async () => {
    expect(newClass("test"));
    expect((await getClassNames()).length).toBe(1);
    expect((await getClassNames())[0]).toBe("test");
  };

  run();
});
