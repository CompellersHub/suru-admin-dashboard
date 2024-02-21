import React, { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { api } from "../../hooks/api";
import { ToastContainer, toast } from "react-toastify";
import suru from "../../assets/suru.png";
import logo from "../../assets/logo.png";

const OrderDetails = () => {
  const [orderItem, setOrderItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { orderId } = useParams();
  const userToken = useSelector((state) => state.auth.userToken);

  useEffect(() => {
    getOrderDetails();
  }, []);

  // get order details
  const getOrderDetails = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch(`${api.get_order}/${orderId}`, {
        method: "GET",
        headers: {
          authorization: `${userToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setOrderItem(data.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // update order status
  const confirmOrder = async () => {
    try {
      toast.success("Updating Order Status...");
      const response = await fetch(`${api.get_order}/${orderId}`, {
        method: "PATCH",
        headers: {
          authorization: `${userToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        throw new Error(data.message);
      }

      console.log(data);
      toast.success("Order Status Updated!");
      getOrderDetails();
    } catch (err) {
      toast.error(`${err.message}`);
    }
  };

  return (
    <>
      {/* dashboard header */}
      <header className="flex items-center justify-between gap-5 bg-navbar-color p-3 md:px-10">
        <div to="/" className="flex gap-3 items-center">
          <img src={logo} alt="logo" className="w-10 md:w-20" />
          <img src={suru} alt="company name" className="w-14 md:w-32 lg:w-40" />
        </div>
      </header>

      <div className="flex px-5 md:px-10 p-2">
        <button
          onClick={() => navigate(-1)}
          className="py-0  md:p-10 text-xl md:text-3xl"
        >
          <IoArrowBack />
        </button>
      </div>
      <section className="flex flex-col gap-3 md:w-[50%] p-5 mx-auto">
        <strong>Order Details</strong>

        {/* loading state */}
        {loading && (
          <div className="flex flex-col gap-2 items-center">
            <p className="text-2xl  self-center animate-spin">
              <AiOutlineLoading3Quarters />
            </p>
            <span>Getting order details...</span>
          </div>
        )}

        {error && <p className="text-center">Could not get Order Details!</p>}

        {orderItem && (
          <div className="flex justify-between items-center">
            <img
              className="w-20 h-20 md:w-32 md:h-32 rounded-md"
              src={orderItem.items.imageUrl}
              alt="order image"
            />
            <div className="flex flex-col gap-2 justify-center items-center">
              <p>Quantity</p>
              <p>{orderItem.items.quantity}</p>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <p>Total</p>
              <p>N{orderItem.bill}</p>
            </div>
          </div>
        )}

        {/* Item */}
        {orderItem && (
          <div className="flex justify-between items-center mt-5">
            <strong>Name</strong>
            <p>{orderItem.items.name}</p>
          </div>
        )}

        {/* status */}
        {orderItem && (
          <div className="flex justify-between items-center mt-5">
            <strong>Status</strong>
            <p
              className={`${
                orderItem.status === "ongoing"
                  ? "bg-yellow-400"
                  : orderItem.status === "shipped"
                  ? "bg-gray-400"
                  : "bg-navbar-color"
              } px-2 py-1 rounded-md text-white`}
            >
              {orderItem.status}
            </p>
          </div>
        )}

        {/* update status */}
        {orderItem && (
          <div className="flex justify-between items-center mt-5">
            <strong>Update Status:</strong>
            <div className="flex gap-2">
              {/* {orderItem.status === "ongoing" && (
                <button
                  onClick={() => updateOrderStatus("cancel")}
                  className="bg-red-600 px-2 py-1 rounded-md text-white"
                >
                  Cancel Order
                </button>
              )} */}
              {/* {orderItem.status === "ongoing" ? (
                <button
                  onClick={() => updateOrderStatus("ship")}
                  className="bg-navbar-color px-2 py-1 rounded-md text-white"
                >
                  Shipped
                </button>
              ) : ( */}
              <button
                onClick={confirmOrder}
                className="bg-navbar-color px-2 py-1 rounded-md text-white"
              >
                Confirm
              </button>
              {/* // )} */}
            </div>
          </div>
        )}
        <ToastContainer position="top-right" />
      </section>
    </>
  );
};

export default OrderDetails;
