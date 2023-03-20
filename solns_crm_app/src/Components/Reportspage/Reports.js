import React, { useEffect, useState, useContext } from "react";
import CommonPart from "../Commonpart/CommonPart";
import { useLocation } from "react-router-dom";
import TopNavBar from "../homepage/TopNavBar";
import ReportMain from "./ReportMain";
import "./report.css";
import ReportNew from "./ReportNew";
import ReportContacted from "./ReportContacted";
import ReportWorking from "./ReportWorking";
import ReportComplete from "./ReportComplete";
import AuthContext from "../Context/AuthProvider";
import AdminLogin from "../Login/LoginPage";

const Reports = () => {
  const location = useLocation();
  const type = location.state.type;
  const email = location.state.email;
  const userid = location.state.profile;

  const { user } = useContext(AuthContext);

  const [finalData, setfinalData] = useState([]);
  const [clrState, setClrState] = useState("all");

  async function getleadByMailFunc() {
    await fetch(`http://localhost:3030/getlead/byemail/${email}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);

        fetch(`http://localhost:3030/getlead/byid/${userid}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            console.log([...json, ...data]);

            setfinalData([...json, ...data]);
          })
          .catch((err) => {
            console.log(err);
          });

        console.log(finalData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getleadByMailFunc();
  }, []);

  return (
    <>
      {user && (
        <div>
          <CommonPart />
          <TopNavBar email_id={email} type={type} profile={userid} />
          <div className="colorbox">
            <button
              className="alert alert-secondary"
              onClick={() => {
                setClrState("all");
              }}
            >
              All Leads
            </button>
            <button
              className="alert alert-primary"
              onClick={() => {
                setClrState("new");
              }}
            >
              New Leads
            </button>
            <button
              className="alert alert-info"
              onClick={() => {
                setClrState("contacted");
              }}
            >
              Contacted Leads
            </button>
            <button
              className="alert alert-warning"
              onClick={() => {
                setClrState("working");
              }}
            >
              Working Leads
            </button>
            <button
              className="alert alert-success"
              onClick={() => {
                setClrState("completed");
              }}
            >
              Completed Leads
            </button>
          </div>
          <div>
            {clrState === "all" && <ReportMain reportArray={finalData} />}
            {clrState === "new" && <ReportNew reportArray={finalData} />}
            {clrState === "contacted" && (
              <ReportContacted reportArray={finalData} />
            )}
            {clrState === "working" && (
              <ReportWorking reportArray={finalData} />
            )}
            {clrState === "completed" && (
              <ReportComplete reportArray={finalData} />
            )}
          </div>

          {/* <ReportMain reportArray={leadData} /> */}
        </div>
      )}
      {!user && <AdminLogin />}
    </>
  );
};

export default Reports;
