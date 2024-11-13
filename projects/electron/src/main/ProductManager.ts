import { ipcMain } from 'electron';
import { Product } from '../shared/Product';
import { ProductPreloadToMainChannel } from '../main_preload_shared/communication/Product';
import IpcMainEvent = Electron.IpcMainEvent;
import { MainWindow } from './window/Main';
import { ProductWindow } from './window/Product';

export class ProductManager {
  private products: Product[] = [
    { id: 1, name: 'Apple', price: 0.5 },
    { id: 2, name: 'Banana', price: 0.3 },
    { id: 3, name: 'Cherry', price: 0.1 },
  ];
  private readonly mainWindow: MainWindow;

  constructor() {
    this.mainWindow = new MainWindow();

    ipcMain.on(ProductPreloadToMainChannel.GetProducts, (event) => {
      event.reply(ProductPreloadToMainChannel.ProductListUpdates, this.products);
    });

    ipcMain.on(ProductPreloadToMainChannel.CreateProduct, (event) => {
      this.createProduct(event);
    });

    ipcMain.on(ProductPreloadToMainChannel.DeleteProduct, (event, product: Product) => {
      this.products = this.products.filter((p) => p.id !== product.id);
      event.reply(ProductPreloadToMainChannel.ProductListUpdates, this.products);
    });
  }

  private createProduct = (mainWindowEvent: IpcMainEvent) => {
    const productWindow = new ProductWindow(this.mainWindow);

    const productCreatedHandler = (event: IpcMainEvent, product: Product) => {
      this.products.push(product);
      mainWindowEvent.reply(ProductPreloadToMainChannel.ProductListUpdates, this.products);
      productWindow.close();
    };

    productWindow.on('close', (e) => {
      ipcMain.off(ProductPreloadToMainChannel.ProductCreated, productCreatedHandler);
    });
    ipcMain.on(ProductPreloadToMainChannel.ProductCreated, productCreatedHandler);
  };
}
