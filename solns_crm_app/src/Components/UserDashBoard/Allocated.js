import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import CommonPart from "../Commonpart/CommonPart";
import TopNavBar from "../homepage/TopNavBar";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthProvider";
import AdminLogin from "../Login/LoginPage";

const Allocated = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const type = location.state.type;
  const email = location.state.email;
  const userid = location.state.profile;
  // console.log(userid);
  const [leadData, setLeadData] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getLeadByUserID();
  }, []);

  async function getLeadByUserID() {
    await fetch(`http://localhost:3030/getlead/byid/${userid}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setLeadData(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //   Lead functions to edit delete and view

  function deleteLead(id) {
    fetch(`http://localhost:3030/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((response) => {
        console.log("lead deleted");
        alert("lead has been deleted sucessfully");
        getLeadByUserID();
      });
    });
  }

  function viewmore(id) {
    navigate("/individuallead", {
      state: {
        _id: id,
        email: `${email}`,
        type: `${type}`,
        profile: `${userid}`,
      },
    });
  }

  function updateLead(id) {
    navigate("/editleadcomp", {
      state: {
        id: id,
        email: `${email}`,
        type: `${type}`,
        profile: `${userid}`,
      },
    });
  }

  return (
    <>
      {user && (
        <div>
          <div>
            <CommonPart />
            <TopNavBar email_id={email} type={type} profile={userid} />
          </div>
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>Id</th>
                <th>firstName</th>
                <th>lastname</th>
                <th>email</th>
                <th>discribtion</th>
                <th>status</th>
                <th>date</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>View More</th>
              </tr>
            </thead>
            <tbody>
              {leadData.map((value, index) => {
                let leadtype = value.leadtype;
                return (
                  <>
                    {leadtype === "allocated" && (
                      <tr key={index} className="table-secondary">
                        <td>{value._id}</td>
                        <td>{value.firstname}</td>
                        <td>{value.lastname}</td>
                        <td>{value.email}</td>
                        <td>{value.description}</td>
                        <td>{value.status}</td>
                        <td>{value.date}</td>
                        <td>
                          <button
                            className="btn btn-info"
                            onClick={() => updateLead(value._id)}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteLead(value._id)}
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-light"
                            onClick={() => viewmore(value._id)}
                          >
                            view more
                          </button>
                        </td>
                      </tr>
                    )}
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

export default Allocated;
