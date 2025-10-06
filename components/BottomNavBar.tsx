
import React from 'react';
import HomeIcon from './icons/HomeIcon.tsx';
import SettingsIcon from './icons/SettingsIcon.tsx';
import HistoryIcon from './icons/HistoryIcon.tsx';

const BottomNavBar = ({ activeScreen, setActiveScreen }) => {
  const navItems = [
    { name: 'home', icon: HomeIcon, label: 'Beranda' },
    { name: 'history', icon: HistoryIcon, label: 'Riwayat' },
    { name: 'settings', icon: SettingsIcon, label: 'Pengaturan' },
  ];

  return (
    React.createElement('div', { className: "absolute bottom-0 left-0 right-0 h-24 bg-gray-900/80 backdrop-blur-md rounded-b-[44px] border-t border-gray-700" },
      React.createElement('div', { className: "flex justify-around items-center h-full pb-4" },
        navItems.map((item) => {
          const isActive = activeScreen === item.name;
          const Icon = item.icon;
          return (
            React.createElement('button', {
              key: item.name,
              onClick: () => setActiveScreen(item.name),
              className: `flex flex-col items-center justify-center gap-1 transition-colors duration-200 w-20 ${
                isActive ? 'text-blue-400' : 'text-gray-400 hover:text-white'
              }`
            },
              React.createElement(Icon, { className: "w-6 h-6" }),
              React.createElement('span', { className: "text-xs font-medium" }, item.label)
            )
          );
        })
      )
    )
  );
};

export default BottomNavBar;
