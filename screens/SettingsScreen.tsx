
import React from 'react';

const SettingsScreen: React.FC = () => {
  return (
    <div className="h-full w-full bg-gray-900 text-white overflow-y-auto pb-24">
      <header className="sticky top-0 bg-gray-900/80 backdrop-blur-md z-10 p-4 pt-12">
        <h1 className="text-3xl font-bold text-white text-center">Settings</h1>
      </header>
      <main className="p-6">
        <div className="bg-gray-800 rounded-2xl p-4">
          <h2 className="text-lg font-semibold text-white mb-4">Appearance</h2>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Dark Mode</span>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked />
              <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-600 cursor-pointer"></label>
            </div>
            <style>{`
              .toggle-checkbox:checked {
                right: 0;
                border-color: #4A90E2;
              }
              .toggle-checkbox:checked + .toggle-label {
                background-color: #4A90E2;
              }
            `}</style>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-4 mt-4">
          <h2 className="text-lg font-semibold text-white mb-4">Langganan</h2>
          <div className="flex justify-between items-center bg-gray-700/50 p-4 rounded-lg">
            <div>
                <p className="text-white font-bold">Free Member</p>
                <p className="text-xs text-gray-400">Akses fitur dasar</p>
            </div>
            <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                Upgrade
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-4 mt-4">
          <h2 className="text-lg font-semibold text-white mb-4">Notifications</h2>
          <p className="text-gray-400">Notification settings will be available here.</p>
        </div>
         <div className="bg-gray-800 rounded-2xl p-4 mt-4">
          <h2 className="text-lg font-semibold text-white mb-4">About</h2>
          <p className="text-gray-400">App Version 1.0.0</p>
        </div>
      </main>
    </div>
  );
};

export default SettingsScreen;
