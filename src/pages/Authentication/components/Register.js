import React, { useState } from 'react'
import { Link } from "react-router-dom";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'

const baseURL="http://localhost:5050";


const schema = yup.object().shape({
  name: yup.string().required("Name is required").matches(/^[A-Za-z\s]+$/, 'Invalid name format'),
  email: yup
    .string()
    .email()
    .required("Email is required")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Invalid email format'
    ),
  gender: yup.string().required("Gender is required"),
  mobile_number: yup.string().required("Mobile number is required").min(10).max(10),
  password: yup.string().required("Password is required").min(4).max(8)
});


const Register = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    //console.log(data)
    axios
    .post(`${baseURL}/users/adddata`, data)
    .then((response) => {
      //setPost(response.data);
      console.log(response.data);
    });
  }
  return (
    <div>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <Link to="/login" className="text-decoration-none">
                <span className="link-primary">
                  Sign In
                </span>
              </Link>
            </div>
            <div className="form-group mt-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
              )}
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
              <label>Gender</label>
              <div className="row">
                <div className="col" >
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" {...register('gender')} />
                    <label className="form-check-label" for="flexRadioDefault1">
                      Male
                    </label>
                  </div>
                </div>
                <div className="col" >
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" {...register('gender')} />
                    <label className="form-check-label" for="flexRadioDefault2">
                      Female
                    </label>
                  </div>
                </div>
                {errors.gender && (
                  <p className="text-danger">{errors.gender.message}</p>
                )}
              </div>
            </div>
            <div className="form-group mt-3">
              <label>Mobile number</label>
              <input
                type="number"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                {...register('mobile_number')}
              />
              {errors.mobile_number && (
                <p className="text-danger">{errors.mobile_number.message}</p>
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

export default Register
