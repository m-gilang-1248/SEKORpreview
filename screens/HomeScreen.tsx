import React from 'react';
import { supportedSports, SportInfo } from '../data';
import { Sport } from '../types';

interface HomeScreenProps {
  onSelectSport: (sport: Sport) => void;
}

const SportCard: React.FC<{ sport: SportInfo; onClick: () => void }> = ({ sport, onClick }) => (
    <div
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden h-36 cursor-pointer group transform hover:scale-105 transition-transform duration-300"
    >
      <img src={sport.imageUrl} alt={sport.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      <div className="absolute inset-0 flex items-center justify-between p-6">
          <div className="flex flex-col justify-center h-full">
              <h3 className="text-3xl font-bold text-white tracking-wider">{sport.name}</h3>
              <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                      <span className="text-sm text-gray-300 font-medium">2 Tim</span>
                  </div>
                   <div className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clipRule="evenodd" /></svg>
                      <span className="text-sm text-gray-300 font-medium">Manual</span>
                  </div>
              </div>
          </div>
          <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
          </div>
      </div>
    </div>
  );

const AdCard: React.FC = () => (
  <div className="relative rounded-2xl overflow-hidden h-36 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-6 flex flex-col justify-center items-center text-center cursor-pointer group transform hover:scale-105 transition-transform duration-300">
    <div className="absolute top-2 right-2 bg-black/30 text-white text-xs font-bold py-1 px-2 rounded">
      IKLAN
    </div>
    <h3 className="text-2xl font-bold text-white tracking-wider">Go Premium!</h3>
    <p className="text-sm text-gray-200 mt-1">Pengalaman tanpa batas, tanpa iklan.</p>
    <div className="mt-3 bg-white text-indigo-600 font-bold py-2 px-6 rounded-full text-sm group-hover:bg-gray-200 transition-colors">
      Coba Sekarang
    </div>
  </div>
);


const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectSport }) => {
  return (
    <div className="h-full w-full bg-gray-900 text-white overflow-y-auto pb-24">
      <header className="sticky top-0 bg-gray-900/80 backdrop-blur-md z-10 p-6 pt-12 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">SEKOR</h1>
          <p className="text-gray-400 text-md">Teman Olahragamu</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center cursor-pointer">
          <span className="text-2xl font-bold text-white">G</span>
        </div>
      </header>
      <main className="p-4">
         <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-3">Daftar Olahraga</h2>
            {supportedSports.map((sport, index) => (
                <React.Fragment key={sport.name}>
                    <SportCard sport={sport} onClick={() => onSelectSport(sport.name)} />
                    {index === 1 && <AdCard />}
                </React.Fragment>
            ))}
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;