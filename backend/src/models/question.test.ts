// import { newClass } from "./class";
// import { getQuestionsFromClassForUser } from "./question";
// import { getIdCreateOrUpdate } from "./user";

// test("getQuestionsFromClassForUser returns null for a user that doesn't exist", async () => {
//   const questions = await getQuestionsFromClassForUser(
//     "15f5bc2d1f0b863af2561a49",
//     "15f5bc2d1f0b863af2561a49",
//   );

//   expect(questions).toBeNull();
// });

// test("getQuestionsFromClassForUser returns an empty array if the user has no classes", async () => {
//   const classId = (await newClass("test"))._id.toString()!;

//   const userId = await getIdCreateOrUpdate(
//     "test",
//     "test",
//     "test",
//     "123",
//     "test",
//   )!;

//   const questions = await getQuestionsFromClassForUser(userId!, classId);

//   expect(questions).toBeNull();
// });

import { jest } from "@jest/globals";
import { recordHello } from "./hello";

beforeEach(() => {
  jest.useFakeTimers();
});

test("passed", () => {
  expect(recordHello("test"));
});
