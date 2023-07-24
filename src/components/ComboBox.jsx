import React from "react";

import classes from "./Component.module.css";

const ComboBox = ({ selectOptions, changed, faculty }) => {
  return (
    <div style={{ display: "flex", marginLeft: "0px" }}>
      <select
        defaultValue={faculty ? faculty : null}
        onChange={changed}
        className={classes.ComboBox}
      >
        {selectOptions.map((option) => {
          return (
            <option
              key={option.facultyCode}
              value={option.facultyCode}
              {...option.selected}
            >
              {option.faculty}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ComboBox;
