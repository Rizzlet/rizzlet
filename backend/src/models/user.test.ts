import { addAnsweredQuestion } from "./answeredQuestion";
import { getUserClassesFromDB, newClass, setUserClasses } from "./class";
import { calculateStreak } from "./streakCalculation";
import { getIdCreateOrUpdate } from "./user";
// import { jest } from "@jest/globals";

// beforeEach(() => {
//   jest.useFakeTimers();
// });

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

  const classes = await getUserClassesFromDB(userId!)!;
  console.log(classes);

  expect(classes![0]!.name).toBe("test");
  expect(classes![0]!._id.toString()).toBe(classId);
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

  expect(streak).toBe(1);
});
