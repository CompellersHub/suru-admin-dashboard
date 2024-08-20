/* eslint-disable react/prop-types */
import { useState } from 'react'
import suru from '../../assets/suru.png'
import logo from '../../assets/logo.png'
import Navigation from './Navigation'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi' // Import hamburger and close icons

const LayoutDashboard = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  return (
    <section className='bg-gray-200 min-h-[100vh]'>
      {/* Dashboard header */}
      <header className='flex items-center justify-between gap-5 bg-navbar-color p-4 md:px-10'>
        <Link to='/' className='flex gap-3 items-center'>
          <img src={logo} alt='logo' className='w-10 md:w-14' />
          <img src={suru} alt='company name' className='w-14 md:w-24 lg:w-32' />
        </Link>
        <button
          className='text-white text-2xl md:hidden' // Hamburger menu button, hidden on larger screens
          onClick={toggleNav}
        >
          {isNavOpen ? <FiX /> : <FiMenu />}{' '}
          {/* Toggle between menu and close icons */}
        </button>
      </header>

      {/* Dashboard main */}
      <div className='flex min-h-[87vh]'>
        {/* Dashboard nav */}
        <div
          className={`fixed z-20 top-0 left-0 h-full bg-white transform transition-transform duration-300 md:relative md:transform-none ${
            isNavOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 px-2 w-2/3 md:w-[20%]`}
        >
          <Navigation toggleNav={toggleNav} />
        </div>

        {/* Dashboard content */}
        <div className='w-full md:w-[80%] ml-auto'>{children}</div>
      </div>
    </section>
  )
}

export default LayoutDashboard
