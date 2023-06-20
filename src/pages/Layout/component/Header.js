import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {AiFillHome} from 'react-icons/ai'
import {BsCartFill} from 'react-icons/bs'
import {ImProfile} from 'react-icons/im'


const Header = () => {
    const navigate = useNavigate();
    let checkLogin = localStorage.getItem("token_data");

    const SignOut = () => {
        localStorage.removeItem('token_data')
        navigate('/login');
    }
   

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary fixed-top">
                <Link to="/" className="navbar-brand text-md-white ms-4">GalaxyFashion</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvasLg" aria-controls="navbarOffcanvasLg" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-start" tabindex="-1" id="navbarOffcanvasLg" aria-labelledby="navbarOffcanvasLgLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                            <Link to="/" className="text-md-white ms-4 text-decoration-none">GalaxyFashion</Link>
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-start flex-grow-1">
                            <li class="nav-item" data-bs-dismiss="offcanvas">
                                <Link to="/" className="nav-link text-md-white">Home <AiFillHome></AiFillHome></Link>
                            </li>
                            <li class="nav-item" data-bs-dismiss="offcanvas">
                                <Link to="/cartproduct" className="nav-link text-md-white">Cart<BsCartFill></BsCartFill></Link>
                            </li>
                            <li class="nav-item" data-bs-dismiss="offcanvas">
                                <Link to="/myordersummary" className="nav-link text-md-white">My orders<ImProfile></ImProfile></Link>
                            </li>
                            <li class="nav-item" data-bs-dismiss="offcanvas">
                                <Link to="/addproduct" className="nav-link text-md-white">Add Products</Link>
                            </li>
                        </ul>
                        
                        {!checkLogin ?
                            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li class="nav-item" data-bs-dismiss="offcanvas">
                                    <Link to="/register" className="nav-link text-md-white">Register</Link>
                                </li>
                                <li class="nav-item" data-bs-dismiss="offcanvas">
                                    <Link to="/login" className="nav-link text-md-white">LogIn</Link>
                                </li>
                            </ul>
                            :
                            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li class="nav-item" data-bs-dismiss="offcanvas">
                                    <button type="button" class="btn btn-light" onClick={SignOut}>Logout</button>
                                </li>
                            </ul>
                        }
                        {/* <input class="form-control mr-sm-2" type="search" placeholder="Search" style={{width:"30%"}} /> */}
                    </div>
                    
                </div>
            </nav>
        </>
    )
}

export default Header;