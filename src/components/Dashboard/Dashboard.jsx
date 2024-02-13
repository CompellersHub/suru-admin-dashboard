import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("id");

  let arr = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  return (
    <div className="flex flex-col gap-3 p-5">
      <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-700">
        Welcome Admin Fortune
      </h3>

      <form className="flex gap-5 bg-white rounded-md py-3 px-5 text-navbar-color">
        {/* search input */}
        <div className="w-[50%] relative">
          <input
            className="p-[10px] px-10 border-[1px] rounded-md border-green-300 w-full placeholder:text-navbar-color"
            type="text"
            placeholder="Search by Customer ID or Customer Name"
          />
          <div className="absolute top-[50%] -translate-y-[50%] left-2 text-2xl">
            <CiSearch />
          </div>
        </div>

        {/* search filter */}
        <select
          className="border-[1px] border-navbar-color rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        >
          <option value="id">Customer Id</option>
          <option value="name">Customer Name</option>
        </select>

        <button className="py-[10px] border-[1px] border-navbar-color px-5 rounded-md bg-navbar-color text-white">
          Search
        </button>
      </form>

      {/* table */}
      <table className="rounded-md overflow-hidden">
        {/* head */}
        <thead className="bg-green-100">
          <tr className="text-navbar-color py-2 h-14">
            <th>Vendors Name</th>
            <th>Total Available Products</th>
            <th>Total Order Cancelled</th>
            <th>Total Order Amount</th>
            <th>Vendor Status</th>
          </tr>
        </thead>

        {/* body */}
        <tbody className="mt-5 bg-white text-[#3A3A3A]">
          {arr.map((item, index) => (
            <tr
              key={index}
              onClick={() => navigate(`/vendor/details/${index}`)}
              className="text-center mt-5 py-2 h-12 border-b-[1px] border-green-200"
            >
              <td className="w-[20%]">Fortune Oliseyenum</td>
              <td className="w-[20%]">250</td>
              <td className="w-[20%]">50</td>
              <td className="w-[20%]">N70,000</td>
              <td className="w-[20%] text-navbar-color">Active</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center gap-20 bg-white rounded-md py-3 px-5 text-navbar-color">
        <button className="py-2 w-36 border-navbar-color border rounded-md hover:bg-navbar-color hover:text-white transition-all duration-200">
          Previous
        </button>
        <button className="py-2 w-36 border-navbar-color border rounded-md hover:bg-navbar-color hover:text-white transition-all duration-200">
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
