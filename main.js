const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL('http://localhost:3000');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function startServer() {
  const server = spawn('node', ['app.js'], {
    shell: true,
    env: process.env,
    stdio: 'inherit',
  });

  // server stdout'u dinlemek yerine, biraz gecikme ile pencereyi açmak en garantili yoldur:
  setTimeout(() => {
    createWindow();
  }, 2000); // 2 saniye bekle, sonra Electron pencereyi aç
}

app.whenReady().then(startServer);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
