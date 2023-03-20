let express = require("express");
let app = express();
let port = 3030;
let parser = require("body-parser");
let cors = require("cors");
const { response, request } = require("express");
let mongoose = require("mongoose");
let multer = require("multer");

require("./LeadSch");
require("./AdminSch.js");
require("./UserSch.js");
require("./CompanySch.js");
require("./OnboardSch.js");

app.use(parser.json());
app.use(cors());
app.use(express.static("public"));

const Lead = mongoose.model("Lead");
const Admin = mongoose.model("Admin");
const User = mongoose.model("User");
const Company = mongoose.model("Company");
const Onboard = mongoose.model("Onboard");

mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://admin-rishabh:welcome12@cluster0.yjc3mau.mongodb.net/crmDataBase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("connection sucessfull with database"))
  .catch((err) => console.log(err));
// mongodb+srv://admin-rishabh:<password>@cluster0.yjc3mau.mongodb.net/?retryWrites=true&w=majority

// Functions for Get lead
app.get("/getlead", (req, res) => {
  Lead.find()
    .then((response) => {
      console.log(response);
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/getbyid/:id", (req, res) => {
  Lead.findById(req.params.id)
    .then((response) => {
      console.log(response);
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/getlead/byemail/:email", (request, response) => {
  let email_Id = request.params.email;
  Lead.find({ leadmakeremail: email_Id, leadtype: "normal" }, (error, data) => {
    if (error) {
      console.log(error);
      response.send(error);
    } else {
      response.send(data);
    }
  });
});

app.get("/getlead/byemail/allocated/:email", (request, response) => {
  let email_Id = request.params.email;
  Lead.find(
    { leadmakeremail: email_Id, leadtype: "allocated" },
    (error, data) => {
      if (error) {
        console.log(error);
        response.send(error);
      } else {
        response.send(data);
      }
    }
  );
});

app.get("/getlead/byid/:email", (request, response) => {
  let email_Id = request.params.email;
  Lead.find({ allocatedto: email_Id }, (error, data) => {
    if (error) {
      console.log(error);
      response.send(error);
    } else {
      response.send(data);
    }
  });
});

app.post("/addlead", (req, res) => {
  const lead = new Lead({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    description: req.body.description,
    status: req.body.status,
    leadmakeremail: req.body.leadmakeremail,
  });
  lead
    .save()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  res.json("posted");
});

app.post("/importedleads", (req, res) => {
  console.log(req.body);
  Lead.insertMany(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Lead.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

app.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const result = await Lead.findByIdAndUpdate(id, updates);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

// file updates using multer

let storage = multer.diskStorage({
  destination: "./public/images", //directory (folder) setting
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); // file name setting
  },
});

let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/gif" ||
      file.mimetype == "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error("Only jpeg,  jpg , png, pdf and gif Image allow"));
    }
  },
});

app.patch("/pan/:id", upload.single("panfile"), async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const updates = req.file.filename;
    const user = {
      panfile: req.file.filename,
    };
    const result = await Lead.findByIdAndUpdate(id, user);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

app.patch("/aadhar/:id", upload.single("aadhaarfile"), async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const updates = req.file.filename;
    const user = {
      aadhaarfile: req.file.filename,
    };
    const result = await Lead.findByIdAndUpdate(id, user);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
});

app.patch("/itr/:id", upload.single("itrfile"), async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const updates = req.file.filename;
    const user = {
      itrfile: req.file.filename,
    };
    console.log(updates);
    const result = await Lead.findByIdAndUpdate(id, user);
    res.send("updated");
  } catch (error) {
    console.log(error.message);
  }
});

app.patch(
  "/residentialproof/:id",
  upload.single("residentialproof"),
  async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const updates = req.file.filename;
      const user = {
        residentialproof: req.file.filename,
      };
      console.log(updates);
      const result = await Lead.findByIdAndUpdate(id, user);
      res.send("upadted");
    } catch (error) {
      console.log(error.message);
    }
  }
);

app.patch(
  "/bankstatement/:id",
  upload.single("bankstatement"),
  async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const updates = req.file.filename;
      const user = {
        bankstatement: req.file.filename,
      };
      console.log(updates);
      const result = await Lead.findByIdAndUpdate(id, user);
      res.send("upadted");
    } catch (error) {
      console.log(error.message);
    }
  }
);

