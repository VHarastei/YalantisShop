import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from 'api'
import { IProduct } from 'types'

export const fetchProduct = createAsyncThunk<IProduct, string>(
  'product/fetchProduct',
  async (productId) => {
    const product = await Api.getProduct(productId)
    return product
  }
)
