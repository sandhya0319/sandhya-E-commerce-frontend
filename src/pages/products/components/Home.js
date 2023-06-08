import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CartProduct from './CartProduct';
import { Link } from 'react-router-dom';

const baseURL = "http://localhost:5050";

const Home = () => {

    const [productData, setProductData] = useState([])

    
    
    useEffect(() => {
        axios.get(`${baseURL}/products/displaydata`).then((response) => {
            console.log(response.data)
            setProductData(response.data)
        });
    }, [])
    // const handleAddtocart=()=>{
    //     console.log("pid")
    //     // try {
    //     //         axios.post(`${baseURL}/cart/addtocart`).then((res) => {
    //     //         console.log('data',res.data)
    //     // });
    //     // } catch (error) {
            
    //     // }
    // }

    return (
        <div className='row'>
            {productData.map((product, index) => (
                <div className='col-12 col-lg-3' key={index}>
                    <div className="card">
                        <div className='d-flex justify-content-center'>
                            <img src={product.product_img} className="card-img-top" alt={product.title} style={{ width: '200px', height: '200px' }} />
                        </div>
                        <div className="card-body list-group">
                            <h5 className="card-title">{product.title}</h5>
                            <p className="card-text text-truncate">{product.description}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Price: {product.price}</li>
                            <li className="list-group-item">status: {product.product_status}</li>
                        </ul>
                        <div className="card-body">
                        {/* <Link to="/form" class="nav-item nav-link active">Add Transaction</Link> */}
                            <Link to="/addtocart" className="btn btn-primary" >Add to Cart</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Home;
