import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [loginError, setLoginError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoginError();
    setLoading(true);
    https://mern-auth-api.vercel.app/api
    axios
      .post(`https://mern-auth-api.vercel.app/api/login-user`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        const data = response.data;

        if (data.status === "ok") {
          setLoading(false);
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);

          navigate("/userDetails");
        }

        if (data.error) {
          setLoading(false);
          return setLoginError(data.error);
        }
      })
      .catch((err) => setLoading(false));
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Sign In</h3>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              {...register("email")}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              {...register("password")}
            />
          </div>

          <div className="d-grid">
            {loading ? (
              <button disabled className="btn btn-primary">
                Loading...
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            )}

            {loginError && (
              <p style={{ textAlign: "center", color: "red" }}>{loginError}</p>
            )}
            {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
          </div>
          <p className="forgot-password text-right">
            <a href="/sign-up">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}
