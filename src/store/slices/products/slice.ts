import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct, IProductsWithPagination, Status } from 'types'
import { fetchProducts } from './thunks'

export const productsAdapter = createEntityAdapter<IProduct>({
  selectId: (product) => product.id,
})

const initialState = productsAdapter.getInitialState({
  pagination: {
    totalItems: 0,
    page: Number(new URLSearchParams(window.location.search).get('page')) || 1,
    perPage: 25,
  },
  status: Status.NEVER,
  error: null as null | string,
})

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload
    },
    changeItemsPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.perPage = action.payload
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        fetchProducts.fulfilled.type,
        (state, action: PayloadAction<IProductsWithPagination>) => {
          const { items, ...pagination } = action.payload
          state.pagination = pagination

          productsAdapter.setAll(state, items)
          state.status = Status.SUCCESS
        }
      )
      .addCase(fetchProducts.pending.type, (state) => {
        state.status = Status.LOADING
      })
      .addCase(
        fetchProducts.rejected.type,
        (state, action: PayloadAction<never, never, never, { message: string }>) => {
          state.error = action.error.message
          state.status = Status.ERROR
        }
      ),
})

export default productsSlice.reducer

export const { changeCurrentPage, changeItemsPerPage } = productsSlice.actions
