import React from 'react'
import suru from '../../assets/suru.png'
import logo from '../../assets/logo.png'
import Navigation from './Navigation'
import Dashboard from './Dashboard'
import Withdrawals from './Withdrawals'
import Orders from './Orders'
import Uploads from './Uploads'
import Products from './Products'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { useSelector } from 'react-redux'

const GeneralDashboard = () => {
  const activeNav = useSelector((state) => state.nav.nav)

  return (
    <section className='bg-gray-200 min-h-[100vh]'>
      {/* dashboard header */}
      <header className='flex items-center justify-between gap-5 bg-navbar-color p-4 md:px-10'>
        <Link to='#' className='flex gap-3 items-center'>
          <img src={logo} alt='logo' className='w-10 md:w-14' />
          <img src={suru} alt='company name' className='w-14 md:w-24 lg:w-32' />
        </Link>
      </header>

      {/* dashboard main */}
      <div className='flex min-h-[87vh]'>
        {/* dashboard nav */}
        <Navigation />

        {/* dashboards */}
        <div className=' w-[80%]'>
          {activeNav === 'dashboard' ? (
            <Dashboard />
          ) : activeNav === 'orders' ? (
            <Orders />
          ) : activeNav === 'products' ? (
            <Products />
          ) : activeNav === 'uploads' ? (
            <Uploads />
          ) : (
            <Withdrawals />
          )}
        </div>
      </div>
      <ToastContainer position='top-right' />
    </section>
  )
}

export default GeneralDashboard
