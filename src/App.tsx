import { Layout } from 'components/Layout'
import { Cart } from 'pages/Cart'
import { Product } from 'pages/Product'
import { Products } from 'pages/Products'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CartProvider } from 'state'

const App = () => {
  return (
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/products/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Products />} />
        </Routes>
      </Layout>
    </CartProvider>
  )
}

export default App
