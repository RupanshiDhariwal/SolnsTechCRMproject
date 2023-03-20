import React, { useEffect, useState, useContext } from "react";
import CommonPart from "../Commonpart/CommonPart";
import TopNavBar from "../homepage/TopNavBar";
import { useLocation } from "react-router-dom";
import OnBoardProductForm from "../Forms/OnBoardProductForm";
import EditLeadForm from "../Forms/EditLeadForm";
import OnBoardDocumentForm from "../Forms/OnBoardDocumentForm";
import "./onboard.css";
import axios from "axios";
import AuthContext from "../Context/AuthProvider";
import AdminLogin from "../Login/LoginPage";
import { toast, ToastContainer } from "react-toastify";

const OnBoard = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const id = location.state._id;
  const type = location.state.type;
  const email = location.state.email;
  const userid = location.state.profile;
  const [files, setFiles] = useState("");
  const [fieldname, setFieldName] = useState("");
  const [leadID, setLeadID] = useState("");
  const [formvalue, setFormvalue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    description: "",
    status: "",
    address: "",
    product: "",
    aadhaarfile: "",
    panfile: "",
    itrfile: "",
    residentialproof: "",
    bankstatement: "",
  });

  useEffect(() => {
    onboardfunc(id);
  }, []);

  function onboardfunc(id) {
    setLeadID(id);
    fetch(`http://localhost:3030/getbyid/${id}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setFormvalue({
          firstname: json.firstname,
          lastname: json.lastname,
          email: json.email,
          description: json.description,
          status: json.status,
          product: json.product,
          aadharfile: json.aadharfile,
          panfile: json.panfile,
          itrfile: json.itrfile,
          residentialproof: json.residentialproof,
          bankstatement: json.bankstatement,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //  Functions for Edit Lead and product

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormvalue({ ...formvalue, [name]: value });
    console.log(formvalue);
  };

  const handleUpdateLeadSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3030/${leadID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formvalue),
    })
      .then((response) => {
        alert("successfully updated");
        console.log(" successfully updated");
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function for File Upload

  const removeFile = () => {
    setFiles("");
  };

  const handlefile = (event) => {
    setFieldName(event.target.name);
    console.log(event.target.name);
    const file = event.target.files[0];
    if (!file) return;
    file.isUploading = true;
    setFiles(file);
    console.log(file);
    console.log(file.name);
  };

  // *** TRy ***
  const handleUpdateDocumentSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(formData);
    formData.append(`${fieldname}`, files, files.name);
    let url;
    if (fieldname === "aadhaarfile") {
      url = `http://localhost:3030/aadhar/${leadID}`;
    } else if (fieldname === "panfile") {
      url = `http://localhost:3030/pan/${leadID}`;
    } else if (fieldname === "itrfile") {
      url = `http://localhost:3030/itr/${leadID}`;
    } else if (fieldname === "residentialproof") {
      url = `http://localhost:3030/residentialproof/${leadID}`;
    } else {
      url = `http://localhost:3030/bankstatement/${leadID}`;
    }
    axios
      .patch(url, formData, {
        headers: {
          Authorization: "YOUR_API_AUTHORIZATION_KEY_SHOULD_GOES_HERE_IF_HAVE",
          "Content-type": "multipart/form-data",
        },
      })
      .then(() => {
        toast.success("Success Update!");
      })
      .catch((err) => {
        console.error(err);
        removeFile();
      });

    if (formData) {
      axios
        .post("http://localhost:3030/dummy")
        .then((res) => {
          console.log(res);
          console.log("This is dummy api ");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // *** MAIN ***
  // const handleUpdateDocumentSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   console.log(formData);
  //   formData.append(`${fieldname}`, files, files.name);
  //   let url;
  //   if (fieldname === "aadhaarfile") {
  //     url = `http://localhost:3030/aadhar/${leadID}`;
  //   } else if (fieldname === "panfile") {
  //     url = `http://localhost:3030/pan/${leadID}`;
  //   } else if (fieldname === "itrfile") {
  //     url = `http://localhost:3030/itr/${leadID}`;
  //   } else if (fieldname === "residentialproof") {
  //     url = `http://localhost:3030/residentialproof/${leadID}`;
  //   } else {
  //     url = `http://localhost:3030/bankstatement/${leadID}`;
  //   }
  //   axios
  //     .patch(url, formData, {
  //       headers: {
  //         Authorization: "YOUR_API_AUTHORIZATION_KEY_SHOULD_GOES_HERE_IF_HAVE",
  //         "Content-type": "multipart/form-data",
  //       },
  //     })
  //     .then((res) => {
  //       toast.success("Success Update!");
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       removeFile();
  //     });
  // };

  return (
    <>
      {user && (
        <div>
          <ToastContainer />
          <CommonPart />
          <TopNavBar email_id={email} type={type} profile={userid} />
          <div
            style={{ backgroundColor: "rgb(47, 47, 82)", marginTop: "-5px" }}
          >
            <div className="OnBoardFormBoxes">
              <EditLeadForm
                handleUpdateLeadSubmit={handleUpdateLeadSubmit}
                handleInput={handleInput}
                formvalue={formvalue}
              />
              <OnBoardProductForm
                handleUpdateLeadSubmit={handleUpdateLeadSubmit}
                handleInput={handleInput}
                formvalue={formvalue}
              />
              <OnBoardDocumentForm
                handleUpdateDocumentSubmit={handleUpdateDocumentSubmit}
                handlefile={handlefile}
              />
            </div>
          </div>
        </div>
      )}
      {!user && <AdminLogin />}
    </>
  );
};

export default OnBoard;
