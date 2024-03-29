import React, { useState } from 'react';
import '../style.scss';

export const TriviaApp = () => {
  const [category, setCategory] = useState('');
  const [question, setQuestion] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const decodeEntities = (html) => {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const fetchQuestion = async () => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=1&category=${category}&type=multiple`
      );
      const data = await response.json();
      const result = data.results[0];

      const decodedOptions = [result.correct_answer, ...result.incorrect_answers]
        .sort(() => 0.5 - Math.random())
        .map(option => decodeEntities(option));

      setQuestion({
        ...result,
        question: decodeEntities(result.question),
        options: decodedOptions,
        correct_answer: decodeEntities(result.correct_answer),
      });
      setIsCorrect(null);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  const handleAnswerClick = (selectedAnswer) => {
    if (!question) return;

    const normalizedCorrectAnswer = question.correct_answer.toLowerCase().trim();
    const normalizedSelectedAnswer = decodeEntities(selectedAnswer).toLowerCase().trim();

    const result = normalizedCorrectAnswer === normalizedSelectedAnswer;
    setIsCorrect(result);

    // Update correct or incorrect count based on the result
    if (result) {
      setCorrectCount(prevCount => prevCount + 1);
    } else {
      setIncorrectCount(prevCount => prevCount + 1);
    }
  };

  return (
    <div className="trivia-app">
      <h2>Trivia Game</h2>
      <div className='choose-question'>
      <label>
        Select category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="17">Science and nature</option>
          <option value="27">Animals</option>
        </select>
      </label>
      <button onClick={fetchQuestion}>Get Question</button>
</div>
      {question && (
        <div className='question'>
          <h3>Question:</h3>
          <p>{question.question}</p>
          <div>
            {question.options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerClick(option)}>
                {option}
              </button>
            ))}
          </div>
          {isCorrect !== null && (
            <p className='answer'>{isCorrect ? 'Correct! 🎉' : 'Incorrect. 😕'} The correct answer was: {question.correct_answer}</p>
          )}
        </div>
      )}
       {/* Display the count of correct and incorrect answers */}
       <div className="scoreboard">
        <p>Correct Answers: {correctCount}</p>
        <p>Incorrect Answers: {incorrectCount}</p>
      </div>

    </div>
  );
};
