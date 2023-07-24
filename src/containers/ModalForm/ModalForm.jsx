import React, { useState, useEffect } from "react";
import classes from "./ModalForm.module.css";

const ModalForm = React.memo(({ closeModal, title, message }) => {
  const [btnClasses, setButtonClasses] = useState(null);
  const success = {
    backgroundColor: "green",
    borderRadius: "5px",
    color: "#fff",
    height: "35px",
  };
  const failure = {
    backgroundColor: "red",
    borderRadius: "5px",
    color: "#fff",
    height: "35px",
  };

  return (
    <div className={classes.ModalForm}>
      <div
        className={
          title === "Success" ? classes.SuccessTitle : classes.FailTitle
        }
      >
        {title}
      </div>
      <div className="text-center pt-5">{message}</div>
      <div onClick={closeModal} className={classes.Button}>
        <div onClick={closeModal}>
          <div
            style={title === "Success" ? success : failure}
            className="text-center pt-1"
          >
            Close
          </div>
        </div>
      </div>
    </div>
  );
});

export default ModalForm;
