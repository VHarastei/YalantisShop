export interface IProduct {
  id: string
  isEditable: boolean
  name: string
  price: number
  origin: 'europe' | 'usa' | 'africa' | 'asia'
  createdAt: string
  updatedAt: string
}

export interface IProductsWithPagination {
  items: IProduct[]
  totalItems: number
  page: number
  perPage: number
}

export interface IPagination {
  numberOfItems: number
  itemsPerPage: number
  currentPage: number
  numberOfButtons: number
}
