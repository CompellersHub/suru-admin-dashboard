import React, { useEffect, useState } from "react";
import suru from "../../assets/suru.png";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useParams } from "react-router-dom";
import { api } from "../../hooks/api";
import { useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { banks } from "../banklist";
import { ToastContainer, toast } from "react-toastify";

const WithdrawalDetails = () => {
  const navigate = useNavigate();
  const [withdrawalDetails, setWithdrawalDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const user = useSelector((state) => state.auth);
  const { vendorId } = useParams();

  useEffect(() => {
    getWithdrawalByid();
  }, []);

  const getWithdrawalByid = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(`${api.get_withdrawal}/${vendorId}`, {
        headers: {
          authorization: `${user.userToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setWithdrawalDetails(data.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const userBank = banks.filter(
    (bank) =>
      bank.name.toLowerCase() === withdrawalDetails.bankName.toLowerCase()
  );
  const userBankCode = userBank[0].code;
  const approveWithdrawal = async () => {
    try {
      const response = await fetch(
        `${api.confirm_withdrawal}/${withdrawalDetails._id}`,
        {
          method: "POST",
          body: JSON.stringify({
            account_bank: userBankCode,
            account_number: withdrawalDetails.accountNumber,
            amount: withdrawalDetails.withdrawalAmount,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log(data);
    } catch (err) {
      console.log(err);
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
          <div className="flex flex-col gap-2 items-center">
            <p className="text-2xl self-center animate-spin">
              <AiOutlineLoading3Quarters />
            </p>
            <span>Getting order details...</span>
          </div>
        )}

        {error && (
          <p className="text-center">Could not get Withdrawal Details!</p>
        )}

        {withdrawalDetails && (
          <img
            className="w-40 h-40 rounded-full"
            src={withdrawalDetails.vendorId.image}
            alt="fortune"
          />
        )}

        {withdrawalDetails && (
          <div className="flex flex-col gap-3 items-center w-[70%] bg-white p-5 rounded-md">
            {/* account status */}
            <div className="flex justify-between w-full">
              <strong>Account Status:</strong>
              <p
                className={`${
                  withdrawalDetails.vendorId.isVerified
                    ? "text-navbar-color"
                    : "text-red-400"
                }`}
              >
                {withdrawalDetails.vendorId.isVerified
                  ? "Verified"
                  : "No Verified"}
              </p>
            </div>

            {/* vendor name */}
            <div className="flex justify-between w-full">
              <strong>Vendor Name:</strong>
              <p>{withdrawalDetails.vendorId.companyName}</p>
            </div>

            {/* Account name */}
            <div className="flex justify-between w-full">
              <strong>Account Name:</strong>
              <p>{withdrawalDetails.bankHolderName}</p>
            </div>

            {/* Bank Name */}
            <div className="flex justify-between w-full">
              <strong>Bank Name:</strong>
              <p>{withdrawalDetails.bankName}</p>
            </div>

            {/* Account Number */}
            <div className="flex justify-between w-full">
              <strong>Account Number:</strong>
              <p>{withdrawalDetails.accountNumber}</p>
            </div>

            {/* Withdrawal amount */}
            <div className="flex justify-between w-full">
              <strong>Withrawal Amount:</strong>
              <p>N{withdrawalDetails.withdrawalAmount}</p>
            </div>

            {/* total Available Product */}
            <div className="flex justify-between w-full">
              <strong>Current Balance:</strong>
              <p>N{withdrawalDetails.vendorId.nairaBalance}</p>
            </div>

            {/* total Available Product */}
            <div className="flex justify-between w-full">
              <strong>Withdrawal Status:</strong>
              <p
                className={`${
                  withdrawalDetails.status === "pending"
                    ? "text-orange-400"
                    : "text-navbar-color"
                }`}
              >
                {withdrawalDetails.status}
              </p>
            </div>

            <button
              onClick={approveWithdrawal}
              className="bg-navbar-color mt-5 text-white hover:text-navbar-color hover:bg-white py-2 px-5 rounded-md border border-navbar-color transition-all duration-200"
            >
              Approve
            </button>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" />
    </section>
  );
};

export default WithdrawalDetails;
