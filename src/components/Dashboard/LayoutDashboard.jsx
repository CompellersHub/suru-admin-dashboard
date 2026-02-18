/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for menu toggle
import suru from "../../assets/suru.png";
import logo from "../../assets/logo.png";
import Navigation from "./Navigation";

const LayoutDashboard = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
    document.body.classList.toggle("overflow-hidden", !isNavOpen); // Prevent scrolling when nav is open
  };

  return (
    <section className="bg-gray-200 min-h-screen flex flex-col">
      {/* Dashboard Header */}
      <header className="flex items-center justify-between gap-5 bg-navbar-color p-4 md:px-10">
        <Link to="/" className="flex gap-3 items-center">
          <img src={logo} alt="logo" className="w-10 md:w-14" />
          <img src={suru} alt="company name" className="w-14 md:w-24 lg:w-32" />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="text-white text-2xl md:hidden"
          aria-label="Toggle Navigation"
          aria-expanded={isNavOpen}
          onClick={toggleNav}
        >
          {isNavOpen ? <FiX /> : <FiMenu />}
        </button>
      </header>

      {/* Dashboard Main */}
      <div className="flex flex-grow">
        {/* Sidebar Navigation */}
        <nav
          className={`  h-full   transform transition-transform duration-300 ease-in-out
            ${
              isNavOpen ? "translate-x-0" : "-translate-x-full"
            } md:relative md:translate-x-0 md:w-[20%] w-2/3 z-30`}
        >
          <Navigation toggleNav={toggleNav} />
        </nav>

        {/* Dashboard Content */}
        <main className="flex-grow md:w-[80%] ml-auto p-4">{children}</main>
      </div>
    </section>
  );
};

export default LayoutDashboard;
