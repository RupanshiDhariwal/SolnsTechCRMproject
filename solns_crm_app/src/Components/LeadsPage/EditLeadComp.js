import CommonPart from "../Commonpart/CommonPart";
import TopNavBar from "../homepage/TopNavBar";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import EditLeadForm from "../Forms/EditLeadForm";
import AuthContext from "../Context/AuthProvider";
import AdminLogin from "../Login/LoginPage";

const EditLeadComp = () => {
  const { user } = useContext(AuthContext);
  const [leadId, setLeadId] = useState("");
  const location = useLocation();
  const id = location.state.id;
  const type = location.state.type;
  const email = location.state.email;
  const userid = location.state.profile;
  const [formvalue, setFormvalue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    description: "",
    status: "",
  });
  // console.log(userid);

  function updateLead(id) {
    setLeadId(id);
    fetch(`http://localhost:3030/getbyid/${id}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setFormvalue({
          firstname: json.firstname,
          lastname: json.lastname,
          email: json.email,
          description: json.description,
          status: json.status,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    updateLead(id);
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormvalue({ ...formvalue, [name]: value });
    console.log(formvalue);
  };

  const handleUpdateLeadSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3030/${leadId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formvalue),
    })
      .then((response) => {
        alert("successfully updated");
        console.log(" successfully updated");
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {user && (
        <div>
          <CommonPart />
          <TopNavBar email_id={email} type={type} profile={userid} />
          <EditLeadForm
            handleUpdateLeadSubmit={handleUpdateLeadSubmit}
            handleInput={handleInput}
            formvalue={formvalue}
          />
        </div>
      )}
      {!user && <AdminLogin />}
    </>
  );
};

export default EditLeadComp;
