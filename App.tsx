
import React, { useState, useCallback } from 'react';
import HomeScreen from './screens/HomeScreen.tsx';
import HistoryScreen from './screens/HistoryScreen.tsx';
import SettingsScreen from './screens/SettingsScreen.tsx';
import MatchSetupScreen from './screens/MatchSetupScreen.tsx';
import ScoreboardScreen from './screens/ScoreboardScreen.tsx';
import HistoryDetailScreen from './screens/HistoryDetailScreen.tsx';
import BottomNavBar from './components/BottomNavBar.tsx';

// FIX: Define types for game history and page state to resolve type errors.
interface Game {
  id: string;
  sport: string;
  teamA: { name: string; score: number };
  teamB: { name: string; score: number };
  date: string;
  durationSeconds: number;
}

type PageState =
  | { name: 'main'; screen: 'home' | 'history' | 'settings' }
  | { name: 'match-setup'; sport: string }
  | { name: 'scoreboard'; sport: string; teamA: string; teamB: string }
  | { name: 'history-detail'; game: Game };

const App = () => {
  // FIX: Explicitly type the page state with the PageState union type.
  const [page, setPage] = useState<PageState>({ name: 'main', screen: 'home' });
  // FIX: Explicitly type the history state as an array of Game objects.
  const [history, setHistory] = useState<Game[]>([]);

  const handleSelectSport = useCallback((sport: string) => {
    setPage({ name: 'match-setup', sport });
  }, []);
  
  const handleStartMatch = useCallback((teamA: string, teamB: string) => {
    if (page.name === 'match-setup') {
      setPage({ name: 'scoreboard', sport: page.sport, teamA, teamB });
    }
  }, [page]);

  const handleEndMatch = useCallback((scoreA: number, scoreB: number, durationSeconds: number) => {
    if (page.name === 'scoreboard') {
      const newGame: Game = {
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
  
  const handleSelectHistoryGame = useCallback((game: Game) => {
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
  
  const setActiveScreen = useCallback((screen: 'home' | 'history' | 'settings') => {
    setPage({ name: 'main', screen });
  }, []);

  const renderPage = () => {
    switch (page.name) {
      case 'main':
        switch(page.screen) {
            case 'home': return React.createElement(HomeScreen, { onSelectSport: handleSelectSport });
            case 'history': return React.createElement(HistoryScreen, { history: history, onSelectGame: handleSelectHistoryGame });
            case 'settings': return React.createElement(SettingsScreen, null);
            default: return React.createElement(HomeScreen, { onSelectSport: handleSelectSport });
        }
      case 'match-setup':
        return React.createElement(MatchSetupScreen, { sport: page.sport, onBack: handleBack, onStartMatch: handleStartMatch });
      case 'scoreboard':
        return React.createElement(ScoreboardScreen, { sport: page.sport, teamAName: page.teamA, teamBName: page.teamB, onEndMatch: handleEndMatch, onBack: handleBack});
      case 'history-detail':
        return React.createElement(HistoryDetailScreen, { game: page.game, onBack: handleBack });
      default:
        return React.createElement(HomeScreen, { onSelectSport: handleSelectSport });
    }
  };
  
  const showNavBar = page.name === 'main';

  return (
    React.createElement('div', { className: "min-h-screen flex items-center justify-center p-4 bg-gray-800 font-sans" },
      React.createElement('div', { className: "relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[60px] shadow-xl" },
        React.createElement('div', { className: "w-[375px] h-[812px] dark:bg-gray-900 overflow-hidden rounded-[46px]" },
          React.createElement('div', { className: "relative h-full w-full" },
            renderPage(),
            showNavBar && (
              React.createElement(BottomNavBar, { activeScreen: page.screen, setActiveScreen: setActiveScreen })
            )
          )
        ),
        React.createElement('div', { className: "absolute top-0 left-1/2 -translate-x-1/2 w-[140px] h-[36px] bg-gray-900 rounded-b-3xl" }),
        React.createElement('div', { className: "absolute -left-[17px] top-[148px] rounded-l-lg h-[94px] w-[3px] bg-gray-600" }),
        React.createElement('div', { className: "absolute -left-[17px] top-[252px] rounded-l-lg h-[94px] w-[3px] bg-gray-600" }),
        React.createElement('div', { className: "absolute -right-[17px] top-[182px] rounded-r-lg h-[164px] w-[3px] bg-gray-600" })
      )
    )
  );
};

export default App;
