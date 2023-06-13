import React,{useEffect, useState} from 'react'
import axios from 'axios';

const baseURL = "http://localhost:5050";
const Myorder = () => {

  const user_id = JSON.parse(localStorage.getItem("token_data"));

  const [orderdata,setOrderData]=useState([]);
  

  useEffect(() => {
    axios
      .get(`${baseURL}/order/myorders/${user_id.id}`)
      .then((response) => {
     
           // setCheckoutData(response.data[0]);
           console.log(response.data,"-------data")
            setOrderData(response.data);
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <h1>My Orders</h1>
      {orderdata.map((orderitem, index) => (
        <div key={index}>
            <p>id:{orderitem.id}</p>
            <p>qty:{orderitem.quantity}</p>
            <p>total:{orderitem.total_price}</p>
            
         </div>
      ))}
    </>
  )
}

export default Myorder;
