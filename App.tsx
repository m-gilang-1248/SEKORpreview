import React, { useState, useCallback } from 'react';
import HomeScreen from './screens/HomeScreen';
import HistoryScreen from './screens/HistoryScreen';
import SettingsScreen from './screens/SettingsScreen';
import MatchSetupScreen from './screens/MatchSetupScreen';
import ScoreboardScreen from './screens/ScoreboardScreen';
import HistoryDetailScreen from './screens/HistoryDetailScreen';
import BottomNavBar from './components/BottomNavBar';
import { Sport, CompletedGame, Team } from './types';

export type Screen = 'home' | 'history' | 'settings';
type Page = 
  | { name: 'main'; screen: Screen }
  | { name: 'match-setup'; sport: Sport }
  | { name: 'scoreboard'; sport: Sport; teamA: string; teamB: string }
  | { name: 'history-detail'; game: CompletedGame };

const App: React.FC = () => {
  const [page, setPage] = useState<Page>({ name: 'main', screen: 'home' });
  const [history, setHistory] = useState<CompletedGame[]>([]);

  const handleSelectSport = useCallback((sport: Sport) => {
    setPage({ name: 'match-setup', sport });
  }, []);
  
  const handleStartMatch = useCallback((teamA: string, teamB: string) => {
    if (page.name === 'match-setup') {
      setPage({ name: 'scoreboard', sport: page.sport, teamA, teamB });
    }
  }, [page]);

  const handleEndMatch = useCallback((scoreA: number, scoreB: number, durationSeconds: number) => {
    if (page.name === 'scoreboard') {
      const newGame: CompletedGame = {
        id: new Date().toISOString(),
        sport: page.sport,
        teamA: { name: page.teamA, score: scoreA },
        teamB: { name: page.teamB, score: scoreB },
        date: new Date().toLocaleDateString('id-ID', {day: '2-digit', month: 'long', year: 'numeric'}),
        durationSeconds: durationSeconds,
      };
      setHistory(prev => [newGame, ...prev]);
      setPage({ name: 'main', screen: 'history' });
    }
  }, [page]);
  
  const handleSelectHistoryGame = useCallback((game: CompletedGame) => {
    setPage({ name: 'history-detail', game });
  }, []);
  
  const handleBack = useCallback(() => {
     if (page.name === 'match-setup' || page.name === 'history-detail') {
        setPage({ name: 'main', screen: page.name === 'match-setup' ? 'home' : 'history' });
     } else if (page.name === 'scoreboard') {
        if (window.confirm("Apakah Anda yakin ingin keluar? Progres tidak akan disimpan.")) {
            setPage({ name: 'main', screen: 'home' });
        }
     }
  }, [page]);
  
  const setActiveScreen = useCallback((screen: Screen) => {
    setPage({ name: 'main', screen });
  }, []);

  const renderPage = () => {
    switch (page.name) {
      case 'main':
        switch(page.screen) {
            case 'home': return <HomeScreen onSelectSport={handleSelectSport} />;
            case 'history': return <HistoryScreen history={history} onSelectGame={handleSelectHistoryGame} />;
            case 'settings': return <SettingsScreen />;
            default: return <HomeScreen onSelectSport={handleSelectSport} />;
        }
      case 'match-setup':
        return <MatchSetupScreen sport={page.sport} onBack={handleBack} onStartMatch={handleStartMatch} />;
      case 'scoreboard':
        return <ScoreboardScreen sport={page.sport} teamAName={page.teamA} teamBName={page.teamB} onEndMatch={handleEndMatch} onBack={handleBack}/>;
      case 'history-detail':
        return <HistoryDetailScreen game={page.game} onBack={handleBack} />;
      default:
        return <HomeScreen onSelectSport={handleSelectSport} />;
    }
  };
  
  const showNavBar = page.name === 'main';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-800 font-sans">
      <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[60px] shadow-xl">
        <div className="w-[375px] h-[812px] dark:bg-gray-900 overflow-hidden rounded-[46px]">
          <div className="relative h-full w-full">
            {renderPage()}
            {showNavBar && (
              <BottomNavBar activeScreen={page.screen} setActiveScreen={setActiveScreen} />
            )}
          </div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140px] h-[36px] bg-gray-900 rounded-b-3xl"></div>
        <div className="absolute -left-[17px] top-[148px] rounded-l-lg h-[94px] w-[3px] bg-gray-600"></div>
        <div className="absolute -left-[17px] top-[252px] rounded-l-lg h-[94px] w-[3px] bg-gray-600"></div>
        <div className="absolute -right-[17px] top-[182px] rounded-r-lg h-[164px] w-[3px] bg-gray-600"></div>
      </div>
    </div>
  );
};

export default App;
