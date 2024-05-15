import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { api } from "../../hooks/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [vendorsList, setVendorsList] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [filterTerm, setFilterTerm] = useState("all");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const user = useSelector((state) => state.auth);
  useEffect(() => {
    getVendorsList();
  }, []);

  const getVendorsList = async () => {
    try {
      setLoading(true);
      const response = await fetch(api.get_vendors, {
        headers: {
          authorization: `${user.userToken}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      setVendorsList(data.data);
      setFilteredVendors(data.data);
    } catch (err) {
      toast.error(`${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filterByStatus = (stock) => {
    if (stock === "verified") {
      setFilteredVendors(vendorsList.filter((item) => item.isVerified));
    } else if (stock === "not-verified") {
      setFilteredVendors(
        vendorsList.filter((item) => item.isVerified === false)
      );
    } else if (stock === "all") {
      setFilteredVendors(vendorsList);
    } else {
      setFilteredVendors(vendorsList.filter((item) => item.isSuspended));
    }

    // Reset page to 0 when filter changes
    setPage(0);
  };

  const searchFilter = (event) => {
    const value = event.target.value;
    setFilteredVendors(
      vendorsList.filter((item) =>
        item.companyName.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="flex flex-col gap-3 p-5">
      <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-700">
        Welcome {user?.user?.name}
      </h3>

      <form className="flex gap-5 bg-white rounded-md py-3 px-5 text-navbar-color">
        {/* search input */}
        <div className="w-[50%] relative">
          <input
            className="p-[10px] px-10 border-[1px] rounded-md border-green-300 w-full placeholder:text-navbar-color"
            type="text"
            placeholder="Search by Vendors Name"
            onChange={searchFilter}
          />
          <div className="absolute top-[50%] -translate-y-[50%] left-2 text-2xl">
            <CiSearch />
          </div>
        </div>

        {/* search filter */}
        <select
          className="border-[1px] border-navbar-color rounded-md"
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
        >
          <option value="all">All</option>
          <option value="verified">Verified</option>
          <option value="not-verified">Not Verified</option>
          <option value="suspended">Suspended</option>
        </select>

        <button
          onClick={() => filterByStatus(filterTerm)}
          type="button"
          className="py-[10px] border-[1px] border-navbar-color px-5 rounded-md bg-navbar-color text-white"
        >
          Filter
        </button>
      </form>

      {/* table */}
      <table className="rounded-md overflow-hidden">
        {/* head */}
        <thead className="bg-green-100">
          <tr className="text-navbar-color py-2 h-14">
            <th>Vendors Name</th>
            <th>Total Available Products</th>
            <th>Total Order Amount</th>
            <th>Category</th>
            <th>Vendor Status</th>
          </tr>
        </thead>

        {/* body */}
        <tbody className="mt-5 bg-white text-[#3A3A3A]">
          {filteredVendors.slice(page, page + 10).map((item) => (
            <tr
              key={item._id}
              onClick={() => navigate(`/vendor/details/${item._id}`)}
              className="text-center mt-5 py-2 h-12 border-b-[1px] border-green-200 hover:bg-slate-100 hover:cursor-pointer"
            >
              <td className="w-[20%] text-start pl-2">{item.companyName}</td>
              <td className="w-[20%]">{item.totalProducts}</td>
              <td className="w-[20%]">₦{item.nairaBalance}</td>
              <td className="w-[20%]">{item.category}</td>
              <td
                className={`w-[20%] ${
                  item.isSuspended
                    ? "text-red-500"
                    : item.isVerified
                    ? "text-navbar-color"
                    : "text-red-500"
                }`}
              >
                {item.isSuspended
                  ? "Suspended"
                  : item.isVerified
                  ? "Active"
                  : "No Verified"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!loading && filteredVendors.length === 0 && (
        <p className="text-center">No vendor available yet!</p>
      )}
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
            if (page + 10 < vendorsList.length) {
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

export default Dashboard;
