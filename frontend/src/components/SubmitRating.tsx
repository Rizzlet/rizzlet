import { useState } from "react";
import RatingScale from "./RatingScale";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SubmitRating(props: { questionId: string }) {
  const [difficultyRating, setDifficultyRating] = useState<number | null>(null);
  const [relevancyRating, setRelevancyRating] = useState<number | null>(null);
  const navigate = useNavigate();

  const onSubmit = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/question/${props.questionId}/rating`,
        {
          difficultyRating,
          relevancyRating,
        },
        {
          withCredentials: true,
        },
      )
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="items-center xl:w-1/2">
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
            className="w-1/8 mr-4 mt-4 justify-end rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:bg-gray-400"
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
