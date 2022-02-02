import { Layout } from 'components/Layout'
import { Cart } from 'pages/Cart'
import { MyProducts } from 'pages/MyProducts'
import { Order } from 'pages/Order'
import { Orders } from 'pages/Orders'
import { Product } from 'pages/Product'
import { Products } from 'pages/Products'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/orders/:orderId" element={<Order />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/" element={<Products />} />
      </Routes>
    </Layout>
  )
}

export default App
