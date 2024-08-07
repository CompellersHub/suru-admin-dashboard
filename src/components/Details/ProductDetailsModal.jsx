import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useDeleteProduct } from '../../hooks/productApi'
import Modal from '../common/Modal'

const ProductDetailsModal = ({
  isOpen,
  onClose,
  productDetails,
  singleLoading,
}) => {
  if (!productDetails) return null

  const { productId } = useParams()
  const { mutateAsync: deleteProduct, isPending } = useDeleteProduct(productId)

  const handleDelete = async (id) => {
    try {
      const res = await deleteProduct(id)
      if (res?.status) {
        toast.success('Product deleted successfully')

        onClose()
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title='Product Details'>
        <div className='flex flex-col items-center gap-2  mx-auto p-5 rounded-md text-lg'>
          {/* loading state */}
          {singleLoading && (
            <div className='flex flex-col items-center'>
              <p className='animate-spin'>
                <AiOutlineLoading3Quarters className='animate-spin text-4xl' />
              </p>
              <p>Getting product data...</p>
            </div>
          )}

          {/* product image */}
          {productDetails && (
            <img
              className='w-40 h-40 rounded-md mt-2'
              src={productDetails.imageUrl}
              alt='fortune'
            />
          )}

          {productDetails && (
            <div className='flex flex-col gap-3 items-center w-full p-5 rounded-md'>
              {/* account status */}
              <div className='flex justify-between w-full'>
                <strong>In Stock:</strong>
                <p className='text-red-500'>{productDetails.stock}</p>
              </div>

              {/* vendor name */}
              <div className='flex justify-between w-full'>
                <strong>Product Name:</strong>
                <p>{productDetails?.name}</p>
              </div>
              <div className='flex justify-between w-full'>
                <strong className=''>Description:</strong>
                <p>{productDetails?.description}</p>
              </div>

              {/* vendor name */}
              <div className='flex justify-between w-full'>
                <strong className=''>Vendor Name:</strong>
                <p>{productDetails?.vendorId.companyName}</p>
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
                <p>&#8358;{productDetails?.price}</p>
              </div>
              <div className='flex justify-center w-full'>
                <button
                  className='px-4 py-2 bg-red-500 hover:bg-red-900 text-white rounded'
                  onClick={() => handleDelete(productDetails?._id)}
                >
                  {isPending ? 'Deleting...' : 'Delete Item'}
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}

export default ProductDetailsModal
