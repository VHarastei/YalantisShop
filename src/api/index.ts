import axios from 'axios'
import { IOrder, IOrders, IProduct, IProductsOrigins, IProductsWithPagination } from 'types'
import {
  CreateOrderPayload,
  CreateProductPayload,
  GetProductsPayload,
  UpdateProductPayload,
} from './types'

const instance = axios.create({
  baseURL: 'https://yalantis-react-school-api.yalantis.com/api/v1/',
  headers: { Authorization: process.env.REACT_APP_API_KEY as string },
})

export const Api = {
  getProducts: (payload: GetProductsPayload): Promise<IProductsWithPagination> =>
    instance.get('products', { params: payload }).then(({ data }) => data),

  getProduct: (productId: string): Promise<IProduct> =>
    instance.get(`products/${productId}`).then(({ data }) => data),

  createProduct: (payload: CreateProductPayload): Promise<IProduct> =>
    instance.post('products', payload).then(({ data }) => data),

  updateProduct: ({ productId, payload }: UpdateProductPayload): Promise<IProduct> =>
    instance.patch(`products/${productId}`, payload).then(({ data }) => data),

  getProductsOrigins: (): Promise<IProductsOrigins> =>
    instance.get(`products-origins`).then(({ data }) => data),

  getOrders: (): Promise<IOrders> => instance.get('orders').then(({ data }) => data),

  getOrder: (orderId: string): Promise<IOrder> =>
    instance.get(`orders/${orderId}`).then(({ data }) => data),

  createOrder: (payload: CreateOrderPayload): Promise<IOrder> =>
    instance.post('orders', payload).then(({ data }) => data),
}
