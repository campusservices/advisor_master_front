import React from "react";

import classes from "./Component.module.css";

const Radio = ({ value, name, label, defaultChecked, checked, changed }) => {
  return (
    <div className={classes.Radio}>
      <label>
        <input
          type="radio"
          value={value}
          name={name}
          checked={checked}
          onChange={changed}
        />
        {"     " + label}
      </label>
    </div>
  );
};

export default Radio;
