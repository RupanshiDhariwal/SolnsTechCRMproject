import React from "react";

const ImportLeadForm = ({ handleSubmitImpot, handleFile, excelFileError }) => {
  return (
    <div className="outerdivOnBoard">
      <h1 style={{ color: "white", marginTop: "10px" }}>IMPORT LEADS</h1>{" "}
      <form
        className="form-group onBoardForm"
        autoComplete="off"
        onSubmit={handleSubmitImpot}
      >
        <label>
          <h5>Upload Excel file</h5>
        </label>
        <br></br>
        <input
          type="file"
          className="form-control"
          onChange={handleFile}
          required
        ></input>
        {excelFileError && (
          <div className="text-danger" style={{ marginTop: 5 + "px" }}>
            {excelFileError}
          </div>
        )}
        <button
          type="submit"
          className="btn btn-submit"
          style={{ marginTop: 5 + "px" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ImportLeadForm;
