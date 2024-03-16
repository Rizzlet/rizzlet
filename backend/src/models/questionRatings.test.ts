import { addQuestion, getQuestionsFromClassForUser } from "./question";
import { addQuestionRating, hideQuestion } from "./questionRatings";
import { getIdCreateOrUpdate, setUserClasses } from "./user";

test("create a question rating", async () => {
  expect(
    addQuestionRating(
      "65e2688f29d9685a38616ee5",
      1,
      1,
      "65e2688f29d9685a38616ee5",
    ),
  );
});

test("hide a question", async () => {
  const userId = await getIdCreateOrUpdate(
    "test",
    "test",
    "test",
    "123",
    "test",
  )!;

  await setUserClasses(userId!, ["65e2688f29d9685a38616ee5"]);

  const questionId = await addQuestion(
    "true/false",
    "65e2688f29d9685a38616ee5",
    "test",
    true,
    "65e2688f29d9685a38616ee5",
  );
  expect(
    await getQuestionsFromClassForUser(questionId.toString(), userId!),
  ).toBe([]);

  expect(await hideQuestion(questionId.toString()));

  console.log(`User ID: ${userId}`);
  console.log(`Question ID: ${questionId}`);
});
