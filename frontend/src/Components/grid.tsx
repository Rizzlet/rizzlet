import Flashcard from "./flashcards";

function CreateGrid(){
  let testArray: String[] = ["lorem", "ipsum", "questionlol", "yep"];
  return <>{testArray.map(x => {return <Flashcard question={x} type="tf"></Flashcard>})}</>;
}

export default function QuestionGrid(){
  return <CreateGrid></CreateGrid>;
}