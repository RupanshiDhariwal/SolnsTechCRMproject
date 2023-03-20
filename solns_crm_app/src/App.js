import "./App.css";
import React from "react";
import Home from "./Components/homepage/Home";
import Lead from "./Components/LeadsPage/Lead";
import { Route, Routes } from "react-router-dom";
import Account from "./Components/Accountspage/Account";
import Case from "./Components/Casespage/Case";
import Opportunities from "./Components/Opportunitiespage/Opportunities";
import Reports from "./Components/Reportspage/Reports";
import IndividualLead from "./Components/IndividualLead/IndividualLead";
import OnBoard from "./Components/OnBoard/OnBoard";
import EditLeadComp from "./Components/LeadsPage/EditLeadComp";
import AdminLogin from "./Components/Login/LoginPage";
import CreateUser from "./Components/DashBoard/CreateUser";
import UsersList from "./Components/DashBoard/UserList";
import Allocation from "./Components/DashBoard/Allocation";
import AllocateLead from "./Components/DashBoard/AllocateLead";
import Allocated from "./Components/UserDashBoard/Allocated";
import Dashboard from "./Components/DashBoard/Dashboard";
import CompanyRegister from "./Components/Register/CompanyRegisterPage";
import BDARegister from "./Components/Register/BDARegisterPage";

function App() {
  // const { user } = useContext(AuthContext);
  // let type = user.type;
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route index element={<AdminLogin />} />
        <Route path="/company-register-page" element={<CompanyRegister />} />
        <Route path="/bda-register-page" element={<BDARegister />} />
        {/* {type === "user" && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/usercreate" element={<CreateUser />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/allocation" element={<Allocation />} />
            <Route path="/allocateleads" element={<AllocateLead />} />
            <Route path="/userlist" element={<UsersList />} />
            <Route path="/Leads" element={<Lead />} />
            <Route path="/account" element={<Account />} />
            <Route path="/case" element={<Case />} />
            <Route path="/individuallead" element={<IndividualLead />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/onboard" element={<OnBoard />} />
            <Route path="/editleadcomp" element={<EditLeadComp />} />
            <Route path="*" element={<Dashboard />} />
          </>
        )}

        {type === "admin" && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/allocated" element={<Allocated />} />
            <Route path="/Leads" element={<Lead />} />
            <Route path="/account" element={<Account />} />
            <Route path="/case" element={<Case />} />
            <Route path="/individuallead" element={<IndividualLead />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/onboard" element={<OnBoard />} />
            <Route path="/editleadcomp" element={<EditLeadComp />} />
            <Route path="*" element={<Dashboard />} />
          </>
        )} */}

        <Route path="/home" element={<Home />} />
        <Route path="/usercreate" element={<CreateUser />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/allocation" element={<Allocation />} />
        <Route path="/allocated" element={<Allocated />} />
        <Route path="/allocateleads" element={<AllocateLead />} />
        <Route path="/userlist" element={<UsersList />} />
        <Route path="/Leads" element={<Lead />} />
        <Route path="/account" element={<Account />} />
        <Route path="/case" element={<Case />} />
        <Route path="/individuallead" element={<IndividualLead />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/onboard" element={<OnBoard />} />
        <Route path="/editleadcomp" element={<EditLeadComp />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
