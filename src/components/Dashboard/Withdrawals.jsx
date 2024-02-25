import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { api } from "../../hooks/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Withdrawals = () => {
  const [orderType, setOrderType] = useState("all");
  const [withdrawalList, setWithdrawalList] = useState([]);
  const [filteredWithdrawal, setFilteredWithdrawal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    getWithdrawalList();
  }, []);

  const getWithdrawalList = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${api.get_withdrawal}/list`, {
        headers: {
          authorization: `${user.userToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setWithdrawalList(data.data);
      setFilteredWithdrawal(data.data);
    } catch (err) {
      toast.error(`${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filterByStatus = (stock) => {
    if (stock === "approved") {
      setFilteredWithdrawal(
        withdrawalList.filter((item) => item.status === "approved")
      );
    } else if (stock === "pending") {
      setFilteredWithdrawal(
        withdrawalList.filter((item) => item.status === "pending")
      );
    } else if (stock === "all") {
      setFilteredWithdrawal(withdrawalList);
    } else {
      setFilteredWithdrawal(
        withdrawalList.filter((item) => item.status === "rejected")
      );
    }

    // Reset page to 0 when filter changes
    setPage(0);
  };

  const searchFilter = (event) => {
    const value = event.target.value;
    setFilteredWithdrawal(
      withdrawalList.filter((item) =>
        item.bankHolderName.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="flex flex-col gap-3 p-5">
      <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-700">
        Withdrawals
        <span className="text-navbar-color text-base bg-green-100 font-bold rounded-md p-1">
          {withdrawalList?.length} withdrawals
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
          All Withdrawals
        </button>
        <button
          onClick={() => {
            setOrderType("pending");
            filterByStatus("pending");
          }}
          className={
            orderType === "pending"
              ? "text-navbar-color font-bold"
              : "text-black"
          }
        >
          Pending Withdrawals
        </button>
        <button
          onClick={() => {
            setOrderType("approved");
            filterByStatus("approved");
          }}
          className={
            orderType === "approved"
              ? "text-navbar-color font-bold"
              : "text-black"
          }
        >
          Approved Withdrawals
        </button>
        <button
          onClick={() => {
            setOrderType("rejected");
            filterByStatus("rejected");
          }}
          className={
            orderType === "rejected"
              ? "text-navbar-color font-bold"
              : "text-black"
          }
        >
          Rejected Withdrawals
        </button>
      </div>

      <form className="flex gap-5 bg-white rounded-md py-3 px-5 text-navbar-color">
        {/* search input */}
        <div className="w-[50%] relative">
          <input
            onChange={searchFilter}
            className="p-[10px] px-10 border-[1px] rounded-md border-green-300 w-full placeholder:text-navbar-color"
            type="text"
            placeholder="Search by Vendors Company Name"
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
            <th>Vendors Name</th>
            <th>Withdrawal Amount</th>
            <th>Date of Request</th>
            <th>Bank Name</th>
            <th>Status</th>
          </tr>
        </thead>

        {/* body */}
        <tbody className="mt-5 bg-white text-[#3A3A3A]">
          {filteredWithdrawal.slice(page, page + 10).map((item) => {
            const options = {
              year: "numeric",
              month: "short",
              day: "numeric",
            };

            const dateObject = new Date(item.createdAt);
            const readableDate = dateObject.toLocaleString("en-US", options);

            return (
              <tr
                onClick={() => navigate(`/withdrawal/details/${item._id}`)}
                key={item._id}
                className="text-center h-12 border-b-[1px] border-green-200"
              >
                <td className="w-[20%]">{item.bankHolderName}</td>
                <td className="w-[20%]">N{item.withdrawalAmount}</td>
                <td className="w-[20%]">{readableDate}</td>
                <td className="w-[20%]">{item.bankName}</td>
                <td
                  className={`w-[20%] ${
                    item.status === "pending"
                      ? "bg-orange-500"
                      : "bg-navbar-color"
                  } text-white`}
                >
                  {item.status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {!loading && filteredWithdrawal.length === 0 && (
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
            if (page + 10 < withdrawalList.length) {
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

export default Withdrawals;
