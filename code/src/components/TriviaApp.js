import React, { useState } from 'react';
import '../style.scss';

export const TriviaApp = () => {
  const [category, setCategory] = useState('');
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const fetchQuestion = async () => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=1&category=${category}&type=multiple`
      );
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
    if (!question || !question.question || !question.correct_answer || !question.incorrect_answers) {
      console.error('Invalid question format:', question);
      return null;
    }

    const formattedQuestion = {
      ...question,
      question: { __html: question.question },
      options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
    };
    return formattedQuestion;
  };

  const checkAnswer = () => {
    if (question && question.type === 'multiple') {
      const correctAnswer = question.correct_answer.toLowerCase();
      const userAnswerLower = userAnswer.toLowerCase();
      setIsCorrect(correctAnswer === userAnswerLower);
    } else {
      setIsCorrect(null); // Handle questions without options differently, for example, you might want to show a different message
    }
  };

  return (
    <div className="trivia-app">
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

          {question.type === 'multiple' && (
            <label>
              Choose an option:
              <select value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}>
                {question.options.map((option, index) => (
                  <option key={index} value={option} dangerouslySetInnerHTML={{ __html: option }} />
                ))}
              </select>
            </label>
          )}

          <button onClick={checkAnswer}>Check Answer</button>

          {isCorrect !== null && (
            <p>
              {isCorrect ? 'Correct! 🎉' : 'Incorrect. 😕'} The correct answer was: {question.correct_answer}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
