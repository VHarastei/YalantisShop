import { Api } from 'api'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IProduct } from 'types'
import originIcon from 'assets/origin.svg'
import editIcon from 'assets/edit.svg'
import publishedIcon from 'assets/published.svg'
import updatedIcon from 'assets/updated.svg'
import { format, parseISO } from 'date-fns'
import { ProductDescriptionItem } from './components/ProductDescriptionItem'
import { Preloader } from 'components/Preloader'
import { Paper } from 'components/Paper'
import { ErrorCard } from 'components/ErrorCard'
import { Button } from 'components/Button'

export const Product = () => {
  const { productId } = useParams()

  const [isError, setIsError] = useState(false)
  const [product, setProduct] = useState<IProduct | null>(null)

  const getProduct = useCallback(async () => {
    try {
      if (productId) {
        const res = await Api.getProduct(productId)
        setProduct(res)
      }
    } catch (err) {
      setIsError(true)
    }
  }, [productId])

  useEffect(() => {
    getProduct()
  }, [getProduct])

  if (isError) return <ErrorCard />

  return (
    <div>
      {product ? (
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
            <Button fullWidth>Add to Cart</Button>
          </Paper>
        </div>
      ) : (
        <Preloader />
      )}
    </div>
  )
}
