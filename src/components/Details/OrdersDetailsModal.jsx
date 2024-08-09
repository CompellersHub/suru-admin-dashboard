/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
// import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Modal from '../common/Modal'
import { useQueryClient } from '@tanstack/react-query'
import { useConfirmOrder } from '../../hooks/ordersApi'

const OrdersDetailsModal = ({ isOpen, onClose, orderItem, singleLoading }) => {
  if (!orderItem) return null

  const { mutateAsync: confirmOrder, isPending } = useConfirmOrder()
  const queryClient = useQueryClient()
  const handleConfirmOrder = async (id) => {
    try {
      const res = await confirmOrder(id)
      if (res?.status) {
        toast.success('Order confirmed successfully')
        queryClient.invalidateQueries({ queryKey: ['single_order'] })
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
          <p>Getting Order data...</p>
        </div>
      ) : (
        <Modal isOpen={isOpen} onClose={onClose} title='Order Details'>
          <section className='flex flex-col gap-3 md:w-[50%] p-5 mx-auto'>
            <strong>Order Details</strong>

            {orderItem && (
              <div className='flex justify-between items-center'>
                <img
                  className='w-20 h-20 md:w-32 md:h-32 rounded-md'
                  src={orderItem.items.imageUrl}
                  alt='order image'
                />
                <div className='flex flex-col gap-2 justify-center items-center'>
                  <p>Quantity</p>
                  <p>{orderItem.items.quantity}</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'>
                  <p>Total</p>
                  <p>₦{orderItem.bill}</p>
                </div>
              </div>
            )}

            {/* Item */}
            {orderItem && (
              <div className='flex justify-between items-center mt-5'>
                <strong>Name</strong>
                <p>{orderItem.items.name}</p>
              </div>
            )}

            {/* status */}
            {orderItem && (
              <div className='flex justify-between items-center mt-5'>
                <strong>Status</strong>
                <p
                  className={`${
                    orderItem.status === 'ongoing'
                      ? 'bg-yellow-400'
                      : orderItem.status === 'shipped'
                      ? 'bg-gray-400'
                      : orderItem.status === 'cancelled'
                      ? 'bg-red-500'
                      : 'bg-navbar-color'
                  } px-2 py-1 rounded-md text-white`}
                >
                  {orderItem.status}
                </p>
              </div>
            )}

            {/* update status */}
            {orderItem && (
              <div className='flex justify-between items-center mt-5'>
                <strong>Update Status:</strong>
                <div className='flex gap-2'>
                  {/* {orderItem.status === "ongoing" && (
                <button
                  onClick={() => updateOrderStatus("cancel")}
                  className="bg-red-600 px-2 py-1 rounded-md text-white"
                >
                  Cancel Order
                </button>
              )} */}
                  {/* {orderItem.status === "ongoing" ? (
                <button
                  onClick={() => updateOrderStatus("ship")}
                  className="bg-navbar-color px-2 py-1 rounded-md text-white"
                >
                  Shipped
                </button>
              ) : ( */}
                  <button
                    onClick={handleConfirmOrder}
                    className='bg-navbar-color px-2 py-1 rounded-md text-white'
                  >
                    {isPending ? 'Please wait...' : 'Confirm'}
                  </button>
                  {/* // )} */}
                </div>
              </div>
            )}
          </section>
        </Modal>
      )}
    </>
  )
}

export default OrdersDetailsModal
