import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    email: "",
    isEventOrginizer: false,
  });

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(""); 
  const navigate = useNavigate();

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData({
      ...registerData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7092/api/User/AddUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7092/api/User/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        throw new Error("Login credentials are incorrect");
      }
      const data = await response.json();
      console.log("Success:", data);
      sessionStorage.setItem("userData", JSON.stringify(data)); 
      setLoginError(""); 

      
      if (data.isEventOrginizer) {
        navigate("/admin-page"); 
      } else {
        navigate("/user-page"); 
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginError("Login credentials are incorrect"); 
    }
  };


  return (
    <div id="back">
      <div id="slideBox">
        <div className="topLayer">
          <div className="left">
            <div className="content">
              <h2 className="mb-4">Sign Up</h2>
              <form id="form-signup" onSubmit={handleRegisterSubmit}>
                <div className="form-element form-stack">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    className="form-control"
                  />
                </div>
                <div className="form-element form-stack">
                  <label htmlFor="username-signup" className="form-label">
                    Username
                  </label>
                  <input
                    id="username-signup"
                    type="text"
                    name="username"
                    value={registerData.username}
                    onChange={handleRegisterChange}
                    className="form-control"
                  />
                </div>
                <div className="form-element form-stack">
                  <label htmlFor="password-signup" className="form-label">
                    Password
                  </label>
                  <input
                    id="password-signup"
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    className="form-control"
                  />
                </div>
                <div className="form-element form-checkbox">
                  <input
                    id="confirm-terms"
                    type="checkbox"
                    name="isEventOrginizer"
                    checked={registerData.isEventOrginizer}
                    onChange={handleRegisterChange}
                    className="checkbox"
                  />
                  <label htmlFor="confirm-terms">Admin?</label>
                </div>
                <div className="form-element form-submit">
                  <button
                    id="signUp"
                    className="signup btn btn-primary"
                    type="submit"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="right">
            <div className="content">
              <h2 className="mb-4">Login</h2>
              <form id="form-login" onSubmit={handleLoginSubmit}>
                <div className="form-element form-stack">
                  <label htmlFor="username-login" className="form-label">
                    Username
                  </label>
                  <input
                    id="username-login"
                    type="text"
                    name="username"
                    value={loginData.username}
                    onChange={handleLoginChange}
                    className="form-control"
                  />
                </div>
                <div className="form-element form-stack">
                  <label htmlFor="password-login" className="form-label">
                    Password
                  </label>
                  <input
                    id="password-login"
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="form-control"
                  />
                </div>
                {loginError && (
                  <div className="form-element form-error">
                    <p className="text-danger">{loginError}</p>
                  </div>
                )}
                <div className="form-element form-submit">
                  <button
                    id="logIn"
                    className="login btn btn-primary"
                    type="submit"
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
