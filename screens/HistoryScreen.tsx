
import React from 'react';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

const HistoryCard = ({ game, onClick }) => {
  return (
    React.createElement('div', {
      className: "bg-gray-800 rounded-2xl p-4 cursor-pointer hover:bg-gray-700/50 transition-colors duration-200",
      onClick: onClick
    },
      React.createElement('div', { className: "flex justify-between items-center mb-3" },
        React.createElement('span', { className: "text-xs text-gray-400 font-medium" }, game.sport),
        React.createElement('div', { className: "flex items-center gap-2 text-xs text-gray-400" },
             React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-3 w-3", viewBox: "0 0 20 20", fill: "currentColor" },
                React.createElement('path', { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z", clipRule: "evenodd" })
            ),
            React.createElement('span', null, formatTime(game.durationSeconds)),
            React.createElement('span', null, "•"),
            React.createElement('span', null, game.date)
        )
      ),
      React.createElement('div', { className: "flex items-center justify-between" },
        React.createElement('span', { className: "font-semibold text-white" }, game.teamA.name),
        React.createElement('span', { className: "text-xl font-bold text-white" }, game.teamA.score)
      ),
      React.createElement('div', { className: "flex items-center justify-between mt-2" },
        React.createElement('span', { className: "font-semibold text-white" }, game.teamB.name),
         React.createElement('span', { className: "text-xl font-bold text-white" }, game.teamB.score)
      )
    )
  );
};


const HistoryScreen = ({ history, onSelectGame }) => {
  return (
    React.createElement('div', { className: "h-full w-full bg-gray-900 text-white overflow-y-auto pb-24" },
      React.createElement('header', { className: "sticky top-0 bg-gray-900/80 backdrop-blur-md z-10 p-4 pt-12" },
        React.createElement('h1', { className: "text-3xl font-bold text-white text-center" }, "Riwayat Pertandingan")
      ),
      React.createElement('main', { className: "p-4" },
        history.length === 0 ? (
          React.createElement('div', { className: "text-center text-gray-400 mt-20" },
            React.createElement('p', null, "Belum ada riwayat pertandingan."),
            React.createElement('p', { className: "text-sm" }, "Selesaikan sebuah pertandingan untuk melihatnya di sini.")
          )
        ) : (
          React.createElement('div', { className: "space-y-3" },
            history.map((game) => (
              React.createElement(HistoryCard, { key: game.id, game: game, onClick: () => onSelectGame(game) })
            ))
          )
        )
      )
    )
  );
};

export default HistoryScreen;
