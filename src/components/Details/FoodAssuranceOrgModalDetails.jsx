/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'

import Modal from '../common/Modal'

const FoodAssuranceOrgModalDetails = ({
  isOpen,
  onClose,
  organizationMember,
}) => {
  const [page, setPage] = useState(0)
  const [allOrders, setAllOrders] = useState([])

  useEffect(() => {
    // Extract and flatten all orders from organizationMember
    const orders = organizationMember?.flatMap((user) => user.orders)
    setAllOrders(orders)
  }, [organizationMember])

  if (!organizationMember) return null

  const itemsPerPage = 10

  return (
    <>
      <div className='flex flex-col gap-3 p-5'>
        <Modal isOpen={isOpen} onClose={onClose} title='Member Orders'>
          {/* Table */}
          <div className='overflow-x-auto'>
            {allOrders.length > 0 ? (
              <table className='rounded-md overflow-hidden w-full'>
                {/* Head */}
                <thead className='bg-green-100'>
                  <tr className='text-navbar-color py-2 h-14'>
                    <th className='p-2 text-center'>Order ID</th>
                    <th className='p-2 text-center'>Members Name</th>
                    <th className='p-2 text-center'>Members Email</th>
                    <th className='p-2 text-center'>Product Name</th>
                    <th className='p-2 text-center'>Price</th>
                    <th className='p-2 text-center'>Quantity</th>
                    <th className='p-2 text-center'>Total Bill</th>
                    <th className='p-2 text-center'>Status</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody className='mt-5 bg-white text-[#3A3A3A]'>
                  {allOrders.length > 0 &&
                    allOrders.slice(page, page + itemsPerPage).map((order) => (
                      <tr
                        key={order?.slug}
                        className='text-center cursor-pointer mt-5 py-2 h-12 border-b-[1px] border-green-200 hover:bg-slate-200'
                      >
                        <td className='p-2'>{order?.slug}</td>
                        <td className='p-2'>{order?.userId?.name}</td>
                        <td className='p-2'>{order?.userId?.email}</td>
                        <td className='p-2'>{order?.items?.name}</td>
                        <td className='p-2'>
                          ₦{order?.items?.price.toLocaleString()}
                        </td>
                        <td className='p-2'>{order?.items?.quantity}</td>
                        <td className='p-2'>₦{order?.bill.toLocaleString()}</td>
                        <td className='p-2'>{order?.status}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <p className='flex text-center justify-center items-center gap-3 text-2xl font-bold text-gray-700'>
                No Order available
              </p>
            )}
          </div>
        </Modal>
      </div>
    </>
  )
}

export default FoodAssuranceOrgModalDetails
