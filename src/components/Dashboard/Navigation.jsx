/* eslint-disable react/prop-types */
import { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { CiViewList, CiLogout, CiDeliveryTruck } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { navAction } from "../../store/nav-slice";
import { authAction } from "../../store/auth-slice";
import { NavLink } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuUserSquare } from "react-icons/lu";

const Navigation = ({ toggleNav }) => {
  const activeNav = useSelector((state) => state.nav.nav);
  const dispatch = useDispatch();

  const [dropdowns, setDropdowns] = useState({
    products: false,
    logistics: false,
    vendors: false,
    withdrawals: false,
  });

  const toggleDropdown = (menu) => {
    setDropdowns((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleLogout = () => {
    sessionStorage.clear();
    dispatch(authAction.logout());
    if (toggleNav) toggleNav();
  };

  const handleNavClick = (nav) => {
    dispatch(navAction.setNav({ nav }));
    if (toggleNav) toggleNav();
  };

  return (
    <nav className="flex flex-col h-[120vh] capitalize w-64 bg-white  py-5 px-4 transition-all duration-300">
      {/* Sidebar Header */}
      <div className="text-2xl font-semibold text-gray-800 mb-5 px-2">
        Dashboard
      </div>

      {/* Sidebar Menu */}
      <div className="space-y-2">
        {/* Vendors */}
        <div className="group">
          <div
            className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ${
              activeNav === "vendors" || dropdowns.vendors
                ? "bg-green-100 text-green-700"
                : "hover:bg-gray-100"
            }`}
            onClick={() => toggleDropdown("vendors")}
          >
            <div className="flex items-center gap-3">
              <MdOutlineDashboard />
              <span>Vendors</span>
            </div>
            {dropdowns.vendors ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>

          {dropdowns.vendors && (
            <div className="pl-10 mt-2 space-y-1 transition-all duration-300">
              <NavLink
                to="/vendors"
                className="block py-2 text-gray-700 hover:text-green-700"
                onClick={() => handleNavClick("vendors")}
              >
                Vendor List
              </NavLink>
              <NavLink
                to="/withdrawal"
                className="block py-2 text-gray-700 hover:text-green-700"
                onClick={() => handleNavClick("withdrawal")}
              >
                Withdrawal
              </NavLink>
            </div>
          )}
        </div>

        {/* Orders */}
        <NavLink
          to="/orders"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
            activeNav === "orders"
              ? "bg-green-100 text-green-700"
              : "hover:bg-gray-100"
          }`}
          onClick={() => handleNavClick("orders")}
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>

        {/* Products */}
        <div className="group">
          <div
            className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ${
              activeNav === "products" || dropdowns.products
                ? "bg-green-100 text-green-700"
                : "hover:bg-gray-100"
            }`}
            onClick={() => toggleDropdown("products")}
          >
            <div className="flex items-center gap-3">
              <CiViewList />
              <span>Products</span>
            </div>
            {dropdowns.products ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>

          {dropdowns.products && (
            <div className="pl-10 mt-2 space-y-1 transition-all duration-300">
              <NavLink
                to="/products"
                className="block py-2 text-gray-700 hover:text-green-700"
                onClick={() => handleNavClick("product-list")}
              >
                Live Product
              </NavLink>
              <NavLink
                to="/upload"
                className="block py-2 text-gray-700 hover:text-green-700"
                onClick={() => handleNavClick("product-upload")}
              >
                Pending Product
              </NavLink>
            </div>
          )}
        </div>

        {/* Logistics */}
        <div className="group">
          <div
            className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ${
              activeNav === "logistics" || dropdowns.logistics
                ? "bg-green-100 text-green-700"
                : "hover:bg-gray-100"
            }`}
            onClick={() => toggleDropdown("logistics")}
          >
            <div className="flex items-center gap-3">
              <CiDeliveryTruck />
              <span>Logistics</span>
            </div>
            {dropdowns.logistics ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>

          {dropdowns.logistics && (
            <div className="pl-10 mt-2 space-y-1 transition-all duration-300">
              <NavLink
                to="/logistics-overview"
                className="block py-2 text-gray-700 hover:text-green-700"
                onClick={() => handleNavClick("logistics-overview")}
              >
                Logistics List
              </NavLink>
              <NavLink
                to="/log-withdrawal"
                className="block py-2 text-gray-700 hover:text-green-700"
                onClick={() => handleNavClick("log-withdrawal")}
              >
                Logistics Withdrawal
              </NavLink>
            </div>
          )}
        </div>
      </div>
      {/* withdrawls */}

      <div className="group">
        <div
          className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ${
            activeNav === "withdrawals" || dropdowns.withdrawals
              ? "bg-green-100 text-green-700"
              : "hover:bg-gray-100"
          }`}
          onClick={() => toggleDropdown("withdrawals")}
        >
          {/* withdrawls */}
          <div className="flex items-center gap-3">
            <LuUserSquare />
            <span>Users</span>
          </div>
          {dropdowns.withdrawals ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>

        {dropdowns.withdrawals && (
          <div className="pl-10 mt-2 space-y-1 transition-all duration-300">
            <NavLink
              to="/withdrawal-requests"
              className="block py-2 text-gray-700 hover:text-green-700"
              onClick={() => handleNavClick("withdrawal-requests")}
            >
              All Requests Request
            </NavLink>
            {/*  */}
          </div>
        )}
      </div>

      {/* Logout */}
      <div className="mt-auto px-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full py-3 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-300"
        >
          <CiLogout />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
