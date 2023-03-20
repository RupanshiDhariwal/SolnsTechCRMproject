import React from "react";

const ReportMain = (props) => {
  return (
    <div>
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
          </tr>
        </thead>
        <tbody>
          {props.reportArray.map((value, index) => {
            const statuscolor = value.status;
            return (
              <>
                {statuscolor === "new" ? (
                  <tr key={index} className="table-primary">
                    <td>{value._id}</td>
                    <td>{value.firstname}</td>
                    <td>{value.lastname}</td>
                    <td>{value.email}</td>
                    <td>{value.description}</td>
                    <td>{value.status}</td>
                    <td>{value.date}</td>
                  </tr>
                ) : statuscolor === "contacted" ? (
                  <tr key={index} className="table-info">
                    <td>{value._id}</td>
                    <td>{value.firstname}</td>
                    <td>{value.lastname}</td>
                    <td>{value.email}</td>
                    <td>{value.description}</td>
                    <td>{value.status}</td>
                    <td>{value.date}</td>
                  </tr>
                ) : statuscolor === "working" ? (
                  <tr key={index} className="table-warning">
                    <td>{value._id}</td>
                    <td>{value.firstname}</td>
                    <td>{value.lastname}</td>
                    <td>{value.email}</td>
                    <td>{value.description}</td>
                    <td>{value.status}</td>
                    <td>{value.date}</td>
                  </tr>
                ) : statuscolor === "completed" ? (
                  <tr key={index} className="table-success">
                    <td>{value._id}</td>
                    <td>{value.firstname}</td>
                    <td>{value.lastname}</td>
                    <td>{value.email}</td>
                    <td>{value.description}</td>
                    <td>{value.status}</td>
                    <td>{value.date}</td>
                  </tr>
                ) : (
                  <tr key={index} className="table-danger">
                    <td>{value._id}</td>
                    <td>{value.firstname}</td>
                    <td>{value.lastname}</td>
                    <td>{value.email}</td>
                    <td>{value.description}</td>
                    <td>{value.status}</td>
                    <td>{value.date}</td>
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

export default ReportMain;
