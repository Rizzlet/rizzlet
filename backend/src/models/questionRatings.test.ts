import { newClass, setUserClasses } from "./class";
import { addQuestion, getQuestionsFromClassForUser } from "./question";
import {
  addQuestionRating,
  getRelevancyRatingsForQuestion,
  hideQuestion,
} from "./questionRatings";
import { getIdCreateOrUpdate } from "./user";

test("create a question rating", async () => {
  expect(
    await addQuestionRating(
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

  expect(userId).toBeDefined();

  const classId = (await newClass("test"))._id.toString()!;

  await setUserClasses(userId!, [classId]);

  const questionId = await addQuestion("true/false", userId!, "test", classId);

  expect(
    await getQuestionsFromClassForUser(userId!.toString(), classId),
  ).not.toStrictEqual([]);

  expect(await hideQuestion(questionId.toString()));

  expect(
    await getQuestionsFromClassForUser(userId!.toString(), classId),
  ).toStrictEqual([]);
});

test("get relevancy ratings for a question", async () => {
  const questionId = await addQuestion(
    "true/false",
    "65e2688f29d9685a38616ee5",
    "test",
    "65e2688f29d9685a38616ee5",
  );
  const relevancy = await getRelevancyRatingsForQuestion(questionId.toString());

  expect(relevancy).toStrictEqual([]);

  expect(
    await addQuestionRating(
      questionId.toString(),
      1,
      3,
      "65e2688f29d9685a38616ee5",
    ),
  );

  const relevancy2 = await getRelevancyRatingsForQuestion(
    questionId.toString(),
  );

  expect(relevancy2.length).toBe(1);
  expect(relevancy2[0]!.difficultyRating).toBe(1);
  expect(relevancy2[0]!.relevancyRating).toBe(3);
});
