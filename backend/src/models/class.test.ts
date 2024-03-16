import { newClass, getClassNames } from "./class";

test("create a class", async () => {
  await newClass("test");
  const classNames = await getClassNames();
  expect(classNames.length).toBe(1);
  expect(classNames[0]!.name).toBe("test");
});
