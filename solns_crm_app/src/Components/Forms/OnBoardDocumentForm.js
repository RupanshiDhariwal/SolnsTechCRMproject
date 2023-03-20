import React from "react";

const OnBoardDocumentForm = ({ handleUpdateDocumentSubmit, handlefile }) => {
  let selectProductStatus = "";
  let uploaddocStatus = "";
  let onboardStatus = "";
  if (selectProductStatus !== undefined && uploaddocStatus !== undefined) {
    onboardStatus = "Proceed";
  } else {
    onboardStatus = "Pending";
  }
  return (
    <div className="outerdivOnBoard">
      <h1 style={{ color: "white", marginTop: "10px" }}>UPLOAD DOCUMENTS</h1>
      <form
        onSubmit={handleUpdateDocumentSubmit}
        autoComplete="off"
        className="onBoardForm"
      >
        <label htmlFor="aadhaarfile" className="form-label">
          Upload Aadhar card
        </label>
        <br></br>
        <input
          name="aadhaarfile"
          id="aadhaarfile"
          type="file"
          className="form-control"
          onChange={handlefile}
        ></input>
        <button type="submit" className="btn btn-submit">
          Upload
        </button>
        <p style={{ fontSize: "10px" }}>PDF, JPG, PNG</p>
        <label htmlFor="panfile" className="form-label">
          Upload Pan card
        </label>
        <br></br>
        <input
          name="panfile"
          id="panfile"
          type="file"
          className="form-control"
          onChange={handlefile}
        ></input>
        <button type="submit" className="btn btn-submit">
          upload
        </button>
        <p style={{ fontSize: "10px" }}>PDF, JPG, PNG</p>
        <label htmlFor="itrfile" className="form-label">
          Upload ITR file
        </label>
        <br></br>
        <input
          name="itrfile"
          id="itrfile"
          type="file"
          className="form-control"
          onChange={handlefile}
        ></input>
        <button type="submit" className="btn btn-submit">
          upload
        </button>
        <p style={{ fontSize: "10px" }}>PDF, JPG, PNG</p>
        <label htmlFor="residentialproof" className="form-label">
          Upload Residential Proof
        </label>
        <br></br>
        <input
          name="residentialproof"
          id="residentialproof"
          type="file"
          className="form-control"
          onChange={handlefile}
        ></input>
        <button type="submit" className="btn btn-submit">
          upload
        </button>
        <p style={{ fontSize: "10px" }}>PDF, JPG, PNG</p>
        <label htmlFor="bankstatement" className="form-label">
          Upload Bank Statement
        </label>
        <br></br>
        <input
          name="bankstatement"
          id="bankstatement"
          type="file"
          className="form-control"
          onChange={handlefile}
        ></input>
        <button type="submit" className="btn btn-submit">
          upload
        </button>
        <p style={{ fontSize: "10px" }}>PDF, JPG, PNG</p>
        <br></br>
        {onboardStatus}
        <br></br>
        <button type="submit" className="btn btn-submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default OnBoardDocumentForm;
