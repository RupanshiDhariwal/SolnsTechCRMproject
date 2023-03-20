import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CommonPart from "../Commonpart/CommonPart";
import TopNavBar from "../homepage/TopNavBar";
import AuthContext from "../Context/AuthProvider";
import AdminLogin from "../Login/LoginPage";

const UsersList = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const type = location.state.type;
  const { user } = useContext(AuthContext);
  const email = location.state.email;
  const [userdata, setUserData] = useState([]);

  function newUser() {
    navigate("/usercreate", {
      state: {
        email: `${email}`,
        type: `${type}`,
      },
    });
  }

  function allocateLeads(id) {
    navigate("/allocateleads", {
      state: {
        id: id,
        email: `${email}`,
        type: `${type}`,
      },
    });
  }

  function getUsersFunc() {
    fetch(`http://localhost:3030/users/${email}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setUserData(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getUsersFunc();
  }, []);

  return (
    <>
      {user && (
        <div>
          <div>
            <CommonPart />
            <TopNavBar email_id={email} type={type} />
          </div>
          <div>
            <button
              className="btn btn-submit"
              onClick={() => newUser()}
              style={{
                padding: "20px",
                fontSize: "30px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              Creat Users
            </button>
          </div>
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Allocate</th>
              </tr>
            </thead>
            <tbody>
              {userdata.map((value, index) => {
                return (
                  <>
                    <tr key={index} className="table-secondary">
                      <td>{value._id}</td>
                      <td>{value.name}</td>
                      <td>{value.email}</td>
                      <td>{value.phone}</td>
                      <td>{value.date}</td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => allocateLeads(value._id)}
                        >
                          Allocate
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {!user && <AdminLogin />}
    </>
  );
};

export default UsersList;
