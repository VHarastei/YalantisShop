import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { IOrder, Status } from 'types'

export const ordersAdapter = createEntityAdapter<IOrder>({
  selectId: (order) => order.id,
})

const initialState = ordersAdapter.getInitialState({
  status: Status.NEVER,
  error: null as null | string,
})

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {},
})

export default ordersSlice.reducer
