/* eslint-disable react/prop-types */
import { useState } from 'react'
import { MdOutlineDashboard } from 'react-icons/md'
import { FaClipboardList } from 'react-icons/fa'
import { CiViewList, CiLogout, CiDeliveryTruck } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { navAction } from '../../store/nav-slice'
import { authAction } from '../../store/auth-slice'
import { NavLink } from 'react-router-dom'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

const Navigation = ({ toggleNav }) => {
  const activeNav = useSelector((state) => state.nav.nav)
  const dispatch = useDispatch()

  const [dropdowns, setDropdowns] = useState({
    products: false,
    logistics: false,
    vendors: false,
  })

  const toggleDropdown = (menu) => {
    setDropdowns({
      products: menu === 'products' ? !dropdowns.products : false,
      logistics: menu === 'logistics' ? !dropdowns.logistics : false,
      vendors: menu === 'vendors' ? !dropdowns.vendors : false,
    })
  }

  const handleLogout = () => {
    sessionStorage.clear()
    dispatch(authAction.logout())
    if (toggleNav) toggleNav() // Close the menu after logout
  }

  const handleNavClick = (nav) => {
    dispatch(navAction.setNav({ nav }))
    if (toggleNav) toggleNav() // Close the menu after navigating
  }

  return (
    <nav className='flex capitalize flex-col min-h-screen  gap-4 bg-white w-full md:w-auto py-10'>
      {/* Vendors with Dropdown */}
      <div className='flex flex-col'>
        <div
          onClick={() => toggleDropdown('vendors')}
          className={`flex gap-10  ${
            activeNav === 'vendors' || dropdowns.vendors
              ? 'bg-green-100'
              : 'group transition-all duration-200 hover:bg-green-100'
          }`}
        >
          <div
            className={`h-14 w-[4px] ${
              activeNav === 'vendors' || dropdowns.vendors
                ? 'bg-navbar-color'
                : 'bg-white group-hover:bg-navbar-color transition-all duration-200'
            }`}
          ></div>
          <div className='flex items-center justify-between gap-2 text-xl w-full'>
            <div className='flex items-center gap-2'>
              <MdOutlineDashboard />
              <span>Vendors</span>
            </div>
            {dropdowns.vendors ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        </div>
        {dropdowns.vendors && (
          <div className='flex flex-col ml-10 gap-2'>
            <NavLink
              to='/vendors'
              className={({ isActive }) =>
                `${
                  isActive
                    ? 'text-navbar-color'
                    : 'group-hover:text-navbar-color transition-all duration-200'
                }`
              }
              onClick={() => handleNavClick('vendors')}
            >
              Vendor List
            </NavLink>
            <NavLink
              to='/withdrawal'
              className={({ isActive }) =>
                `${
                  isActive
                    ? 'text-navbar-color'
                    : 'group-hover:text-navbar-color transition-all duration-200'
                }`
              }
              onClick={() => handleNavClick('withdrawal')}
            >
              Withdrawal
            </NavLink>
          </div>
        )}
      </div>

      {/* Orders */}
      <NavLink
        to='/orders'
        className={({ isActive }) =>
          `flex gap-10 ${
            isActive
              ? 'bg-green-100 text-navbar-color'
              : 'group transition-all duration-200 hover:bg-green-100'
          }`
        }
        onClick={() => handleNavClick('orders')}
      >
        <div
          className={`h-14 w-[4px] ${
            activeNav === 'orders'
              ? 'bg-navbar-color'
              : 'bg-white group-hover:bg-navbar-color transition-all duration-200'
          }`}
        ></div>
        <div className='flex items-center gap-2 text-xl'>
          <FaClipboardList />
          <span>Orders</span>
        </div>
      </NavLink>

      {/* Products with Dropdown */}
      <div className='flex flex-col'>
        <div
          onClick={() => toggleDropdown('products')}
          className={`flex gap-10 ${
            activeNav === 'products' || dropdowns.products
              ? 'bg-green-100'
              : 'group transition-all duration-200 hover:bg-green-100'
          }`}
        >
          <div
            className={`h-14 w-[4px] ${
              activeNav === 'products' || dropdowns.products
                ? 'bg-navbar-color'
                : 'bg-white group-hover:bg-navbar-color transition-all duration-200'
            }`}
          ></div>
          <div className='flex items-center justify-between gap-2 text-xl w-full'>
            <div className='flex items-center gap-2'>
              <CiViewList />
              <span>Products</span>
            </div>
            {dropdowns.products ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        </div>
        {dropdowns.products && (
          <div className='flex flex-col ml-10 gap-2'>
            <NavLink
              to='/products'
              className={({ isActive }) =>
                `${
                  isActive
                    ? 'text-navbar-color'
                    : 'group-hover:text-navbar-color transition-all duration-200'
                }`
              }
              onClick={() => handleNavClick('product-list')}
            >
              Product List
            </NavLink>
            <NavLink
              to='/upload'
              className={({ isActive }) =>
                `${
                  isActive
                    ? 'text-navbar-color'
                    : 'group-hover:text-navbar-color transition-all duration-200'
                }`
              }
              onClick={() => handleNavClick('product-upload')}
            >
              Upload Product
            </NavLink>
          </div>
        )}
      </div>

      {/* Logistics with Dropdown */}
      <div className='flex flex-col'>
        <div
          onClick={() => toggleDropdown('logistics')}
          className={`flex gap-10 ${
            activeNav === 'logistics' || dropdowns.logistics
              ? 'bg-green-100'
              : 'group transition-all duration-200 hover:bg-green-100'
          }`}
        >
          <div
            className={`h-14 w-[4px] ${
              activeNav === 'logistics' || dropdowns.logistics
                ? 'bg-navbar-color'
                : 'bg-white group-hover:bg-navbar-color transition-all duration-200'
            }`}
          ></div>
          <div className='flex items-center justify-between gap-2 text-xl w-full'>
            <div className='flex items-center gap-2'>
              <CiDeliveryTruck />
              <span>Logistics</span>
            </div>
            {dropdowns.logistics ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        </div>
        {dropdowns.logistics && (
          <div className='flex flex-col ml-10 gap-2'>
            <NavLink
              to='/logistics-overview'
              className={({ isActive }) =>
                `${
                  isActive
                    ? 'text-navbar-color'
                    : 'group-hover:text-navbar-color transition-all duration-200'
                }`
              }
              onClick={() => handleNavClick('logistics-overview')}
            >
              Overview
            </NavLink>
            <NavLink
              to='/log-withdrawal'
              className={({ isActive }) =>
                `${
                  isActive
                    ? 'text-navbar-color'
                    : 'group-hover:text-navbar-color transition-all duration-200'
                }`
              }
              onClick={() => handleNavClick('log-withdrawal')}
            >
              Log Withdrawal
            </NavLink>
          </div>
        )}
      </div>

      {/* Logout */}
      <div className='flex items-center gap-3 text-xl mt-auto ml-10 text-[#EB5757]'>
        <CiLogout />
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}

export default Navigation
