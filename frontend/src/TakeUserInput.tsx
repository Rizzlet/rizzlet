// import React, {useState} from 'react';

export default function SubmitQuestion() {
//   const [questionType, setQuestionType] = useState('');
//   const [questionText, setQuestionText] = useState('');

//   const handleSubmit = async () => {
//     try {
//       // Make an HTTP POST request to your backend endpoint
//       const response = await fetch('https://your-backend-api.com/questions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           type: questionType,
//           text: questionText,
//         }),
//       })

//   if (response.ok) {
//     console.log('Question successfully submitted and stored in the database.');
//     // Optionally, you can reset the form or navigate to another page here
//   } else {
//     console.error('Failed to submit question. Server returned:', response.status, response.statusText);
//   }
// } catch (error) {
//   console.error('An error occurred while submitting the question:', error.message);
// }
// };

// return (
//   <div>
//     {/* ... your existing JSX code ... */}
//     <SelectQuestion onChange={(value) => setQuestionType(value)} />
//     <InputQuestion onChange={(value) => setQuestionText(value)} />
//     <TrueAndFalseButtons />
//     <Buttons onSubmit={handleSubmit} />
//   </div>
// );
}