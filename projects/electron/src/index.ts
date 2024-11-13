import { app, ipcMain, BrowserWindow } from 'electron';
import { ProductManager } from './main/ProductManager';

let manager: ProductManager;

app.whenReady().then(() => {
  manager = new ProductManager();
});

ipcMain.on('toggleDevTools', (event, windowName) => {
  const window = BrowserWindow.getAllWindows().find((window) => window.title === windowName);
  if (window) {
    window.webContents.toggleDevTools();
  }
});

// Quit when all window are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
