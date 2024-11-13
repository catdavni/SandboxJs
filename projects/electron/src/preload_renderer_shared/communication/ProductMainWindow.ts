import { Product } from '../../shared/Product';
import { getRendererToMainApi } from '../windowHelpers';

export const ProductMainWindowApiBridgeName = 'ProductMainWindowApiBridge';

export interface IMainWindowRendererToMainProcessProductApi {
  name: string;
  getProductsRequest(): void;
  createProductRequest(): void;
  deleteProductRequest(product: Product): void;
  editProductRequest(product: Product): void;
  onProductListUpdated(handler: (products: Product[]) => void): void;
}

export const getApiBridge = () => getRendererToMainApi<IMainWindowRendererToMainProcessProductApi>(ProductMainWindowApiBridgeName);
