import React from 'react';
import { CompletedGame } from '../types';

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

interface HistoryCardProps {
  game: CompletedGame;
  onClick: () => void;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ game, onClick }) => {
  return (
    <div
      className="bg-gray-800 rounded-2xl p-4 cursor-pointer hover:bg-gray-700/50 transition-colors duration-200"
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-gray-400 font-medium">{game.sport}</span>
        <div className="flex items-center gap-2 text-xs text-gray-400">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clipRule="evenodd" />
            </svg>
            <span>{formatTime(game.durationSeconds)}</span>
            <span>&bull;</span>
            <span>{game.date}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-white">{game.teamA.name}</span>
        <span className="text-xl font-bold text-white">{game.teamA.score}</span>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="font-semibold text-white">{game.teamB.name}</span>
         <span className="text-xl font-bold text-white">{game.teamB.score}</span>
      </div>
    </div>
  );
};


interface HistoryScreenProps {
  history: CompletedGame[];
  onSelectGame: (game: CompletedGame) => void;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ history, onSelectGame }) => {
  return (
    <div className="h-full w-full bg-gray-900 text-white overflow-y-auto pb-24">
      <header className="sticky top-0 bg-gray-900/80 backdrop-blur-md z-10 p-4 pt-12">
        <h1 className="text-3xl font-bold text-white text-center">Riwayat Pertandingan</h1>
      </header>
      <main className="p-4">
        {history.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            <p>Belum ada riwayat pertandingan.</p>
            <p className="text-sm">Selesaikan sebuah pertandingan untuk melihatnya di sini.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((game) => (
              <HistoryCard key={game.id} game={game} onClick={() => onSelectGame(game)} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HistoryScreen;
