import { createSlice } from '@reduxjs/toolkit'
import { IOrder, Status } from 'types'
import { orderActions } from './saga'

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
      .addCase(orderActions.success, (state, action) => {
        state.data = action.payload.data
        state.status = Status.SUCCESS
      })
      .addCase(orderActions.start, (state) => {
        state.status = Status.LOADING
      })
      .addCase(orderActions.error, (state) => {
        state.status = Status.ERROR
      }),

  // Change logic according to HM#4

  // .addCase(fetchOrder.fulfilled.type, (state, action: PayloadAction<IOrder>) => {
  //   state.data = action.payload
  //   state.status = Status.SUCCESS
  // })
  // .addCase(fetchOrder.pending.type, (state) => {
  //   state.status = Status.LOADING
  // })
  // .addCase(
  //   fetchOrder.rejected.type,
  //   (state, action: PayloadAction<never, never, never, { message: string }>) => {
  //     state.error = action.error.message
  //     state.status = Status.ERROR
  //   }
  // ),
})

export default orderSlice.reducer
