import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const baseURL = "http://localhost:5050";

const Home = () => {
    const navigate = useNavigate();
    const [productData, setProductData] = useState([])
    const user_id = localStorage.getItem("token_data") ? JSON.parse(localStorage.getItem("token_data")) : {}

    useEffect(() => {
        axios.get(`${baseURL}/products/displaydata/${user_id.id}`)
            .then((response) => {
                setProductData(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const handleIncrement = (product_id) => {
        setProductData(prevProductData => {
            return prevProductData.map(product => {
                if (product.id === product_id) {
                    const updatedProduct = {
                        ...product,
                        quantity: product.quantity + 1
                    };
                    updateCartQuantity(product_id, updatedProduct.quantity);
                    return updatedProduct;
                }
                return product;
            });
        });
    };

    const handleDecrement = (product_id) => {
        setProductData(prevProductData => {
            return prevProductData.map(product => {
                if (product.id === product_id) {
                    const updatedProduct = {
                        ...product,
                        quantity: product.quantity > 1 ? product.quantity - 1 : product.isInCart = false
                    };

                    updateCartQuantity(product_id, updatedProduct.quantity);
                    return updatedProduct;
                }
                return product;
            });
        });
    };

    const updateCartQuantity = (product_id, quantity) => {
        try {
            const payload = {
                user_id: user_id.id,
                product_id: product_id,
                quantity: quantity,
            };
            axios.post(`${baseURL}/cart/updatecart`, payload)
                .then(() => {
                })
                .catch((error) => {
                    console.error('Error updating cart:', error);
                });
        } catch (error) {
            throw error;
        }
    };



    const handleAddToCart = (product_id) => {
        if (user_id && user_id.id) {

            try {
                const payload = {
                    user_id: user_id.id,
                    product_id: product_id,
                    quantity: 1,
                }
                axios.post(`${baseURL}/cart/addtocart`, payload).then((response) => {
                    setProductData(prevProductData => {
                        return prevProductData.map(product => {
                            if (product.id === product_id) {
                                return {
                                    ...product,
                                    isInCart: true,
                                    quantity: 1
                                };
                            }
                            return product;
                        });
                    });
                }).catch((error) => {
                    console.error('Error:', error);
                });
            }
            catch (error) {
                throw error;
            }
        } else {
            navigate("/login");
        }
    }


    return (
        <div className="container">
            <div className='row g-2'>
                {productData.map((product, index) => (

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                        <div className="card">
                            <img src={`${baseURL}${product.imageUrl}`} className="card-img-top card-img" alt={product.title} />
                            <div className="card-body p-1">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text text-truncate">{product.description}</p>
                            </div>
                            <ul className="list-group list-group-flush p-1">
                                <li className="list-group-item p-1">Price: {product.price}</li>
                                <li className="list-group-item p-1">Status: {product.product_status}</li>
                            </ul>
                            <div className="card-body p-1">
                                {
                                    product.isInCart ?
                                        <div className="quantity-input d-flex">
                                            <button className="btn btn-secondary decrement-btn me-2" onClick={() => handleDecrement(product.id)}>
                                                -
                                            </button>
                                            <input type="text" className="form-control quantity w-25 me-2 text-center" value={product.quantity} readOnly />
                                            <button className="btn btn-secondary increment-btn" onClick={() => handleIncrement(product.id)}>
                                                +
                                            </button>
                                        </div> :
                                        <button className="btn btn-primary" onClick={() => handleAddToCart(product.id)}>
                                            Add to Cart
                                        </button>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Home;
