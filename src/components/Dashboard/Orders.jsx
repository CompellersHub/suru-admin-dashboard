import { useState, useEffect } from 'react'
import { CiSearch } from 'react-icons/ci'
import { useFetchOrders, useFetchSingleOrder } from '../../hooks/ordersApi'
import OrdersDetailsModal from '../Details/OrdersDetailsModal'

const Orders = () => {
  const [orderType, setOrderType] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const { data: fetchOrders, isPending } = useFetchOrders()
  const [orderId, setOrderId] = useState(null)
  const [orderCount, setOrderCount] = useState(0)
  const [filteredOrder, setFilteredOrder] = useState(fetchOrders?.data)
  const [loadingModal, setLoadingModal] = useState(false)

  const {
    data: singleOrderData,
    isFetching: singleLoading,
    refetch,
  } = useFetchSingleOrder(orderId, { enabled: false })

  const [page, setPage] = useState(0)

  useEffect(() => {
    setOrderCount(fetchOrders?.count)
    setFilteredOrder(fetchOrders?.data)
  }, [fetchOrders])

  const filterByStatus = (stock) => {
    if (stock === 'completed') {
      setFilteredOrder(
        fetchOrders?.data?.filter((item) => item.status === 'completed')
      )
    } else if (stock === 'shipped') {
      setFilteredOrder(
        fetchOrders?.data?.filter(
          (item) =>
            item?.status === 'shipped' ||
            item?.status === 'ongoing' ||
            item?.status === 'delivered'
        )
      )
    } else if (stock === 'all') {
      setFilteredOrder(fetchOrders?.data)
    } else {
      setFilteredOrder(
        fetchOrders?.data?.filter((item) => item.status === 'cancelled')
      )
    }

    // Reset page to 0 when filter changes
    setPage(0)
  }

  const searchFilter = (event) => {
    const value = event.target.value
    setFilteredOrder(
      fetchOrders?.data?.filter((item) =>
        item.userId.name.toLowerCase().includes(value.toLowerCase())
      )
    )
  }

  useEffect(() => {
    if (orderId) {
      setLoadingModal(true)
      refetch().finally(() => setLoadingModal(false))
    }
  }, [orderId, refetch])

  const handleModalClose = () => {
    setOrderId(null)
    setModalOpen(false)
  }

  const handleMoreInfo = (id) => {
    if (id) {
      setOrderId(id)
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
          Orders
          <span className='text-navbar-color text-base bg-green-100 font-bold rounded-md p-1'>
            {orderCount} orders
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
            All Orders
          </button>
          <button
            onClick={() => {
              setOrderType('completed')
              filterByStatus('completed')
            }}
            className={
              orderType === 'completed'
                ? 'text-navbar-color font-bold'
                : 'text-black'
            }
          >
            Completed Orders
          </button>
          <button
            onClick={() => {
              setOrderType('progress')
              filterByStatus('shipped')
            }}
            className={
              orderType === 'progress'
                ? 'text-navbar-color font-bold'
                : 'text-black'
            }
          >
            Order In Progress
          </button>
          <button
            onClick={() => {
              setOrderType('cancelled')
              filterByStatus('cancelled')
            }}
            className={
              orderType === 'cancelled'
                ? 'text-navbar-color font-bold'
                : 'text-black'
            }
          >
            Cancelled Orders
          </button>
        </div>

        <form className='flex gap-5 bg-white rounded-md py-3 px-5 text-navbar-color'>
          {/* search input */}
          <div className='w-[50%] relative'>
            <input
              onChange={searchFilter}
              className='p-[10px] px-10 border-[1px] rounded-md border-green-300 w-full placeholder:text-navbar-color'
              type='text'
              placeholder='Search by Customer Name'
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
              <th>Order ID</th>
              <th>Client Name</th>
              <th>Date Ordered</th>
              <th>Bill</th>
              <th>Order Status</th>
            </tr>
          </thead>

          {/* body */}
          <tbody className='mt-5 bg-white text-[#3A3A3A]'>
            {filteredOrder &&
              filteredOrder?.slice(page, page + 10).map((item) => {
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
                    className='text-center cursor-pointer mt-5 py-2 h-12 border-b-[1px] border-green-200'
                  >
                    <td>{item?._id}</td>
                    <td>{item?.userId?.name}</td>
                    <td>{readableDate}</td>
                    <td>N{item?.bill}</td>
                    <td>{item?.status}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>

        {!isPending && filteredOrder?.length === 0 && (
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
              if (page + 10 < fetchOrders?.data?.length) {
                setPage(page + 10)
              }
            }}
            className='py-2 w-36 border-navbar-color border rounded-md hover:bg-navbar-color hover:text-white transition-all duration-200'
          >
            Next
          </button>
        </div>
      </div>

      {modalOpen && orderId && !singleLoading && (
        <OrdersDetailsModal
          isOpen={modalOpen}
          onClose={handleModalClose}
          orderItem={singleOrderData}
          singleLoading={loadingModal}
        />
      )}
    </>
  )
}

export default Orders
