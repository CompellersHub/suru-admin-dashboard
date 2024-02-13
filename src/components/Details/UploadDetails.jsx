import React from "react";
import suru from "../../assets/suru.png";
import logo from "../../assets/logo.png";
import orange from "../../assets/fruit.png";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const UploadDetails = () => {
  const navigate = useNavigate();

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

        <img className="w-40 h-40 rounded-md" src={orange} alt="fortune" />

        <div className="flex flex-col gap-3 items-center w-[70%] bg-white p-5 rounded-md">
          {/* account status */}
          <div className="flex justify-between w-full">
            <strong>Amount Added:</strong>
            <p className="text-navbar-color">50</p>
          </div>

          {/* vendor name */}
          <div className="flex justify-between w-full">
            <strong>Product Name:</strong>
            <p>Orange</p>
          </div>

          {/* vendor name */}
          <div className="flex justify-between w-full">
            <strong className="">Vendor Name:</strong>
            <p>Fortune Oliseyenum</p>
          </div>

          {/* vendor category */}
          <div className="flex justify-between w-full">
            <strong>Product Category:</strong>
            <p>Farmer Products</p>
          </div>

          {/* total order amount */}
          <div className="flex justify-between w-full">
            <strong>Product Price:</strong>
            <p>N7,000</p>
          </div>

          <div className="flex items-center justify-center gap-10">
            <button className="bg-red-500 mt-5 text-white py-2 px-4 rounded-md hover:bg-white hover:text-red-500 border border-red-500 transition-all duration-200">
              Reject
            </button>
            <button className="bg-navbar-color mt-5 text-white py-2 px-4 rounded-md hover:bg-white hover:text-navbar-color border border-navbar-color transition-all duration-200">
              Approve
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadDetails;
