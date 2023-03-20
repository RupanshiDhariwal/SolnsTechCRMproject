import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import CommonPart from "../Commonpart/CommonPart";
import TopNavBar from "../homepage/TopNavBar";
import AuthContext from "../Context/AuthProvider";
import AdminLogin from "../Login/LoginPage";

const CreateUser = () => {
  const location = useLocation();
  const type = location.state.type;
  const email = location.state.email;
  const { user } = useContext(AuthContext);
  // console.log(email);

  const [formvalue, setFormvalue] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    adminemail: email,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormvalue({ ...formvalue, [name]: value });
    console.log(formvalue);
  };

  const url = "http://localhost:3030/addUser";
  const handleNewUserSubmit = (e) => {
    e.preventDefault();
    console.log(formvalue);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formvalue),
    })
      .then((response) => {
        alert("successfully submited");
        // console.log(response);
        setFormvalue({
          name: "",
          email: "",
          password: "",
          phone: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {user && (
        <div>
          <div>
            <CommonPart />
            <TopNavBar email_id={email} type={type} />
          </div>
          <div className="outerdivOnBoard" style={{ minHeight: "100vh" }}>
            <h1 style={{ color: "white", marginTop: "10px" }}>ADD USER</h1>
            <form onSubmit={handleNewUserSubmit} className="onBoardForm">
              <div className="mb-3">
                <label htmlFor="name">Name</label>
                <br></br>
                <input
                  id="name"
                  name="name"
                  className="form-control"
                  value={formvalue.name}
                  onChange={handleInput}
                  placeholder="Enter name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <br></br>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  name="email"
                  value={formvalue.email}
                  onChange={handleInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <br></br>
                <input
                  id="password"
                  name="password"
                  className="form-control"
                  value={formvalue.password}
                  onChange={handleInput}
                  placeholder="Enter password"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone">Phone Number</label>
                <br></br>
                <input
                  id="phone"
                  name="phone"
                  className="form-control"
                  value={formvalue.phone}
                  onChange={handleInput}
                  placeholder="Enter phone number"
                />
              </div>
              <button type="submit" className="btn btn-submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      {!user && <AdminLogin />}
    </>
  );
};

export default CreateUser;
