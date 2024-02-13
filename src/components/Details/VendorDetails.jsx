import React from "react";
import suru from "../../assets/suru.png";
import logo from "../../assets/logo.png";
import fortune from "../../assets/fortune-profile-photo-1.jpg";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const VendorDetails = () => {
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

        <img className="w-40 h-40 rounded-full" src={fortune} alt="fortune" />

        <div className="flex flex-col gap-3 items-center w-[70%] bg-white p-5 rounded-md">
          {/* account status */}
          <div className="flex justify-between w-full">
            <strong>Account Status:</strong>
            <p className="text-navbar-color">Active</p>
          </div>

          {/* vendor name */}
          <div className="flex justify-between w-full">
            <strong>Vendor Name:</strong>
            <p>Fortune Oliseyenum</p>
          </div>

          {/* vendor name */}
          <div className="flex justify-between w-full">
            <strong className="">Vendor Address:</strong>
            <p className="w-[50%]">
              No 8 Lagos street, Lagos Lorem ipsum dolor sit amet. dsdsdsdds
            </p>
          </div>

          {/* vendor category */}
          <div className="flex justify-between w-full">
            <strong>Vendor Category:</strong>
            <p>Farmer</p>
          </div>

          {/* total order amount */}
          <div className="flex justify-between w-full">
            <strong>Total Order Amount:</strong>
            <p>N70,000</p>
          </div>

          {/* total order Cancelled */}
          <div className="flex justify-between w-full">
            <strong>Total Order Canceled:</strong>
            <p>50</p>
          </div>

          {/* total Available Product */}
          <div className="flex justify-between w-full">
            <strong>Total Available Product:</strong>
            <p>500</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorDetails;
