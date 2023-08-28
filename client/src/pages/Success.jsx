import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../network/network";
import { useLocation, useNavigate } from "react-router-dom";
import { clearProduct } from "../redux/cartRedux";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state?.stripeData || {}; // Set default value to an empty object
  const cart = location.state?.products || {};

  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the order has already been placed (using localStorage)
    const orderPlaced = localStorage.getItem("orderPlaced");

    if (orderPlaced == "false") {
      const createOrder = async () => {
        try {
          const res = await userRequest.post("orders", {
            userId: currentUser._id,
            products: cart.products.map((item) => ({
              productId: item._id,
              quantity: item._quantity,
            })),
            amount: cart.total,
            address: data.billing_details.address,
          });
          setOrderId(res.data._id);
        } catch (err) {
          console.log(err);
        } finally {
          dispatch(clearProduct());

          // Set the flag in localStorage to prevent duplicate orders
          localStorage.setItem("orderPlaced", "true");
        }
      };

      data && createOrder();
    }
  }, [cart, data, currentUser, dispatch]);

  const goBack = () => {
    localStorage.setItem("orderPlaced", "false");
    navigate("/");
    
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successful. Your order is being prepared...`}
      <button
        style={{ padding: 10, marginTop: 20 }}
        onClick={goBack} // Navigate back to homepage
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;
