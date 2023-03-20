import React from "react";
import "./topNavBar.css";
import { useNavigate } from "react-router-dom";

const TopNavBar = ({ email_id, type, profile }) => {
  let navbar_array;
  // console.log(profile);
  if (type === "admin") {
    navbar_array = [
      "Home",
      "Users",
      "Allocation",
      "Leads",
      "Accounts",
      "Opportunities",
      "Cases",
      "Reports",
    ];
  } else if (type === "user") {
    navbar_array = [
      "Home",
      "Allocated",
      "Leads",
      "Accounts",
      "Opportunities",
      "Cases",
      "Reports",
    ];
  }

  const navigate = useNavigate();
  function clickhandle(val, id) {
    console.log(val, id);

    if (val === "Home") {
      navigate(`/dashboard`);
    } else if (val === "Leads") {
      navigate("/leads", {
        state: {
          email: `${email_id}`,
          type: `${type}`,
          profile: profile,
        },
      });
    } else if (val === "Accounts") {
      navigate("/account", {
        state: {
          email: `${email_id}`,
          type: `${type}`,
          profile: `${profile}`,
        },
      });
    } else if (val === "Opportunities") {
      navigate("/opportunities", {
        state: {
          email: `${email_id}`,
          type: `${type}`,
          profile: profile,
        },
      });
    } else if (val === "Cases") {
      navigate("/case", {
        state: {
          email: `${email_id}`,
          type: `${type}`,
          profile: profile,
        },
      });
    } else if (val === "Calendar") {
      navigate("/calendars", {
        state: {
          email: `${email_id}`,
          type: `${type}`,
          profile: profile,
        },
      });
    } else if (val === "Reports") {
      navigate("/reports", {
        state: {
          email: `${email_id}`,
          type: `${type}`,
          profile: profile,
        },
      });
    } else if (val === "Emails") {
      navigate("/emails", {
        state: {
          email: `${email_id}`,
          type: `${type}`,
          profile: profile,
        },
      });
    } else if (val === "Meeting") {
      navigate("/meeting", {
        state: {
          email: `${email_id}`,
          type: `${type}`,
          profile: profile,
        },
      });
    } else if (val === "Calls") {
      navigate("/calls", {
        state: {
          email: `${email_id}`,
          type: `${type}`,
          profile: profile,
        },
      });
    } else if (val === "Tasks") {
      navigate("/task", {
        state: {
          email: `${email_id}`,
          type: `${type}`,
          profile: profile,
        },
      });
    } else if (val === "Allocation") {
      navigate("/allocation", {
        state: {
          email: `${email_id}`,
          type: `${type}`,
          profile: profile,
        },
      });
    } else if (val === "Allocated") {
      navigate("/allocated", {
        state: {
          email: `${email_id}`,
          type: `${type}`,
          profile: profile,
        },
      });
    } else if (val === "Users") {
      navigate(`/userlist`, {
        state: {
          email: `${email_id}`,
          type: `${type}`,
          profile: profile,
        },
      });
    } else {
      navigate("/");
    }
  }

  return (
    <div>
      <ul
        className="nav nav-tabs nav-pills nav-justified"
        id="myTab"
        role="tablist"
      >
        {navbar_array.map((value, index) => {
          return (
            <li className="nav-item" role="presentation" key={index}>
              <button
                className="btn  btn-outline-secondary me-2"
                type="button"
                id={index}
                onClick={() => clickhandle(value, index)}
              >
                {value}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TopNavBar;
