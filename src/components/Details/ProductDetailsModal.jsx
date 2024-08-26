/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
// import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useDeleteProduct, useEditProduct } from '../../hooks/productApi'
import Modal from '../common/Modal'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import DeleteConfirmationModal from '../common/DeleteConfirmationModal'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const ProductDetailsModal = ({
  isOpen,
  onClose,
  productDetails,
  singleLoading,
}) => {
  if (!productDetails) return null
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState(
    productDetails?.description || ''
  )

  const { mutateAsync: deleteProduct, isPending } = useDeleteProduct()
  const { mutateAsync: updateEdit, isPending: isSaving } = useEditProduct()
  const queryClient = useQueryClient()
  const handleDelete = async (id) => {
    try {
      const res = await deleteProduct(id)
      if (res?.status) {
        toast.success(res?.message)
        queryClient.invalidateQueries({ queryKey: ['get_products'] })
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
          <div className='flex flex-col items-center gap-2  mx-auto p-5 rounded-md text-lg'>
            {/* product image */}
            {productDetails && (
              <img
                className='w-40 h-40 rounded-md mt-2'
                src={productDetails?.imageUrl}
                alt='fortune'
              />
            )}

            {productDetails && (
              <div className='flex flex-col gap-3 items-center w-full p-5 rounded-md'>
                {/* account status */}
                <div className='flex justify-between w-full'>
                  <strong>In Stock:</strong>
                  <p className='text-red-500'>{productDetails?.stock}</p>
                </div>

                {/* vendor name */}
                <div className='flex justify-between w-full'>
                  <strong>Product Name:</strong>
                  <p>{productDetails?.name}</p>
                </div>
                <div className='flex flex-col'>
                  <strong>Description:</strong>
                  {isEditing ? (
                    <ReactQuill
                      value={editedDescription}
                      onChange={setEditedDescription}
                      className='w-full z-30 shadow-md bg-white'
                    />
                  ) : (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: productDetails?.description,
                      }}
                      className=' p-3 '
                    ></p>
                  )}

                  <div className='flex justify-end mt-3'>
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

                {/* vendor name */}
                <div className='flex justify-between w-full'>
                  <strong className=''>Vendor Name:</strong>
                  <p>{productDetails?.vendorId?.companyName}</p>
                </div>

                {/* vendor category */}
                <div className='flex justify-between w-full'>
                  <strong>Product Category:</strong>
                  <p>{productDetails?.category}</p>
                </div>
                <div className='flex justify-between w-full'>
                  <strong className=''>Product SubCategory:</strong>
                  <p>{productDetails?.subCategory}</p>
                </div>

                {/* total order amount */}
                <div className='flex justify-between w-full'>
                  <strong>Product Price:</strong>
                  <p>₦{productDetails?.price}</p>
                </div>
                <div className='flex justify-center w-full'>
                  <button
                    className='px-4 py-2 bg-red-500 hover:bg-red-900 text-white rounded'
                    // onClick={() => handleDelete(productDetails?._id)}
                    onClick={() => setConfirmOpen(true)}
                  >
                    {isPending ? 'Deleting...' : 'Delete Item'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      <DeleteConfirmationModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        isPending={isPending}
      />
    </>
  )
}

export default ProductDetailsModal
