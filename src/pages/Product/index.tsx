import editIcon from 'assets/edit.svg'
import originIcon from 'assets/origin.svg'
import publishedIcon from 'assets/published.svg'
import updatedIcon from 'assets/updated.svg'
import { Button } from 'components/Button'
import { ErrorCard } from 'components/ErrorCard'
import { Paper } from 'components/Paper'
import { Preloader } from 'components/Preloader'
import { format, parseISO } from 'date-fns'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { addCartProduct } from 'store/slices/cartSlice'
import { fetchProduct, selectProduct, selectProductStatus } from 'store/slices/productSlice'
import { Status } from 'types'
import { ProductDescriptionItem } from './components/ProductDescriptionItem'

export const Product = () => {
  const params = useParams()
  const productId = params.productId as unknown as string

  const dispatch = useAppDispatch()
  const product = useAppSelector((state) => selectProduct(state, productId))
  const status = useAppSelector(selectProductStatus)

  useEffect(() => {
    if (!product) {
      dispatch(fetchProduct(productId))
    }
  }, [productId, dispatch, product])

  if (!product) return <Preloader />
  const handleAddProduct = () => {
    dispatch(addCartProduct(product))
  }

  if (status === Status.ERROR) return <ErrorCard />

  return (
    <div className="m-auto max-w-xl">
      <h1 className="my-4 text-4xl font-bold text-center text-green-500">{product.name}</h1>
      <Paper>
        <div className="flex">
          <ProductDescriptionItem
            title="Origin"
            value={product.origin[0].toUpperCase() + product.origin.slice(1)}
            icon={originIcon}
          />
          <ProductDescriptionItem
            title="Published"
            value={format(parseISO(product.createdAt), 'd MMMM yyyy')}
            icon={publishedIcon}
          />
        </div>
        <div className="flex">
          <ProductDescriptionItem
            title="Editable"
            value={product.isEditable ? 'Yes' : 'No'}
            icon={editIcon}
          />
          <ProductDescriptionItem
            title="Updated"
            value={format(parseISO(product.updatedAt), 'd MMMM yyyy')}
            icon={updatedIcon}
          />
        </div>
        <div className="mb-1">
          <span className="mr-2 text-xl font-semibold text-gray-500">Price:</span>
          <span className="text-3xl font-bold">{`${product.price}$`}</span>
        </div>
        <Button onClick={handleAddProduct} fullWidth>
          Add to Cart
        </Button>
      </Paper>
    </div>
  )
}
