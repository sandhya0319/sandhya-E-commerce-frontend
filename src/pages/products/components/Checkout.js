import React, { useEffect, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:5050";

const schema = yup.object().shape({
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  pincode: yup
    .string()
    .matches(/^[0-9]{6}$/, "Pincode must be a 6-digit number")
    .required("Pincode is required"),
});

const Checkout = () => {
  const navigate = useNavigate();

  const [checkoutData, setCheckoutData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  //console.log(cartData,"cartdataaaaa");
  //console.log(checkoutData,"=======");
  const user_id = JSON.parse(localStorage.getItem("token_data"));

  useEffect(() => {
    axios
      .get(`${baseURL}/checkout/checkoutDetail/${user_id.id}`)
      .then((response) => {
        setCheckoutData(response.data[0]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    axios
      .get(`${baseURL}/cart/displaycart/${user_id.id}`)
      .then((response) => {
        if (response.data.length == 0) return navigate("/");
        setCartData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  console.log(checkoutData, "data=======");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      street: checkoutData?.street || "",
      city: checkoutData?.city || "",
      state: checkoutData?.state || "",
      country: checkoutData?.country || "",
      pincode: checkoutData?.pincode || "",
    },
  });

  useEffect(() => {
    setValue("street", checkoutData?.street || "");
    setValue("city", checkoutData?.city || "");
    setValue("state", checkoutData?.state || "");
    setValue("country", checkoutData?.country || "");
    setValue("pincode", checkoutData?.pincode || "");
  }, [checkoutData, setValue]);

  const calculateTotalAmount = (cartItems) => {
    const total = cartItems.reduce((sum, cartItem) => {
      const { product, quantity } = cartItem;
      if (product && product.price) {
        return sum + product.price * quantity;
      } else {
        return sum;
      }
    }, 0);

    return total;
  };

  useEffect(() => {
    const total = calculateTotalAmount(cartData);
    setTotalAmount(total);
  }, [cartData]);

  const order = (data) => {
    try {
      const unavailableProducts = cartData.filter(
        (cartItem) => cartItem.product.product_status !== "available"
      );

      if (unavailableProducts.length === 0) {
        const orderData = {
          user_id: user_id.id,
          products: cartData.map((cartItem) => ({
            ...cartItem.product,
            quantity: cartItem.quantity,
          })),
          order_address_data: {
            street: data.street,
            city: data.city,
            state: data.state,
            country: data.country,
            pincode: data.pincode,
          },
          totalAmount: totalAmount,
        };

        console.log(orderData);
        try {
          axios
            .post(`${baseURL}/checkout/placeOrder`, orderData)
            .then((response) => {
              alert("Order Placed successfully");
              navigate("/myordersummary");
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        } catch (error) {}
      } else {
        const productTitles = unavailableProducts.map(
          (cartItem) => cartItem.product.title
        );
        alert(
          `The following products are currently unavailable: ${productTitles.join(
            ", "
          )}. Please remove them from the cart to proceed.`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row g-2">
        <div className="col-12 col-md-6">
          <h2 className="mt-4">Address</h2>
          <form onSubmit={handleSubmit(order)}>
            <div className="form-group mt-3">
              <label>street</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                {...register("street")}
              />
              {errors.street && (
                <p className="text-danger">{errors.street.message}</p>
              )}
            </div>
            <div className="form-group mt-3">
              <label>city</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                {...register("city")}
              />
              {errors.city && (
                <p className="text-danger">{errors.city.message}</p>
              )}
            </div>
            <div className="form-group mt-3">
              <label>state</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                {...register("state")}
              />
              {errors.state && (
                <p className="text-danger">{errors.state.message}</p>
              )}
            </div>
            <div className="form-group mt-3">
              <label>country</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                {...register("country")}
              />
              {errors.country && (
                <p className="text-danger">{errors.country.message}</p>
              )}
            </div>

            <div className="form-group mt-3">
              <label>pincode</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                {...register("pincode")}
              />
              {errors.pincode && (
                <p className="text-danger">{errors.pincode.message}</p>
              )}
            </div>

            <div className="col-md-12 d-flex justify-content-end">
              <button
                className="btn btn-success btn-lg btn-block mt-3"
                type="submit"
              >
                order
              </button>
            </div>
          </form>
        </div>
        <div className="col-12 col-md-4">
          <div className="container">
            <h2 className="mt-4">Products</h2>
            {cartData.length === 0 ? (
              <p>No items in the cart</p>
            ) : (
              <div className="row">
                {cartData.map((cartItem, index) => (
                  <div className="col-12 mb-4" key={index}>
                    <div className="card h-100">
                      <img
                        src={`${baseURL}${cartItem.imageUrl}`}
                        className="card-img-top card-checkout-img"
                        alt={cartItem.title}
                      />
                      <div className="card-body">
                        <h5 className="card-title text-truncate">
                          {cartItem.product.title}
                        </h5>
                        <p className="card-text text-truncate">
                          {cartItem.product.description}
                        </p>
                        <p className="card-text">
                          Status: {cartItem.product.product_status}
                        </p>
                        <p className="card-text">
                          quantity: {cartItem.quantity}
                        </p>
                        <p className="card-text">
                          price: {cartItem.product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <h3 className="mt-4">Total Amount: Rs.{totalAmount}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
