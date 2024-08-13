import { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import {
  useFetchSingleWithdrawal,
  useFetchWithdrawals,
} from '../../hooks/withdrawalApi'
import LogWithdrawalDetailsModal from '../Details/LogWithdrawalDetailsModal'

const LogWithdrawals = () => {
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

  const filterByStatus = (stock) => {
    if (stock === 'approved') {
      setFilteredWithdrawal(
        fetchWithdrawal?.filter((item) => item.status === 'approved')
      )
    } else if (stock === 'pending') {
      setFilteredWithdrawal(
        fetchWithdrawal?.filter((item) => item.status === 'pending')
      )
    } else if (stock === 'all') {
      setFilteredWithdrawal(fetchWithdrawal)
    } else {
      setFilteredWithdrawal(
        fetchWithdrawal?.filter((item) => item.status === 'rejected')
      )
    }

    // Reset page to 0 when filter changes
    setPage(0)
  }

  const searchFilter = (event) => {
    const value = event.target.value
    setFilteredWithdrawal(
      fetchWithdrawal?.filter(
        (item) =>
          item.bankHolderName &&
          item.bankHolderName.toLowerCase().includes(value.toLowerCase())
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

        {/* navs */}
        <div className='flex justify-between bg-white rounded-md py-3 px-5'>
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

        <form className='flex gap-5 bg-white rounded-md py-3 px-5 text-navbar-color'>
          {/* search input */}
          <div className='w-[50%] relative'>
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

        {/* table */}
        <table className='rounded-md overflow-hidden'>
          {/* head */}
          <thead className='bg-green-100'>
            <tr className='text-navbar-color py-2 h-14'>
              <th>Logistic Name</th>
              <th>Withdrawal Amount</th>
              <th>Date of Request</th>
              <th>Bank Name</th>
              <th>Status</th>
            </tr>
          </thead>

          {/* body */}
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
                  className='text-center cursor-pointer h-12 border-b-[1px] border-green-200'
                >
                  <td className='w-[20%]'>{item?.bankHolderName}</td>
                  <td className='w-[20%]'>N{item?.withdrawalAmount}</td>
                  <td className='w-[20%]'>{readableDate}</td>
                  <td className='w-[20%]'>{item?.bankName}</td>
                  <td
                    className={`w-[20%] ${
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

        {!isPending && filteredWithdrawal?.length === 0 && (
          <p className='text-center'>No Order available yet!</p>
        )}

        {/* loading state */}
        {isPending && <p className='text-center'>Loading...</p>}

        <div className='flex justify-center gap-20 bg-white rounded-md py-3 px-5 text-navbar-color'>
          <button
            onClick={() => {
              if (page === 0) {
                return
              } else {
                setPage(page - 10)
              }
            }}
            className='py-2 w-36 border-navbar-color border rounded-md hover:bg-navbar-color hover:text-white transition-all duration-200'
          >
            Previous
          </button>
          <button
            onClick={() => {
              if (page + 10 < fetchWithdrawal?.length) {
                setPage(page + 10)
              }
            }}
            className='py-2 w-36 border-navbar-color border rounded-md hover:bg-navbar-color hover:text-white transition-all duration-200'
          >
            Next
          </button>
        </div>
      </div>

      {modalOpen && selectedProductId && !singleLoading && (
        <LogWithdrawalDetailsModal
          isOpen={modalOpen}
          onClose={handleModalClose}
          productDetails={singleProductData}
          // singleLoading={singleLoading}
          singleLoading={loadingModal}
        />
      )}
    </>
  )
}

export default LogWithdrawals