// Functions for Admin

function adminIDfunc() {
  let id = new Date().getTime().toString();
  console.log(id);
  return id;
}

app.post("/addAdmin", async (req, res) => {
  const {
    companyname,
    bdaname,
    email,
    bdapassword,
    bdaconfirmpassword,
    companycode,
  } = req.body;

  // let existingbdaname;
  // try {
  //   existingbdaname = await Admin.findOne({ bdaname: bdaname });
  // } catch (err) {
  //   console.log(err);
  // }
  // if (existingbdaname) {
  //   return res.status(400).json({ message: "Company name already exists" });
  // }

  // let existingUser;
  // try {
  //   existingUser = await Admin.findOne({ email: email });
  // } catch (err) {
  //   console.log(err);
  // }
  // if (existingUser) {
  //   return res
  //     .status(400)
  //     .json({ message: "User already exists! Login Instead" });
  // }

  const companyexist = await Company.findOne({
    companypassword: companycode,
    companyname,
  });
  if (companyexist) {
    const adminn = new Admin({
      companyname,
      bdaname,
      email,
      bdapassword,
      bdaconfirmpassword,
      companycode,
    });
    await adminn
      .save()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    res.status(201).json(adminn);
  } else {
    res.status(400).json({ error: "Invalid code" });
  }
});

app.post("/addCompany", async (req, res) => {
  // const { email } = req.body;

  // let existingcompanyname;
  // try {
  //   existingcompanyname = await Company.findOne({ companyname: companyname });
  // } catch (err) {
  //   console.log(err);
  // }
  // if (existingcompanyname) {
  //   return res.status(400).json({ message: "Company name already exists" });
  // }

  // let existingUser;
  // try {
  //   existingUser = await Company.findOne({ email: email });
  // } catch (err) {
  //   console.log(err);
  // }
  // if (existingUser) {
  //   return res
  //     .status(400)
  //     .json({ message: "User already exists! Login Instead" });
  // }

  // let existingemployeecode;
  // try {
  //   existingemployeecode = await Company.findOne({
  //     employeecode: employeecode,
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
  // if (existingemployeecode) {
  //   return res.status(400).json({ message: "Code already exists! " });
  // }

  const uniqueCode = "zxzdw23fs#";
  if (uniqueCode === req.body.employeecode) {
    const company = new Company({
      admin_id: adminIDfunc(),
      companyname: req.body.companyname,
      email: req.body.email,
      companypassword: req.body.companypassword,
      companyconfirmpassword: req.body.companyconfirmpassword,
      employeecode: req.body.employeecode,
      companyaddress: req.body.companyaddress,
    });
    await company
      .save()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    res.status(201).json(company);
  } else {
    res.status(400).json({ error: "Invalid code" });
  }
});

app.get("/admin/login/:email/:password", (request, response) => {
  let email_Id = request.params.email;
  let password = request.params.password;
  Admin.find({ email: email_Id, password: password }, (error, data) => {
    if (error) {
      console.log(error);
      response.send(error);
    } else {
      if (data.length === 1) {
        response.send(data);
      } else {
        response.send("invalid user");
      }
    }
  });
});

app.get("/admin/by/:email", (request, response) => {
  let email_Id = request.params.email;
  Admin.find({ email: email_Id }, (error, data) => {
    if (error) {
      console.log(error);
      response.send(error);
    } else {
      response.send(data);
    }
  });
});

app.get("/admin", (request, response) => {
  Admin.find({}, (error, data) => {
    if (error) {
      console.log(error);
      response.send(error);
    } else {
      response.send(data);
    }
  });
});

// Funtions for Users

app.post("/addUser", (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    adminemail: req.body.adminemail,
  });
  user
    .save()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

  res.json("posted");
});

app.get("/users/login/:email/:password", (request, response) => {
  let email_Id = request.params.email;
  let password = request.params.password;
  User.find({ email: email_Id, password: password }, (error, data) => {
    if (error) {
      console.log(error);
      response.send(error);
    } else {
      if (data.length === 1) {
        response.send(data);
      } else {
        response.send("invalid user");
      }
    }
  });
});

