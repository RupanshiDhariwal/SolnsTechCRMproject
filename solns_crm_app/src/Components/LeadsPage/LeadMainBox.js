import React from "react";
import "./leadmainbox.css";
import { useNavigate } from "react-router-dom";

const LeadMainBox = ({
  updateleadList,
  leadArray,
  email_id,
  type,
  profile,
}) => {
  // console.log(leadArray);
  function deleteLead(id) {
    fetch(`http://localhost:3030/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((response) => {
        console.log("lead deleted");
        alert("lead has been deleted sucessfully");
        updateleadList();
      });
    });
  }
  const navigate = useNavigate();
  function viewmore(id) {
    navigate("/individuallead", {
      state: {
        _id: id,
        email: `${email_id}`,
        type: `${type}`,
        profile: profile,
      },
    });
  }

  function updateLead(id) {
    console.log(profile);
    navigate("/editleadcomp", {
      state: {
        id: id,
        email: `${email_id}`,
        type: `${type}`,
        profile: profile,
      },
    });
  }

  return (
    <div>
      {" "}
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
          {leadArray.map((value, index) => {
            let leadtype = value.leadtype;
            return (
              <>
                {leadtype === "normal" && (
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
  );
};

export default LeadMainBox;
