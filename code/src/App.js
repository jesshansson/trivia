import { TriviaApp } from 'components/TriviaApp'
import { Start } from 'components/Start';
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/trivia" element={<TriviaApp />} />
     </Routes>
    </BrowserRouter>
  )
}
