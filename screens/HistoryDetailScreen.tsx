import React from 'react';
import { CompletedGame } from '../types';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';

interface HistoryDetailScreenProps {
  game: CompletedGame;
  onBack: () => void;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

const HistoryDetailScreen: React.FC<HistoryDetailScreenProps> = ({ game, onBack }) => {
  const { teamA, teamB, sport, date, durationSeconds } = game;

  return (
    <div className="h-full w-full bg-gradient-to-b from-gray-800 to-gray-900 text-white overflow-y-auto">
      <header className="relative flex items-center justify-center p-4 pt-12">
        <button
          onClick={onBack}
          className="absolute left-4 top-1/2 -translate-y-1/2 mt-4 p-2 rounded-full bg-white/10 hover:bg-white/20"
          aria-label="Back to history"
        >
          <ChevronLeftIcon className="w-6 h-6 text-white" />
        </button>
        <div className="text-center mt-4">
          <h1 className="text-lg font-bold text-white">{sport}</h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
            <span>{date}</span>
            <span>&bull;</span>
            <span>{formatTime(durationSeconds)}</span>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col items-center w-1/3 text-center">
             <div className="w-20 h-20 rounded-full mb-2 bg-gray-700 flex items-center justify-center text-3xl font-bold">{teamA.name.charAt(0)}</div>
            <h2 className="text-xl font-bold">{teamA.name}</h2>
          </div>
          <div className="text-5xl font-extrabold text-center w-1/3">
            <span className="tracking-tighter">
              {teamA.score} - {teamB.score}
            </span>
          </div>
          <div className="flex flex-col items-center w-1/3 text-center">
            <div className="w-20 h-20 rounded-full mb-2 bg-gray-700 flex items-center justify-center text-3xl font-bold">{teamB.name.charAt(0)}</div>
            <h2 className="text-xl font-bold">{teamB.name}</h2>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-2xl p-4 mt-10">
          <h3 className="text-lg font-bold mb-2 text-center">Pertandingan Selesai</h3>
          <div className="text-center text-gray-400">
            <p>Ini adalah hasil akhir dari pertandingan.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HistoryDetailScreen;
