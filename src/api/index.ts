import { IProduct, IProductsWithPagination, Origin } from 'types'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://yalantis-react-school-api.yalantis.com/api/v1/',
})
export type GetProductsPayload = {
  page?: number
  perPage?: number
  origins?: Origin[]
  minPrice?: number
  maxPrice?: number
}

export const Api = {
  getProducts: ({
    page = 1,
    perPage = 20,
    origins = [],
    minPrice,
    maxPrice,
  }: GetProductsPayload): Promise<IProductsWithPagination> =>
    instance
      .get(
        `products?page=${page}&perPage=${perPage}&origins=${origins.join(',')}${
          minPrice ? `&minPrice=${minPrice}` : ''
        }${maxPrice ? `&maxPrice=${maxPrice}` : ''}`
      )
      .then(({ data }) => data),

  getProduct: (productId: string): Promise<IProduct> =>
    instance.get(`products/${productId}`).then(({ data }) => data),
}
