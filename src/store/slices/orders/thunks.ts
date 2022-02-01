import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from 'api'
import { CreateOrderPayload } from 'api/types'
import { IOrder, IOrders } from 'types'

export const fetchOrders = createAsyncThunk<IOrders>('orders/fetchOrders', async () => {
  const orders = await Api.getOrders()
  return orders
})

export const fetchCreateOrder = createAsyncThunk<IOrder, CreateOrderPayload>(
  'orders/fetchCreateOrder',
  async (payload) => {
    const order = await Api.createOrder(payload)
    return order
  }
)
