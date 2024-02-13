import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import TableList from "./TableList";

const Orders = () => {
  const [orderType, setOrderType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("id");

  let arr = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  return (
    <div className="flex flex-col gap-3 p-5">
      <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-700">
        Orders
        <span className="text-navbar-color text-base bg-green-100 font-bold rounded-md p-1">
          50 orders
        </span>
      </h3>

      {/* navs */}
      <div className="flex justify-between bg-white rounded-md py-3 px-5">
        <button
          onClick={() => setOrderType("all")}
          className={orderType === "all" && "text-navbar-color font-bold"}
        >
          All Orders
        </button>
        <button
          onClick={() => setOrderType("completed")}
          className={orderType === "completed" && "text-navbar-color font-bold"}
        >
          Completed Orders
        </button>
        <button
          onClick={() => setOrderType("progress")}
          className={orderType === "progress" && "text-navbar-color font-bold"}
        >
          Order In Progress
        </button>
        <button
          onClick={() => setOrderType("cancelled")}
          className={orderType === "cancelled" && "text-navbar-color font-bold"}
        >
          Cancelled Orders
        </button>
      </div>

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
            <th>Order ID</th>
            <th>Client Name</th>
            <th>Date Ordered</th>
            <th>Shiiping Fee</th>
            <th>Order Status</th>
          </tr>
        </thead>

        {/* body */}
        <tbody className="mt-5 bg-white text-[#3A3A3A]">
          {arr.map((item, index) => (
            <TableList index={index} route="/" />
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

export default Orders;
