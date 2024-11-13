import { BrowserWindow } from 'electron';
import path from 'path';

export enum WindowType {
  Create = 0,
  Edit,
}
declare const PRODUCT_EDIT_PRELOAD_WEBPACK_ENTRY: string;
declare const PRODUCT_EDIT_WEBPACK_ENTRY: string;

const preloadScriptPath =
  process.env.RUN_CONFIG === 'bare_webpack' ? path.resolve(__dirname, '..', 'preload', 'productEdit.js') : PRODUCT_EDIT_PRELOAD_WEBPACK_ENTRY;
const rendererScriptPath = process.env.RUN_CONFIG === 'bare_webpack' ? 'http://localhost:3333/productEdit.html' : PRODUCT_EDIT_WEBPACK_ENTRY;

export class ProductWindow extends BrowserWindow {
  constructor(parent: BrowserWindow) {
    super({
      parent,
      width: 800,
      height: 600,
      modal: true,
      title: 'ProductWindow',
      webPreferences: {
        preload: preloadScriptPath,
        nodeIntegration: false,
        contextIsolation: true,
      },
    });

    this.webContents.openDevTools();
    void this.loadURL(rendererScriptPath);
  }

  public close = () => super.close();
}
