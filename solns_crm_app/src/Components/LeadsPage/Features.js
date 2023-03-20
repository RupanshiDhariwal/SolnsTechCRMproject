import React, { useState } from "react";
import "./features.css";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import * as XLSX from "xlsx";
import { ExcelData } from "./ExcelData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import NewLeadForm from "../Forms/NewLeadForm";
import ImportLeadForm from "../Forms/ImportLeadForm";

const Features = ({
  updateleadList,
  setSearchResults,
  leadArray,
  leadmakeremail,
  profile,
}) => {
  const [formvalue, setFormvalue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    description: "",
    status: "",
    leadmakeremail: leadmakeremail,
  });
  const [modalNewLead, setmodalNewLead] = useState(false);
  const [modalImportLead, setmodalImportLead] = useState(false);

  function clickhandler(val) {
    if (val === "New Lead") {
      setmodalNewLead(true);
    }
    if (val === "Import Lead") {
      setmodalImportLead(true);
    }
  }

  // New lead Functions

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormvalue({ ...formvalue, [name]: value });
    console.log(formvalue);
  };

  const url = "http://localhost:3030/addlead";

  const handleNewLeadSubmit = (e) => {
    e.preventDefault();
    console.log(formvalue);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formvalue),
    })
      .then((response) => {
        // setmodalNewLead(false);
        alert("successfully submited");
        console.log(" successfully submited");
        console.log(response);
        updateleadList();
        setFormvalue({
          firstname: "",
          lastname: "",
          email: "",
          description: "",
          status: "",
          leadmakeremail: leadmakeremail,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Import functions

  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  // submit
  const [excelData, setExcelData] = useState(null);
  // it will contain array of objects

  // handle File
  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("plz select your file");
    }
  };

  // Import handle submit

  const handleSubmitImpot = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
      let dataArray = [];
      data.map((value, index) => {
        dataArray.push({
          firstname: value.firstname,
          lastname: value.lastname,
          email: value.email,
          description: value.description,
          status: value.status,
          leadmakeremail: leadmakeremail,
        });
      });

      console.log(dataArray);

      fetch("http://localhost:3030/importedleads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(dataArray),
      })
        .then((response) => {
          alert("successfully submited");
          console.log(" successfully submited");
          console.log(response);
          updateleadList();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setExcelData(null);
    }
  };

  // Search Functions

  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(leadArray);

    const resultsArray = leadArray.filter(
      (lead) =>
        lead.firstname.includes(e.target.value) ||
        lead.lastname.includes(e.target.value) ||
        lead.email.includes(e.target.value) ||
        lead.description.includes(e.target.value) ||
        lead.status.includes(e.target.value) ||
        lead.leadmakeremail.includes(e.target.value)
    );

    setSearchResults(resultsArray);
    console.log(resultsArray);
  };

  let lead_Array = ["New Lead", "Import Lead", "Setting", "Change Owner"];

  return (
    <div className="features-outer-div">
      <form className="search_form formbox" onSubmit={handleSubmit}>
        <input
          className=" form-control "
          type="text"
          id="search"
          placeholder="Type to search..."
          onChange={handleSearchChange}
        />
        <button className="btn btn-search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>

      <ul className=" nav  list-box">
        {lead_Array.map((value, index) => {
          return (
            <li
              className="list-group-item  list-item"
              aria-disabled="true"
              key={index}
            >
              <button
                className="btn btn-lead"
                onClick={() => clickhandler(value)}
              >
                {value}
              </button>
            </li>
          );
        })}
      </ul>
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

      <Modal
        size="lg"
        isOpen={modalImportLead}
        toggle={() => setmodalImportLead(!modalImportLead)}
      >
        <ModalHeader toggle={() => setmodalImportLead(!modalImportLead)}>
          Import Lead
        </ModalHeader>
        <ModalBody>
          <ImportLeadForm
            handleSubmitImpot={handleSubmitImpot}
            handleFile={handleFile}
            excelFileError={excelFileError}
          />
          <br></br>
          <hr></hr>

          {/* view file section */}
          <h5>View Excel file</h5>
          <div className="viewer">
            {excelData === null && <>No file selected</>}
            {excelData !== null && (
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Description</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ExcelData excelData={excelData} />
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Features;
