import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { api } from "../../hooks/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Products = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [filterTerm, setFilterTerm] = useState("all");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const user = useSelector((state) => state.auth);

  const getProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(
      `${api.get_uploads}/?status=accept`, {
        headers: {
          authorization: `${user.userToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Update the state once with the new array
      const sortedData = data.baskets.reverse();
      setProduct(sortedData);
      setFilteredProduct(sortedData);
    } catch (err) {
      toast.error(`${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to first get all the products
  useEffect(() => {
    getProduct();
  }, []);

  // filter by stock level
  const filterByStock = (stock) => {
    if (stock === "low") {
      setFilteredProduct(product.filter((item) => item.stock <= 20));
    } else if (stock === "out") {
      setFilteredProduct(product.filter((item) => item.stock === 0));
    } else if (stock === "all") {
      setFilteredProduct(product);
    } else {
      setFilteredProduct(product.filter((item) => item.stock > 20));
    }

    // Reset page to 0 when filter changes
    setPage(0);
  };

  // search for product by name
  const searchFilter = (event) => {
    const value = event.target.value;
    setFilteredProduct(
      product.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="flex flex-col gap-3 p-5">
      <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-700">
        Approved Products
        <span className="text-navbar-color text-base bg-green-100 font-bold rounded-md p-1">
          {filteredProduct.length} products
        </span>
      </h3>

      {/* navs */}
      <div className="flex justify-between bg-white rounded-md py-3 px-5">
        <button
          className= "text-navbar-color font-bold"
        >
          Product
        </button>
      </div>

      <form className="flex gap-5 bg-white rounded-md py-3 px-5 text-navbar-color">
        {/* search input */}
        <div className="w-[50%] relative">
          <input
            className="p-[10px] px-10 border-[1px] rounded-md border-green-300 w-full placeholder:text-navbar-color"
            type="text"
            placeholder="Search by product Name"
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
          onChange={(e) => {
            setFilterTerm(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="low">low stock</option>
          <option value="out">out of stock</option>
        </select>

        <button
          type="button"
          onClick={() => filterByStock(filterTerm)}
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
            <th>Product Name</th>
            <th>Vendor Name</th>
            <th>Date Added</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>

        {/* body */}
        <tbody className="mt-5 bg-white text-[#3A3A3A]">
          {!loading &&
            filteredProduct &&
            filteredProduct.slice(page, page + 10).map((item) => {
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
                  onClick={() =>
                    navigate(`/product/details/${item.slug}`)
                  }
                  className="text-center mt-5 py-2 h-12 border-b-[1px] border-green-200 cursor-pointer hover:bg-slate-200"
                >
                  <td className="w-[20%]">{item.name}</td>
                  <td className="w-[20%]">{item.vendorId.companyName}</td>
                  <td className="w-[20%]">{readableDate}</td>
                  <td className="w-[20%]">{item.category}</td>
                  <td
                    className={`w-[20%] ${
                      item.stock < 20
                        ? "text-orange-400"
                        : item.stock === 0
                        ? "text-red-500"
                        : "text-navbar-color"
                    }`}
                  >
                    {item.stock < 5
                      ? "Low Stock"
                      : item.stock === 0
                      ? "Out of Stock"
                      : "Available"}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {!loading && filteredProduct && filteredProduct.length === 0 && (
        <p className="text-center">No product available yet!</p>
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
            if (page + 10 < product.length) {
              setPage(page + 10);
            } else {
              console.log(product.length, "no");
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
