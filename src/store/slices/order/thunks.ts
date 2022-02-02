import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from 'api'
import { IOrder } from 'types'

export const fetchOrder = createAsyncThunk<IOrder, string>('order/fetchOrder', async (orderId) => {
  const order = await Api.getOrder(orderId)
  return order
})
