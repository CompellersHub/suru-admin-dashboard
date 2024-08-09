import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineDashboard } from 'react-icons/md'
import { FaClipboardList } from 'react-icons/fa'
import { CiViewList, CiLogout } from 'react-icons/ci'
import { FaUpload } from 'react-icons/fa6'
import { IoCashOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { navAction } from '../../store/nav-slice'
import { authAction } from '../../store/auth-slice'

const Navigation = () => {
  const activeNav = useSelector((state) => state.nav.nav)
  const dispatch = useDispatch()

  const setActiveNav = (nav) => {
    dispatch(navAction.setNav({ nav: nav }))
  }

  return (
    <nav className='flex flex-col gap-4 bg-white w-[20%] py-10'>
      <div
        onClick={() => setActiveNav('dashboard')}
        className={`flex gap-10 ${
          activeNav === 'dashboard'
            ? 'bg-green-100'
            : 'group transition-all duration-200 hover:bg-green-100'
        }`}
      >
        <div
          className={`h-14 w-[4px] ${
            activeNav === 'dashboard'
              ? 'bg-navbar-color'
              : 'bg-white group-hover:bg-navbar-color transition-all duration-200'
          }`}
        ></div>
        <div
          className={`flex ${
            activeNav === 'dashboard'
              ? 'text-navbar-color'
              : 'group-hover:text-navbar-color transition-all duration-200'
          } items-center gap-2 text-xl`}
        >
          <MdOutlineDashboard />
          <button>Vendors</button>
        </div>
      </div>

      {/* orders */}
      <div
        onClick={() => setActiveNav('orders')}
        className={`flex gap-10 ${
          activeNav === 'orders'
            ? 'bg-green-100'
            : 'group transition-all duration-200 hover:bg-green-100'
        }`}
      >
        <div
          className={`h-14 w-[4px] ${
            activeNav === 'orders'
              ? 'bg-navbar-color'
              : 'bg-white group-hover:bg-navbar-color transition-all duration-200'
          }`}
        ></div>
        <div
          className={`flex ${
            activeNav === 'orders'
              ? 'text-navbar-color'
              : 'group-hover:text-navbar-color transition-all duration-200'
          } items-center gap-2 text-xl`}
        >
          <FaClipboardList />
          <button>Orders</button>
        </div>
      </div>

      {/* products */}
      <div
        onClick={() => setActiveNav('products')}
        className={`flex gap-10 ${
          activeNav === 'products'
            ? 'bg-green-100'
            : 'group transition-all duration-200 hover:bg-green-100'
        }`}
      >
        <div
          className={`h-14 w-[4px] ${
            activeNav === 'products'
              ? 'bg-navbar-color'
              : 'bg-white group-hover:bg-navbar-color transition-all duration-200'
          }`}
        ></div>
        <div
          className={`flex ${
            activeNav === 'products'
              ? 'text-navbar-color'
              : 'group-hover:text-navbar-color transition-all duration-200'
          } items-center gap-2 text-xl`}
        >
          <CiViewList />
          <button>Products</button>
        </div>
      </div>

      {/* product upload */}
      <div
        onClick={() => setActiveNav('uploads')}
        className={`flex gap-10 ${
          activeNav === 'uploads'
            ? 'bg-green-100'
            : 'group transition-all duration-200 hover:bg-green-100'
        }`}
      >
        <div
          className={`h-14 w-[4px] ${
            activeNav === 'uploads'
              ? 'bg-navbar-color'
              : 'bg-white group-hover:bg-navbar-color transition-all duration-200'
          }`}
        ></div>
        <div
          className={`flex ${
            activeNav === 'uploads'
              ? 'text-navbar-color'
              : 'group-hover:text-navbar-color transition-all duration-200'
          } items-center gap-2 text-xl`}
        >
          <FaUpload />
          <button>Uploads</button>
        </div>
      </div>

      {/* Withdrawals */}
      <div
        onClick={() => setActiveNav('withdrawals')}
        className={`flex gap-10 ${
          activeNav === 'withdrawals'
            ? 'bg-green-100'
            : 'group transition-all duration-200 hover:bg-green-100'
        }`}
      >
        <div
          className={`h-14 w-[4px] ${
            activeNav === 'withdrawals'
              ? 'bg-navbar-color'
              : 'bg-white group-hover:bg-navbar-color transition-all duration-200'
          }`}
        ></div>
        <div
          className={`flex ${
            activeNav === 'withdrawals'
              ? 'text-navbar-color'
              : 'group-hover:text-navbar-color transition-all duration-200'
          } items-center gap-2 text-xl`}
        >
          <IoCashOutline />
          <button>Withdrawals</button>
        </div>
      </div>
      <div className='flex items-center gap-3 text-xl mt-auto ml-10 text-[#EB5757]'>
        <CiLogout />
        <button
          onClick={() => {
            sessionStorage.clear()
            dispatch(authAction.logout())
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navigation
