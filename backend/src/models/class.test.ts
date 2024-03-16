import { newClass, getClassNames } from "./class.js";
import { jest } from "@jest/globals";

beforeEach(() => {
  jest.useFakeTimers();
});

test("create a class", () => {
  const run = async () => {
    await newClass("test");
    const classNames = await getClassNames();
    expect(classNames.length).toBe(1);
    expect(classNames[0]!.name).toBe("test");
  };

  run();
});
