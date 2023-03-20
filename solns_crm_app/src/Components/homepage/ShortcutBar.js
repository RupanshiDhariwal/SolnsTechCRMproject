import React, { useState } from "react";
import "./shortcutBar.css";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import NewLeadForm from "../Forms/NewLeadForm";

const ShortcutBar = () => {
  const [formvalue, setFormvalue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    description: "",
    status: "",
  });
  const [modalNewLead, setmodalNewLead] = useState(false);

  function clickhandler(val) {
    if (val === "Create Lead") {
      setmodalNewLead(true);
    }
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormvalue({ ...formvalue, [name]: value });
    console.log(formvalue);
  };

  const url = "http://localhost:3030/addlead";
  const handleNewLeadSubmit = (e) => {
    e.preventDefault();
    // console.log(formvalue);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formvalue),
    })
      .then((response) => {
        alert("successfully submited");
        console.log(" successfully submited");
        console.log(response);

        setFormvalue({
          firstname: "",
          lastname: "",
          email: "",
          description: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let shortcut_Array = [
    "Create Lead",
    "Create Task",
    "Report Bug",
    "Compose Email",
    "Schedule Meeting",
    "Schedule Call",
    "Goals",
    "Setting",
  ];
  return (
    <div className="shortcut-outer-div">
      <p className="p-shortcut">Shortcuts</p>
      <div>
        <ul className="list-group list-box">
          {shortcut_Array.map((value, index) => {
            return (
              <li
                className="list-group-item  list-item"
                aria-disabled="true"
                key={index}
              >
                <button
                  className="btn btn-shortcut "
                  onClick={() => clickhandler(value)}
                >
                  {value}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <Modal
        size="lg"
        isOpen={modalNewLead}
        toggle={() => setmodalNewLead(!modalNewLead)}
      >
        <ModalHeader toggle={() => setmodalNewLead(!modalNewLead)}>
          New Lead
        </ModalHeader>
        <ModalBody>
          <NewLeadForm
            handleNewLeadSubmit={handleNewLeadSubmit}
            handleInput={handleInput}
            formvalue={formvalue}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ShortcutBar;
