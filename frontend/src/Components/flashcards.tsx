import { useState } from "react";

export default function Flashcard(props: any){

  /**
 * @param question: the question that the user writes
 */
  
  // Because of how tailwind works, styles have to be predefined so that it can be dynamically changed
  const enum selectedVariants {
    selected = "bg-pink-400 rounded-md w-1/4 hover:shadow-xl cursor-pointer",
    notSelected = "bg-black rounded-md w-1/4 hover:shadow-xl cursor-pointer"
  }

  // Checks to see if the user has selected this question or not
  let [selected, setSelected] = useState(false);

  return(
    <div id="test" onClick = {() => {setSelected(!selected)}} className = {`${selected ? selectedVariants.selected : selectedVariants.notSelected}`}>
      <h1 className = "text-center relative">lorem ipsum</h1>
    </div>
  );
}
