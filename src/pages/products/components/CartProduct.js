import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "http://localhost:5050";

const CartProduct = () => {
  const[cartdata,setCartData]=useState([]);

  const user_id = JSON.parse(localStorage.getItem("token_data"));
  //console.log(user_id.id, "id");

  useEffect(() => {
    //console.log("abchdj");
    axios
      .get(`${baseURL}/cart/displaycart/${user_id.id}`)
      .then((response) => {
        console.log("response data", response.data);
        setCartData(response.cart_data);
        //console.log(cartdata,"cartdata")
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      {/* <div className="row">
        {cartData.map((cartval, index) => (
          <div className="col-12 col-lg-3 mt-5" key={index}>
            <div className="card">
              <div className="d-flex justify-content-center">
                <img
                  src={`${baseURL}${cartval.imageUrl}`}
                  className="card-img-top"
                  alt={cartval.title}
                  style={{ width: "200px", height: "200px" }}
                />
              </div>
              <div className="card-body list-group">
                <h5 className="card-title">{cartval.title}</h5>
                <p className="card-text text-truncate">{cartval.description}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  quantity: {cartval.quantity}
                </li>
                <li className="list-group-item">status:</li>
              </ul>
              <div className="card-body">
                {/* <Link to="/form" class="nav-item nav-link active">Add Transaction</Link> */}
                {/* <Link to="/addtocart" className="btn btn-primary" >Add to Cart</Link> */}
                {/* <button className="btn btn-primary">Remove from Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div> */} 
    </>
  );
};

export default CartProduct;
