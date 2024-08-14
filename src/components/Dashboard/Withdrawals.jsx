import { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import WithdrawalDetailsModal from '../Details/WithdrawalDetailsModal'
import {
  useFetchSingleWithdrawal,
  useFetchWithdrawals,
} from '../../hooks/withdrawalApi'

const Withdrawals = () => {
  const [orderType, setOrderType] = useState('all')
  const { data: fetchWithdrawal, isPending } = useFetchWithdrawals()
  const [filteredWithdrawal, setFilteredWithdrawal] = useState(fetchWithdrawal)
  const [modalOpen, setModalOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [loadingModal, setLoadingModal] = useState(false)
  const {
    data: singleProductData,
    isFetching: singleLoading,
    refetch,
  } = useFetchSingleWithdrawal(selectedProductId, { enabled: false })

  useEffect(() => {
    setFilteredWithdrawal(fetchWithdrawal)
  }, [fetchWithdrawal])

  const filterByStatus = (status) => {
    let filteredList
    switch (status) {
      case 'approved':
        filteredList = fetchWithdrawal?.filter(
          (item) => item.status === 'approved'
        )
        break
      case 'pending':
        filteredList = fetchWithdrawal?.filter(
          (item) => item.status === 'pending'
        )
        break
      case 'rejected':
        filteredList = fetchWithdrawal?.filter(
          (item) => item.status === 'rejected'
        )
        break
      default:
        filteredList = fetchWithdrawal
    }
    setFilteredWithdrawal(filteredList)
    setPage(0) // Reset page to 0 when filter changes
  }

  const searchFilter = (event) => {
    const value = event.target.value.toLowerCase()
    setFilteredWithdrawal(
      fetchWithdrawal?.filter((item) =>
        item.bankHolderName?.toLowerCase().includes(value)
      )
    )
  }

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
          Withdrawals
          <span className='text-navbar-color text-base bg-green-100 font-bold rounded-md p-1'>
            {fetchWithdrawal?.length} withdrawals
          </span>
        </h3>

        {/* Navigation buttons */}
        <div className='grid grid-cols-2 md:flex flex-wrap justify-between bg-white rounded-md py-3 px-5'>
          <button
            onClick={() => {
              setOrderType('all')
              filterByStatus('all')
            }}
            className={
              orderType === 'all' ? 'text-navbar-color font-bold' : 'text-black'
            }
          >
            All Withdrawals
          </button>
          <button
            onClick={() => {
              setOrderType('pending')
              filterByStatus('pending')
            }}
            className={
              orderType === 'pending'
                ? 'text-navbar-color font-bold'
                : 'text-black'
            }
          >
            Pending Withdrawals
          </button>
          <button
            onClick={() => {
              setOrderType('approved')
              filterByStatus('approved')
            }}
            className={
              orderType === 'approved'
                ? 'text-navbar-color font-bold'
                : 'text-black'
            }
          >
            Approved Withdrawals
          </button>
          <button
            onClick={() => {
              setOrderType('rejected')
              filterByStatus('rejected')
            }}
            className={
              orderType === 'rejected'
                ? 'text-navbar-color font-bold'
                : 'text-black'
            }
          >
            Rejected Withdrawals
          </button>
        </div>

        {/* Search input */}
        <form className='flex flex-col md:flex-row gap-5 bg-white rounded-md py-3 px-5 text-navbar-color'>
          <div className='w-full md:w-[50%] relative'>
            <input
              onChange={searchFilter}
              className='p-[10px] px-10 border-[1px] rounded-md border-green-300 w-full placeholder:text-navbar-color'
              type='text'
              placeholder='Search by Vendors Company Name'
            />
            <div className='absolute top-[50%] -translate-y-[50%] left-2 text-2xl'>
              <CiSearch />
            </div>
          </div>
        </form>

        {/* Table */}
        <div className='overflow-x-auto'>
          <table className='rounded-md overflow-hidden w-full'>
            {/* Table Head */}
            <thead className='bg-green-100'>
              <tr className='text-navbar-color py-2 h-14'>
                <th className='p-2 text-left'>Vendors Name</th>
                <th className='p-2 text-left'>Withdrawal Amount</th>
                <th className='p-2 text-left'>Date of Request</th>
                <th className='p-2 text-left'>Bank Name</th>
                <th className='p-2 text-left'>Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className='mt-5 bg-white text-[#3A3A3A]'>
              {filteredWithdrawal?.slice(page, page + 10).map((item) => {
                const options = {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                }
                const dateObject = new Date(item?.createdAt)
                const readableDate = dateObject.toLocaleString('en-US', options)

                return (
                  <tr
                    onClick={() => handleMoreInfo(item?._id)}
                    key={item._id}
                    className='text-center cursor-pointer h-12 border-b-[1px] border-green-200 hover:bg-gray-100'
                  >
                    <td className='w-[20%] p-2'>{item?.bankHolderName}</td>
                    <td className='w-[20%] p-2'>N{item?.withdrawalAmount}</td>
                    <td className='w-[20%] p-2'>{readableDate}</td>
                    <td className='w-[20%] p-2'>{item?.bankName}</td>
                    <td
                      className={`w-[20%] p-2 ${
                        item?.status === 'pending'
                          ? 'bg-orange-500'
                          : 'bg-navbar-color'
                      } text-white`}
                    >
                      {item?.status}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {!isPending && filteredWithdrawal?.length === 0 && (
          <p className='text-center'>No Order available yet!</p>
        )}

        {/* Loading state */}
        {isPending && <p className='text-center'>Loading...</p>}

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
              if (page + 10 < fetchWithdrawal?.length) {
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
        <WithdrawalDetailsModal
          isOpen={modalOpen}
          onClose={handleModalClose}
          productDetails={singleProductData}
          singleLoading={loadingModal}
        />
      )}
    </>
  )
}

export default Withdrawals
