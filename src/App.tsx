import { Layout } from 'components/Layout'
import { Product } from 'pages/Product'
import { Products } from 'pages/Products'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/cart" element={<div>cart</div>} />
        <Route path="/" element={<Products />} />
      </Routes>
    </Layout>
  )
}

export default App
