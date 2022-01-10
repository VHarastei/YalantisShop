import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct, IProductsWithPagination, Origin, Status } from 'types'
import { fetchProducts } from './thunks'
const query = new URLSearchParams(window.location.search)

export const productsAdapter = createEntityAdapter<IProduct>({
  selectId: (product) => product.id,
})

const initialState = productsAdapter.getInitialState({
  pagination: {
    totalItems: 0,
    page: Number(query.get('page')) || 1,
    perPage: 25,
  },
  filters: {
    origins: (query.get('origins')?.split(',') || []) as Origin[],
    minPrice: Number(query.get('min')) || 0,
    maxPrice: Number(query.get('max')) || 0,
  },
  status: Status.NEVER,
  error: null as null | string,
})

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    changeProductsCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload
    },
    changeProductsItemsPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.perPage = action.payload
    },
    changeProductsOriginFilter: (state, action: PayloadAction<Origin[]>) => {
      state.filters.origins = action.payload
    },
    changeProductsMinPriceFilter: (state, action: PayloadAction<number>) => {
      state.filters.minPrice = action.payload
    },
    changeProductsMaxPriceFilter: (state, action: PayloadAction<number>) => {
      state.filters.maxPrice = action.payload
    },
    clearProductsFilters: (state) => {
      state.filters.origins = []
      state.filters.minPrice = 0
      state.filters.maxPrice = 0
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

export const {
  changeProductsCurrentPage,
  changeProductsItemsPerPage,
  changeProductsOriginFilter,
  changeProductsMinPriceFilter,
  changeProductsMaxPriceFilter,
  clearProductsFilters,
} = productsSlice.actions
