import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { api } from "../../hooks/api";
import { useSelector } from "react-redux";

const Products = () => {
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("id");
  const [product, setProduct] = useState([]);
  const [productData, setProductData] = useState();
  const [newData, setNewData] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const user = useSelector((state) => state.auth);

  let arr = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  const getProduct = async (type) => {
    try {
      const response = await fetch(`${api.get_product}${type}`, {
        headers: {
          authorization: `${user.userToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // console.log(data.data);
      const newData = data.data.map((item) => item);

      // Update the state once with the new array
      setProduct((prevState) => [...prevState, ...newData]);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect to first get all the products
  useEffect(() => {
    getProduct("toprestaurant");
    getProduct("topbasket");
    getProduct("topdiet");
  }, []);

  // filtering the prduct so that no prdocut with same id appears twice
  useEffect(() => {
    const uniqueProducts = {};
    product.forEach((item) => {
      uniqueProducts[item._id] = item;
    });
    setNewData(Object.values(uniqueProducts).flatMap((item) => item));
    setProductData(Object.values(uniqueProducts).flatMap((item) => item));
  }, [product]);

  // filter by stock level
  const filterByStock = (stock) => {
    if (stock === "low") {
      setProductData(newData.filter((item) => item.stock < 20));
    } else if (stock === "out") {
      setProductData(newData.filter((item) => item.stock === 0));
    } else if (stock === "all") {
      setProductData(newData);
    } else {
      setProductData(newData.filter((item) => item.stock > 20));
    }

    // Reset page to 0 when filter changes
    setPage(0);
  };

  const searchFilter = () => {
    console.log(`search in ${searchTerm}`);
  };

  return (
    <div className="flex flex-col gap-3 p-5">
      <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-700">
        Products
        <span className="text-navbar-color text-base bg-green-100 font-bold rounded-md p-1">
          50 products
        </span>
      </h3>

      {/* navs */}
      <div className="flex justify-between bg-white rounded-md py-3 px-5">
        <button
          onClick={() => {
            setOrderType("all");
            filterByStock("all");
          }}
          className={orderType === "all" && "text-navbar-color font-bold"}
        >
          All Products
        </button>
        <button
          onClick={() => {
            setOrderType("available");
            filterByStock("available");
          }}
          className={orderType === "available" && "text-navbar-color font-bold"}
        >
          Available Products
        </button>
        <button
          onClick={() => {
            setOrderType("out");
            filterByStock("out");
          }}
          className={orderType === "out" && "text-navbar-color font-bold"}
        >
          Out Of Stock
        </button>
        <button
          onClick={() => {
            setOrderType("low");
            filterByStock("low");
          }}
          className={orderType === "low" && "text-navbar-color font-bold"}
        >
          Low Stock
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
            <th>Product Name</th>
            <th>Vendor Name</th>
            <th>Date Added</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>

        {/* body */}
        <tbody className="mt-5 bg-white text-[#3A3A3A]">
          {productData &&
            productData.slice(page, page + 10).map((item) => (
              <tr
                key={item._id}
                onClick={() => navigate(`/product/details/${item._id}`)}
                className="text-center mt-5 py-2 h-12 border-b-[1px] border-green-200"
              >
                <td className="w-[20%]">{item.name}</td>
                <td className="w-[20%]">{item.creatorName}</td>
                <td className="w-[20%]">24-10-2023</td>
                <td className="w-[20%]">{item.vendorType}</td>
                <td
                  className={`w-[20%] ${
                    item.stock < 20
                      ? "text-orange-400"
                      : item.stock === 0
                      ? "text-red-500"
                      : "text-navbar-color"
                  }`}
                >
                  {item.stock < 20
                    ? "Low Stock"
                    : item.stock === 0
                    ? "Out of Stock"
                    : "Available"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {productData && productData.length === 0 && (
        <p className="text-center">No product available yet!</p>
      )}

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
            if (page + 10 < newData.length) {
              setPage(page + 10);
            } else {
              console.log(newData.length, "no");
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

export default Products;
