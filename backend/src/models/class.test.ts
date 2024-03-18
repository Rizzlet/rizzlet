import { newClass, getClassNames, getUserClasses } from "./class";
import { getIdCreateOrUpdate } from "./user";

test("create a class", async () => {
  await newClass("test");
  const classNames = await getClassNames();
  expect(classNames.length).toBe(1);
  expect(classNames[0]!.name).toBe("test");
});

test("getUserClasses returns an empty array if the user has no classes", async () => {
  const userId = await getIdCreateOrUpdate(
    "test",
    "test",
    "test",
    "123",
    "test",
  );

  expect(userId).toBeDefined();

  const classes = await getUserClasses(userId!);

  expect(classes).toStrictEqual([]);
});

test("get user classes returns null if the user doesn't exist", async () => {
  const classes = await getUserClasses("65f5bc2d1f0b863af2561a49");

  expect(classes).toBeNull();
});
