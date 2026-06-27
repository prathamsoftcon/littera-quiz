import React, { useState } from "react";
import { FaDice, FaRedo, FaSignal } from "react-icons/fa";
import { GiLadder, GiSnake } from "react-icons/gi";
import { useTranslation } from "../../context/TranslationContext";

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
    const start = row * 10 + 1;
    const rowCells = [];

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

export default function GameBoard({ settings = {} }) {
  const { t } = useTranslation();
  const { preloadedCount = 12, lowNetwork = false, speedBonus = "Small" } = settings;
  const [dice, setDice] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [positions, setPositions] = useState({ 1: 1, 2: 1 });
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

        if (nextPos === 100) {
          setWinner(currentPlayer);
        } else {
          setCurrentPlayer((player) => (player === 1 ? 2 : 1));
        }

        return { ...prev, [currentPlayer]: nextPos };
      });

      setRolling(false);
    }, 500);
  };

  const resetGame = () => {
    setPositions({ 1: 1, 2: 1 });
    setWinner(null);
    setDice(null);
    setCurrentPlayer(1);
    setRolling(false);
  };

  const playerCards = [
    { id: 1, name: "Player 1", color: "rose", position: positions[1] },
    { id: 2, name: "Player 2", color: "emerald", position: positions[2] },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{t("board.title")}</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">{t("board.variant.1v1")}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{t("board.1v1.desc")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{t("board.dice")}</p>
            <p className="mt-1 text-2xl font-semibold text-slate-950">{dice || "-"}</p>
          </div>
          <button
            type="button"
            onClick={rollDice}
            disabled={rolling || Boolean(winner)}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <FaDice aria-hidden="true" />
            {rolling ? "Rolling..." : t("board.roll")}
          </button>
          <button
            type="button"
            onClick={resetGame}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <FaRedo aria-hidden="true" />
            Restart
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_280px]">
        <div className="grid gap-3 sm:grid-cols-2">
          {playerCards.map((player) => (
            <div key={player.id} className={`rounded-xl border p-4 ${currentPlayer === player.id && !winner ? "border-sky-300 bg-sky-50" : "border-slate-200 bg-slate-50"}`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-950">{player.name}</p>
                  <p className="mt-1 text-sm text-slate-600">Position {player.position}</p>
                </div>
                <span className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white ${player.color === "rose" ? "bg-rose-500" : "bg-emerald-500"}`}>
                  P{player.id}
                </span>
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <FaSignal className="text-emerald-700" aria-hidden="true" />
            Match settings
          </div>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Turn</dt>
              <dd className="font-semibold text-slate-950">{winner ? `Player ${winner} won` : `Player ${currentPlayer}`}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Preloaded</dt>
              <dd className="font-semibold text-slate-950">{preloadedCount}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Network</dt>
              <dd className="font-semibold text-slate-950">{lowNetwork ? "Low" : "Standard"}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Bonus</dt>
              <dd className="font-semibold text-slate-950">{speedBonus}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <div className="grid min-w-[620px] grid-cols-10 gap-1">
          {boardCells.map((number) => {
            const isSnake = snakes[number];
            const isLadder = ladders[number];

            return (
              <div key={number} className="relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-white">
                <div className="absolute left-1.5 top-1.5 text-[11px] font-semibold text-slate-500">{number}</div>

                {isSnake && (
                  <GiSnake className="absolute inset-0 m-auto text-3xl text-rose-400 opacity-60" aria-hidden="true" />
                )}

                {isLadder && (
                  <GiLadder className="absolute inset-0 m-auto text-3xl text-emerald-500 opacity-60" aria-hidden="true" />
                )}

                {positions[1] === number && (
                  <div className="absolute bottom-1 left-1 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-xs font-semibold text-white">1</div>
                )}

                {positions[2] === number && (
                  <div className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white">2</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">
        <p className="font-semibold text-slate-950">{t("board.objective")}</p>
        <p className="mt-2">{t("board.objective.1v1", { speedBonus })}</p>
        <p className="mt-2 text-slate-500">
          {t("board.preloaded", { count: preloadedCount })} | {lowNetwork ? t("board.lowNetworkEnabled") : t("board.lowNetworkDisabled")}
        </p>
      </div>

      {winner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
            <h2 className="text-2xl font-semibold text-slate-950">Player {winner} wins</h2>
            <p className="mt-2 text-sm text-slate-600">Great match. Start a new round when you are ready.</p>
            <button onClick={resetGame} className="mt-5 rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
              Play again
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
