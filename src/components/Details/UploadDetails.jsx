import { useState, useEffect } from "react";
import suru from "../../assets/suru.png";
import logo from "../../assets/logo.png";
// import orange from "../../assets/fruit.png";
import { useNavigate, Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useParams } from "react-router-dom";
import { api } from "../../hooks/api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const UploadDetails = () => {
  const [loading, setLoading] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  const { productId } = useParams();
  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    const url = `${api.get_uploads}/${productId}`

    try {
      setLoading("getting");
      const response = await fetch(url, {
        headers: {
          authorization: `${user.userToken}`,
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
      setLoading(null);
    }
  };
  /*
    Update upload endpoint
  */
  const updateUpload = async (query, id) => {
    try {
      setLoading(query);
      const response = await fetch(
        `${api.get_product}/product/${query}/${id}`,
        {
          method: "PATCH",
          headers: {
            authorization: `${user.userToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      
      toast.success(`${data.status}`);
      setTimeout(() => {
        if (data.status === "Successful") {
          navigate(-1);
        }
      }, 1000);
    } catch (err) {
      console.log(err, 'errrrrr')
      toast.error(`${err.message}`);
    } finally {
      setLoading(null);
    }
  };
  console.log('productDetailsproductDetails', productDetails)

  return (
    <section className="bg-gray-200 min-h-[100vh]">
      {/* dashboard header */}
      <header className="flex items-center justify-between gap-5 bg-navbar-color p-4 md:px-10">
        <Link to="/" className="flex gap-3 items-center">
          <img src={logo} alt="logo" className="w-10 md:w-14" />
          <img src={suru} alt="company name" className="w-14 md:w-24 lg:w-32" />
        </Link>
      </header>

      {/* vendor Profile */}
      <div className="flex flex-col items-center gap-2 w-[70%] mx-auto  p-5 rounded-md text-lg">
        <button onClick={() => navigate(-1)} className="self-start text-2xl">
          <IoMdArrowBack />
        </button>

        {/* loading state */}
        {loading === "getting" && (
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
            className="w-40 h-40 rounded-md mt-2"
            src={productDetails.imageUrl}
            alt="fortune"
          />
        )}

        {productDetails && (
          <div className="flex flex-col gap-3 items-center w-[80%] bg-white p-5 rounded-md">
            {/* account status */}
            <div className="flex justify-between w-full">
              <strong>In Stock:</strong>
              <p className="text-navbar-color">{productDetails.stock}</p>
            </div>

            {/* vendor name */}
            <div className="flex justify-between w-full">
              <strong>Product Name:</strong>
              <p>{productDetails.name}</p>
            </div>

            {/* vendor name */}
            <div className="flex justify-between w-full">
              <strong className="">Description:</strong>
              <p>{productDetails.description}</p>
            </div>
            <div className="flex justify-between w-full">
              <strong className="">Vendor Name:</strong>
              <p>{productDetails.vendorId.companyName}</p>
            </div>

            {/* vendor category */}
            <div className="flex justify-between w-full">
              <strong>Category:</strong>
              <p>{productDetails.category}</p>
            </div>
            {/* vendor category */}
            <div className="flex justify-between w-full">
              <strong>SubCategory:</strong>
              <p>{productDetails.subCategory}</p>
            </div>

            {/* total order amount */}
            <div className="flex justify-between w-full">
              <strong>Product Price:</strong>
              <p> &#8358;{productDetails.price}</p>
            </div>

            <div className="flex items-center justify-center gap-10">
              <button
                onClick={() => updateUpload("reject", productDetails._id)}
                className="bg-red-500 mt-5 text-white py-2 px-4 rounded-md hover:bg-white hover:text-red-500 border border-red-500 transition-all duration-200"
              >
                {loading === "reject" ? "Upldating..." : "Reject"}
              </button>

              <button
                onClick={() => updateUpload("accept")}
                className="bg-navbar-color mt-5 text-white py-2 px-4 rounded-md hover:bg-white hover:text-navbar-color border border-navbar-color transition-all duration-200"
              >
                {loading === "accept" ? "Updatting..." : "Approve"}
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" />
    </section>
  );
};

export default UploadDetails;
