/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
// import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Modal from '../common/Modal'
import { useQueryClient } from '@tanstack/react-query'
import { useUpdateLogWithdrawal } from '../../hooks/withdrawalApi'

const WithdrawalDetailsModal = ({
  isOpen,
  onClose,
  productDetails,
  singleLoading,
}) => {
  if (!productDetails) return null
  console.log(productDetails)

  const { mutateAsync: approved, isPending } = useUpdateLogWithdrawal()
  const queryClient = useQueryClient()
  const approveWithdrawal = async (id) => {
    try {
      const res = await approved(id)
      if (res?.status) {
        toast.success('Product deleted successfully')
        queryClient.invalidateQueries({ queryKey: ['get_log_withdrawals'] })
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
          <p>Getting product data...</p>
        </div>
      ) : (
        <Modal isOpen={isOpen} onClose={onClose} title='Withdrawal Details'>
          <div className='flex flex-col items-center gap-2  mx-auto p-5 rounded-md text-lg'>
            {/* product image */}

            {productDetails && (
              <img
                className='w-40 h-40 rounded-full'
                src={productDetails?.vendorId.image}
                alt='fortune'
              />
            )}

            {productDetails && (
              <div className='flex flex-col gap-3 items-center w-[70%] bg-white p-5 rounded-md'>
                {/* account status */}
                <div className='flex justify-between w-full'>
                  <strong>Account Status:</strong>
                  <p
                    className={`${
                      productDetails?.vendorId.isVerified
                        ? 'text-navbar-color'
                        : 'text-red-400'
                    }`}
                  >
                    {productDetails?.vendorId.isVerified
                      ? 'Verified'
                      : 'No Verified'}
                  </p>
                </div>

                {/* vendor name */}
                <div className='flex justify-between w-full'>
                  <strong>Vendor Name:</strong>
                  <p>{productDetails?.vendorId.companyName}</p>
                </div>

                {/* Account name */}
                <div className='flex justify-between w-full'>
                  <strong>Account Name:</strong>
                  <p>{productDetails?.bankHolderName}</p>
                </div>

                {/* Bank Name */}
                <div className='flex justify-between w-full'>
                  <strong>Bank Name:</strong>
                  <p>{productDetails?.bankName}</p>
                </div>

                {/* Account Number */}
                <div className='flex justify-between w-full'>
                  <strong>Account Number:</strong>
                  <p>{productDetails?.accountNumber}</p>
                </div>

                {/* Withdrawal amount */}
                <div className='flex justify-between w-full'>
                  <strong>Withrawal Amount:</strong>
                  <p>N{productDetails?.withdrawalAmount}</p>
                </div>

                {/* total Available Product */}
                <div className='flex justify-between w-full'>
                  <strong>Current Balance:</strong>
                  <p>N{productDetails?.vendorId.nairaBalance}</p>
                </div>

                {/* total Available Product */}
                <div className='flex justify-between w-full'>
                  <strong>Withdrawal Status:</strong>
                  <p
                    className={`${
                      productDetails?.status === 'pending'
                        ? 'text-orange-400'
                        : 'text-navbar-color'
                    }`}
                  >
                    {productDetails?.status}
                  </p>
                </div>

                <button
                  onClick={approveWithdrawal}
                  className='bg-navbar-color mt-5 text-white hover:text-navbar-color hover:bg-white py-2 px-5 rounded-md border border-navbar-color transition-all duration-200'
                >
                  {isPending ? 'Please wait...' : 'Approve'}
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  )
}

export default WithdrawalDetailsModal
