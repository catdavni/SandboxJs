import { Product } from '../../shared/Product';
import { getRendererToMainApi } from '../windowHelpers';

export const ProductEditWindowApiBridgeName = 'ProductEditWindowApiBridge';

export interface IProductEditWindowRendererToMainProcessApi {
  name: string;
  productCreated(product: Product): void;
  productUpdated(product: Product): void;
}

export const getApiBridge = () => getRendererToMainApi<IProductEditWindowRendererToMainProcessApi>(ProductEditWindowApiBridgeName);
