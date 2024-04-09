import {
  newClass,
  getClassNames,
  getUserClasses,
  getAllUsersScoreByClass,
} from "./class";
import { getIdCreateOrUpdate, setUserClasses } from "./user";

test("create a class", async () => {
  await newClass("test");
  const classNames = await getClassNames();
  expect(classNames.length).toBe(1);
  expect(classNames[0]!.name).toBe("test");
});

test("get all users in class by score", async () => {
  const classId = (await newClass("test"))._id.toString()!;

  const userId = await getIdCreateOrUpdate(
    "test",
    "test",
    "test",
    "123",
    "test",
  );

  await setUserClasses(userId!, [classId]);

  expect(userId).toBeDefined();

  const users = (await getAllUsersScoreByClass(classId))!;

  expect(users.length).toBeGreaterThanOrEqual(1);
  expect(users.map((u) => u.user._id.toString()).includes(userId!)).toBe(true);
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
