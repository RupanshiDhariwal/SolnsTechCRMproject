import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PieChart = (props) => {
  const data = {
    labels: ["NewLeads", "Contacted Leads", "Working Leads", "Completed Leads"],
    datasets: [
      {
        label: "Counts",
        data: [
          props.newleadCount,
          props.contactedCount,
          props.workingCounts,
          props.completedCounts,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      style={{
        width: "50vw",
        height: "48vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <PolarArea data={data} />
    </div>
  );
};

export default PieChart;
