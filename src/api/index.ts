import { IProductsWithPagination } from './../types'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://yalantis-react-school-api.yalantis.com/api/v1/',
})
export type GetProductsPayload = { page?: number; perPage?: number }

export const Api = {
  getProducts: ({ page = 1, perPage = 20 }: GetProductsPayload): Promise<IProductsWithPagination> =>
    instance.get(`products?page=${page}&perPage=${perPage}`).then(({ data }) => data),
}
