import React, { useContext } from "react";
import CommonPart from "../Commonpart/CommonPart";
import "./home.css";
import MyInboxHome from "./MyInboxHome";
import TopNavBar from "../homepage/TopNavBar";
import AuthContext from "../Context/AuthProvider";
import AdminLogin from "../Login/LoginPage";

const Home = ({ email, type, profile }) => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user && (
        <div>
          <CommonPart />
          <TopNavBar email_id={email} type={type} profile={profile} />
          <MyInboxHome email_id={email} type={type} profile={profile} />
        </div>
      )}
      {!user && <AdminLogin />}
    </>
  );
};

export default Home;
