import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct, Status } from 'types'
import { fetchProduct } from './thunks'

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
