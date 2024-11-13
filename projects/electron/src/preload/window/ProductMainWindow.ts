import { ipcRenderer, contextBridge } from 'electron';
import { ProductMainWindowApiBridgeName, IMainWindowRendererToMainProcessProductApi } from '../../preload_renderer_shared/communication/ProductMainWindow';
import { ProductPreloadToMainChannel } from '../../main_preload_shared/communication/Product';
import { Product } from '../../shared/Product';

// Debug preload script
// Trigger HMR to trigger debugger to attach (Dev tools must be open)
//debugger;

class MainWindowRendererToMainProcessProductApi implements IMainWindowRendererToMainProcessProductApi {
  name = ProductMainWindowApiBridgeName;
  productCreatedHandlers: ((products: Product[]) => void)[] = [];

  constructor() {
    ipcRenderer.on(ProductPreloadToMainChannel.ProductListUpdates, (_, products: Product[]) => {
      this.productCreatedHandlers.forEach((handler) => handler(products));
    });
  }

  getProductsRequest = () => {
    ipcRenderer.send(ProductPreloadToMainChannel.GetProducts);
  };

  createProductRequest = () => {
    ipcRenderer.send(ProductPreloadToMainChannel.CreateProduct);
  };

  deleteProductRequest = (product: Product) => {
    ipcRenderer.send(ProductPreloadToMainChannel.DeleteProduct, product);
  };

  editProductRequest = (product: Product) => {
    ipcRenderer.send(ProductPreloadToMainChannel.UpdateProduct, product);
  };

  onProductListUpdated = (handler: (products: Product[]) => void) => {
    this.productCreatedHandlers.push(handler);
  };
}

const rendererToMainProductApi: IMainWindowRendererToMainProcessProductApi = new MainWindowRendererToMainProcessProductApi();

contextBridge.exposeInMainWorld(rendererToMainProductApi.name, rendererToMainProductApi);

// MOVE TO WINDOW BASE CLASS
window.addEventListener('keydown', (e) => {
  console.log('preload vrum', e.key);
  if (e.key === 'F12') {
    ipcRenderer.send('toggleDevTools', 'MainWindow');
  }
});
