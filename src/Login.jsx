import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const Login = () => {
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ useremail: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const validateForm = () => {
    const newErrors = { useremail: "", password: "" };
    let isValid = true;

    if (!useremail.trim()) {
      newErrors.useremail = "Email is required";
      isValid = false;
    } else if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBlur = (field) => {
    const newErrors = { ...errors };
    if (!useremail.trim() && field === "useremail") {
      newErrors.useremail = "Email is required";
    } else if (!/^[a-zA-Z]+$/.test(useremail.trim()) && useremail.length > 0) {
      newErrors.useremail = "";
    } else if (!password.trim() && field === "password") {
      newErrors.password = "Password is required";
    } else if (!/(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8}/.test(password)) {
      newErrors.password = "Password must contain one uppercase letter, one special character, and be at least 8 characters long";
    } else {
      newErrors[field] = "";
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { userName: useremail, password: password };

    if (validateForm()) {
      console.log("Form submitted");

      try {
        const response = await axios.post(`http://localhost:8105/login`, data);
        console.log(response.data);
      
                        var responseString = JSON.stringify(response);

                        // Store the string in local storage
                        localStorage.setItem('response', responseString);
        setSuccessMessage("Login Successful");
        setErrorMessage("");
        // Navigate to another page upon successful login
        navigate("/organ"); // Assuming "/dashboard" is the route for the dashboard page
      } catch (error) {
        console.error("Error occurred during login:", error);
        const message = error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "An error occurred during login. Please try again.";
        setErrorMessage(message);
        setSuccessMessage("");
      }
    }
  };

  return (
    <div className="login-main-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-8">
            <div className="login-image">
              <img src="login.img.png" alt="image-missing" className="login-image-style" />
            </div>
          </div>
          <div className="col-4">
            <div className="login-form d-flex flex-col justify-content-start">
              <div>
                <h2 className="login-form-heading">Welcome back!</h2>
                <p className="form-sub-heading">Please login using your registered account</p>
                <form onSubmit={handleSubmit} className="login-form-container">
                  <label htmlFor="useremail" className="login-form-label">USERNAME</label>
                  <input
                    type="text"
                    id="useremail"
                    className="login-form-input"
                    placeholder="Register Email id"
                    value={useremail}
                    required
                    onChange={(e) => setUseremail(e.target.value)}
                    onBlur={() => handleBlur("useremail")}
                  />
                  {errors.useremail && <p className="error">{errors.useremail}</p>}
                  <label htmlFor="pwd" className="login-form-label">PASSWORD</label>
                  <input
                    type="password"
                    id="pwd"
                    className="login-form-input login-password-input"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => handleBlur("password")}
                  />
                  {errors.password && <p className="error">{errors.password}</p>}
                  <button type="submit" className="login-form-button">LOGIN</button>
                </form>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                <div>
                  <a href="/forgot-password" className="forget-button">Forgot your password?</a>
                  <a href="Reset" className="reset-button">Reset Here</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

