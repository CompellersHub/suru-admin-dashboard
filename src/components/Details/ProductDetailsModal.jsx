import { useEffect, useState } from 'react'
import suru from '../../assets/suru.png'
import logo from '../../assets/logo.png'
import { useNavigate, Link } from 'react-router-dom'
import { IoMdArrowBack } from 'react-icons/io'
import { useParams } from 'react-router-dom'
import { api } from '../../hooks/api'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useDeleteProduct } from '../../hooks/productApi'

const ProductDetailsModal = ({ isOpen, onClose, productDetails }) => {
  const { imageUrl } = productDetails
  const [loading, setLoading] = useState(false)
  const [productDetails, setProductDetails] = useState(null)
  const navigate = useNavigate()
  const { productId } = useParams()
  const user = useSelector((state) => state.auth)
  const { mutateAsync: deleteProduct, isPending } = useDeleteProduct(productId)
  useEffect(() => {
    getProductById()
  }, [])

  console.log(productDetails, 'productDetails')

  const getProductById = async () => {
    const url = `${api.get_uploads}/${productId}`

    try {
      setLoading(true)
      const response = await fetch(url, {
        headers: {
          authorizarion: `${user.userToken}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      setProductDetails(data.message)
    } catch (err) {
      toast.error(`${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    console.log(id)

    try {
      const res = await deleteProduct(id)
      console.log(res, 'fff')
      if (res?.status) {
        toast.success('Product deleted successfully')
        navigate(-1)
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title='Product Details'>
        <section className='bg-gray-200 min-h-[100vh]'>
          {/* dashboard header */}
          <header className='flex items-center justify-between gap-5 bg-navbar-color p-4 md:px-10'>
            <Link to='/' className='flex gap-3 items-center'>
              <img src={logo} alt='logo' className='w-10 md:w-14' />
              <img
                src={suru}
                alt='company name'
                className='w-14 md:w-24 lg:w-32'
              />
            </Link>
          </header>

          {/* vendor Profile */}
          <div className='flex flex-col items-center gap-2 w-[70%] mx-auto p-5 rounded-md text-lg'>
            <button
              onClick={() => navigate(-1)}
              className='self-start text-2xl'
            >
              <IoMdArrowBack />
            </button>

            {/* loading state */}
            {loading && (
              <div className='flex flex-col items-center mt-20'>
                <p className='animate-spin'>
                  <AiOutlineLoading3Quarters />
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
              <div className='flex flex-col gap-3 items-center w-full bg-white p-5 rounded-md'>
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
        </section>
      </Modal>
    </>
  )
}

export default ProductDetailsModal
