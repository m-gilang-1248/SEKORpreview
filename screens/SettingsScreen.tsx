
import React from 'react';

const SettingsScreen = () => {
  return (
    React.createElement('div', { className: "h-full w-full bg-gray-900 text-white overflow-y-auto pb-24" },
      React.createElement('header', { className: "sticky top-0 bg-gray-900/80 backdrop-blur-md z-10 p-4 pt-12" },
        React.createElement('h1', { className: "text-3xl font-bold text-white text-center" }, "Settings")
      ),
      React.createElement('main', { className: "p-6" },
        React.createElement('div', { className: "bg-gray-800 rounded-2xl p-4" },
          React.createElement('h2', { className: "text-lg font-semibold text-white mb-4" }, "Appearance"),
          React.createElement('div', { className: "flex justify-between items-center" },
            React.createElement('span', { className: "text-gray-300" }, "Dark Mode"),
            React.createElement('div', { className: "relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" },
              React.createElement('input', { type: "checkbox", name: "toggle", id: "toggle", className: "toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer", defaultChecked: true }),
              React.createElement('label', { htmlFor: "toggle", className: "toggle-label block overflow-hidden h-6 rounded-full bg-gray-600 cursor-pointer" })
            ),
            React.createElement('style', null, `
              .toggle-checkbox:checked {
                right: 0;
                border-color: #4A90E2;
              }
              .toggle-checkbox:checked + .toggle-label {
                background-color: #4A90E2;
              }
            `)
          )
        ),

        React.createElement('div', { className: "bg-gray-800 rounded-2xl p-4 mt-4" },
          React.createElement('h2', { className: "text-lg font-semibold text-white mb-4" }, "Langganan"),
          React.createElement('div', { className: "flex justify-between items-center bg-gray-700/50 p-4 rounded-lg" },
            React.createElement('div', null,
                React.createElement('p', { className: "text-white font-bold" }, "Free Member"),
                React.createElement('p', { className: "text-xs text-gray-400" }, "Akses fitur dasar")
            ),
            React.createElement('button', { className: "bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors" }, "Upgrade")
          )
        ),

        React.createElement('div', { className: "bg-gray-800 rounded-2xl p-4 mt-4" },
          React.createElement('h2', { className: "text-lg font-semibold text-white mb-4" }, "Notifications"),
          React.createElement('p', { className: "text-gray-400" }, "Notification settings will be available here.")
        ),
         React.createElement('div', { className: "bg-gray-800 rounded-2xl p-4 mt-4" },
          React.createElement('h2', { className: "text-lg font-semibold text-white mb-4" }, "About"),
          React.createElement('p', { className: "text-gray-400" }, "App Version 1.0.0")
        )
      )
    )
  );
};

export default SettingsScreen;
