/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
// import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Modal from '../common/Modal'
import { useQueryClient } from '@tanstack/react-query'
import { useUpdateUpload } from '../../hooks/uploadApi'

const UploadProductDetailsModal = ({
  isOpen,
  onClose,
  productDetails,
  singleLoading,
}) => {
  if (!productDetails) return null

  const { mutateAsync: updateProduct, isPending } = useUpdateUpload()
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
      console.log(error)
      toast.error(error)
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
                <div className='flex justify-between w-full'>
                  <strong className=''>Description:</strong>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: productDetails?.description,
                    }}
                  ></p>
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
                  <p>&#8358;{productDetails?.price}</p>
                </div>

                <div className='flex items-center justify-center gap-10'>
                  <button
                    onClick={() => updateUpload('reject', productDetails?._id)}
                    className='bg-red-500 mt-5 text-white py-2 px-4 rounded-md hover:bg-white hover:text-red-500 border border-red-500 transition-all duration-200'
                  >
                    {isPending === 'reject' ? 'Upldating...' : 'Reject'}
                  </button>

                  <button
                    onClick={() => updateUpload('accept', productDetails?._id)}
                    className='bg-navbar-color mt-5 text-white py-2 px-4 rounded-md hover:bg-white hover:text-navbar-color border border-navbar-color transition-all duration-200'
                  >
                    {isPending === 'accept' ? 'Updatting...' : 'Approve'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  )
}

export default UploadProductDetailsModal
