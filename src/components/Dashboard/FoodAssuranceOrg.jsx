import { useState, useEffect } from 'react'
import { CiSearch } from 'react-icons/ci'
import {
  useFetchOrganization,
  useFetchSingleOrganization,
} from '../../hooks/companiesApi'
import FoodAssuranceOrgModalDetails from '../Details/FoodAssuranceOrgModalDetails'

const FoodAssuranceOrg = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const { data: fetchOrders, isPending } = useFetchOrganization()
  const [orgId, setOrgId] = useState(null)
  const [orderCount, setOrderCount] = useState(0)
  const [filteredOrg, setFilteredOrg] = useState(fetchOrders)
  const [loadingModal, setLoadingModal] = useState(false)
  const [page, setPage] = useState(0)

  const {
    data: singleOrgData,
    isFetching: singleLoading,
    refetch,
  } = useFetchSingleOrganization(orgId, { enabled: false })

  useEffect(() => {
    setOrderCount(fetchOrders?.length)
    setFilteredOrg(fetchOrders)
  }, [fetchOrders])

  const searchFilter = (event) => {
    const value = event.target.value.toLowerCase()
    setFilteredOrg(
      fetchOrders?.filter(
        (item) =>
          item.name.toLowerCase().includes(value) ||
          item.email.toLowerCase().includes(value)
      )
    )
  }

  useEffect(() => {
    if (orgId) {
      setLoadingModal(true)
      refetch().finally(() => setLoadingModal(false))
    }
  }, [orgId, refetch])

  const handleModalClose = () => {
    setOrgId(null)
    setModalOpen(false)
  }

  const handleMoreInfo = (id) => {
    if (id) {
      setOrgId(id)
    }
  }

  useEffect(() => {
    if (!singleLoading && singleOrgData) {
      setModalOpen(true)
    }
  }, [singleLoading, singleOrgData])

  return (
    <>
      <div className='flex flex-col gap-3 p-5'>
        <h3 className='flex items-center gap-3 text-2xl font-bold text-gray-700'>
          Food Assurance
          <span className='text-navbar-color text-base bg-green-100 font-bold rounded-md p-1'>
            {orderCount} Organization
          </span>
        </h3>

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
                <th className='p-2 text-center'>Comapny ID</th>
                <th className='p-2 text-center'>Comapny Name</th>
                <th className='p-2 text-center'>Comapny Email</th>
                <th className='p-2 text-center'>No of Member</th>
                <th className='p-2 text-center'>Date Created</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className='mt-5 bg-white text-[#3A3A3A]'>
              {filteredOrg &&
                filteredOrg?.slice(page, page + 10).map((item) => {
                  const options = {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  }

                  const dateObject = new Date(item?.createdAt)
                  const readableDate = dateObject.toLocaleString(
                    'en-US',
                    options
                  )

                  return (
                    <tr
                      key={item?._id}
                      onClick={() => handleMoreInfo(item?._id)}
                      className='text-center cursor-pointer mt-5 py-2 h-12 border-b-[1px] border-green-200 hover:bg-slate-200'
                    >
                      <td className='p-2'>{item?._id}</td>
                      <td className='p-2'>{item?.name}</td>
                      <td className='p-2'>{item?.email}</td>
                      <td className='p-2'>{item?.members?.length}</td>
                      <td className='p-2'>{readableDate}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>

        {!isPending && filteredOrg?.length === 0 && (
          <p className='text-center'>No Members available yet!</p>
        )}

        {/* Loading state */}
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
              if (page + 10 < fetchOrders?.data?.length) {
                setPage(page + 10)
              }
            }}
            className='py-2 px-4 border-navbar-color border rounded-md hover:bg-navbar-color hover:text-white transition-all duration-200'
          >
            Next
          </button>
        </div>
      </div>

      {modalOpen && orgId && !singleLoading && (
        <FoodAssuranceOrgModalDetails
          isOpen={modalOpen}
          onClose={handleModalClose}
          organizationMember={singleOrgData?.members}
          singleLoading={loadingModal}
        />
      )}
    </>
  )
}

export default FoodAssuranceOrg
