import React from 'react';

export default function QuestionCard({ dice = 4, text = 'Answer to move. Speed and accuracy affect score.' }) {
  return (
    <div className="question-card">
      <b>Dice: {dice}</b>
      <span>{text}</span>
    </div>
  );
}
