import React, { useState } from "react";
import {
  GiSnake,
  GiLadder,
} from "react-icons/gi";

const snakes = {
  99: 78,
  95: 75,
  93: 73,
  87: 24,
  64: 60,
  62: 19,
  54: 34,
  17: 7,
};

const ladders = {
  4: 14,
  9: 31,
  20: 38,
  28: 84,
  40: 59,
  51: 67,
  63: 81,
  71: 91,
};

const specialMoves = {
  ...snakes,
  ...ladders,
};

const generateBoard = () => {
  const rows = [];

  for (let row = 0; row < 10; row++) {
    let start = row * 10 + 1;
    let rowCells = [];

    for (let i = 0; i < 10; i++) {
      rowCells.push(start + i);
    }

    if (row % 2 === 1) {
      rowCells.reverse();
    }

    rows.unshift(...rowCells);
  }

  return rows;
};

const boardCells = generateBoard();

export default function GameBoard() {
  const [dice, setDice] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const [positions, setPositions] = useState({
    1: 1,
    2: 1,
  });

  const [winner, setWinner] = useState(null);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    if (rolling || winner) return;

    setRolling(true);

    const value = Math.floor(Math.random() * 6) + 1;

    setTimeout(() => {
      setDice(value);

      setPositions((prev) => {
        const currentPos = prev[currentPlayer];

        let nextPos = currentPos + value;

        if (nextPos > 100) {
          nextPos = currentPos;
        }

        if (specialMoves[nextPos]) {
          nextPos = specialMoves[nextPos];
        }

        const updated = {
          ...prev,
          [currentPlayer]: nextPos,
        };

        if (nextPos === 100) {
          setWinner(currentPlayer);
        }

        return updated;
      });

      if (!winner) {
        setCurrentPlayer((p) => (p === 1 ? 2 : 1));
      }

      setRolling(false);
    }, 700);
  };

  const resetGame = () => {
    setPositions({
      1: 1,
      2: 1,
    });

    setWinner(null);
    setDice(null);
    setCurrentPlayer(1);
    setRolling(false);
  };

  return (
    <div className="w-full p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-700">
          Game Board
        </h2>

        <h2 className="text-2xl font-bold text-green-700">
          🐍 Snakes & Ladders Match
        </h2>
      </div>

      {/* Players */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-rose-50 rounded-xl p-4 shadow">
          <div className="font-bold text-lg">Player 1</div>
          <div>Position: {positions[1]}</div>

          <div className="mt-3 w-12 h-12 bg-rose-500 rounded-full text-white flex items-center justify-center font-bold">
            P1
          </div>
        </div>

        <div className="bg-emerald-50 rounded-xl p-4 shadow text-right">
          <div className="font-bold text-lg">Player 2</div>
          <div>Position: {positions[2]}</div>

          <div className="mt-3 ml-auto w-12 h-12 bg-emerald-500 rounded-full text-white flex items-center justify-center font-bold">
            P2
          </div>
        </div>
      </div>

      {/* Dice */}
      <div className="text-center mb-8">
        <div className="text-7xl font-bold text-blue-700">
          {dice || "-"}
        </div>

        <button
          onClick={rollDice}
          disabled={rolling || winner}
          className="mt-4 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold disabled:opacity-50"
        >
          {rolling ? "Rolling..." : "Roll Dice"}
        </button>

        <div className="mt-3 text-gray-700">
          Current Turn: Player {currentPlayer}
        </div>
      </div>

      {/* Info */}
      <div className="flex justify-between items-center mb-6">
        <div>
          Preloaded Questions: 12
          <br />
          Low Network: Enabled
        </div>

        <div className="text-right">
          <button
            onClick={resetGame}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Restart
          </button>

          <div className="mt-2">
            Rolled: {dice || "-"}
          </div>
        </div>
      </div>

      {/* Board */}
      <div className="grid grid-cols-10 gap-1 bg-white p-2 rounded-xl shadow-lg">
        {boardCells.map((number) => {
          const isSnake = snakes[number];
          const isLadder = ladders[number];

          return (
            <div
              key={number}
              className="relative aspect-square border border-slate-300 bg-white rounded-lg overflow-hidden"
            >
              <div className="absolute top-1 left-1 text-xs font-bold">
                {number}
              </div>

              {isSnake && (
                <GiSnake className="absolute inset-0 m-auto text-red-500 text-4xl opacity-70" />
              )}

              {isLadder && (
                <GiLadder
                   className="absolute inset-0 m-auto text-green-600 text-4xl opacity-70"
                />
              )}

              {positions[1] === number && (
                <div className="absolute bottom-1 left-1 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </div>
              )}

              {positions[2] === number && (
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Winner Modal */}
      {winner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl text-center shadow-2xl">
            <h2 className="text-4xl font-bold text-green-600">
              🎉 Player {winner} Wins!
            </h2>

            <button
              onClick={resetGame}
              className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}