import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api, CreateOrderPayload } from 'api'
import { IOrder } from 'types'

export const fetchCreateOrder = createAsyncThunk<IOrder, CreateOrderPayload>(
  'orders/fetchCreateOrder',
  async (payload) => {
    const order = await Api.createOrder(payload)
    return order
  }
)
