import React from "react";

const NewLeadForm = ({ handleNewLeadSubmit, handleInput, formvalue }) => {
  return (
    <div className="outerdivOnBoard">
      <h1 style={{ color: "white", marginTop: "10px" }}>NEW LEAD</h1>{" "}
      <form
        onSubmit={handleNewLeadSubmit}
        className="onBoardForm"
        autoComplete="off"
      >
        <div className="mb-3">
          <label htmlFor="firstName">First Name</label>
          <br></br>
          <input
            id="firstName"
            name="firstname"
            className="form-control"
            value={formvalue.firstname}
            onChange={handleInput}
            placeholder="Enter first name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName">Last Name</label>
          <br></br>
          <input
            id="lastName"
            name="lastname"
            className="form-control"
            value={formvalue.lastname}
            onChange={handleInput}
            placeholder="Enter last name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <br></br>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            name="email"
            value={formvalue.email}
            onChange={handleInput}
          />
        </div>
        <label htmlFor="exampleFormControlInput1" className="form-label">
          discribtion
        </label>
        <br></br>
        <textarea
          name="description"
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          value={formvalue.description}
          onChange={handleInput}
        ></textarea>
        <br></br>
        <select
          name="status"
          className="form-select dropdown"
          aria-label="Default select example"
          onChange={handleInput}
        >
          <option value="new">Lead Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="working">working</option>
          <option value="completed">Completed</option>
        </select>
        <br></br>
        <button type="submit" className="btn btn-submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewLeadForm;
