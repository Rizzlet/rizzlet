import axios from "axios";

interface IAnswer {
  answerText: string;
  rightAnswer: string;
}

export default function Answers<T extends IAnswer>(props: T) {
  /**
   * @param type: The type of question it was. Will format answers based on the type.
   * @param answerText: Self-Explanatory
   * @param rightAnswer: Indicates whether this specific answer is the right answer.
   */

  // async function updateScore(){
  //   axios.post("").then(result => {
  //     if (){

  //     }
  //   })
  // }

  return (
    <div
      className="relative hover: cursor-pointer h-1/4 w-2/5 bg-white flex items-center justify-around rounded-lg"
      onClick={() => {
        props.rightAnswer === "true" ? console.log("yay") : console.log("aw");
      }}
    >
      <h1>{props.answerText}</h1>
    </div>
  );
}
