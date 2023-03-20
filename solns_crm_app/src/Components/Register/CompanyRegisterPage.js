import React, { useState } from "react";
import axios from "axios";
import "./registerpage.css";
import { Link, useNavigate } from "react-router-dom";
import companyValidation from "../../companyValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyRegister = () => {
  const [companyname, setCompanyName] = useState("");
  const [companyaddress, setCompanyAddress] = useState("");
  const [email, setEmail] = useState("");
  const [companypassword, setCompanyPassword] = useState("");
  const [companyconfirmpassword, setCompanyConfirmPassword] = useState("");
  const [employeecode, setEmployeeCode] = useState("");
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleregister = async (e) => {
    e.preventDefault();
    setErrors(
      companyValidation(
        companyname,
        email,
        companypassword,
        companyconfirmpassword,
        employeecode,
        companyaddress
      )
    );
    const res = await axios
      .post("http://localhost:3030/addCompany", {
        companyname,
        email,
        companypassword,
        companyconfirmpassword,
        employeecode,
        companyaddress,
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
      <div>
        <form onSubmit={handleregister}>
          <div className="box outerboxlogin">
            <div className="container">
              <div className="top">
                <ToastContainer />
                <header>Company register page</header>
              </div>
              <div className="input-field">
                <input
                  type="text"
                  className="input"
                  name="companyname"
                  value={companyname}
                  placeholder="Company Name"
                  id="companyname"
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <i className="bx bx-user"></i>
                {errors.companyname && (
                  <p style={{ color: "red", fontSize: "10px" }}>
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
                  <p style={{ color: "red", fontSize: "10px" }}>
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="input-field">
                <input
                  type="password"
                  className="input"
                  name="companypassword"
                  value={companypassword}
                  placeholder="Password"
                  id="companypassword"
                  onChange={(e) => setCompanyPassword(e.target.value)}
                />
                <i className="bx bx-lock-alt"></i>
                {errors.companypassword && (
                  <p style={{ color: "red", fontSize: "10px" }}>
                    {errors.companypassword}
                  </p>
                )}
              </div>
              <div className="input-field">
                <input
                  type="password"
                  className="input"
                  name="companyconfirmpassword"
                  value={companyconfirmpassword}
                  placeholder="Confirm password"
                  id="companyconfirmpassword"
                  onChange={(e) => setCompanyConfirmPassword(e.target.value)}
                />
                <i className="bx bx-lock-alt"></i>
                {errors.companyconfirmpassword && (
                  <p style={{ color: "red", fontSize: "10px" }}>
                    {errors.companyconfirmpassword}
                  </p>
                )}
              </div>
              <div className="input-field">
                <input
                  type="text"
                  className="input"
                  name="employeecode"
                  value={employeecode}
                  placeholder="Employee code"
                  id="employeecode"
                  onChange={(e) => setEmployeeCode(e.target.value)}
                />
                <i className="bx bx-user"></i>
                {errors.employeecode && (
                  <p style={{ color: "red", fontSize: "10px" }}>
                    {errors.employeecode}
                  </p>
                )}
              </div>
              <div className="input-field">
                <input
                  type="text"
                  className="input"
                  name="companyaddress"
                  value={companyaddress}
                  placeholder="Company address"
                  id="companyaddress"
                  onChange={(e) => setCompanyAddress(e.target.value)}
                />
                <i className="bx bx-user"></i>
                {errors.companyaddress && (
                  <p style={{ color: "red", fontSize: "10px" }}>
                    {errors.companyaddress}
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
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                  Login
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CompanyRegister;
