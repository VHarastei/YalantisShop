import axios from 'axios'
import { IOrder, Origin, IProduct, IProductsWithPagination, IOrderPiece, IOrders } from 'types'

const instance = axios.create({
  baseURL: 'https://yalantis-react-school-api.yalantis.com/api/v1/',
  headers: { Authorization: process.env.REACT_APP_API_KEY as string },
})

export type GetProductsPayload = {
  page?: number
  perPage?: number
  origins?: string
  minPrice?: number
  maxPrice?: number
  editable?: boolean
}

export type CreateProductPayload = {
  product: {
    name: string
    price: number
    origin: Origin
  }
}

export type UpdateProductPayload = {
  productId: string
  payload: CreateProductPayload
}

export type CreateOrderPayload = {
  order: {
    pieces: IOrderPiece[]
  }
}

export const Api = {
  getProducts: (payload: GetProductsPayload): Promise<IProductsWithPagination> =>
    instance.get('products', { params: payload }).then(({ data }) => data),

  getProduct: (productId: string): Promise<IProduct> =>
    instance.get(`products/${productId}`).then(({ data }) => data),

  createProduct: (payload: CreateProductPayload): Promise<IProduct> =>
    instance.post('products', payload).then(({ data }) => data),

  updateProduct: ({ productId, payload }: UpdateProductPayload): Promise<IProduct> =>
    instance.patch(`products/${productId}`, payload).then(({ data }) => data),

  createOrder: (payload: CreateOrderPayload): Promise<IOrder> =>
    instance.post('orders', payload).then(({ data }) => data),

  getOrders: (): Promise<IOrders> => instance.get('orders').then(({ data }) => data),
}
