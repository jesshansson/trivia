import React, { useState } from 'react';

export const TriviaApp = () => {
  const [category, setCategory] = useState('');
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const fetchQuestion = async () => {
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=1&category=${category}&type=multiple`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const formattedQuestion = formatQuestion(data.results[0]);
      setQuestion(formattedQuestion);
      setUserAnswer('');
      setIsCorrect(null);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  const formatQuestion = (question) => {
    // Use dangerouslySetInnerHTML to render HTML entities correctly
    const formattedQuestion = {
      ...question,
      question: { __html: question.question }
    };
    return formattedQuestion;
  };

  const checkAnswer = () => {
    const correctAnswer = question.correct_answer.toLowerCase();
    const userAnswerLower = userAnswer.toLowerCase();

    setIsCorrect(correctAnswer === userAnswerLower);
  };

  return (
    <div>
      <h2>Trivia Game</h2>
      <label>
        Select category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          {/* Add more categories based on the API documentation */}
        </select>
      </label>
      <button onClick={fetchQuestion}>Get Question</button>

      {question && (
        <div>
          <h3>Question:</h3>
          <p dangerouslySetInnerHTML={question.question}></p>

          <label>
            Your Answer:
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
          </label>

          <button onClick={checkAnswer}>Check Answer</button>

          {isCorrect !== null && (
            <p>{isCorrect ? 'Correct! 🎉' : 'Incorrect. 😕'} The correct answer was: {question.correct_answer}</p>
          )}
        </div>
      )}
    </div>
  );
};


