import React from 'react';
import { Link } from 'react-router-dom';
import '../style.scss';

export const Start = () => {
  return (
    <main>
      <div className='trivia-app'>
        <div className='start-page'>
        <h1>Welcome to The Trivia!</h1>
        <p>Take the chance to show your friends and family how smart you actually are. Take The Trivia.</p>
        <Link to="/trivia">Trivia</Link>
        </div>
      </div>
    </main>
  );
};
