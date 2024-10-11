import { useState, useEffect } from 'react'
import { CiSearch } from 'react-icons/ci'
import { useFetchSingleOrganization } from '../../hooks/companiesApi'
import FoodAssuranceOrgModalDetails from '../Details/FoodAssuranceOrgModalDetails'
import { useLocation, useParams } from 'react-router-dom'

const FoodAssuranceOrgSingle = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const { id } = useParams()
  const location = useLocation()

  // Extract company name from state
  const companyName = location.state?.companyName || 'Unknown Company'

  const [orgId, setOrgId] = useState(id)
  const {
    data: singleOrgData,
    isPending,
    refetch,
  } = useFetchSingleOrganization(orgId)
  const [membersOrder, setMembersOrder] = useState(singleOrgData?.members)
  const [orderCount, setOrderCount] = useState(0)
  const [filteredOrg, setFilteredOrg] = useState(singleOrgData?.data?.members)
  const [membersReq, setMembersReq] = useState(
    singleOrgData?.data?.membershipRequestsReceived
  )
  const [membersReqSent, setMembersReqSent] = useState(
    singleOrgData?.data?.membershipRequestsSent
  )
  const [loadingModal, setLoadingModal] = useState(false)
  const [page, setPage] = useState(0)

  // Function to remove duplicates by _id
  const removeDuplicatesById = (array) => {
    const uniqueMap = new Map()
    array.forEach((item) => {
      if (item && item._id) {
        uniqueMap.set(item._id, item)
      }
    })
    return Array.from(uniqueMap.values())
  }

  useEffect(() => {
    setOrderCount(singleOrgData?.data?.members?.length)
    const uniqueMembers = removeDuplicatesById(
      singleOrgData?.data?.members || []
    )

    setFilteredOrg(uniqueMembers)
    setMembersReq(singleOrgData?.data?.membershipRequestsReceived)
    setMembersReqSent(singleOrgData?.data?.membershipRequestsSent)
  }, [singleOrgData])

  const searchFilter = (event) => {
    const value = event.target.value.toLowerCase()
    setFilteredOrg(
      singleOrgData?.data?.members?.filter(
        (item) =>
          item.name.toLowerCase().includes(value) ||
          item.email.toLowerCase().includes(value)
      )
    )
  }

  useEffect(() => {
    refetch()
  }, [orgId, refetch])

  useEffect(() => {
    if (orgId) {
      setLoadingModal(true)
      refetch().finally(() => setLoadingModal(false))
    }
  }, [orgId, refetch])

  const handleModalClose = () => {
    setModalOpen(false)
    setMembersOrder([])
  }

  const handleMoreInfo = async (id) => {
    if (id) {
      setOrgId(id)
      setLoadingModal(true)
      await refetch()
      setLoadingModal(false)
      setModalOpen(true)
      setMembersOrder(singleOrgData?.members)
    }
  }

  return (
    <>
      <div className='flex flex-col gap-3 p-5'>
        <h3 className='flex items-center gap-3 text-2xl font-bold text-gray-700'>
          {companyName}
        </h3>
        <h3 className='flex items-center gap-3 text-2xl font-bold text-gray-700'>
          <span className='text-navbar-color text-base bg-green-100 font-bold rounded-md p-1'>
            {orderCount} Members
          </span>
          <span className='text-white text-base bg-green-500 font-bold rounded-md p-1'>
            {membersReq?.length} Membership Request Recieved
          </span>
          <span className='text-white text-base bg-green-700 font-bold rounded-md p-1'>
            {membersReqSent?.length} Membership Request sent
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
          <div className='flex gap-2 items-center flex-wrap py-2'>
            <h3 className='flex items-center gap-3 text-2xl font-bold text-gray-700'>
              Active Members
            </h3>
            <h3 className='flex items-center capitalize gap-3 text-2xl font-bold text-gray-700'>
              bill
              <span className='text-white text-base px-4 py-2 bg-green-700 font-bold rounded-md p-1'>
                ₦{''} {singleOrgData?.bills.toLocaleString()}
              </span>
            </h3>
          </div>
          <table className='rounded-md overflow-hidden w-full'>
            {/* Head */}
            <thead className='bg-green-100'>
              <tr className='text-navbar-color py-2 h-14'>
                <th className='p-2 text-center'>Members Name</th>
                <th className='p-2 text-center'>Members Email</th>
                <th className='p-2 text-center'>Plan Limit</th>
                <th className='p-2 text-center'>Expected Pay</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className='mt-5 bg-white text-[#3A3A3A]'>
              {filteredOrg &&
                filteredOrg?.slice(page, page + 10).map((item) => {
                  return (
                    <tr
                      key={item?._id}
                      // onClick={() => handleMoreInfo(item?._id)}
                      onClick={() => handleMoreInfo(orgId)}
                      className='text-center cursor-pointer mt-5 py-2 h-12 border-b-[1px] border-green-200 hover:bg-slate-200'
                    >
                      <td className='p-2'>{item?.name}</td>
                      <td className='p-2'>{item?.email}</td>
                      <td className='p-2'>
                        ₦{item?.planLimit?.toLocaleString()}
                      </td>
                      <td className='p-2'>{item?.expectedPay}</td>
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
              if (page + 10 < singleOrgData?.data?.members?.data?.length) {
                setPage(page + 10)
              }
            }}
            className='py-2 px-4 border-navbar-color border rounded-md hover:bg-navbar-color hover:text-white transition-all duration-200'
          >
            Next
          </button>
        </div>
      </div>

      {membersReq?.length > 0 && (
        <div className='flex flex-col gap-3 p-5'>
          {/* Table */}
          <div className='overflow-x-auto'>
            <h3 className='flex items-center gap-3 text-2xl font-bold text-gray-700'>
              Membership Request Received
            </h3>
            <table className='rounded-md overflow-hidden w-full'>
              {/* Head */}
              <thead className='bg-green-100'>
                <tr className='text-navbar-color py-2 h-14'>
                  <th className='p-2 text-center'>Members Name</th>
                  <th className='p-2 text-center'>Members Email</th>
                  <th className='p-2 text-center'>Plan Limit</th>
                  <th className='p-2 text-center'>Expected Pay</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className='mt-5 bg-white text-[#3A3A3A]'>
                {membersReq &&
                  membersReq?.length > 0 &&
                  membersReq?.slice(page, page + 10).map((item) => {
                    return (
                      <tr
                        key={item?._id}
                        onClick={() => handleMoreInfo(item?._id)}
                        className='text-center cursor-pointer mt-5 py-2 h-12 border-b-[1px] border-green-200 hover:bg-slate-200'
                      >
                        <td className='p-2'>{item?.name}</td>
                        <td className='p-2'>{item?.email}</td>
                        <td className='p-2'>
                          ₦{item?.planLimit?.toLocaleString()}
                        </td>
                        <td className='p-2'>{item?.expectedPay}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>

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
                if (page + 10 < membersReq?.length) {
                  setPage(page + 10)
                }
              }}
              className='py-2 px-4 border-navbar-color border rounded-md hover:bg-navbar-color hover:text-white transition-all duration-200'
            >
              Next
            </button>
          </div>
        </div>
      )}

      {modalOpen && orgId && !isPending && (
        <FoodAssuranceOrgModalDetails
          isOpen={modalOpen}
          onClose={handleModalClose}
          organizationMember={membersOrder}
          singleLoading={loadingModal}
        />
      )}
    </>
  )
}

export default FoodAssuranceOrgSingle
