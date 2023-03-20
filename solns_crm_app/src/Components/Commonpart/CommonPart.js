import React, { useContext } from "react";
import "./commonpart.css";
import AuthContext from "../Context/AuthProvider";
import AdminLogin from "../Login/LoginPage";
import { toast } from "react-toastify";

const CommonPart = () => {
  const { user } = useContext(AuthContext);
  const { setAuth } = useContext(AuthContext);

  function handleLogout() {
    localStorage.removeItem("user");
    setAuth({ type: "LOGOUT" });
    setTimeout(() => {
      toast.success("Logout Successfully");
    }, 200);
    // navigate('/');
  }
  return (
    <>
      {user && (
        <div>
          <header className="App-header">
            <h1>SolnsCRM</h1>
            <button className="btn profile-box" onClick={handleLogout}>
              Logout
            </button>
          </header>
        </div>
      )}
      {!user && <AdminLogin />}
    </>
  );
};

export default CommonPart;
