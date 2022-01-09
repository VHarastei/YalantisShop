import axios from 'axios'
import { IProduct, IProductsWithPagination } from 'types'

const instance = axios.create({
  baseURL: 'https://yalantis-react-school-api.yalantis.com/api/v1/',
})
export type GetProductsPayload = {
  page?: number
  perPage?: number
  origins?: string
  minPrice?: number
  maxPrice?: number
}

export const Api = {
  getProducts: (payload: GetProductsPayload): Promise<IProductsWithPagination> =>
    instance.get('products', { params: payload }).then(({ data }) => data),

  getProduct: (productId: string): Promise<IProduct> =>
    instance.get(`products/${productId}`).then(({ data }) => data),
}
