import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct, IProductsWithPagination, Origin, Status } from 'types'
import { fetchProducts, fetchUpdateProduct } from './thunks'

export const productsAdapter = createEntityAdapter<IProduct>({
  selectId: (product) => product.id,
})

const initialState = productsAdapter.getInitialState({
  pagination: {
    totalItems: 0,
    page: 1,
    perPage: 25,
  },
  filters: {
    origins: [] as Origin[],
    minPrice: 0,
    maxPrice: 0,
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
    parseProductsSearchParams: (state, action: PayloadAction<[string, string][]>) => {
      for (let pair of action.payload) {
        switch (pair[0]) {
          case 'page':
            state.pagination.page = Number(pair[1])
            break
          case 'min':
            state.filters.minPrice = Number(pair[1])
            break
          case 'max':
            state.filters.maxPrice = Number(pair[1])
            break
          case 'origins':
            state.filters.origins = pair[1]?.split(',') as Origin[]
            break
        }
      }
    },
    resetProductsState: (state) => {
      state.filters = initialState.filters
      state.pagination = initialState.pagination
      state.status = Status.NEVER
      state.error = null
      productsAdapter.removeAll(state)
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
      )
      .addCase(fetchUpdateProduct.fulfilled.type, productsAdapter.setOne),
})

export default productsSlice.reducer

export const {
  changeProductsCurrentPage,
  changeProductsItemsPerPage,
  changeProductsOriginFilter,
  changeProductsMinPriceFilter,
  changeProductsMaxPriceFilter,
  parseProductsSearchParams,
  clearProductsFilters,
  resetProductsState,
} = productsSlice.actions
