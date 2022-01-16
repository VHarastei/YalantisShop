import React from 'react'
import { Header } from './Header'

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col h-full min-h-screen tracking-normal leading-normal bg-gray-200">
      <Header />
      <main className="px-4 mx-auto mt-20 mb-auto w-full max-w-6xl">{children}</main>
    </div>
  )
}
