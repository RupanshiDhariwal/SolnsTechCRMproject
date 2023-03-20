import React, { useState, useEffect, useContext } from "react";
import CommonPart from "../Commonpart/CommonPart";
import { useLocation } from "react-router-dom";
import TopNavBar from "../homepage/TopNavBar";
import AuthContext from "../Context/AuthProvider";
import AdminLogin from "../Login/LoginPage";

const Account = () => {
  const location = useLocation();
  const type = location.state.type;
  const email = location.state.email;
  const userid = location.state.profile;
  const { user } = useContext(AuthContext);
  const [bdas, setBDAS] = useState([]);
  const [telecallers, setTelleCallers] = useState([]);

  function getUsersFunc() {
    fetch(`http://localhost:3030/users`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setTelleCallers(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getAdminFunc() {
    fetch(`http://localhost:3030/admin`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setBDAS(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getUsersFunc();
    getAdminFunc();
  }, []);

  return (
    <>
      {user && (
        <div>
          <CommonPart />
          <TopNavBar email_id={email} type={type} profile={userid} />
          <div>
            <div>
              <h2>BDA's</h2>
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>AdminID</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bdas.map((value, index) => {
                    return (
                      <>
                        <tr key={index} className="table-secondary">
                          <td>{value._id}</td>
                          <td>{value.name}</td>
                          <td>{value.email}</td>
                          <td>{value.admin_id}</td>
                          <td>{value.date}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div>
              <h2>TeleCallers</h2>
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {telecallers.map((value, index) => {
                    return (
                      <>
                        <tr key={index} className="table-secondary">
                          <td>{value._id}</td>
                          <td>{value.name}</td>
                          <td>{value.email}</td>
                          <td>{value.phone}</td>
                          <td>{value.date}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {!user && <AdminLogin />}
    </>
  );
};

export default Account;
