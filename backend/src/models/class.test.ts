import { recordHello } from "./hello";

test("passed", () => {
  expect(recordHello("test"));
});
