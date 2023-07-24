import React from "react";
import style from "./Component.module.css";

const Button = ({ colorStyle, label, disabled, clicked, width, height }) => {
  return (
    <div>
      <button
        onClick={clicked}
        className={[colorStyle, style.ButtonFont].join(" ")}
        style={{
          border: "2px solid #fff",
          width: width + "px",
          height: height + "px",
          margin: "10px",
          borderRadius: "25px",
        }}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
