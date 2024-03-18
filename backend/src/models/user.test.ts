import { addAnsweredQuestion } from "./answeredQuestion";
import { newClass } from "./class";
import {
  calculateStreak,
  getAllUsersByScore,
  getIdCreateOrUpdate,
  getUserClasses,
  setUserClasses,
} from "./user";

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

test("get user classes returns the correct classes", async () => {
  const userId = await getIdCreateOrUpdate(
    "test",
    "test",
    "test",
    "123",
    "test",
  );

  const classId = (await newClass("test"))._id.toString()!;

  expect(userId).toBeDefined();

  await setUserClasses(userId!, [classId]);

  const classes = await getUserClasses(userId!)!;

  expect(classes![0]!.name).toBe("test");
  expect(classes![0]!._id.toString()).toBe(classId);
});

test("get all users by score", async () => {
  const userId = await getIdCreateOrUpdate(
    "test",
    "test",
    "test",
    "123",
    "test",
  );

  expect(userId).toBeDefined();

  const users = await getAllUsersByScore();

  expect(users.length).toBeGreaterThanOrEqual(1);
  expect(users.map((u) => u._id.toString()!).includes(userId!)).toBe(true);
});

test("calculate streak with no anwered question", async () => {
  const userId = await getIdCreateOrUpdate(
    "test",
    "test",
    "test",
    "123",
    "test",
  );

  expect(userId).toBeDefined();

  const streak = await calculateStreak(userId!);

  expect(streak).toBe(0);
});

test("calculate streak with an anwered question", async () => {
  const userId = await getIdCreateOrUpdate(
    "test",
    "test",
    "test",
    "123",
    "test",
  );

  expect(userId).toBeDefined();

  await addAnsweredQuestion(userId!, "65f5bc2d1f0b863af2561a49");

  const streak = await calculateStreak(userId!);

  expect(streak).toBe(0);
});
