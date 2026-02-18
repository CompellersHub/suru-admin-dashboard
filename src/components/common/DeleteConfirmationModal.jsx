/* eslint-disable react/prop-types */
import Modal from '../common/Modal'

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, isPending }) => {
  return (
    <Modal
      className='w-40'
      isOpen={isOpen}
      onClose={onClose}
      title='Confirm Deletion'
    >
      <div className='flex flex-col items-center justify-center gap-5 p-5'>
        <p>Are you sure you want to delete this product?</p>
        <div className='flex gap-5'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-2 bg-red-500 hover:bg-red-900 text-white rounded'
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteConfirmationModal
