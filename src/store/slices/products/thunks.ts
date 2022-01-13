import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api, GetProductsPayload } from 'api/index'
import { IProductsWithPagination } from 'types'

export const fetchProducts = createAsyncThunk<IProductsWithPagination, GetProductsPayload>(
  'products/fetchProducts',
  async (payload) => {
    const products = await Api.getProducts(payload)
    return products
  }
)
