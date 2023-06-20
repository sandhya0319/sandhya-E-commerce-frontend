import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const baseURL = "http://localhost:5050";

const CartProduct = () => {
  const navigate = useNavigate();

  const [cartData, setCartData] = useState([]);

  //const headers = { 'Authorization': 'x-access-token' };
  const user_id = JSON.parse(localStorage.getItem("token_data"));
 
  const token=user_id.token;
  //console.log(token,"ssss");
  useEffect(() => {

    // axios({
    //   method: "get",
    //   url: `${baseURL}/cart/displaycart/${user_id.id}`,
    //   headers:{
    //     Authorization: `Bearer ${token}`
    //   }
    // });
    
    axios
      .get(`${baseURL}/cart/displaycart/${user_id.id}`,
      {headers:{
        Authorization: `Bearer ${token}`}
        //Authorization: localStorage.getItem("token_data")}
      })
      .then((response) => {
        setCartData(response.data);
        //console.log(headers,"heaadersdata")
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const removeFromCart = async (cart_id, product_id) => {
    try {
      const payload = {
        cart_id: cart_id,
        product_id: product_id,
      };
      await axios.delete(`${baseURL}/cart/removecartproduct`, { data: payload })
        .then(() => {
          console.log("Hello")
          setCartData(prevCartData =>
            prevCartData.filter(cartItem => cartItem.product.id !== product_id)
          );
          console.log("Product removed from cart successfully");
        })
        .catch((error) => {
          console.error("Error removing product from cart:", error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleIncrement = async (cart_id, product_id) => {
    try {
      const updatedCartData = cartData.map(cartItem => {
        if (cartItem.cart_id === cart_id && cartItem.product.id === product_id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        }
        return cartItem;
      });
      setCartData(updatedCartData);
      await updateCartQuantity(cart_id, product_id, updatedCartData.find(item => item.cart_id === cart_id && item.product.id === product_id).quantity);
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    }
  };

  const handleDecrement = async (cart_id, product_id) => {
    try {
      const updatedCartData = cartData.map(cartItem => {
        if (cartItem.cart_id === cart_id && cartItem.product.id === product_id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity > 1 ? cartItem.quantity - 1 : 1,
          };
        }
        return cartItem;
      });
      setCartData(updatedCartData);
      await updateCartQuantity(cart_id, product_id, updatedCartData.find(item => item.cart_id === cart_id && item.product.id === product_id).quantity);
    } catch (error) {
      console.error("Error decrementing quantity:", error);
    }
  };

  const updateCartQuantity = async (cart_id, product_id, quantity) => {
    try {
      const payload = {
        user_id: cart_id,
        product_id: product_id,
        quantity: quantity,
      };
      await axios.post(`${baseURL}/cart/updatecart`, payload);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const checkout = () => {
    const unavailableProducts = cartData.filter(
      (cartItem) => cartItem.product.product_status !== "available"
    );

    if (unavailableProducts.length === 0) {
      navigate('/checkout');
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
  };

  console.log(cartData)
  return (
    <>
      <div className="container">
        <h2 className="mt-4">Cart Products</h2>
        {cartData.length === 0 ? (
          <p>No items in the cart</p>
        ) : (
          <div className="row">
            {cartData.map((cartItem, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100">
                  <img
                    src={`${baseURL}${cartItem.imageUrl}`}
                    className="card-img-top card-img"
                    alt={cartItem.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-truncate">
                      {cartItem.product.title}
                    </h5>
                    <p className="card-text text-truncate">
                      {cartItem.product.description}
                    </p>
                    <p className="card-text text-truncate">
                      {cartItem.product.price}
                    </p>
                    <p className="card-text">Status: {cartItem.product.product_status}</p>
                  </div>
                  <div className="card-footer">
                    <div className="quantity-controls d-flex">
                      <button
                        className="btn btn-primary me-2"
                        disabled={cartItem.quantity === 1}
                        onClick={() => handleDecrement(cartItem.cart_id, cartItem.product.id)}
                      >
                        -
                      </button>
                      <input type="text" className="form-control quantity w-25 me-2 text-center" value={cartItem.quantity} readOnly />
                      <button
                        className="btn btn-primary"
                        onClick={() => handleIncrement(cartItem.cart_id, cartItem.product.id)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-danger btn-block mt-3"
                      onClick={() => removeFromCart(cartItem.cart_id, cartItem.product.id)}
                    >
                      Remove from Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-md-12 d-flex justify-content-end">
              <button
                className="btn btn-success btn-lg btn-block mt-3"
                onClick={checkout}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div >
    </>
  );
};

export default CartProduct;
