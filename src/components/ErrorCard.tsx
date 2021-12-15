import React from 'react'
import { Button } from './Button'
import { Paper } from './Paper'

export const ErrorCard = () => {
  const handleReload = () => {
    window.location.reload()
  }

  return (
    <div className="flex justify-center items-center mt-28">
      <Paper>
        <h1 className="mb-4 text-4xl font-semibold text-green-500">
          Oops! Something went wrong...
        </h1>
        <Button fullWidth onClick={handleReload}>
          Try again
        </Button>
      </Paper>
    </div>
  )
}
