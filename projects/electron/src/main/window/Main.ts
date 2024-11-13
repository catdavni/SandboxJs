import path from 'path';
import { BrowserWindow } from 'electron';

declare const FUCKING_MAGIC_PRELOAD_WEBPACK_ENTRY: string;
declare const FUCKING_MAGIC_WEBPACK_ENTRY: string;

const preloadScriptPath =
  process.env.RUN_CONFIG === 'bare_webpack' ? path.resolve(__dirname, '..', 'preload', 'productMain.js') : FUCKING_MAGIC_PRELOAD_WEBPACK_ENTRY;
const rendererScriptPath = process.env.RUN_CONFIG === 'bare_webpack' ? 'http://localhost:3333/productMain.html' : FUCKING_MAGIC_WEBPACK_ENTRY;

export class MainWindow extends BrowserWindow {
  constructor() {
    super({
      width: 1024,
      height: 768,
      title: 'MainWindow',
      webPreferences: {
        preload: preloadScriptPath,
        nodeIntegration: false,
        contextIsolation: true,
      },
    });

    this.maximize();
    this.openDevTools();
    void this.loadURL(rendererScriptPath);
  }

  public openDevTools = () => {
    this.webContents.openDevTools();
  };
}
