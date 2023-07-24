import React from "react";

import classes from "./Header.module.css";
import Logo from "../../assets/logo.png";
import Person from "../../assets/person.png";
import Filter from "../../assets/filter.png";

const header = ({ clicked, showLogout }) => {
  return (
    <div className={classes.Header}>
      <div className={classes.Title}>
        <img
          src={Logo}
          style={{ height: "73px", marginLeft: "20px", paddingRight: "20px" }}
        />
        <label style={{ marginTop: "23px", color: "#fff" }}>
          {"Advisor Assignments"}
        </label>
      </div>

      <div className={classes.LoginLabel}>
        <img src={Filter} className={classes.Filter} onClick={clicked} />
        <img
          src={Person}
          style={{ height: "40px" }}
          onClick={() => showLogout(true)}
        />
      </div>
    </div>
  );
};

export default header;
