import React from "react";
import { IndividualData } from "./IndividualData";

export const ExcelData = ({ excelData }) => {
  return excelData.map((individualExcelData) => (
    <tr key={individualExcelData.Id}>
      <IndividualData individualExcelData={individualExcelData} />
    </tr>
  ));
};
