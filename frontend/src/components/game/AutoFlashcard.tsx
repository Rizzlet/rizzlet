import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

interface AutoFlashcardProps {
  questionSet: {
    id: string;
    question: string;
    answer: string;
    possibleAnswers: string[];
  }[];
  onQuestionAnswer: (lastQuestionRight: boolean) => void;
  currentQuestionIdx: number;
  resultTimeSecs: number;
}

export function AutoFlashcard(props: AutoFlashcardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<null | string>(null);

  const currentQuestion = props.questionSet[props.currentQuestionIdx];
  const [currentShuffledAnswers, setCurrentShuffledAnswers] = useState<
    string[] | null
  >(null);

  useEffect(() => {
    setSelectedAnswer(null);

    // Shuffle array only when we change to a new question, this is so we don't shuffle between
    // the user answering + showing result

    // Clone the array so that we use our own copy for shuffling
    const clonedQuestionSet = [...props.questionSet];
    shuffleArray(clonedQuestionSet[props.currentQuestionIdx].possibleAnswers);
    setCurrentShuffledAnswers(
      clonedQuestionSet[props.currentQuestionIdx].possibleAnswers
    );
  }, [props.currentQuestionIdx, props.questionSet]);

  function onAnswerSelect(text: string) {
    if (selectedAnswer === null) {
      setSelectedAnswer(text);
      setTimeout(function () {
        props.onQuestionAnswer(text === currentQuestion.answer);
      }, props.resultTimeSecs * 1000);
    }
  }

  return (
    <div className="flex justify-center">
      <div className="space-y-5 justify-center w-4/5 my-10">
        <div className="flex flex-col items-center justify-center">
          <div className="flex w-full overflow-y-auto h-40 p-4 justify-center items-center border border-gray-300 rounded-lg">
            <div>{currentQuestion.question}</div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {currentShuffledAnswers &&
            currentShuffledAnswers.map((possibleAnswer) => (
              <div
                className={`grid grid-cols-10 border-slate-600 border-2 rounded-md justify-center ${!selectedAnswer ? "hover:bg-gray-300" : ""} ${
                  !!selectedAnswer && possibleAnswer === currentQuestion.answer
                    ? "bg-green-300"
                    : ""
                } ${
                  selectedAnswer === possibleAnswer &&
                  currentQuestion.answer !== possibleAnswer
                    ? "bg-red-300"
                    : ""
                }`}
                onClick={() => onAnswerSelect(possibleAnswer)}
              >
                <div>
                  {!!selectedAnswer &&
                  possibleAnswer === currentQuestion.answer ? (
                    <CheckIcon height={40} />
                  ) : (
                    <></>
                  )}
                  {selectedAnswer === possibleAnswer &&
                  currentQuestion.answer !== possibleAnswer ? (
                    <XMarkIcon height={40} />
                  ) : (
                    <></>
                  )}
                </div>
                <div className="m-2 col-span-8 text-center">
                  {possibleAnswer}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray<T>(array: T[]) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
