import { GetProductsPayload, Api } from 'api/index'
import { IProductsWithPagination } from 'types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk<IProductsWithPagination, GetProductsPayload>(
  'products/fetchProducts',
  async (payload) => {
    const products = await Api.getProducts(payload)
    return products
  }
)
