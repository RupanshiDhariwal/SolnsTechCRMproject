import React from "react";

export const IndividualData = ({ individualExcelData }) => {
  return (
    <>
      <th>{individualExcelData.Id}</th>
      <th>{individualExcelData.firstname}</th>
      <th>{individualExcelData.lastname}</th>
      <th>{individualExcelData.email}</th>
      <th>{individualExcelData.description}</th>
      <th>{individualExcelData.status}</th>
    </>
  );
};
