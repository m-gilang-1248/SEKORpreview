
import React, { useState } from 'react';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon.tsx';

const MatchSetupScreen = ({ sport, onBack, onStartMatch }) => {
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');

  const handleStart = () => {
    if (teamA.trim() && teamB.trim()) {
      onStartMatch(teamA.trim(), teamB.trim());
    }
  };

  return (
    React.createElement('div', { className: "h-full w-full bg-gray-900 text-white flex flex-col" },
      React.createElement('header', { className: "relative flex items-center justify-center p-4 pt-12" },
        React.createElement('button', {
          onClick: onBack,
          className: "absolute left-4 top-1/2 -translate-y-1/2 mt-4 p-2 rounded-full bg-white/10 hover:bg-white/20",
          "aria-label": "Back to sport selection"
        },
          React.createElement(ChevronLeftIcon, { className: "w-6 h-6 text-white" })
        ),
        React.createElement('h1', { className: "text-xl font-bold text-white text-center mt-4" },
          `Setup Pertandingan ${sport}`
        )
      ),
      React.createElement('main', { className: "flex-grow flex flex-col justify-center p-6" },
        React.createElement('div', { className: "space-y-6" },
          React.createElement('div', null,
            React.createElement('label', { htmlFor: "teamA", className: "block text-sm font-medium text-gray-300 mb-2" },
              "Nama Tim A"
            ),
            React.createElement('input', {
              type: "text",
              id: "teamA",
              value: teamA,
              onChange: (e) => setTeamA(e.target.value),
              placeholder: "e.g., Tim Merah",
              className: "w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            })
          ),
          React.createElement('div', null,
            React.createElement('label', { htmlFor: "teamB", className: "block text-sm font-medium text-gray-300 mb-2" },
              "Nama Tim B"
            ),
            React.createElement('input', {
              type: "text",
              id: "teamB",
              value: teamB,
              onChange: (e) => setTeamB(e.target.value),
              placeholder: "e.g., Tim Biru",
              className: "w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            })
          )
        ),
        React.createElement('button', {
          onClick: handleStart,
          disabled: !teamA.trim() || !teamB.trim(),
          className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-lg mt-12 transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
        },
          "Mulai Pertandingan"
        )
      )
    )
  );
};

export default MatchSetupScreen;
