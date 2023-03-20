import React, { useState, useContext } from "react";
import axios from "axios";
import "./loginpage.css";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthProvider";
import Dashboard from "../DashBoard/Dashboard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginValidation from "../../loginValidation";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  let url;

  async function checkAndNevigateFunc(val) {
    await axios(val)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          navigate("/dashboard");
          setTimeout(() => {
            toast.success("logged in Successfully");
          }, 200);
          console.log("logged in successfully...");
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: response.data[0]._id,
              email: response.data[0].email,
              type: response.data[0].type,
              name: response.data[0].name,
            })
          );
          setAuth({
            type: "LOGIN",
            payload: {
              id: response.data[0]._id,
              email: response.data[0].email,
              type: response.data[0].type,
              name: response.data[0].name,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage(toast.error("User not found "));
      });
  }

  const handlelogin = (e) => {
    e.preventDefault();
    setErrors(loginValidation(type, email, password));
    if (type === "admin") {
      url = `http://localhost:3030/admin/login/${email}/${password}`;
    } else if (type === "user") {
      url = `http://localhost:3030/users/login/${email}/${password}`;
    }
    checkAndNevigateFunc(url);
  };

  return (
    <>
      {user && <Dashboard />}
      {!user && (
        <form onSubmit={handlelogin}>
          <div className="box outerboxlogin">
            <div className="container">
              <div className="top">
                <ToastContainer />
                <header>Login</header>
              </div>
              <div className="input-field">
                <select
                  name="type"
                  value={type}
                  style={{
                    width: "100%",
                    height: "45px",
                    backgroundColor: " rgba(255,255,255,0.1)",
                    color: "white",
                    borderRadius: " 30px",
                    padding: "0 0 0 45px",
                  }}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option style={{ color: "black" }}>Select type</option>
                  <option style={{ color: "black" }} value="admin">
                    Admin
                  </option>
                  <option style={{ color: "black" }} value="user">
                    User
                  </option>
                </select>
                {errors.type && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {errors.type}
                  </p>
                )}
              </div>
              <div className="input-field">
                <input
                  type="text"
                  className="input"
                  placeholder="Username"
                  name="email"
                  id="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i className="bx bx-user"></i>
                {errors.email && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="input-field">
                <input
                  type="Password"
                  className="input"
                  placeholder="Password"
                  name="password"
                  value={password}
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i className="bx bx-lock-alt"></i>
                {errors.password && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="input-field">
                <button type="submit" className="submit" id="">
                  Login
                </button>
                <span> Don't have an account?</span>
                <span>
                  <Link
                    to="/bda-register-page"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Register as a BDA
                  </Link>
                </span>
                <span>
                  <Link
                    to="/company-register-page"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Register as a Company
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default AdminLogin;
