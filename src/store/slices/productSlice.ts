import { selectProductById } from 'store/slices/productsSlice'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Api } from 'api'
import { IProduct, Status } from 'types'
import { RootState } from '../index'

type ProductSliceState = {
  data: IProduct | undefined
  status: Status
  error: null | string
}

const initialState: ProductSliceState = {
  data: undefined,
  status: Status.NEVER,
  error: null,
}

export const fetchProduct = createAsyncThunk<IProduct, string>(
  'product/fetchProduct',
  async (productId) => {
    const product = await Api.getProduct(productId)
    return product
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchProduct.fulfilled.type, (state, action: PayloadAction<IProduct>) => {
        state.data = action.payload
        state.status = Status.SUCCESS
      })
      .addCase(fetchProduct.pending.type, (state) => {
        state.status = Status.LOADING
      })
      .addCase(
        fetchProduct.rejected.type,
        (state, action: PayloadAction<never, never, never, { message: string }>) => {
          state.error = action.error.message
          state.status = Status.ERROR
        }
      ),
})

export default productSlice.reducer

export const selectProduct = (state: RootState, productId: string) => {
  let product = selectProductById(state, productId)
  if (!product) product = state.product.data
  return product
}
export const selectProductError = (state: RootState) => state.product.error
export const selectProductStatus = (state: RootState) => state.product.status
