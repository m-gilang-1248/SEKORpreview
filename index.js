const supportedSports = [
  {
    name: 'Futsal',
    imageUrl: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
  },
  {
    name: 'Tenis Meja',
    imageUrl: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=600&auto=format&fit=crop&q=60',
  },
  {
    name: 'Bulu Tangkis',
    imageUrl: 'https://media.istockphoto.com/id/1424816769/photo/close-up-of-shuttlecock-on-badminton-court.webp?a=1&b=1&s=612x612&w=0&k=20&c=HSDbQPbpsmFabb-WkwX3DU_nZfED2vDqmYtkxqJ7R-k=',
  },
  {
    name: 'Voli',
    imageUrl: 'https://images.unsplash.com/photo-1601512986351-9b0e01780eef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHZvbGxleWJhbGx8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Basket',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=60',
  },
];

// --- UTILITY FUNCTIONS ---
const saveHistoryToLocalStorage = (history) => {
  try {
    localStorage.setItem('scoreboardHistory', JSON.stringify(history));
  } catch (error) {
    console.error("Could not save history to local storage", error);
  }
};

const loadHistoryFromLocalStorage = () => {
  try {
    const historyJson = localStorage.getItem('scoreboardHistory');
    return historyJson ? JSON.parse(historyJson) : [];
  } catch (error) {
    console.error("Could not load history from local storage", error);
    return [];
  }
};

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

// --- STATE MANAGEMENT ---
const state = {
  currentPage: 'home', // home, match-setup, scoreboard, history, settings, history-detail
  activeMainScreen: 'home', // for bottom nav bar state
  selectedSport: null,
  match: {
    teamA: '',
    teamB: '',
    scoreA: 0,
    scoreB: 0,
    timer: 0,
    isTimerRunning: false,
  },
  history: loadHistoryFromLocalStorage(),
  selectedGame: null,
  timerInterval: null,
};

const appContainer = document.getElementById('app-container');

// --- RENDER FUNCTIONS (HTML TEMPLATES) ---

