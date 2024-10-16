import { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import {
  useFetchSingleUploadProducts,
  useFetchUploadProducts,
} from '../../hooks/uploadApi'
import UploadProductDetailsModal from '../Details/UploadProductDetailsModal'

const Uploads = () => {
  const [selectedProductId, setSelectedProductId] = useState(null)
  const { data: fetchProducts, isPending } = useFetchUploadProducts()
  const [filteredUploads, setFilteredUploads] = useState(fetchProducts)
  const [filterTerm, setFilterTerm] = useState('all')
  const [page, setPage] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)
  const {
    data: singleProductData,
    isFetching: singleLoading,
    refetch,
  } = useFetchSingleUploadProducts(selectedProductId, { enabled: false })

  useEffect(() => {
    setFilteredUploads(fetchProducts)
  }, [fetchProducts])

  // Filter by stock level
  const filterByStock = (stock) => {
    let filteredList
    if (stock === 'low') {
      filteredList = fetchProducts?.filter((item) => item.stock <= 20)
    } else if (stock === 'all') {
      filteredList = fetchProducts
    } else {
      filteredList = fetchProducts?.filter((item) => item.stock > 20)
    }
    setFilteredUploads(filteredList)
    setPage(0) // Reset page to 0 when filter changes
  }

  // Search for product by name
  const searchFilter = (event) => {
    const value = event.target.value.toLowerCase()
    setFilteredUploads(
      fetchProducts?.filter((item) => item.name.toLowerCase().includes(value))
    )
  }

  // UseEffect to refetch single product data when selectedProductId changes
  useEffect(() => {
    if (selectedProductId) {
      setLoadingModal(true)
      refetch().finally(() => setLoadingModal(false))
    }
  }, [selectedProductId, refetch])

  const handleModalClose = () => {
    setSelectedProductId(null)
    setModalOpen(false)
  }

  const handleMoreInfo = (id) => {
    if (id) {
      setSelectedProductId(id)
    }
  }

  // Manage modal open state based on data availability
  useEffect(() => {
    if (!singleLoading && singleProductData) {
      setModalOpen(true)
    }
  }, [singleLoading, singleProductData])

  return (
    <>
      <div className='flex flex-col gap-3 p-5'>
        <h3 className='flex items-center gap-3 text-2xl font-bold text-gray-700'>
          Pending Product Uploads
          <span className='text-navbar-color text-base bg-green-100 font-bold rounded-md p-1'>
            {filteredUploads?.length} Uploads
          </span>
        </h3>

        {/* Navigation buttons */}
        <div className='flex justify-between bg-white rounded-md py-3 px-5'>
          <button className='text-navbar-color font-bold'>Product</button>
        </div>

        <form className='flex flex-col md:flex-row gap-5 bg-white rounded-md py-3 px-5 text-navbar-color'>
          {/* Search input */}
          <div className='w-full md:w-[50%] relative'>
            <input
              className='p-[10px] px-10 border-[1px] rounded-md border-green-300 w-full placeholder:text-navbar-color'
              type='text'
              placeholder='Search by product Name'
              onChange={searchFilter}
            />
            <div className='absolute top-[50%] -translate-y-[50%] left-2 text-2xl'>
              <CiSearch />
            </div>
          </div>

          {/* Filter options */}
          <div className='flex flex-col md:flex-row gap-2 w-full md:w-auto'>
            <select
              className='border-[1px] border-navbar-color rounded-md'
              value={filterTerm}
              onChange={(e) => setFilterTerm(e.target.value)}
            >
              <option value='all'>All</option>
              <option value='available'>Available</option>
              <option value='low'>Low stock</option>
            </select>

            <button
              type='button'
              onClick={() => filterByStock(filterTerm)}
              className='py-[10px] border-[1px] border-navbar-color px-5 rounded-md bg-navbar-color text-white'
            >
              Filter
            </button>
          </div>
        </form>

        {/* Table */}
        <div className='overflow-x-auto'>
          <table className='rounded-md overflow-hidden w-full'>
            {/* Table head */}
            <thead className='bg-green-100'>
              <tr className='text-navbar-color py-2 h-14'>
                <th className='p-2 text-left'>Product Name</th>
                <th className='p-2 text-left'>Vendor Name</th>
                <th className='p-2 text-left'>Date Added</th>
                <th className='p-2 text-left'>Category</th>
                <th className='p-2 text-left'>Quantity</th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody className='mt-5 bg-white text-[#3A3A3A]'>
              {!isPending &&
                filteredUploads?.slice(page, page + 10).map((item) => {
                  const options = {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  }

                  const dateObject = new Date(item.createdAt)
                  const readableDate = dateObject.toLocaleString(
                    'en-US',
                    options
                  )

                  return (
                    <tr
                      key={item?._id}
                      onClick={() => handleMoreInfo(item?.slug)}
                      className='text-center mt-5 py-2 h-12 border-b-[1px] border-green-200 cursor-pointer hover:bg-slate-200'
                    >
                      <td className='w-[20%] p-2 text-left'>{item?.name}</td>
                      <td className='w-[20%] p-2 text-left'>
                        {item?.vendorId.companyName}
                      </td>
                      <td className='w-[20%] p-2 text-left'>{readableDate}</td>
                      <td className='w-[20%] p-2 text-left'>
                        {item?.category}
                      </td>
                      <td className='w-[20%] p-2 text-left'>{item?.stock}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>

        {!isPending && filteredUploads && filteredUploads?.length === 0 && (
          <p className='text-center'>No product available yet!</p>
        )}
        {isPending && <p className='text-center'>Loading...</p>}

        <div className='flex justify-center gap-10 bg-white rounded-md py-3 px-5 text-navbar-color'>
          <button
            onClick={() => {
              if (page > 0) {
                setPage(page - 10)
              }
            }}
            className='py-2 px-4 border-navbar-color border rounded-md hover:bg-navbar-color hover:text-white transition-all duration-200'
          >
            Previous
          </button>
          <button
            onClick={() => {
              if (page + 10 < fetchProducts?.length) {
                setPage(page + 10)
              }
            }}
            className='py-2 px-4 border-navbar-color border rounded-md hover:bg-navbar-color hover:text-white transition-all duration-200'
          >
            Next
          </button>
        </div>
      </div>

      {modalOpen && selectedProductId && !singleLoading && (
        <UploadProductDetailsModal
          isOpen={modalOpen}
          onClose={handleModalClose}
          productDetails={singleProductData}
          singleLoading={loadingModal}
        />
      )}
    </>
  )
}

export default Uploads
