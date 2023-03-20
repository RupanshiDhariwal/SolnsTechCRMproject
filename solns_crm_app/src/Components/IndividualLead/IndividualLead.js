import React, { useEffect, useState, useContext } from "react";
import CommonPart from "../Commonpart/CommonPart";
import TopNavBar from "../homepage/TopNavBar";
import { useLocation } from "react-router-dom";
import "./individualLead.css";
import StatusBtnLayout from "./StatusBtnLayout";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthProvider";
import AdminLogin from "../Login/LoginPage";

const IndividualLead = () => {
  const location = useLocation();
  const id = location.state._id;
  const type = location.state.type;
  const email = location.state.email;
  const userid = location.state.profile;
  const { user } = useContext(AuthContext);
  const [leadDetails, setLeadDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    description: "",
    status: "",
    date: "",
    id: "",
  });

  function getDetails(id) {
    fetch(`http://localhost:3030/getbyid/${id}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setLeadDetails({
          firstname: json.firstname,
          lastname: json.lastname,
          email: json.email,
          description: json.description,
          status: json.status,
          date: json.date,
          id: json._id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getDetails(id);
  }, []);

  //  OnBoard Process
  const navigate = useNavigate();
  function handleOnBoard(id) {
    navigate("/onboard", {
      state: {
        _id: id,
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
          <CommonPart />
          <TopNavBar email_id={email} type={type} profile={userid} />
          <div>
            <div className="header">
              <p className="parabox">Lead</p>
              <div className="onboardbtndiv">
                <p>
                  {leadDetails.firstname} {leadDetails.lastname}
                </p>
                <button
                  style={{
                    borderRadius: "10px",
                    marginBottom: "20px",
                    border: "2px solid white",
                    color: " white",
                    backgroundColor: " rgb(146, 146, 249)",
                  }}
                  onClick={() => {
                    handleOnBoard(leadDetails.id);
                  }}
                >
                  Click to OnBoard
                </button>
              </div>
            </div>
            <div>
              <StatusBtnLayout statusVal={leadDetails.status} />
            </div>
            <div className="outerdivLead">
              <p className="parabox">Date</p>
              {leadDetails.date}
            </div>
            <div className="outerdivLead">
              <p className="parabox">Id</p>
              {leadDetails.id}
            </div>
            <div className="outerdivLead">
              <p className="parabox">Description</p>
              {leadDetails.description}
            </div>
            <div className="outerdivLead">
              <p className="parabox">Email</p>
              {leadDetails.email}
            </div>
            <div className="outerdivLead">
              <p className="parabox">status</p>
              {leadDetails.status}
            </div>
          </div>
        </div>
      )}
      {!user && <AdminLogin />}
    </>
  );
};

export default IndividualLead;
