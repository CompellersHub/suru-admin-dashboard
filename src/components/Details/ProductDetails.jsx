import { useEffect, useState } from "react";
import suru from "../../assets/suru.png";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useParams } from "react-router-dom";
import { api } from "../../hooks/api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ProductDetails = () => {
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  const { productId } = useParams();
  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    const url = `${api.get_uploads}/${productId}`;

    try {
      setLoading(true);
      const response = await fetch(url, {
        headers: {
          authorizarion: `${user.userToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setProductDetails(data.message);
    } catch (err) {
      toast.error(`${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-200 min-h-[100vh]">
      {/* dashboard header */}
      <header className="flex items-center justify-between gap-5 bg-navbar-color p-3 md:px-10">
        <div to="/" className="flex gap-3 items-center">
          <img src={logo} alt="logo" className="w-10 md:w-20" />
          <img src={suru} alt="company name" className="w-14 md:w-32 lg:w-40" />
        </div>
      </header>

      {/* vendor Profile */}
      <div className="flex flex-col items-center gap-2 w-[50%] mx-auto  p-5 mt-10 rounded-md text-lg">
        <button onClick={() => navigate(-1)} className="self-start text-2xl">
          <IoMdArrowBack />
        </button>

        {/* loading state */}
        {loading && (
          <div className="flex flex-col items-center mt-20">
            <p className="animate-spin">
              <AiOutlineLoading3Quarters />
            </p>
            <p>Getting product data...</p>
          </div>
        )}

        {/* product image */}
        {productDetails && (
          <img
            className="w-40 h-40 rounded-md mt-10"
            src={productDetails.imageUrl}
            alt="fortune"
          />
        )}

        {productDetails && (
          <div className="flex flex-col gap-3 items-center w-full bg-white p-5 rounded-md">
            {/* account status */}
            <div className="flex justify-between w-full">
              <strong>In Stock:</strong>
              <p className="text-red-500">{productDetails.stock}</p>
            </div>

            {/* vendor name */}
            <div className="flex justify-between w-full">
              <strong>Product Name:</strong>
              <p>{productDetails.name}</p>
            </div>
            <div className="flex justify-between w-full">
              <strong className="">Description:</strong>
              <p>{productDetails.description}</p>
            </div>

            {/* vendor name */}
            <div className="flex justify-between w-full">
              <strong className="">Vendor Name:</strong>
              <p>{productDetails.creatorName}</p>
            </div>

            {/* vendor category */}
            <div className="flex justify-between w-full">
              <strong>Product Category:</strong>
              <p>{productDetails.category}</p>
            </div>
            <div className="flex justify-between w-full">
              <strong className="">SubCategory:</strong>
              <p>{productDetails.subCategory}</p>
            </div>

            {/* total order amount */}
            <div className="flex justify-between w-full">
              <strong>Product Price:</strong>
              <p>&#8358;{productDetails.price}</p>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" />
    </section>
  );
};

export default ProductDetails;
