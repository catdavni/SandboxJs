const path = require('path');
const { app, ipcMain, BrowserWindow } = require('electron');

const preloadScriptPath =
  process.env.RUN_CONFIG === 'bare_webpack' ? path.resolve(__dirname, '..', 'preload', 'preload.js') : FUCKING_MAGIC_PRELOAD_WEBPACK_ENTRY;
const rendererScriptPath = process.env.RUN_CONFIG === 'bare_webpack' ? 'http://localhost:3333' : FUCKING_MAGIC_WEBPACK_ENTRY;

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'MainWindow',
    webPreferences: {
      // preload: FUCKING_MAGIC_PRELOAD_WEBPACK_ENTRY, // hate fucking magic
      preload: preloadScriptPath,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // and load the index.html of the app.
  // mainWindow.loadURL(FUCKING_MAGIC_WEBPACK_ENTRY); // hate fucking magic
  const pathToHtml = 'http://localhost:3333'; //path.resolve(__dirname, '..', 'renderer', 'index.html');
  mainWindow.loadURL(rendererScriptPath);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
});

ipcMain.on('toggleDevTools', (event, windowName) => {
  const window = BrowserWindow.getAllWindows().find((window) => window.title === windowName);
  if (window) {
    window.webContents.toggleDevTools();
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
