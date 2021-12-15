import React from 'react'

export const Preloader = () => {
  return (
    <div className="flex justify-center items-center mt-16">
      <div className="w-32 h-32 rounded-full border-t-4 border-b-4 border-green-500 animate-spin" />
    </div>
  )
}
