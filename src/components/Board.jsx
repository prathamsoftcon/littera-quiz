import React from 'react';

export default function Board({ cells = 25 }) {
  const items = Array.from({ length: cells }).map((_, i) => i + 1).reverse();
  return (
    <div className="board" aria-label="Game board wireframe">
      {items.map((n) => (
        <span key={n}>{n === 1 || n === 100 ? n : ''}</span>
      ))}
    </div>
  );
}
