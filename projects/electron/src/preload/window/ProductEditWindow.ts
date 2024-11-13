import { ipcRenderer, contextBridge } from 'electron';
import { IProductEditWindowRendererToMainProcessApi, ProductEditWindowApiBridgeName } from '../../preload_renderer_shared/communication/ProductEditWindow';
import { Product } from '../../shared/Product';
import { ProductPreloadToMainChannel } from '../../main_preload_shared/communication/Product';

class ProductEditWindowRendererToMainProcessApi implements IProductEditWindowRendererToMainProcessApi {
  name = ProductEditWindowApiBridgeName;

  productCreated = (product: Product) => {
    ipcRenderer.send(ProductPreloadToMainChannel.ProductCreated, product);
  };

  productUpdated = (product: Product) => {
    ipcRenderer.send(ProductPreloadToMainChannel.ProductUpdated, product);
  };
}
const apiBridge = new ProductEditWindowRendererToMainProcessApi();
contextBridge.exposeInMainWorld(apiBridge.name, apiBridge);

window.addEventListener('keydown', (e) => {
  console.log('preload vrum', e.key);
  if (e.key === 'F12') {
    ipcRenderer.send('toggleDevTools', 'ProductWindow');
  }
});
