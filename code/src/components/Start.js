import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../style.scss';

export const Start = () => {
  return (
    <main>
      <div className='trivia-app'>
        <h2>Hello</h2>
        <Link to="/trivia">Trivia</Link>
      </div>
    </main>
  );
};
