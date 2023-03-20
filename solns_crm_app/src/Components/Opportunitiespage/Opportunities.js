import React, { useEffect, useState, useContext } from "react";
import CommonPart from "../Commonpart/CommonPart";
import { useLocation } from "react-router-dom";
import TopNavBar from "../homepage/TopNavBar";
import { Bar } from "react-chartjs-2";
import AuthContext from "../Context/AuthProvider";
import AdminLogin from "../Login/LoginPage";
import "./opportunities.css";

const Opportunities = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const type = location.state.type;
  const email = location.state.email;
  const userid = location.state.profile;
  let arrayData;
  const [leadsCount, setLeadsCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  function getleadFunc() {
    fetch(`http://localhost:3030/getlead/byemail/${email}`)
      .then((response) => response.json())
      .then((json) => {
        fetch(`http://localhost:3030/getlead/byid/${userid}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            console.log([...json, ...data]);
            arrayData = [...json, ...data];
            setLeadsCount(arrayData.length);
            setSalesCount(Math.round(arrayData.length * 0.1));
          })
          .catch((err) => {
            console.log(err);
          });
        // console.log(arrayData.length);
        // console.log(Math.round(arrayData.length * 0.1));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getleadFunc();
  }, []);
  return (
    <>
      {user && (
        <div className="outerdiv">
          <CommonPart />
          <TopNavBar email_id={email} type={type} profile={userid} />
          <div className="outerboxBar">
            <h1>Leads And Sales</h1>
            <div className="barbox">
              <div className="para-box">
                <p style={{ fontWeight: 600, color: "rgba(255, 99, 132, 1)" }}>
                  Total Leads: {leadsCount}
                </p>
                <p style={{ fontWeight: 600, color: "rgba(54, 162, 235, 1)" }}>
                  Sales: {salesCount}
                </p>
              </div>
              <Bar
                data={{
                  labels: ["Leads", "Sales"],
                  datasets: [
                    {
                      label: "Counts",
                      data: [leadsCount, salesCount],
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                      ],
                      borderWidth: 5,
                    },
                  ],
                }}
                height={400}
                width={600}
                options={{
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}
      {!user && <AdminLogin />}
    </>
  );
};

export default Opportunities;
