export default function Flashcard(props: any){

  /**
 * @param question: the question that the user writes
 */

  function selectedQuestion(){
    const retrieved_flashcard: HTMLElement | null = document.getElementById("test");
    if (retrieved_flashcard){
      retrieved_flashcard.style.backgroundColor = "red";
    }
  }

  return(
    <div id="test" onClick = {selectedQuestion} className = "bg-pink-400 rounded-md w-1/4 hover:shadow-xl cursor-pointer">
      <h1 className = "text-center relative">lorem ipsum</h1>
    </div>
  );
}