const renderBottomNavBar = () => {
  const navItems = [
    { name: 'home', label: 'Beranda', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>` },
    { name: 'history', label: 'Riwayat', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>` },
    { name: 'settings', label: 'Pengaturan', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.73l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1 0-2.73l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>` },
  ];

  return `
    <div class="absolute bottom-0 left-0 right-0 h-24 bg-gray-900/80 backdrop-blur-md rounded-b-[44px] border-t border-gray-700">
      <div class="flex justify-around items-center h-full pb-4">
        ${navItems.map(item => `
          <button data-screen="${item.name}" class="nav-button flex flex-col items-center justify-center gap-1 transition-colors duration-200 w-20 ${state.activeMainScreen === item.name ? 'text-blue-400' : 'text-gray-400 hover:text-white'}">
            <div class="w-6 h-6">${item.icon}</div>
            <span class="text-xs font-medium">${item.label}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
};

const renderHomeScreen = () => {
    const sportsCards = supportedSports.map((sport, index) => `
    <div class="sport-card relative rounded-2xl overflow-hidden h-36 cursor-pointer group transform hover:scale-105 transition-transform duration-300" data-sport-name="${sport.name}">
      <img src="${sport.imageUrl}" alt="${sport.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
      <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      <div class="absolute inset-0 flex items-center justify-between p-6">
        <div class="flex flex-col justify-center h-full">
          <h3 class="text-3xl font-bold text-white tracking-wider">${sport.name}</h3>
          <div class="flex items-center gap-4 mt-2">
            <div class="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
              <span class="text-sm text-gray-300 font-medium">2 Tim</span>
            </div>
            <div class="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clip-rule="evenodd"></path></svg>
              <span class="text-sm text-gray-300 font-medium">Manual</span>
            </div>
          </div>
        </div>
        <div class="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </div>
      </div>
    </div>
    ${index === 1 ? `
    <div class="relative rounded-2xl overflow-hidden h-36 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-6 flex flex-col justify-center items-center text-center cursor-pointer group transform hover:scale-105 transition-transform duration-300">
      <div class="absolute top-2 right-2 bg-black/30 text-white text-xs font-bold py-1 px-2 rounded">IKLAN</div>
      <h3 class="text-2xl font-bold text-white tracking-wider">Go Premium!</h3>
      <p class="text-sm text-gray-200 mt-1">Pengalaman tanpa batas, tanpa iklan.</p>
      <div class="mt-3 bg-white text-indigo-600 font-bold py-2 px-6 rounded-full text-sm group-hover:bg-gray-200 transition-colors">Coba Sekarang</div>
    </div>` : ''}
  `).join('');

  return `
    <div class="h-full w-full bg-gray-900 text-white overflow-y-auto pb-24">
      <header class="sticky top-0 bg-gray-900/80 backdrop-blur-md z-10 p-6 pt-12 flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-white">SEKOR</h1>
          <p class="text-gray-400 text-md">Teman Olahragamu</p>
        </div>
        <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center cursor-pointer">
          <span class="text-2xl font-bold text-white">G</span>
        </div>
      </header>
      <main class="p-4">
         <div class="space-y-4">
            <h2 class="text-xl font-bold text-white mb-3">Daftar Olahraga</h2>
            ${sportsCards}
        </div>
      </main>
    </div>
    ${renderBottomNavBar()}
  `;
};

const renderHistoryScreen = () => {
  const historyCards = state.history.map(game => `
    <div class="history-card bg-gray-800 rounded-2xl p-4 cursor-pointer hover:bg-gray-700/50 transition-colors duration-200" data-game-id="${game.id}">
      <div class="flex justify-between items-center mb-3">
        <span class="text-xs text-gray-400 font-medium">${game.sport}</span>
        <div class="flex items-center gap-2 text-xs text-gray-400">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clip-rule="evenodd"></path></svg>
            <span>${formatTime(game.durationSeconds)}</span>
            <span>•</span>
            <span>${game.date}</span>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <span class="font-semibold text-white">${game.teamA.name}</span>
        <span class="text-xl font-bold text-white">${game.teamA.score}</span>
      </div>
      <div class="flex items-center justify-between mt-2">
        <span class="font-semibold text-white">${game.teamB.name}</span>
         <span class="text-xl font-bold text-white">${game.teamB.score}</span>
      </div>
    </div>
  `).join('');

  return `
    <div class="h-full w-full bg-gray-900 text-white overflow-y-auto pb-24">
      <header class="sticky top-0 bg-gray-900/80 backdrop-blur-md z-10 p-4 pt-12">
        <h1 class="text-3xl font-bold text-white text-center">Riwayat Pertandingan</h1>
      </header>
      <main class="p-4">
        ${state.history.length === 0 ? `
          <div class="text-center text-gray-400 mt-20">
            <p>Belum ada riwayat pertandingan.</p>
            <p class="text-sm">Selesaikan sebuah pertandingan untuk melihatnya di sini.</p>
          </div>
        ` : `<div class="space-y-3">${historyCards}</div>`}
      </main>
    </div>
    ${renderBottomNavBar()}
  `;
};

const renderSettingsScreen = () => {
  return `
    <div class="h-full w-full bg-gray-900 text-white overflow-y-auto pb-24">
      <header class="sticky top-0 bg-gray-900/80 backdrop-blur-md z-10 p-4 pt-12">
        <h1 class="text-3xl font-bold text-white text-center">Settings</h1>
      </header>
      <main class="p-6">
        <div class="bg-gray-800 rounded-2xl p-4">
          <h2 class="text-lg font-semibold text-white mb-4">Appearance</h2>
          <div class="flex justify-between items-center">
            <span class="text-gray-300">Dark Mode</span>
            <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" checked>
              <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-600 cursor-pointer"></label>
            </div>
          </div>
        </div>
        <div class="bg-gray-800 rounded-2xl p-4 mt-4">
          <h2 class="text-lg font-semibold text-white mb-4">Langganan</h2>
          <div class="flex justify-between items-center bg-gray-700/50 p-4 rounded-lg">
            <div>
                <p class="text-white font-bold">Free Member</p>
                <p class="text-xs text-gray-400">Akses fitur dasar</p>
            </div>
            <button class="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors">Upgrade</button>
          </div>
        </div>
        <div class="bg-gray-800 rounded-2xl p-4 mt-4">
          <h2 class="text-lg font-semibold text-white mb-4">About</h2>
          <p class="text-gray-400">App Version 1.0.0</p>
        </div>
      </main>
    </div>
    ${renderBottomNavBar()}
  `;
};

const renderMatchSetupScreen = () => {
    return `
    <div class="h-full w-full bg-gray-900 text-white flex flex-col">
      <header class="relative flex items-center justify-center p-4 pt-12">
        <button id="back-to-home-btn" class="absolute left-4 top-1/2 -translate-y-1/2 mt-4 p-2 rounded-full bg-white/10 hover:bg-white/20" aria-label="Back to sport selection">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white"><path d="m15 18-6-6 6-6"></path></svg>
        </button>
        <h1 class="text-xl font-bold text-white text-center mt-4">
          Setup Pertandingan ${state.selectedSport}
        </h1>
      </header>
      <main class="flex-grow flex flex-col justify-center p-6">
        <div class="space-y-6">
          <div>
            <label for="teamA" class="block text-sm font-medium text-gray-300 mb-2">Nama Tim A</label>
            <input type="text" id="teamA-input" placeholder="e.g., Tim Merah" class="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div>
            <label for="teamB" class="block text-sm font-medium text-gray-300 mb-2">Nama Tim B</label>
            <input type="text" id="teamB-input" placeholder="e.g., Tim Biru" class="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
        </div>
        <button id="start-match-btn" disabled class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-lg mt-12 transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed">
          Mulai Pertandingan
        </button>
      </main>
    </div>
  `;
};

const renderScoreboardScreen = () => {
    return `
    <div id="scoreboard-content" class="h-full w-full bg-gradient-to-b from-blue-900/30 to-gray-900 text-white flex flex-col">
      <header class="relative flex items-center justify-center p-4 pt-12">
         <button id="back-to-home-confirm-btn" class="absolute left-4 top-1/2 -translate-y-1/2 mt-4 p-2 rounded-full bg-white/10 hover:bg-white/20" aria-label="Back to setup">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white"><path d="m15 18-6-6 6-6"></path></svg>
        </button>
        <h1 class="text-xl font-bold text-white mt-4">${state.selectedSport}</h1>
      </header>
      <main class="flex-grow flex flex-col justify-around p-6">
        <div class="flex justify-between items-start">
          <div class="flex flex-col items-center w-2/5 text-center">
            <h2 class="text-2xl font-bold mb-2">${state.match.teamA}</h2>
            <p id="scoreA" class="text-7xl font-extrabold tracking-tighter">${state.match.scoreA}</p>
            <div class="flex items-center justify-center gap-4 mt-4">
              <button data-team="A" data-action="decrement" class="score-btn w-14 h-14 rounded-full bg-white/10 text-3xl font-bold flex items-center justify-center hover:bg-white/20 transition-colors">-</button>
              <button data-team="A" data-action="increment" class="score-btn w-14 h-14 rounded-full bg-blue-500 text-3xl font-bold flex items-center justify-center hover:bg-blue-600 transition-colors">+</button>
            </div>
          </div>
          <div class="text-5xl font-extrabold text-center text-gray-400 pt-10">-</div>
          <div class="flex flex-col items-center w-2/5 text-center">
            <h2 class="text-2xl font-bold mb-2">${state.match.teamB}</h2>
            <p id="scoreB" class="text-7xl font-extrabold tracking-tighter">${state.match.scoreB}</p>
             <div class="flex items-center justify-center gap-4 mt-4">
              <button data-team="B" data-action="decrement" class="score-btn w-14 h-14 rounded-full bg-white/10 text-3xl font-bold flex items-center justify-center hover:bg-white/20 transition-colors">-</button>
              <button data-team="B" data-action="increment" class="score-btn w-14 h-14 rounded-full bg-blue-500 text-3xl font-bold flex items-center justify-center hover:bg-blue-600 transition-colors">+</button>
            </div>
          </div>
        </div>
        <div>
            <div class="text-center mb-6">
                <p id="timer-display" class="text-6xl font-mono tracking-widest">${formatTime(state.match.timer)}</p>
                <button id="timer-toggle-btn" class="mt-2 py-2 px-6 rounded-full bg-white/10 text-lg font-semibold hover:bg-white/20 transition-colors">
                    ${state.match.isTimerRunning ? 'Jeda Timer' : 'Mulai Timer'}
                </button>
            </div>
            <div class="bg-gray-800/50 rounded-2xl p-3 text-center">
                <p class="text-xs text-gray-300">${getScoringHint(state.selectedSport)}</p>
            </div>
        </div>
      </main>
       <footer class="p-6">
          <button id="end-match-btn" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-4 rounded-lg transition-colors duration-300">
            Akhiri Pertandingan
          </button>
        </footer>
    </div>
    <div id="ad-placeholder" class="hidden h-full w-full bg-gray-900 text-white flex-col items-center justify-center text-center p-8">
      <div class="animate-pulse mb-4">
        <svg class="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
      </div>
      <h2 class="text-2xl font-bold mb-2">Menyimpan Hasil Pertandingan...</h2>
      <p class="text-gray-400">Ini hanya butuh beberapa saat.</p>
    </div>
  `;
}

const renderHistoryDetailScreen = () => {
    const game = state.selectedGame;
    return `
    <div class="h-full w-full bg-gradient-to-b from-gray-800 to-gray-900 text-white overflow-y-auto">
      <header class="relative flex items-center justify-center p-4 pt-12">
        <button id="back-to-history-btn" class="absolute left-4 top-1/2 -translate-y-1/2 mt-4 p-2 rounded-full bg-white/10 hover:bg-white/20" aria-label="Back to history">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white"><path d="m15 18-6-6 6-6"></path></svg>
        </button>
        <div class="text-center mt-4">
          <h1 class="text-lg font-bold text-white">${game.sport}</h1>
          <div class="flex items-center justify-center gap-2 text-sm text-gray-300">
            <span>${game.date}</span>
            <span>•</span>
            <span>${formatTime(game.durationSeconds)}</span>
          </div>
        </div>
      </header>
      <main class="p-6">
        <div class="flex justify-between items-center mb-8">
          <div class="flex flex-col items-center w-1/3 text-center">
             <div class="w-20 h-20 rounded-full mb-2 bg-gray-700 flex items-center justify-center text-3xl font-bold">${game.teamA.name.charAt(0)}</div>
            <h2 class="text-xl font-bold">${game.teamA.name}</h2>
          </div>
          <div class="text-5xl font-extrabold text-center w-1/3">
            <span class="tracking-tighter">
              ${game.teamA.score} - ${game.teamB.score}
            </span>
          </div>
          <div class="flex flex-col items-center w-1/3 text-center">
            <div class="w-20 h-20 rounded-full mb-2 bg-gray-700 flex items-center justify-center text-3xl font-bold">${game.teamB.name.charAt(0)}</div>
            <h2 class="text-xl font-bold">${game.teamB.name}</h2>
          </div>
        </div>
        <div class="bg-gray-800/50 rounded-2xl p-4 mt-10">
          <h3 class="text-lg font-bold mb-2 text-center">Pertandingan Selesai</h3>
          <div class="text-center text-gray-400">
            <p>Ini adalah hasil akhir dari pertandingan.</p>
          </div>
        </div>
      </main>
    </div>
  `;
}


// --- MAIN APP LOGIC ---
const render = () => {
  let content = '';
  switch (state.currentPage) {
    case 'home':
      content = renderHomeScreen();
      break;
    case 'history':
      content = renderHistoryScreen();
      break;
    case 'settings':
      content = renderSettingsScreen();
      break;
    case 'match-setup':
        content = renderMatchSetupScreen();
        break;
    case 'scoreboard':
        content = renderScoreboardScreen();
        break;
    case 'history-detail':
        content = renderHistoryDetailScreen();
        break;
  }
  appContainer.innerHTML = content;
  attachEventListeners();
};

const attachEventListeners = () => {
    // Nav Bar buttons
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', () => {
            const screen = button.dataset.screen;
            state.activeMainScreen = screen;
            state.currentPage = screen;
            render();
        });
    });

    // Page-specific listeners
    if (state.currentPage === 'home') {
        document.querySelectorAll('.sport-card').forEach(card => {
            card.addEventListener('click', () => {
                state.selectedSport = card.dataset.sportName;
                state.currentPage = 'match-setup';
                render();
            });
        });
    }

    if (state.currentPage === 'match-setup') {
        const teamAInput = document.getElementById('teamA-input');
        const teamBInput = document.getElementById('teamB-input');
        const startBtn = document.getElementById('start-match-btn');

        const validateInputs = () => {
            startBtn.disabled = !(teamAInput.value.trim() && teamBInput.value.trim());
        };
        teamAInput.addEventListener('input', validateInputs);
        teamBInput.addEventListener('input', validateInputs);

        document.getElementById('back-to-home-btn').addEventListener('click', () => {
            state.currentPage = 'home';
            state.activeMainScreen = 'home';
            render();
        });

        startBtn.addEventListener('click', () => {
            state.match = { teamA: teamAInput.value.trim(), teamB: teamBInput.value.trim(), scoreA: 0, scoreB: 0, timer: 0, isTimerRunning: false };
            state.currentPage = 'scoreboard';
            render();
        });
    }
    
    if (state.currentPage === 'scoreboard') {
        document.querySelectorAll('.score-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const team = btn.dataset.team;
                const action = btn.dataset.action;
                if (team === 'A') {
                    state.match.scoreA = action === 'increment' ? state.match.scoreA + 1 : Math.max(0, state.match.scoreA - 1);
                    document.getElementById('scoreA').textContent = state.match.scoreA;
                } else {
                    state.match.scoreB = action === 'increment' ? state.match.scoreB + 1 : Math.max(0, state.match.scoreB - 1);
                    document.getElementById('scoreB').textContent = state.match.scoreB;
                }
            });
        });

        document.getElementById('timer-toggle-btn').addEventListener('click', (e) => {
            state.match.isTimerRunning = !state.match.isTimerRunning;
            e.target.textContent = state.match.isTimerRunning ? 'Jeda Timer' : 'Mulai Timer';
            if (state.match.isTimerRunning) {
                state.timerInterval = setInterval(() => {
                    state.match.timer++;
                    document.getElementById('timer-display').textContent = formatTime(state.match.timer);
                }, 1000);
            } else {
                clearInterval(state.timerInterval);
            }
        });
        
        document.getElementById('end-match-btn').addEventListener('click', () => {
             clearInterval(state.timerInterval);
             state.match.isTimerRunning = false;
             document.getElementById('scoreboard-content').style.display = 'none';
             document.getElementById('ad-placeholder').style.display = 'flex';
             
             setTimeout(() => {
                const newGame = {
                    id: new Date().toISOString(),
                    sport: state.selectedSport,
                    teamA: { name: state.match.teamA, score: state.match.scoreA },
                    teamB: { name: state.match.teamB, score: state.match.scoreB },
                    date: new Date().toLocaleDateString('id-ID', {day: '2-digit', month: 'long', year: 'numeric'}),
                    durationSeconds: state.match.timer,
                };
                state.history.unshift(newGame);
                saveHistoryToLocalStorage(state.history);
                state.currentPage = 'history';
                state.activeMainScreen = 'history';
                render();
             }, 2500);
        });
        
        document.getElementById('back-to-home-confirm-btn').addEventListener('click', () => {
            if (window.confirm("Apakah Anda yakin ingin keluar? Progres tidak akan disimpan.")) {
                clearInterval(state.timerInterval);
                state.currentPage = 'home';
                state.activeMainScreen = 'home';
                render();
            }
        });
    }

    if(state.currentPage === 'history') {
        document.querySelectorAll('.history-card').forEach(card => {
            card.addEventListener('click', () => {
                const gameId = card.dataset.gameId;
                state.selectedGame = state.history.find(g => g.id === gameId);
                state.currentPage = 'history-detail';
                render();
            });
        });
    }

    if (state.currentPage === 'history-detail') {
        document.getElementById('back-to-history-btn').addEventListener('click', () => {
            state.currentPage = 'history';
            state.activeMainScreen = 'history';
            render();
        });
    }

};


// --- INITIALIZE APP ---
document.addEventListener('DOMContentLoaded', () => {
  render();
});