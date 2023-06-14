import React, { useEffect, useState } from 'react'
import axios from 'axios';

const baseURL = "http://localhost:5050";
const Myorder = () => {

  const user_id = JSON.parse(localStorage.getItem("token_data"));

  const [orderData, setOrderData] = useState([]);


  useEffect(() => {
    axios
      .get(`${baseURL}/order/myorders/${user_id.id}`)
      .then((response) => {

        // setCheckoutData(response.data[0]);
        console.log(response.data, "-------data")
        setOrderData(response.data);

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  if (!orderData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Order Details</h1>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Pincode</th>
            <th>Product Title</th>
            <th>Product Description</th>
            <th>Product Price</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.quantity}</td>
              <td>{order.total_price}</td>
              <td>{order.order_address.street}</td>
              <td>{order.order_address.city}</td>
              <td>{order.order_address.state}</td>
              <td>{order.order_address.country}</td>
              <td>{order.order_address.pincode}</td>
              <td>{order.order_products[0].product.title}</td>
              <td>{order.order_products[0].product.description}</td>
              <td>{order.order_products[0].product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Myorder;