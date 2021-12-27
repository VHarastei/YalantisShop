import { RootState } from '../index'
import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct, IProductsWithPagination, Status } from 'types'
import { Api, GetProductsPayload } from 'api'

const productsAdapter = createEntityAdapter<IProduct>({
  selectId: (product) => product.id,
})

const initialState = productsAdapter.getInitialState({
  pagination: {
    totalItems: 0,
    page: 0,
    perPage: 0,
  },
  status: Status.NEVER,
  error: null as null | string,
})

export const fetchProducts = createAsyncThunk<IProductsWithPagination, GetProductsPayload>(
  'products/fetchProducts',
  async (payload) => {
    const products = await Api.getProducts(payload)
    return products
  }
)

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductsStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload
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
export const { setProductsStatus } = productsSlice.actions
export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors<RootState>((state) => state.products)

export const selectProductsPagination = (state: RootState) => state.products.pagination
export const selectProductsError = (state: RootState) => state.products.error
export const selectProductsStatus = (state: RootState) => state.products.status
