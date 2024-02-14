export function Title() {
  return (
    <div className="text-center mt-10"> 
    <h1 className="text-5xl font-extrabold dark:text-black">Add a Question</h1>
    </div>
  )
}

// dropdown menu
export function SelectDefault() {
  return (
    <div className="mt-5 absolute right-0 gap-10 px-5">
      <label htmlFor="questions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
        <select id="questions" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Choose a Question Type</option>
          <option value="US">True and False</option>
          <option value="CA">Multiple Choice</option>
      </select>
    </div>
  );
}

// question box
export function InputDefault() {
  return (
    <div className="mt-20">
      {/* formating: 5 pixels either side */}
      <div className="px-5">
        {/* message */}
        <label htmlFor="message" className="block mb-2 text-2xl font-medium text-gray-900 dark:text-black">Question</label>
        {/* textbox has blue border when clicked on*/}
        <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type Your Question Here..."></textarea>
      </div>
    </div>
    // <div className="w-72">
    //   <Input label="Question" variant="standard" size="md" crossOrigin="" />
    // </div>
  );
}

// true and false buttons, submit button
export function Buttons() {
  return (
    <div>
      <div className="mt-20 grid grid-cols-2 gap-20 px-20 flex aspect-w-5 aspect-h-5 ">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          True
        </button>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          False
        </button>
      </div>
      <div className="absolute right-0 mt-20 gap-20 px-20 ">
        <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Submit
          </button>
          <button
            type="button"
            className="text-gray-500 bg-blue-700 hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2 dark:bg-gray-200 dark:hover:bg-blue-300 focus:outline-none dark:focus:ring-blue-500"
          >
            Close
          </button>
      </div>
      {/* <center className ="h-screen flex items-center justify-center scale-150">
      <button className ="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
        False
      </button>
    </center>  */}
    </div>
  );
}
