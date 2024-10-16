import { useState, useEffect } from 'react'
import { CiSearch } from 'react-icons/ci'
import { useSelector } from 'react-redux'
import {
  useFetchLogistics,
  useFetchSingleLogistic,
} from '../../hooks/logisticApi'
import LogisticDetailsModal from '../Details/LogisticDetailsModal'

const Logistics = () => {
  const [filteredVendors, setFilteredVendors] = useState([])
  const [selectVendorId, setSelectVendorId] = useState(null)
  const [filterTerm, setFilterTerm] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const { data: fetchLogistics, isFetching } = useFetchLogistics()
  const [page, setPage] = useState(0)

  const {
    data: singleOrderData,
    isFetching: singleLoading,
    refetch,
  } = useFetchSingleLogistic(selectVendorId, { enabled: false })
  const [loadingModal, setLoadingModal] = useState(false)
  const user = useSelector((state) => state.auth)

  useEffect(() => {
    setFilteredVendors(fetchLogistics)
  }, [fetchLogistics])

  const filterByStatus = (status) => {
    let filteredList
    switch (status) {
      case 'verified':
        filteredList = fetchLogistics?.filter((item) => item.isVerified)
        break
      case 'not-verified':
        filteredList = fetchLogistics?.filter((item) => !item.isVerified)
        break
      case 'suspended':
        filteredList = fetchLogistics?.filter((item) => item.isSuspended)
        break
      default:
        filteredList = fetchLogistics
    }
    setFilteredVendors(filteredList)
    setPage(0) // Reset page to 0 when filter changes
  }

  const searchFilter = (event) => {
    const value = event.target.value.toLowerCase()
    setFilteredVendors(
      fetchLogistics?.filter((item) =>
        item.companyName.toLowerCase().includes(value)
      )
    )
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
    if (!singleLoading && singleOrderData) {
      setModalOpen(true)
    }
  }, [singleLoading, singleOrderData])

  return (
    <>
      <div className='flex flex-col gap-3 p-5'>
        <h3 className='flex items-center gap-3 text-2xl font-bold text-gray-700'>
          Welcome {user?.user?.name}
        </h3>

        {/* Search and Filter Form */}
        <form className='flex flex-col md:flex-row gap-5 bg-white rounded-md py-3 px-5 text-navbar-color'>
          {/* Search Input */}
          <div className='w-full md:w-[50%] relative'>
            <input
              className='p-[10px] px-10 border-[1px] rounded-md border-green-300 w-full placeholder:text-navbar-color'
              type='text'
              placeholder='Search by Vendors Name'
              onChange={searchFilter}
            />
            <div className='absolute top-[50%] -translate-y-[50%] left-2 text-2xl'>
              <CiSearch />
            </div>
          </div>

          {/* Search Filter */}
          <div className='flex flex-col md:flex-row gap-2 w-full md:w-auto'>
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
            {/* Table Head */}
            <thead className='bg-green-100 capitalize'>
              <tr className='text-navbar-color py-2 h-14'>
                <th className='p-2 text-left'>Logistic Name</th>
                <th className='p-2 text-left'>Availability</th>
                <th className='p-2 text-left'>Date Added</th>
                <th className='p-2 text-left'>Carrier</th>
                <th className='p-2 text-left'>Logistic Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className='mt-5 bg-white text-[#3A3A3A]'>
              {filteredVendors?.slice(page, page + 10).map((item) => {
                const options = {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                }

                const dateObject = new Date(item?.createdAt)
                const readableDate = dateObject.toLocaleString('en-US', options)
                return (
                  <tr
                    key={item?._id}
                    onClick={() => handleMoreInfo(item?._id)}
                    className='text-center capitalize cursor-pointer mt-5 py-2 h-12 border-b-[1px] border-green-200 hover:bg-slate-100 hover:cursor-pointer'
                  >
                    <td className='w-[20%] p-2 text-left'>
                      {item?.companyName}
                    </td>
                    <td
                      className={`w-[20%] p-2 ${
                        item?.availability ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {item?.availability ? 'Available' : 'Not Available'}
                    </td>
                    <td className='w-[20%] p-2'>{readableDate}</td>
                    <td className='w-[20%] p-2'>{item?.carrier}</td>
                    <td
                      className={`w-[20%] p-2 ${
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
                )
              })}
            </tbody>
          </table>
        </div>

        {!isFetching && filteredVendors?.length === 0 && (
          <p className='text-center'>No Logistic available yet!</p>
        )}
        {isFetching && <p className='text-center'>Loading...</p>}

        {/* Pagination */}
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
              if (page + 10 < fetchLogistics?.length) {
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
        <LogisticDetailsModal
          isOpen={modalOpen}
          onClose={handleModalClose}
          vendorDetails={singleOrderData}
          singleLoading={loadingModal}
        />
      )}
    </>
  )
}

export default Logistics
