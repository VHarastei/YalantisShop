import { IProduct, IProductsWithPagination, Origin } from 'types'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://yalantis-react-school-api.yalantis.com/api/v1/',
})
export type GetProductsPayload = { page?: number; perPage?: number; origins?: Origin[] }

export const Api = {
  getProducts: ({
    page = 1,
    perPage = 20,
    origins = [],
  }: GetProductsPayload): Promise<IProductsWithPagination> =>
    instance
      .get(`products?page=${page}&perPage=${perPage}&origins=${origins.join(',')}`)
      .then(({ data }) => data),

  getProduct: (productId: string): Promise<IProduct> =>
    instance.get(`products/${productId}`).then(({ data }) => data),
}
