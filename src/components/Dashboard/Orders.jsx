import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { api } from "../../hooks/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Orders = () => {
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState("all");
  const [orderList, setOrderList] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [filteredOrder, setFilteredOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    getOrderList();
  }, []);

  const getOrderList = async () => {
    try {
      setLoading(true);
      const response = await fetch(api.get_order, {
        headers: {
          authorization: `${user.userToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      setOrderList(data.data);
      setFilteredOrder(data.data);
      setOrderCount(data.count);
    } catch (err) {
      toast.error(`${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filterByStatus = (stock) => {
    if (stock === "completed") {
      setFilteredOrder(orderList.filter((item) => item.status === "completed"));
    } else if (stock === "shipped") {
      setFilteredOrder(
        orderList.filter(
          (item) =>
            item.status === "shipped" ||
            item.status === "ongoing" ||
            item.status === "delivered"
        )
      );
    } else if (stock === "all") {
      setFilteredOrder(orderList);
    } else {
      setFilteredOrder(orderList.filter((item) => item.status === "cancelled"));
    }

    // Reset page to 0 when filter changes
    setPage(0);
  };

  const searchFilter = (event) => {
    const value = event.target.value;
    setFilteredOrder(
      orderList.filter((item) =>
        item.userInfo.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="flex flex-col gap-3 p-5">
      <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-700">
        Orders
        <span className="text-navbar-color text-base bg-green-100 font-bold rounded-md p-1">
          {orderCount} orders
        </span>
      </h3>

      {/* navs */}
      <div className="flex justify-between bg-white rounded-md py-3 px-5">
        <button
          onClick={() => {
            setOrderType("all");
            filterByStatus("all");
          }}
          className={
            orderType === "all" ? "text-navbar-color font-bold" : "text-black"
          }
        >
          All Orders
        </button>
        <button
          onClick={() => {
            setOrderType("completed");
            filterByStatus("completed");
          }}
          className={
            orderType === "completed"
              ? "text-navbar-color font-bold"
              : "text-black"
          }
        >
          Completed Orders
        </button>
        <button
          onClick={() => {
            setOrderType("progress");
            filterByStatus("shipped");
          }}
          className={
            orderType === "progress"
              ? "text-navbar-color font-bold"
              : "text-black"
          }
        >
          Order In Progress
        </button>
        <button
          onClick={() => {
            setOrderType("cancelled");
            filterByStatus("cancelled");
          }}
          className={
            orderType === "cancelled"
              ? "text-navbar-color font-bold"
              : "text-black"
          }
        >
          Cancelled Orders
        </button>
      </div>

      <form className="flex gap-5 bg-white rounded-md py-3 px-5 text-navbar-color">
        {/* search input */}
        <div className="w-[50%] relative">
          <input
            onChange={searchFilter}
            className="p-[10px] px-10 border-[1px] rounded-md border-green-300 w-full placeholder:text-navbar-color"
            type="text"
            placeholder="Search by Customer Name"
          />
          <div className="absolute top-[50%] -translate-y-[50%] left-2 text-2xl">
            <CiSearch />
          </div>
        </div>
      </form>

      {/* table */}
      <table className="rounded-md overflow-hidden">
        {/* head */}
        <thead className="bg-green-100">
          <tr className="text-navbar-color py-2 h-14">
            <th>Order ID</th>
            <th>Client Name</th>
            <th>Date Ordered</th>
            <th>Bill</th>
            <th>Order Status</th>
          </tr>
        </thead>

        {/* body */}
        <tbody className="mt-5 bg-white text-[#3A3A3A]">
          {filteredOrder.slice(page, page + 10).map((item) => {
            const options = {
              year: "numeric",
              month: "short",
              day: "numeric",
            };

            const dateObject = new Date(item.createdAt);
            const readableDate = dateObject.toLocaleString("en-US", options);

            return (
              <tr
                key={item._id}
                onClick={() => navigate(`/orders/details/${item._id}`)}
                className="text-center mt-5 py-2 h-12 border-b-[1px] border-green-200"
              >
                <td>{item._id}</td>
                <td>{item.userInfo.name}</td>
                <td>{readableDate}</td>
                <td>N{item.bill}</td>
                <td>{item.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {!loading && filteredOrder.length === 0 && (
        <p className="text-center">No Order available yet!</p>
      )}

      {/* loading state */}
      {loading && <p className="text-center">Loading...</p>}

      <div className="flex justify-center gap-20 bg-white rounded-md py-3 px-5 text-navbar-color">
        <button
          onClick={() => {
            if (page === 0) {
              return;
            } else {
              setPage(page - 10);
            }
          }}
          className="py-2 w-36 border-navbar-color border rounded-md hover:bg-navbar-color hover:text-white transition-all duration-200"
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (page + 10 < orderList.length) {
              setPage(page + 10);
            }
          }}
          className="py-2 w-36 border-navbar-color border rounded-md hover:bg-navbar-color hover:text-white transition-all duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;
