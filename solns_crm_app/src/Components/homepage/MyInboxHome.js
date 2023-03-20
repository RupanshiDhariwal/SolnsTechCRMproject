import React, { useEffect, useState } from "react";
import "./myInboxHome.css";
import PieChart from "./PieChart";

const MyInboxHome = ({ email_id, profile }) => {
  const [totalleadCount, settotalLeadCount] = useState(0);
  const [newleadCount, setNewLeadCount] = useState(0);
  const [contactedCount, setContactedCount] = useState(0);
  const [workingCounts, setWorkingCounts] = useState(0);
  const [completedCounts, setCompletedCounts] = useState(0);
  const [yourtotalleadCount, setyourtotalLeadCount] = useState(0);
  const [yournewleadCount, setyourNewLeadCount] = useState(0);
  const [yourcontactedCount, setyourContactedCount] = useState(0);
  const [yourworkingCounts, setyourWorkingCounts] = useState(0);
  const [yourcompletedCounts, setyourCompletedCounts] = useState(0);
  let newld = 0;
  let contld = 0;
  let compld = 0;
  let workld = 0;

  async function getleadFunc() {
    await fetch("http://localhost:3030/getlead")
      .then((response) => response.json())
      .then((json) => {
        settotalLeadCount(json.length);
        json.map((value) => {
          const statuscolor = value.status;
          if (statuscolor === "working") {
            workld = workld + 1;
          } else if (statuscolor === "contacted") {
            contld = contld + 1;
          } else if (statuscolor === "completed") {
            compld = compld + 1;
          } else {
            newld = newld + 1;
          }
        });

        setNewLeadCount(newld);
        setContactedCount(contld);
        setCompletedCounts(compld);
        setWorkingCounts(workld);
        newld = 0;
        contld = 0;
        compld = 0;
        workld = 0;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getleadFunc();
  }, []);

  let yournewld = 0;
  let yourcontld = 0;
  let yourcompld = 0;
  let yourworkld = 0;

  async function getleadByMailFunc() {
    await fetch(`http://localhost:3030/getlead/byemail/${email_id}`)
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);

        fetch(`http://localhost:3030/getlead/byid/${profile}`)
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
            let arraydata = [...json, ...data];
            setyourtotalLeadCount(arraydata.length);
            arraydata.map((value) => {
              const statuscolor = value.status;
              if (statuscolor === "working") {
                yourworkld = yourworkld + 1;
              } else if (statuscolor === "contacted") {
                yourcontld = yourcontld + 1;
              } else if (statuscolor === "completed") {
                yourcompld = yourcompld + 1;
              } else {
                yournewld = yournewld + 1;
              }
            });
            setyourNewLeadCount(yournewld);
            setyourContactedCount(yourcontld);
            setyourCompletedCounts(yourcompld);
            setyourWorkingCounts(yourworkld);
            yournewld = 0;
            yourcontld = 0;
            yourcompld = 0;
            yourworkld = 0;
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
    getleadByMailFunc();
  }, []);

  return (
    <div>
      <div className="profileDetail">
        <div>
          <h3>Your UserName: {email_id}</h3>
          <h3>Your ID: {profile}</h3>
        </div>
        <div>
          <h3>Company total leads: {totalleadCount}</h3>
          <h3>Yours total leads: {yourtotalleadCount}</h3>
        </div>
      </div>

      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
        Company Total Leads Stats
      </h3>
      <div className="p-3 border bg-light col2Pie pieBox">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <PieChart
            newleadCount={newleadCount}
            contactedCount={contactedCount}
            workingCounts={workingCounts}
            completedCounts={completedCounts}
          />
        </div>

        <div className="boxforH4">
          <h5 style={{ color: "rgba(255, 99, 132, 1)" }}>
            New Leads: {newleadCount}{" "}
          </h5>
          <h5 style={{ color: "rgba(54, 162, 235, 1)" }}>
            {" "}
            Contacted Leads: {contactedCount}
          </h5>
          <h5 style={{ color: "rgba(75, 192, 192, 1)" }}>
            {" "}
            Completed Leads: {completedCounts}{" "}
          </h5>
          <h5 style={{ color: "rgba(255, 206, 86, 1)" }}>
            {" "}
            Working Leads: {workingCounts}
          </h5>
        </div>
      </div>

      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
        Your Total Leads Stats
      </h3>
      <div className="p-3 border bg-light col2Pie pieBox">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <PieChart
            newleadCount={yournewleadCount}
            contactedCount={yourcontactedCount}
            workingCounts={yourworkingCounts}
            completedCounts={yourcompletedCounts}
          />
        </div>

        <div className="boxforH4">
          <h5 style={{ color: "rgba(255, 99, 132, 1)" }}>
            New Leads: {yournewleadCount}{" "}
          </h5>
          <h5 style={{ color: "rgba(54, 162, 235, 1)" }}>
            {" "}
            Contacted Leads: {yourcontactedCount}
          </h5>
          <h5 style={{ color: "rgba(75, 192, 192, 1)" }}>
            {" "}
            Completed Leads: {yourcompletedCounts}{" "}
          </h5>
          <h5 style={{ color: "rgba(255, 206, 86, 1)" }}>
            {" "}
            Working Leads: {yourworkingCounts}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default MyInboxHome;
