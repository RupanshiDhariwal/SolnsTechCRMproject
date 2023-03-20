import React, { useEffect, useReducer, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import CommonPart from "../Commonpart/CommonPart";
import TopNavBar from "../homepage/TopNavBar";
import AuthContext from "../Context/AuthProvider";
import AdminLogin from "../Login/LoginPage";

const AllocateLead = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const id = location.state.id;
  const type = location.state.type;
  const email = location.state.email;
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [selecteCount, setselecteCount] = useState(0);
  const [leadData, setLeadData] = useState([]);
  const [isChecked, setisChecked] = useState([]);

  function getleadFunc() {
    fetch(`http://localhost:3030/getlead/byemail/${email}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setLeadData(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getleadFunc();
    // setLeadData(json)
  }, []);

  useEffect(() => {
    console.log(isChecked);
  }, []);
  //   handle checkbox function

  function handlecheckbox(e) {
    const { value, checked } = e.target;
    if (checked) {
      setisChecked([...isChecked, value]);
      setselecteCount(isChecked.length);
    } else {
      setisChecked(isChecked.filter((e) => e !== value));
      setselecteCount(isChecked.length);
    }
    forceUpdate();
    console.log(isChecked);
  }
  // handle done click

  function handleDone() {
    console.log(isChecked);
    // let dataArray = [];
    isChecked.map((value, index) => {
      let updatedata = {
        leadtype: "allocated",
        allocatedto: id,
        allocatedby: email,
      };
      fetch(`http://localhost:3030/${value}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(updatedata),
      })
        .then((response) => {
          console.log(" successfully updated");
          console.log(response);
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    });
    alert("successfully updated");
    setisChecked([]);
    getleadFunc();
  }

  return (
    <>
      {user && (
        <div>
          <div>
            <CommonPart />
            <TopNavBar email_id={email} type={type} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <button
              id="donebtn"
              className="btn btn-submit"
              onClick={() => handleDone()}
              style={{
                padding: "10px",
                fontSize: "20px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              Done
            </button>
          </div>
          <div>
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Id</th>
                  <th>firstName</th>
                  <th>lastname</th>
                  <th>email</th>
                  <th>discribtion</th>
                  <th>status</th>
                  <th>date</th>
                </tr>
              </thead>
              <tbody>
                {leadData.map((element, index) => {
                  return (
                    <>
                      <tr key={index} className="table-secondary">
                        <td>
                          <input
                            type="checkbox"
                            value={element._id}
                            checked={element.isChecked}
                            onChange={(e) => handlecheckbox(e)}
                          />
                        </td>
                        <td>{element._id}</td>
                        <td>{element.firstname}</td>
                        <td>{element.lastname}</td>
                        <td>{element.email}</td>
                        <td>{element.description}</td>
                        <td>{element.status}</td>
                        <td>{element.date}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!user && <AdminLogin />}
    </>
  );
};

export default AllocateLead;
