import React, { useEffect, useState } from 'react'
import axios from 'axios'

const baseURL = "http://localhost:5050";

const Home = () => {

    const [productData, setProductData] = useState([])

    useEffect(() => {
        axios.get(`${baseURL}/products/displaydata`)
            .then((response) => {
                //console.log(response.data,"productsss")
                setProductData(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const handleAddToCart = (product_id) => {
        // console.log(`Product with ID ${productId} added to cart`);
        try {
            let user = JSON.parse(localStorage.getItem('token_data'))
            // if(product_id){
            //     alert("product already in cart");
            // }
            // else{
                const payload = {
                    user_id: user.id,
                    product_id: product_id,
                    quantity: 1,
                }
                console.log(payload)
                axios.post(`${baseURL}/cart/addtocart`, payload).then((response) => {
                    console.error('response', response.data);
                })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            //}   
        }
         catch (error) {
            throw error;
        }
    }


    return (
        <div className='row'>
            {productData.map((product, index) => (
                <div className='col-12 col-lg-3 mt-5' key={index}>
                    <div className="card">
                        <div className='d-flex justify-content-center'>
                            <img src={`${baseURL}${product.imageUrl}`} className="card-img-top" alt={product.title} style={{ width: '200px', height: '200px' }} />
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
                            {/* <Link to="/addtocart" className="btn btn-primary" >Add to Cart</Link> */}
                            <button
                                className="btn btn-primary"
                                onClick={() => handleAddToCart(product.id)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Home;
