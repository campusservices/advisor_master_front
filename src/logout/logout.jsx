import React from "react";
import style from "./Logout.module.css";
import { useNavigate } from "react-router-dom";

const Logout = (props) => {
  const navigate = useNavigate();

  const leave = () => {
    navigate("/");
  };
  return (
    <div
      className={[style.Logout, "text-center", "pt-1"].join(" ")}
      onClick={() => leave()}
    >
      {"Logout"}
    </div>
  );
};

export default Logout;
