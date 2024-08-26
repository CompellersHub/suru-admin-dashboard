/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { toast } from 'react-toastify'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Modal from '../common/Modal'
import { useQueryClient } from '@tanstack/react-query'
import { useEditUploadProduct, useUpdateUpload } from '../../hooks/uploadApi'
import { useDeleteProduct } from '../../hooks/productApi'
import DeleteConfirmationModal from '../common/DeleteConfirmationModal'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const UploadProductDetailsModal = ({
  isOpen,
  onClose,
  productDetails,
  singleLoading,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState(
    productDetails?.description || ''
  )

  const { mutateAsync: updateProduct, isPending } = useUpdateUpload()
  const { mutateAsync: updateEdit, isPending: isSaving } =
    useEditUploadProduct()
  const { mutateAsync: deleteProduct, isPending: isLoading } =
    useDeleteProduct()

  const queryClient = useQueryClient()
  const updateUpload = async (id, query) => {
    try {
      const res = await updateProduct({ id, query })
      if (res?.status) {
        toast.success(res?.message)
        queryClient.invalidateQueries({ queryKey: ['get_upload_products'] })
        onClose()
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await deleteProduct(id)
      if (res?.status) {
        toast.success(res?.message)
        queryClient.invalidateQueries({ queryKey: ['get_upload_products'] })
        onClose()
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    } finally {
      setConfirmOpen(false)
    }
  }

  const handleSave = async () => {
    try {
      const res = await updateEdit({
        id: productDetails._id,
        description: editedDescription,
      })
      if (res?.status) {
        toast.success('Product updated successfully')
        queryClient.invalidateQueries({ queryKey: ['get_upload_products'] })
        setIsEditing(false)
        onClose()
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <>
      {singleLoading ? (
        <div className='flex flex-col bg-red-500 min-h-screen items-center'>
          <p className='animate-spin'>
            <AiOutlineLoading3Quarters className='animate-spin text-4xl' />
          </p>
          <p>Getting product data...</p>
        </div>
      ) : (
        <Modal isOpen={isOpen} onClose={onClose} title='Product Details'>
          <div className='flex flex-col gap-5 p-5 rounded-md text-lg'>
            {/* Product Image */}
            {productDetails && (
              <img
                className='w-40 h-40 rounded-md mx-auto mb-5'
                src={productDetails?.imageUrl}
                alt='Product'
              />
            )}

            {/* Editable Description Field */}
            <div className='flex flex-col gap-3'>
              <div className='flex justify-between'>
                <strong>In Stock:</strong>
                <p className='text-red-500'>{productDetails?.stock}</p>
              </div>

              <div className='flex justify-between'>
                <strong>Product Name:</strong>
                <p>{productDetails?.name}</p>
              </div>

              <div className='flex flex-col'>
                <strong>Description:</strong>
                {isEditing ? (
                  <div className='h-48'>
                    <ReactQuill
                      value={editedDescription}
                      onChange={setEditedDescription}
                      className='w-full z-30 h-full shadow-md bg-white'
                    />
                  </div>
                ) : (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: productDetails?.description,
                    }}
                    className=' p-3 '
                  ></p>
                )}

                <div
                  className={`${
                    isEditing ? 'mt-16' : 'mt-2'
                  } flex justify-end `}
                >
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-white hover:text-blue-500 border border-blue-500 transition-all duration-200'
                    >
                      Edit
                    </button>
                  ) : (
                    <div className='space-x-3'>
                      <button
                        onClick={handleSave}
                        className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-white hover:text-green-500 border border-green-500 transition-all duration-200'
                      >
                        {isSaving ? 'Updating...' : ' Save'}
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className='bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-white hover:text-green-500 border  transition-all duration-200'
                      >
                        Cancle
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className='flex justify-between'>
                <strong>Vendor Name:</strong>
                <p>{productDetails?.vendorId?.companyName}</p>
              </div>

              <div className='flex justify-between'>
                <strong>Product Category:</strong>
                <p>{productDetails?.category}</p>
              </div>

              <div className='flex justify-between'>
                <strong>Product SubCategory:</strong>
                <p>{productDetails?.subCategory}</p>
              </div>

              <div className='flex justify-between'>
                <strong>Product Price:</strong>
                <p>₦{productDetails?.price}</p>
              </div>

              <div className='flex items-center justify-center gap-4 mt-5'>
                <button
                  onClick={() => updateUpload('reject', productDetails?._id)}
                  className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-white hover:text-red-500 border border-red-500 transition-all duration-200'
                >
                  {isPending === 'reject' ? 'Updating...' : 'Reject'}
                </button>

                <button
                  onClick={() => updateUpload('accept', productDetails?._id)}
                  className='bg-navbar-color text-white py-2 px-4 rounded-md hover:bg-white hover:text-navbar-color border border-navbar-color transition-all duration-200'
                >
                  {isPending === 'accept' ? 'Updating...' : 'Approve'}
                </button>

                <button
                  className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-900 transition-all duration-200'
                  onClick={() => setConfirmOpen(true)}
                >
                  {isLoading ? 'Deleting...' : 'Delete Item'}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      <DeleteConfirmationModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => handleDelete(productDetails._id)}
        isPending={isLoading}
      />
    </>
  )
}

export default UploadProductDetailsModal
