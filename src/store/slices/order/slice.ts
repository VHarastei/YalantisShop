import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOrder, Status } from 'types'
import { fetchOrder } from './thunks'

type OrderSliceState = {
  data: IOrder | undefined
  status: Status
  error: null | string
}

const initialState: OrderSliceState = {
  data: undefined,
  status: Status.NEVER,
  error: null,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchOrder.fulfilled.type, (state, action: PayloadAction<IOrder>) => {
        state.data = action.payload
        state.status = Status.SUCCESS
      })
      .addCase(fetchOrder.pending.type, (state) => {
        state.status = Status.LOADING
      })
      .addCase(
        fetchOrder.rejected.type,
        (state, action: PayloadAction<never, never, never, { message: string }>) => {
          state.error = action.error.message
          state.status = Status.ERROR
        }
      ),
})

export default orderSlice.reducer
