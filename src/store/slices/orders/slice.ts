import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOrder, IOrders, Status } from 'types'
import { fetchOrders } from './thunks'

export const ordersAdapter = createEntityAdapter<IOrder>({
  selectId: (order) => order.id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
})

const initialState = ordersAdapter.getInitialState({
  status: Status.NEVER,
  error: null as null | string,
})

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchOrders.fulfilled.type, (state, action: PayloadAction<IOrders>) => {
        ordersAdapter.setAll(state, action.payload.items)
        state.status = Status.SUCCESS
      })
      .addCase(fetchOrders.pending.type, (state) => {
        state.status = Status.LOADING
      })
      .addCase(
        fetchOrders.rejected.type,
        (state, action: PayloadAction<never, never, never, { message: string }>) => {
          state.error = action.error.message
          state.status = Status.ERROR
        }
      ),
})

export default ordersSlice.reducer
