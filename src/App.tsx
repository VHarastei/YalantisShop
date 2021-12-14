import { Layout } from 'components/Layout'
import { Products } from 'pages/Products'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/products/:productId" element={<div>product</div>} />
        <Route path="/cart" element={<div>cart</div>} />
        <Route path="/" element={<Products />} />
      </Routes>
    </Layout>
  )
}

export default App
