import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [signupError, setSignUpError] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setSignUpError(false);
    setLoading(true);
    axios
      .post(`${window.location.origin}/api/register`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        if (res.data.error) {
          setLoading(false);
          return setSignUpError(res.data.error);
        }

        if (res.data.status === "ok") {
          setLoading(false);
          navigate("/sign-in");
        } else {
          setLoading(false);
          setSignUpError("Failed to signUp, try again !");
        }
      })
      .catch((err) => setSignUpError("Failed to signUp, try again !"));
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Sign Up</h3>

          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              {...register("fname", { required: true })}
            />
            {errors.fname && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              {...register("lname", { required: true })}
            />
            {errors.lname && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
              })}
            />
            {errors.email?.type === "required" && (
              <span className="text-danger">This field is required</span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="text-danger">Invalid email address</span>
            )}
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />
            {errors.password?.type === "required" && (
              <span className="text-danger">This field is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-danger">
                Password must be at least 6 characters long
              </span>
            )}
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>

            {signupError && (
              <p style={{ textAlign: "center", color: "red" }}>{signupError}</p>
            )}
            {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/sign-in">sign in?</a>
          </p>
        </form>
      </div>
    </div>
  );
}
