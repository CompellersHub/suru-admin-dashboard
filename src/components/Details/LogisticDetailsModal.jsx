/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { toast } from 'react-toastify'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Modal from '../common/Modal'
import { useQueryClient } from '@tanstack/react-query'
import { useApproveLogistic } from '../../hooks/logisticApi'

const LogisticDetailsModal = ({
  isOpen,
  onClose,
  vendorDetails,
  singleLoading,
}) => {
  if (!vendorDetails) return null
  console.log(vendorDetails)

  const { mutateAsync: confirmVendor, isPending } = useApproveLogistic()
  const queryClient = useQueryClient()
  const approveVendor = async (id) => {
    console.log(id, 'appro')
    try {
      const res = await confirmVendor(id)
      if (res?.status) {
        toast.success(res?.message)
        queryClient.invalidateQueries({ queryKey: ['get_logistic'] })
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
          <p>Getting Logistic data...</p>
        </div>
      ) : (
        <Modal isOpen={isOpen} onClose={onClose} title='Logistic Details'>
          <section className='flex flex-col gap-3 md:w-[50%] p-5 mx-auto'>
            <strong>Logistic Details</strong>

            {singleLoading === 'getting' && (
              <div className='flex flex-col items-center mt-20'>
                <p className='animate-spin'>
                  <AiOutlineLoading3Quarters />
                </p>
                <p>Getting Logistic data...</p>
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
                  <strong>Logistic Name:</strong>
                  <p>{vendorDetails?.companyName}</p>
                </div>

                {/* vendor email */}
                <div className='flex justify-between w-full'>
                  <strong className=''>Logistic Email:</strong>
                  <p className=''>{vendorDetails?.companyEmail}</p>
                </div>

                {/* vendor name */}
                <div className='flex justify-between w-full bg-slate-100'>
                  <strong className=''>Logistic Address:</strong>
                  <p className=''>{vendorDetails.companyAddress}</p>
                </div>
                {/* vendor name */}
                <div className='flex justify-between w-full bg-slate-100'>
                  <strong className=''>Logistic Phone:</strong>
                  <p className=''>{vendorDetails.phone}</p>
                </div>

                {/* vendor category */}
                <div className='flex bg-slate-100 justify-between w-full'>
                  <strong>Logistic Carrier:</strong>
                  <p>{vendorDetails.carrier}</p>
                </div>
                {/* vendor category */}
                <div className='flex justify-between w-full'>
                  <strong>Availability:</strong>
                  <p
                    className={
                      vendorDetails?.availability
                        ? 'text-green-500'
                        : 'text-red-500'
                    }
                  >
                    {vendorDetails?.availability
                      ? 'Availaable'
                      : 'Not Availaable'}
                  </p>
                </div>

                {/* Account Details order amount */}
                <div className='flex justify-between w-full bg-slate-100'>
                  <strong>Bank Account Number:</strong>
                  <p>{vendorDetails?.bankAccountNumber}</p>
                </div>

                <div className='flex justify-between w-full'>
                  <strong>Bank Account Name:</strong>
                  <p>{vendorDetails.bankHolderName}</p>
                </div>

                <div className='flex justify-between w-full bg-slate-100'>
                  <strong>Bank Name:</strong>
                  <p>{vendorDetails.bankName}</p>
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
                      onClick={() => approveVendor(vendorDetails?._id)}
                      className='py-2 px-4 border border-navbar-color bg-navbar-color text-white rounded-md hover:bg-white hover:text-navbar-color transition-all duration-200'
                    >
                      {isPending === 'approving' ? 'Approving...' : 'Approve'}
                    </button>
                  )}
                  {/* {vendorDetails?.isVerified &&
                    vendorDetails?.isSuspended === false && (
                      <button className='text-white bg-red-500 border border-red-500 rounded-md py-2 px-4 hover:bg-white hover:text-red-500 transition-all duration-200'>
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

export default LogisticDetailsModal
