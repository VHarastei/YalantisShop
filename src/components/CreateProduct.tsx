import React from 'react'
import { CreateProductForm } from './forms/CreateProductForm'
import { TriggerableModal } from './TriggerableModal'

export const CreateProduct = React.memo(() => {
  return (
    <TriggerableModal
      title="Create Product"
      trigger={(handleOpenModal) => (
        <button
          className="text-xl font-medium opacity-80 hover:opacity-100 transition-all"
          onClick={handleOpenModal}
        >
          Create Product
        </button>
      )}
    >
      {(handleCloseModal) => <CreateProductForm onClose={handleCloseModal} />}
    </TriggerableModal>
  )
})
