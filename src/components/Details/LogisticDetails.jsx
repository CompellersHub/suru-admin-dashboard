import { useState, useEffect } from "react";
import suru from "../../assets/suru.png";
import logo from "../../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { api } from "../../hooks/api";
import { useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LogisticDetails = () => {
  const navigate = useNavigate()
  const [vendorDetails, setVendorDetails] = useState(null)
  const [loading, setLoading] = useState(null)
  const user = useSelector((state) => state.auth)
  const { vendorId } = useParams()

  useEffect(() => {
    getVendorDetaisl()
  }, [])

  const getVendorDetaisl = async () => {
    try {
      setLoading('getting')
      const response = await fetch(`${api.get_vendors}/${vendorId}`, {
        headers: {
          authorization: `${user.userToken}`,
        },
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message)
      }
      setVendorDetails(data.data)
    } catch (err) {
      toast.error(`${err.message}`)
    } finally {
      setLoading(null)
    }
  }

  const approveVendor = async () => {
    try {
      setLoading('approving')

      const response = await fetch(`${api.get_vendors}/${vendorId}`, {
        method: 'PATCH',
        headers: {
          authorization: `${user.userToken}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      console.log(data)
      toast.success(`${data.message}`)
    } catch (err) {
      console.log(err)
      toast.error(`${err.message}`)
    } finally {
      setLoading(null)
    }
  }

  return (
    <section className='bg-gray-200 min-h-[100vh] font-sans'>
      {/* dashboard header */}
      <header className='flex items-center justify-between gap-5 bg-navbar-color p-4 md:px-10'>
        <Link to='#' className='flex gap-3 items-center'>
          <img src={logo} alt='logo' className='w-10 md:w-14' />
          <img src={suru} alt='company name' className='w-14 md:w-24 lg:w-32' />
        </Link>
      </header>

      {/* vendor Profile */}
      <div className='flex flex-col items-center gap-2 w-[50%] mx-auto  p-5 mt-10 rounded-md text-lg'>
        <button onClick={() => navigate(-1)} className='self-start text-2xl'>
          <IoMdArrowBack />
        </button>

        {/* loading state */}
        {loading === 'getting' && (
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
            src={vendorDetails.image}
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
                  vendorDetails.isSuspended
                    ? 'text-red-500'
                    : vendorDetails.isVerified
                    ? 'text-navbar-color'
                    : 'text-red-500'
                }
              >
                {vendorDetails.isSuspended
                  ? 'Suspended'
                  : vendorDetails.isVerified
                  ? 'Active'
                  : 'Not Verified'}
              </p>
            </div>

            {/* vendor name */}
            <div className='flex justify-between w-full bg-slate-100'>
              <strong>Vendor Name:</strong>
              <p>{vendorDetails.companyName}</p>
            </div>

            {/* vendor email */}
            <div className='flex justify-between w-full'>
              <strong className=''>Vendor Email:</strong>
              <p className=''>{vendorDetails.companyEmail}</p>
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
              {vendorDetails.isVerified === false && (
                <button
                  onClick={approveVendor}
                  className='py-2 px-4 border border-navbar-color bg-navbar-color text-white rounded-md hover:bg-white hover:text-navbar-color transition-all duration-200'
                >
                  {loading === 'approving' ? 'Approving...' : 'Approve'}
                </button>
              )}
              {/* {vendorDetails.isVerified &&
                vendorDetails.isSuspended === false && (
                  <button className="text-white bg-red-500 border border-red-500 rounded-md py-2 px-4 hover:bg-white hover:text-red-500 transition-all duration-200">
                    Suspend
                  </button>
                )} */}
              {vendorDetails.isSuspended && (
                <button className='py-2 px-4 border border-navbar-color bg-navbar-color text-white rounded-md hover:bg-white hover:text-navbar-color transition-all duration-200'>
                  Activate
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <ToastContainer position='top-right' />
    </section>
  )
}

export default LogisticDetails
