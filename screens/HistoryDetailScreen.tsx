
import React from 'react';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon.tsx';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

const HistoryDetailScreen = ({ game, onBack }) => {
  const { teamA, teamB, sport, date, durationSeconds } = game;

  return (
    React.createElement('div', { className: "h-full w-full bg-gradient-to-b from-gray-800 to-gray-900 text-white overflow-y-auto" },
      React.createElement('header', { className: "relative flex items-center justify-center p-4 pt-12" },
        React.createElement('button', {
          onClick: onBack,
          className: "absolute left-4 top-1/2 -translate-y-1/2 mt-4 p-2 rounded-full bg-white/10 hover:bg-white/20",
          "aria-label": "Back to history"
        },
          React.createElement(ChevronLeftIcon, { className: "w-6 h-6 text-white" })
        ),
        React.createElement('div', { className: "text-center mt-4" },
          React.createElement('h1', { className: "text-lg font-bold text-white" }, sport),
          React.createElement('div', { className: "flex items-center justify-center gap-2 text-sm text-gray-300" },
            React.createElement('span', null, date),
            React.createElement('span', null, "•"),
            React.createElement('span', null, formatTime(durationSeconds))
          )
        )
      ),

      React.createElement('main', { className: "p-6" },
        React.createElement('div', { className: "flex justify-between items-center mb-8" },
          React.createElement('div', { className: "flex flex-col items-center w-1/3 text-center" },
             React.createElement('div', { className: "w-20 h-20 rounded-full mb-2 bg-gray-700 flex items-center justify-center text-3xl font-bold" }, teamA.name.charAt(0)),
            React.createElement('h2', { className: "text-xl font-bold" }, teamA.name)
          ),
          React.createElement('div', { className: "text-5xl font-extrabold text-center w-1/3" },
            React.createElement('span', { className: "tracking-tighter" },
              `${teamA.score} - ${teamB.score}`
            )
          ),
          React.createElement('div', { className: "flex flex-col items-center w-1/3 text-center" },
            React.createElement('div', { className: "w-20 h-20 rounded-full mb-2 bg-gray-700 flex items-center justify-center text-3xl font-bold" }, teamB.name.charAt(0)),
            React.createElement('h2', { className: "text-xl font-bold" }, teamB.name)
          )
        ),

        React.createElement('div', { className: "bg-gray-800/50 rounded-2xl p-4 mt-10" },
          React.createElement('h3', { className: "text-lg font-bold mb-2 text-center" }, "Pertandingan Selesai"),
          React.createElement('div', { className: "text-center text-gray-400" },
            React.createElement('p', null, "Ini adalah hasil akhir dari pertandingan.")
          )
        )
      )
    )
  );
};

export default HistoryDetailScreen;
