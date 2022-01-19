import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api, CreateProductPayload, GetProductsPayload, UpdateProductPayload } from 'api/index'
import { IProductsWithPagination } from 'types'
import { IProduct } from './../../../types'

export const fetchProducts = createAsyncThunk<IProductsWithPagination, GetProductsPayload>(
  'products/fetchProducts',
  async (payload) => {
    const products = await Api.getProducts(payload)
    return products
  }
)

export const fetchCreateProduct = createAsyncThunk<IProduct, CreateProductPayload>(
  'products/fetchCreateProduct',
  async (payload) => {
    const product = await Api.createProduct(payload)
    return product
  }
)

export const fetchUpdateProduct = createAsyncThunk<IProduct, UpdateProductPayload>(
  'products/fetchUpdateProduct',
  async (payload) => {
    const product = await Api.updateProduct(payload)
    return product
  }
)
