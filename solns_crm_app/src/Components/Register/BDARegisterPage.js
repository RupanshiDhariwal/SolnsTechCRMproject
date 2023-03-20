import React, { useState } from "react";
import axios from "axios";
import "./registerpage.css";
import { Link, useNavigate } from "react-router-dom";
import bdaValidation from "../../bdaValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BDARegister = () => {
  const [bdaname, setBdaName] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [companycode, setCompanyCode] = useState("");
  const [email, setEmail] = useState("");
  const [bdapassword, setBdaPassword] = useState("");
  const [bdaconfirmpassword, setBdaConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  let navigate = useNavigate();
  const handleregister = async (e) => {
    e.preventDefault();
    setErrors(
      bdaValidation(
        bdaname,
        companyname,
        email,
        bdapassword,
        bdaconfirmpassword,
        companycode
      )
    );
    const res = await axios
      .post("http://localhost:3030/addAdmin", {
        bdaname,
        companyname,
        email,
        bdapassword,
        bdaconfirmpassword,
        companycode,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          navigate("/login");
          setTimeout(() => {
            toast.success("Register Successfully");
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage(toast.error("Check all the details"));
      });
    const data = await res.data;
    return data;
  };
  return (
    <>
      <form onSubmit={handleregister}>
        <div className="box outerboxlogin">
          <div className="container">
            <div className="top">
              <ToastContainer />
              <header>BDA register page</header>
            </div>
            <div className="input-field">
              <input
                type="text"
                className="input"
                name="bdaname"
                value={bdaname}
                placeholder="BDA Name"
                id="bdaname"
                onChange={(e) => setBdaName(e.target.value)}
              />
              <i className="bx bx-user"></i>
              {errors.bdaname && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.bdaname}
                </p>
              )}
            </div>
            <div className="input-field">
              <input
                type="text"
                className="input"
                name="companyname"
                value={companyname}
                placeholder="Company Name"
                id="companyname"
                onChange={(e) => setCompanyname(e.target.value)}
              />
              <i className="bx bx-user"></i>
              {errors.companyname && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.companyname}
                </p>
              )}
            </div>
            <div className="input-field">
              <input
                type="email"
                className="input"
                placeholder="Email"
                name="email"
                value={email}
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="bx bx-user"></i>
              {errors.email && (
                <p style={{ color: "red", fontSize: "12px" }}>{errors.email}</p>
              )}
            </div>
            <div className="input-field">
              <input
                type="password"
                className="input"
                name="bdapassword"
                value={bdapassword}
                placeholder="Password"
                id="bdapassword"
                onChange={(e) => setBdaPassword(e.target.value)}
              />
              <i className="bx bx-lock-alt"></i>
              {errors.bdapassword && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.bdapassword}
                </p>
              )}
            </div>
            <div className="input-field">
              <input
                type="password"
                className="input"
                name="bdaconfirmpassword"
                value={bdaconfirmpassword}
                placeholder="Confirm password"
                id="bdaconfirmpassword"
                onChange={(e) => setBdaConfirmPassword(e.target.value)}
              />
              <i className="bx bx-lock-alt"></i>
              {errors.bdaconfirmpassword && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.bdaconfirmpassword}
                </p>
              )}
            </div>
            <div className="input-field">
              <input
                type="text"
                className="input"
                name="companycode"
                value={companycode}
                placeholder="Company code"
                id="companycode"
                onChange={(e) => setCompanyCode(e.target.value)}
              />{" "}
              <i className="bx bx-user"></i>
              {errors.companycode && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.companycode}
                </p>
              )}
            </div>
            <div className="input-field">
              <button type="submit" className="submit" id="">
                Register
              </button>
            </div>
            <span> Already have an account</span>
            <span>
              <Link
                to="/login"
                style={{ color: "white", textDecoration: "none" }}
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </form>
    </>
  );
};

export default BDARegister;
