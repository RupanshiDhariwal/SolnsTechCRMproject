import React from "react";
import "./onBoardForm.css";

const OnBoardForm = ({ handleUpdateLeadSubmit, handleInput, formvalue }) => {
  return (
    <div className="outerdivOnBoard">
      <h1 style={{ color: "white", marginTop: "10px" }}>SELECT PRODUCT</h1>
      <form
        onSubmit={handleUpdateLeadSubmit}
        autoComplete="off"
        className="onBoardForm"
      >
        <select
          name="product"
          id="product"
          className="form-select dropdown"
          aria-label="Default select example"
          onChange={handleInput}
        >
          <option value={formvalue.product}>Select Product</option>
          <option value="wealth management">Wealth Management</option>
          <option value="digital transaction">Digital Transaction</option>
          <option value="upstarts">Upstarts</option>
        </select>
        <br></br>
        <button type="submit" className="btn btn-submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default OnBoardForm;
