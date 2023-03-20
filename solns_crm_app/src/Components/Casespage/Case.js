import React, { useEffect, useState, useContext } from "react";
import CommonPart from "../Commonpart/CommonPart";
import { useLocation } from "react-router-dom";
import TopNavBar from "../homepage/TopNavBar";
import CasesLead from "./CasesLead";
import AuthContext from "../Context/AuthProvider";
import AdminLogin from "../Login/LoginPage";

const Case = () => {
  const location = useLocation();
  const type = location.state.type;
  const email = location.state.email;
  const userid = location.state.profile;
  const { user } = useContext(AuthContext);
  const [leadData, setLeadData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  function getleadFunc() {
    fetch(`http://localhost:3030/getlead/byemail/${email}`)
      .then((response) => response.json())
      .then((json) => {
        setLeadData(json);
        fetch(`http://localhost:3030/getlead/byid/${userid}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            console.log([...json, ...data]);
            setSearchResults([...json, ...data]);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getleadFunc();
    // setLeadData(json)
  }, []);

  return (
    <>
      {user && (
        <div>
          <CommonPart />
          <TopNavBar email_id={email} type={type} profile={userid} />
          <div
            style={{
              backgroundColor: "rgb(207, 237, 255)",
              minHeight: "100vh",
            }}
          >
            <CasesLead updateleadList={getleadFunc} leadArray={searchResults} />
          </div>
        </div>
      )}
      {!user && <AdminLogin />}
    </>
  );
};

export default Case;
