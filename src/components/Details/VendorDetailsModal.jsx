/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
// import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Modal from '../common/Modal'
import { useQueryClient } from '@tanstack/react-query'
import { useApproveVendor } from '../../hooks/vendorsApi'

const VendorDetailsModal = ({
  isOpen,
  onClose,
  vendorDetails,
  singleLoading,
}) => {
  if (!vendorDetails) return null

  const { mutateAsync: confirmVendor, isPending } = useApproveVendor()
  const queryClient = useQueryClient()
  const approveVendor = async (id) => {
    try {
      const res = await confirmVendor(id)
      if (res?.status) {
        toast.success('Vendor confirmed successfully')
        queryClient.invalidateQueries({ queryKey: ['single_vendor'] })
        onClose()
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }

  return (
    <>
      {singleLoading ? (
        <div className='flex flex-col bg-red-500 min-h-screen items-center'>
          <p className='animate-spin'>
            <AiOutlineLoading3Quarters className='animate-spin text-4xl' />
          </p>
          <p>Getting Vendor data...</p>
        </div>
      ) : (
        <Modal isOpen={isOpen} onClose={onClose} title='Order Details'>
          <section className='flex flex-col gap-3 md:w-[50%] p-5 mx-auto'>
            <strong>Vendor Details</strong>

            {singleLoading === 'getting' && (
              <div className='flex flex-col items-center mt-20'>
                <p className='animate-spin'>
                  <AiOutlineLoading3Quarters />
                </p>
                <p>Getting vendor data...</p>
              </div>
            )}

            {vendorDetails && (
              <img
                className='w-40 h-40 rounded-full'
                src={vendorDetails?.image}
                alt='fortune'
              />
            )}

            {vendorDetails && (
              <div className='flex flex-col gap-3 items-center w-[100%] bg-white p-5 rounded-md'>
                {/* account status */}
                <div className='flex justify-between w-full'>
                  <strong>Account Status:</strong>
                  <p
                    className={
                      vendorDetails?.isSuspended
                        ? 'text-red-500'
                        : vendorDetails?.isVerified
                        ? 'text-navbar-color'
                        : 'text-red-500'
                    }
                  >
                    {vendorDetails?.isSuspended
                      ? 'Suspended'
                      : vendorDetails?.isVerified
                      ? 'Active'
                      : 'Not Verified'}
                  </p>
                </div>

                {/* vendor name */}
                <div className='flex justify-between w-full bg-slate-100'>
                  <strong>Vendor Name:</strong>
                  <p>{vendorDetails?.companyName}</p>
                </div>

                {/* vendor email */}
                <div className='flex justify-between w-full'>
                  <strong className=''>Vendor Email:</strong>
                  <p className=''>{vendorDetails?.companyEmail}</p>
                </div>

                {/* vendor name */}
                <div className='flex justify-between w-full bg-slate-100'>
                  <strong className=''>Vendor Address:</strong>
                  <p className=''>{vendorDetails.companyAddress}</p>
                </div>

                {/* vendor category */}
                <div className='flex justify-between w-full'>
                  <strong>Vendor Category:</strong>
                  <p>{vendorDetails.category}</p>
                </div>

                {/* total order amount */}
                <div className='flex justify-between w-full bg-slate-100'>
                  <strong>Total Order Amount:</strong>
                  <p>₦{vendorDetails.productSold}</p>
                </div>

                {/* total Available Product */}
                <div className='flex justify-between w-full'>
                  <strong>Total Available Product:</strong>
                  <p>{vendorDetails.totalProducts}</p>
                </div>

                {/* Account Balance */}
                <div className='flex justify-between w-full bg-slate-100'>
                  <strong>Account Balance:</strong>
                  <p>₦{vendorDetails.withdrawNairaBalance}</p>
                </div>

                {/* action buttons */}
                <div className='flex gap-10 mt-10'>
                  {/* {vendorDetails.isVerified === false && (
                <button className="text-white bg-red-500 border border-red-500 rounded-md py-2 px-4 hover:bg-white hover:text-red-500 transition-all duration-200">
                  Reject
                </button>
              )} */}
                  {vendorDetails?.isVerified === false && (
                    <button
                      onClick={approveVendor}
                      className='py-2 px-4 border border-navbar-color bg-navbar-color text-white rounded-md hover:bg-white hover:text-navbar-color transition-all duration-200'
                    >
                      {isPending === 'approving' ? 'Approving...' : 'Approve'}
                    </button>
                  )}
                  {/* {vendorDetails.isVerified &&
                vendorDetails.isSuspended === false && (
                  <button className="text-white bg-red-500 border border-red-500 rounded-md py-2 px-4 hover:bg-white hover:text-red-500 transition-all duration-200">
                    Suspend
                  </button>
                )} */}
                  {vendorDetails?.isSuspended && (
                    <button className='py-2 px-4 border border-navbar-color bg-navbar-color text-white rounded-md hover:bg-white hover:text-navbar-color transition-all duration-200'>
                      Activate
                    </button>
                  )}
                </div>
              </div>
            )}
          </section>
        </Modal>
      )}
    </>
  )
}

export default VendorDetailsModal
