/* eslint-disable react/prop-types */
import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'

import Modal from '../common/Modal'

const FoodAssuranceOrgModalDetails = ({
  isOpen,
  onClose,
  organizationMember,
}) => {
  const [filteredOrder, setFilteredOrder] = useState(organizationMember)

  const [page, setPage] = useState(0)

  if (!organizationMember) return null

  const searchFilter = (event) => {
    const value = event.target.value.toLowerCase()
    setFilteredOrder(
      organizationMember?.filter(
        (item) =>
          item.name.toLowerCase().includes(value) ||
          item.email.toLowerCase().includes(value)
      )
    )
  }

  return (
    <>
      <div className='flex flex-col gap-3 p-5'>
        <Modal isOpen={isOpen} onClose={onClose} title='Organization Details'>
          <form className='flex flex-col md:flex-row gap-5 bg-white rounded-md py-3 px-5 text-navbar-color'>
            {/* Search input */}
            <div className='w-full md:w-[50%] relative'>
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

          {/* Table */}
          <div className='overflow-x-auto'>
            <table className='rounded-md overflow-hidden w-full'>
              {/* Head */}
              <thead className='bg-green-100'>
                <tr className='text-navbar-color py-2 h-14'>
                  <th className='p-2 text-center'>Members Name</th>
                  <th className='p-2 text-center'>Members Email</th>
                  <th className='p-2 text-center'>Plan Limit</th>
                  <th className='p-2 text-center'>Members ID</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className='mt-5 bg-white text-[#3A3A3A]'>
                {filteredOrder &&
                  filteredOrder?.slice(page, page + 10).map((item) => {
                    return (
                      <tr
                        key={item?._id}
                        className='text-center cursor-pointer mt-5 py-2 h-12 border-b-[1px] border-green-200 hover:bg-slate-200'
                      >
                        <td className='p-2'>{item?.name}</td>
                        <td className='p-2'>{item?.email}</td>
                        <td className='p-2'>₦{item?.planLimit}</td>
                        <td className='p-2'>{item?._id}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>

          {filteredOrder?.length === 0 && (
            <p className='text-center'>No Members available yet!</p>
          )}

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
                if (page + 10 < organizationMember?.length) {
                  setPage(page + 10)
                }
              }}
              className='py-2 px-4 border-navbar-color border rounded-md hover:bg-navbar-color hover:text-white transition-all duration-200'
            >
              Next
            </button>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default FoodAssuranceOrgModalDetails