app.get("/users/:email", (request, response) => {
  let email_Id = request.params.email;
  User.find({ adminemail: email_Id }, (error, data) => {
    if (error) {
      console.log(error);
      response.send(error);
    } else {
      response.send(data);
    }
  });
});

app.get("/users/by/:email", (request, response) => {
  let email_Id = request.params.email;
  User.find({ email: email_Id }, (error, data) => {
    if (error) {
      console.log(error);
      response.send(error);
    } else {
      response.send(data);
    }
  });
});

app.get("/users", (request, response) => {
  User.find({}, (error, data) => {
    if (error) {
      console.log(error);
      response.send(error);
    } else {
      response.send(data);
    }
  });
});

// *** TRY ***
// app.post("/dummy", async (req, res) => {
//   const generateUsername = () => {
//     const randomString = 5;
//     const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     let string = "";
//     for (let i = 0; i < randomString; i++) {
//       string += charset.charAt(Math.floor(Math.random() * charset.length));
//     }
//     return string;
//   };
//   const generatePassword = () => {
//     const passwordLength = 12;
//     const charset =
//       "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     let password = "";
//     for (let i = 0; i < passwordLength; i++) {
//       password += charset.charAt(Math.floor(Math.random() * charset.length));
//     }
//     return password;
//   };
//   const id = req.params.id;
//   const result = await Lead.findById(id);
//   console.log("result --- ", result);

//   if (req.body !== "") {
//     const onboard = new Onboard({
//       username: generateUsername(),
//       password: generatePassword(),
//       product: req.body.product,
//       aadhaarfile: req.body.aadhaarfile,
//       panfile: req.body.panfile,
//       itrfile: req.body.itrfile,
//       residentialproof: req.body.residentialproof,
//       bankstatement: req.body.bankstatement,
//       description: req.body.description,
//       email: req.body.email,
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//     });
//     await onboard
//       .save()
//       .then((data) => {
//         console.log("data -- ", data);
//       })
//       .catch((err) => {
//         console.log("err -- ", err);
//       });
//     res.status(200).json(onboard);
//   }
// });

// *** TRY 2 ***
app.post("/dummy", async (req, res) => {
  const generateUsername = () => {
    const randomString = 5;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let string = "";
    for (let i = 0; i < randomString; i++) {
      string += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return string;
  };
  const generatePassword = () => {
    const passwordLength = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  };
  const id = req.params;
  const result = await Lead.findById(id);
  console.log("result --- ", result);

  if (req.body !== "") {
    const onboard = new Onboard({
      username: generateUsername(),
      password: generatePassword(),
      product: req.body.product,
      aadhaarfile: req.body.aadhaarfile,
      panfile: req.body.panfile,
      itrfile: req.body.itrfile,
      residentialproof: req.body.residentialproof,
      bankstatement: req.body.bankstatement,
      description: req.body.description,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    await onboard
      .save()
      .then((data) => {
        console.log("data -- ", data);
      })
      .catch((err) => {
        console.log("err -- ", err);
      });
    res.status(200).json(onboard);
  }
});

// *** MAIN ***
// app.post("/dummy", async (req, res) => {
//   const generateUsername = () => {
//     const randomString = 5;
//     const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     let string = "";
//     for (let i = 0; i < randomString; i++) {
//       string += charset.charAt(Math.floor(Math.random() * charset.length));
//     }
//     return string;
//   };
//   const generatePassword = () => {
//     const passwordLength = 12;
//     const charset =
//       "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     let password = "";
//     for (let i = 0; i < passwordLength; i++) {
//       password += charset.charAt(Math.floor(Math.random() * charset.length));
//     }
//     return password;
//   };
//   const user = await Lead.findById(req.params.id);
//   if (url !== "" && formValue !== "") {
//   }
//   res.json(user);
//   console.log(user);
//   const onboard = new Onboard({
//     username: generateUsername(),
//     password: generatePassword(),
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     email: req.body.email,
//     leadmakeremail: req.body.leadmakeremail,
//     description: req.body.description,
//     status: req.body.status,
//     leadtype: req.body.leadtype,
//   });
//   await onboard
//     .save()
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   res.status(201).json(onboard);
// });

app.listen(port, () => console.log(`server is running on ${port}`));
