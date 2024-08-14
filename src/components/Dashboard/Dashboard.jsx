import { useState, useEffect } from 'react'
import { CiSearch } from 'react-icons/ci'
import { useSelector } from 'react-redux'
import { useFetchSingleVendor, useFetchVendors } from '../../hooks/vendorsApi'
import VendorDetailsModal from '../Details/VendorDetailsModal'

const Dashboard = () => {
  const { data: fetchVendors, isPending } = useFetchVendors()
  const [page, setPage] = useState(0)
  const [filteredVendors, setFilteredVendors] = useState(fetchVendors)
  const [selectVendorId, setSelectVendorId] = useState(null)
  const [filterTerm, setFilterTerm] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const {
    data: singleVendorData,
    isFetching: singleLoading,
    refetch,
  } = useFetchSingleVendor(selectVendorId)
  const [loadingModal, setLoadingModal] = useState(false)
  const user = useSelector((state) => state.auth)

  // Fetch vendor list on mount
  useEffect(() => {
    setFilteredVendors(fetchVendors)
  }, [fetchVendors])

  const filterByStatus = (status) => {
    let filteredList = fetchVendors

    if (status === 'verified') {
      filteredList = fetchVendors?.filter((item) => item.isVerified)
    } else if (status === 'not-verified') {
      filteredList = fetchVendors?.filter((item) => !item.isVerified)
    } else if (status === 'suspended') {
      filteredList = fetchVendors?.filter((item) => item.isSuspended)
    }

    setFilteredVendors(filteredList)
    setPage(0) // Reset to the first page after filtering
  }

  const searchFilter = (event) => {
    const value = event.target.value.toLowerCase()
    const filteredList = fetchVendors?.filter((item) =>
      item.companyName.toLowerCase().includes(value)
    )
    setFilteredVendors(filteredList)
    setPage(0) // Reset to the first page after searching
  }

  useEffect(() => {
    if (selectVendorId) {
      setLoadingModal(true)
      refetch().finally(() => setLoadingModal(false))
    }
  }, [selectVendorId, refetch])

  const handleModalClose = () => {
    setSelectVendorId(null)
    setModalOpen(false)
  }

  const handleMoreInfo = (id) => {
    if (id) {
      setSelectVendorId(id)
    }
  }

  useEffect(() => {
    if (!singleLoading && singleVendorData) {
      setModalOpen(true)
    }
  }, [singleLoading, singleVendorData])

  return (
    <>
      <div className='flex flex-col gap-3 p-5'>
        <h3 className='flex items-center gap-3 text-2xl font-bold text-gray-700'>
          Welcome {user?.user?.name}
        </h3>

        <form className='flex flex-col md:flex-row gap-5 bg-white rounded-md py-3 px-5 text-navbar-color'>
          {/* Search input */}
          <div className='w-full md:w-[50%] relative'>
            <input
              className='p-[10px] px-10 border-[1px] rounded-md border-green-300 w-full placeholder:text-navbar-color'
              type='text'
              placeholder='Search by Vendor Name'
              onChange={searchFilter}
            />
            <div className='absolute top-[50%] -translate-y-[50%] left-2 text-2xl'>
              <CiSearch />
            </div>
          </div>

          {/* Search filter */}
          <div className='flex gap-3 flex-wrap md:flex-nowrap'>
            <select
              className='border-[1px] border-navbar-color rounded-md'
              value={filterTerm}
              onChange={(e) => setFilterTerm(e.target.value)}
            >
              <option value='all'>All</option>
              <option value='verified'>Verified</option>
              <option value='not-verified'>Not Verified</option>
              <option value='suspended'>Suspended</option>
            </select>

            <button
              onClick={() => filterByStatus(filterTerm)}
              type='button'
              className='py-[10px] border-[1px] border-navbar-color px-5 rounded-md bg-navbar-color text-white'
            >
              Filter
            </button>
          </div>
        </form>

        {/* Table */}
        <div className='overflow-x-auto'>
          <table className='rounded-md overflow-hidden w-full'>
            {/* Head */}
            <thead className='bg-green-100'>
              <tr className='text-navbar-color py-2 h-14'>
                <th className='p-2 text-left'>Vendor Name</th>
                <th className='p-2 text-left'>Total Available Products</th>
                <th className='p-2 text-left'>Total Order Amount</th>
                <th className='p-2 text-left'>Category</th>
                <th className='p-2 text-left'>Vendor Status</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className='mt-5 bg-white text-[#3A3A3A]'>
              {filteredVendors?.slice(page, page + 10).map((item) => (
                <tr
                  key={item?._id}
                  onClick={() => handleMoreInfo(item?._id)}
                  className='text-center cursor-pointer mt-5 py-2 h-12 border-b-[1px] border-green-200 hover:bg-slate-100'
                >
                  <td className='p-2 text-left'>{item?.companyName}</td>
                  <td className='p-2'>{item?.totalProducts}</td>
                  <td className='p-2'>₦{item?.nairaBalance}</td>
                  <td className='p-2'>{item?.category}</td>
                  <td
                    className={`p-2 ${
                      item?.isSuspended
                        ? 'text-red-500'
                        : item?.isVerified
                        ? 'text-navbar-color'
                        : 'text-red-500'
                    }`}
                  >
                    {item?.isSuspended
                      ? 'Suspended'
                      : item?.isVerified
                      ? 'Active'
                      : 'Not Verified'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!isPending && filteredVendors?.length === 0 && (
          <p className='text-center'>No vendors available yet!</p>
        )}
        {isPending && <p className='text-center'>Loading...</p>}

        <div className='flex justify-center gap-10 bg-white rounded-md py-3 px-5 text-navbar-color'>
          <button
            onClick={() => setPage(Math.max(0, page - 10))}
            className='py-2 px-4 border-navbar-color border rounded-md hover:bg-navbar-color hover:text-white transition-all duration-200'
          >
            Previous
          </button>
          <button
            onClick={() => {
              if (page + 10 < fetchVendors?.length) {
                setPage(page + 10)
              }
            }}
            className='py-2 px-4 border-navbar-color border rounded-md hover:bg-navbar-color hover:text-white transition-all duration-200'
          >
            Next
          </button>
        </div>
      </div>

      {modalOpen && selectVendorId && !singleLoading && (
        <VendorDetailsModal
          isOpen={modalOpen}
          onClose={handleModalClose}
          vendorDetails={singleVendorData}
          singleLoading={loadingModal}
        />
      )}
    </>
  )
}

export default Dashboard
