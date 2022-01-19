import { Layout } from 'components/Layout'
import { Cart } from 'pages/Cart'
import { MyProducts } from 'pages/MyProducts'
import { Product } from 'pages/Product'
import { Products } from 'pages/Products'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/" element={<Products />} />
      </Routes>
    </Layout>
  )
}

export default App
