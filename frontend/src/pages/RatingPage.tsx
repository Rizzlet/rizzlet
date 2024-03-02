import { useState } from "react";
import RatingScale from "../components/RatingScale";

export default function RatingPage() {
  const [difficultyRating, setDifficultyRating] = useState<number | null>(null);
  const [relevancyRating, setRelevancyRating] = useState<number | null>(null);

  const onSubmit = () => {
    console.log("Difficulty Rating: ", difficultyRating);
    console.log("Relevancy Rating: ", relevancyRating);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-1/2 items-center">
        <RatingScale
          onDifficultyChange={(difficulty) => {
            setDifficultyRating(difficulty);
          }}
          onRelevancyChange={(relevancy) => {
            setRelevancyRating(relevancy);
          }}
        />
        <div className="flex flex-row-reverse">
          <button
            className="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded mt-4 mr-4 w-1/8 justify-end"
            disabled={!difficultyRating || !relevancyRating}
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
