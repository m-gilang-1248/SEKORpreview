import React from 'react';
import HomeIcon from './icons/HomeIcon';
import SettingsIcon from './icons/SettingsIcon';
import HistoryIcon from './icons/HistoryIcon';
import { Screen } from '../App';

interface BottomNavBarProps {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeScreen, setActiveScreen }) => {
  const navItems = [
    { name: 'home' as Screen, icon: HomeIcon, label: 'Beranda' },
    { name: 'history' as Screen, icon: HistoryIcon, label: 'Riwayat' },
    { name: 'settings' as Screen, icon: SettingsIcon, label: 'Pengaturan' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gray-900/80 backdrop-blur-md rounded-b-[44px] border-t border-gray-700">
      <div className="flex justify-around items-center h-full pb-4">
        {navItems.map((item) => {
          const isActive = activeScreen === item.name;
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => setActiveScreen(item.name)}
              className={`flex flex-col items-center justify-center gap-1 transition-colors duration-200 w-20 ${
                isActive ? 'text-blue-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavBar;
