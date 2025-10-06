
import React, { useState, useEffect, useCallback } from 'react';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon.tsx';

const ScoreControl = ({ onIncrement, onDecrement }) => (
  React.createElement('div', { className: "flex items-center justify-center gap-4 mt-4" },
    React.createElement('button', { onClick: onDecrement, className: "w-14 h-14 rounded-full bg-white/10 text-3xl font-bold flex items-center justify-center hover:bg-white/20 transition-colors" }, "-"),
    React.createElement('button', { onClick: onIncrement, className: "w-14 h-14 rounded-full bg-blue-500 text-3xl font-bold flex items-center justify-center hover:bg-blue-600 transition-colors" }, "+")
  )
);

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

const getScoringHint = (sport) => {
    switch(sport) {
        case 'Futsal': return "Pertandingan 2x20 menit. Skor dihitung per gol.";
        case 'Tenis Meja': return "Satu set berakhir jika salah satu pemain mencapai 11 poin.";
        case 'Bulu Tangkis': return "Satu game berakhir jika salah satu pemain mencapai 21 poin.";
        case 'Voli': return "Satu set berakhir jika salah satu tim mencapai 25 poin.";
        case 'Basket': return "Skor dihitung per bola masuk (1, 2, or 3 poin).";
        default: return "";
    }
}

const AdPlaceholder = () => (
    React.createElement('div', { className: "h-full w-full bg-gray-900 text-white flex flex-col items-center justify-center text-center p-8" },
      React.createElement('div', { className: "animate-pulse mb-4" },
        React.createElement('svg', { className: "w-16 h-16 text-blue-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 10V3L4 14h7v7l9-11h-7z" }))
      ),
      React.createElement('h2', { className: "text-2xl font-bold mb-2" }, "Menyimpan Hasil Pertandingan..."),
      React.createElement('p', { className: "text-gray-400" }, "Ini hanya butuh beberapa saat."),
      React.createElement('div', { className: "absolute bottom-10 text-xs text-gray-500" },
        "Mendukung pengembangan dengan menampilkan placeholder ini."
      )
    )
  );

const ScoreboardScreen = ({ sport, teamAName, teamBName, onEndMatch, onBack }) => {
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = window.setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => window.clearInterval(interval);
  }, [isTimerRunning]);
  
  const handleEndMatchWithAd = useCallback(() => {
    if (showAd) {
      const adTimer = setTimeout(() => {
        onEndMatch(scoreA, scoreB, timer);
      }, 2500); // Ad placeholder duration
      return () => clearTimeout(adTimer);
    }
  }, [showAd, scoreA, scoreB, timer, onEndMatch]);

  useEffect(() => {
    handleEndMatchWithAd();
  }, [handleEndMatchWithAd]);


  const handleEndMatchClick = () => {
    setIsTimerRunning(false);
    setShowAd(true);
  }

  if (showAd) {
      return React.createElement(AdPlaceholder, null);
  }

  return (
    React.createElement('div', { className: "h-full w-full bg-gradient-to-b from-blue-900/30 to-gray-900 text-white flex flex-col" },
      React.createElement('header', { className: "relative flex items-center justify-center p-4 pt-12" },
         React.createElement('button', {
          onClick: onBack,
          className: "absolute left-4 top-1/2 -translate-y-1/2 mt-4 p-2 rounded-full bg-white/10 hover:bg-white/20",
          "aria-label": "Back to setup"
        },
          React.createElement(ChevronLeftIcon, { className: "w-6 h-6 text-white" })
        ),
        React.createElement('h1', { className: "text-xl font-bold text-white mt-4" }, sport)
      ),

      React.createElement('main', { className: "flex-grow flex flex-col justify-around p-6" },
        React.createElement('div', { className: "flex justify-between items-start" },
          React.createElement('div', { className: "flex flex-col items-center w-2/5 text-center" },
            React.createElement('h2', { className: "text-2xl font-bold mb-2" }, teamAName),
            React.createElement('p', { className: "text-7xl font-extrabold tracking-tighter" }, scoreA),
            React.createElement(ScoreControl, {
              onIncrement: () => setScoreA(s => s + 1),
              onDecrement: () => setScoreA(s => Math.max(0, s - 1))
            })
          ),
          React.createElement('div', { className: "text-5xl font-extrabold text-center text-gray-400 pt-10" }, "-"),
          React.createElement('div', { className: "flex flex-col items-center w-2/5 text-center" },
            React.createElement('h2', { className: "text-2xl font-bold mb-2" }, teamBName),
            React.createElement('p', { className: "text-7xl font-extrabold tracking-tighter" }, scoreB),
             React.createElement(ScoreControl, {
              onIncrement: () => setScoreB(s => s + 1),
              onDecrement: () => setScoreB(s => Math.max(0, s - 1))
            })
          )
        ),

        React.createElement('div', null,
            React.createElement('div', { className: "text-center mb-6" },
                React.createElement('p', { className: "text-6xl font-mono tracking-widest" }, formatTime(timer)),
                React.createElement('button', { onClick: () => setIsTimerRunning(r => !r), className: "mt-2 py-2 px-6 rounded-full bg-white/10 text-lg font-semibold hover:bg-white/20 transition-colors" },
                    isTimerRunning ? 'Jeda Timer' : 'Mulai Timer'
                )
            ),

            React.createElement('div', { className: "bg-gray-800/50 rounded-2xl p-3 text-center" },
                React.createElement('p', { className: "text-xs text-gray-300" }, getScoringHint(sport))
            )
        )
      ),

       React.createElement('footer', { className: "p-6" },
          React.createElement('button', {
            onClick: handleEndMatchClick,
            className: "w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-4 rounded-lg transition-colors duration-300"
          },
            "Akhiri Pertandingan"
          )
        )
    )
  );
};

export default ScoreboardScreen;
