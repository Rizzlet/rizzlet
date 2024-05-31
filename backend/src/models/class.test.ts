import {
  newClass,
  getClassNames,
  getAllUsersScoreByClass,
  setUserClasses,
  setScoreForUserByClass,
} from "./class";
import { getIdCreateOrUpdate } from "./user";

test("create a class", async () => {
  await newClass("test");
  const classNames = await getClassNames();
  expect(classNames.length).toBe(1);
  expect(classNames[0]!.name).toBe("test");
});

test("add score", async () => {
  const classId = (await newClass("test"))._id.toString()!;

  const userId = await getIdCreateOrUpdate(
    "test",
    "test",
    "test",
    "123",
    "test",
  );

  expect(userId).toBeDefined();

  await setUserClasses(userId!, [classId]);

  await setScoreForUserByClass(classId, userId!, 150);

  const users = (await getAllUsersScoreByClass(classId))!;

  expect(users.length).toBeGreaterThanOrEqual(1);
  expect(users.find((u) => u.user._id.toString() === userId).score).toBe(150);
});
