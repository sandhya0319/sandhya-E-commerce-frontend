import React from 'react'
import { Link } from "react-router-dom";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const baseURL = "http://localhost:5050";

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Email is required")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Invalid email format'
    ),
  password: yup.string().required("Password is required").min(4).max(8)
});

const Login = () => {

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    try {
      axios.post(`${baseURL}/users/login`,data ).then((res) => {
        if (!res.data.auth) {
          //setLoginStatus(false);
       } else {
          console.log(res.data,"dataa");
          localStorage.setItem("token_data",JSON.stringify(res.data))
          //setLoginStatus (true);
          console.log(res.data,"----")
          alert("Login succesfully..!")
          navigate('/');
       }
        console.log(res.data, "------");
      }).catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("User not available.");
        } else if (error.response && error.response.status === 500) {
          console.log("Internal Server Error:", error);
        } else {
          console.log("An error occurred:", error);
        }
      });
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Already registered?{" "}
              <Link to="/register" className="text-decoration-none">
                <span className="link-primary">
                  Sign Up
                </span>
              </Link>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
