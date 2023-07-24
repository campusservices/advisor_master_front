import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import Input from "../input/input";
import Logo from "../../assets/logo.png";
import * as surepayActions from "../store/actions/surepayAction";
import { useDispatch, useSelector } from "react-redux";
import ErrorForm from "../ModalForm/ModalForm";
import { authenticateUser } from "../../api/advisorApi";
import BGLogo from "../../assets/student_advisor.png";

import Cover from "../cover/cover";
import "bootstrap/dist/css/bootstrap.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const confirmed = useSelector((state) => state.authenticate.confirmed);
  const httpStatus = useSelector((state) => state.authenticate.httpStatus);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enable, setEnable] = useState(false);
  const [showError, setShowError] = useState(false);
  const [statusValue, setStatusValue] = useState(false);
  const [pressedLoginButton, setPressedLoginButton] = useState(false);
  const [btnClasses, setBtnClasses] = useState([
    classes.Button,
    "btn",
    "btn-danger",
    "btn-login",
  ]);
  const [loginForm, setLoginForm] = useState({
    username: {
      elementType: "input",
      visibility: "visible",
      elementConfig: { type: "text", placeholder: "" },
      elementName: "Username",
      value: "",
      validation: {
        required: true,
        minLength: 8,
      },
      exist: false,
      valid: false,
      touched: false,
    },

    password: {
      elementType: "input",
      elementConfig: { type: "password", placeholder: "" },
      value: "",
      elementName: "Password",
      validation: {
        required: true,
        minLength: 8,
      },
      valid: false,
      touched: false,
      exist: false,
    },
  });

  useEffect(() => {
    if (statusValue) {
      console.log("statusValue", statusValue);
      setStatusValue(false);
      navigate("/advisors");
    }
  }, [statusValue]);

  const changeHandler = (event, fieldName) => {
    event.preventDefault();
    if (fieldName === "Password") {
      loginForm.password.value = event.target.value;
      setPassword(event.target.value);
    } else if (fieldName === "Username") {
      loginForm.username.value = event.target.value;
      setUsername(event.target.value);
    }
    let valid = true;
    Object.keys(loginForm).map((key, index) => {
      valid = validation(loginForm, key) && valid;
    });
    if (valid) {
      setEnable(true);
    } else {
      setEnable(false);
    }
  };
  const validation = (loginForm, key) => {
    if (loginForm[key].validation.required) {
      if (loginForm[key].value === "") {
        return false;
      }
    }
    if (loginForm[key].value.length >= loginForm[key].validation.minLength) {
      loginForm[key].valid = true;
    } else {
      loginForm[key].valid = false;
    }

    return loginForm[key].valid;
  };
  const handleFocus = (e) => {};
  const loginHandler = useCallback(async () => {
    dispatch(
      surepayActions.authenticateUser(
        loginForm.username.value,
        loginForm.password.value
      )
    );
    setSpinner(true);
    setLoading(true);

    authenticateUser(loginForm.username.value, loginForm.password.value).then(
      (res) => {
        if (res.data) {
          setStatusValue(true);
        } else {
          setShowError(true);
        }
      }
    );
  }, [username, password]);

  const resetModal = (v) => {
    setShowError(v);
  };
  const setupForm = useMemo(() => {
    let formKeys = Object.keys(loginForm);
    let fields = formKeys.map((value, index) => {
      return (
        <div className={classes.FieldBorder} key={index}>
          <Input
            defaultFocus={
              loginForm[value].elementName === "Username" ? true : false
            }
            handleFocus={(event) => handleFocus(event)}
            visibility={loginForm[value].visibility}
            elementType={loginForm[value].elementType}
            changed={(e) => changeHandler(e, loginForm[value].elementName)}
            elementName={loginForm[value].elementName}
            elementConfig={loginForm[value].elementConfig}
            id={index}
          />
        </div>
      );
    });

    return fields;
  }, []);

  return (
    <React.Fragment>
      {showError && (
        <ErrorForm
          closeModal={() => resetModal(false)}
          message={"Error logging into Advisors System"}
          title={"Login Failure"}
        ></ErrorForm>
      )}
      {showError && <Cover show={showError} />}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "auto",
        }}
      >
        <div>
          <img
            src={BGLogo}
            className={[classes.Logo, classes.sideImg].join(" ")}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "400px",
            margin: "auto",
          }}
        >
          <div className={classes.TitleLogin}>
            <div className="text-center">
              <img src={Logo} style={{ width: "300px" }} />
            </div>
            <div className="text-center">ADVISORS</div>
          </div>
          <div
            style={{
              margin: "auto",
              borderBottomRightRadius: "10px",
              borderBottomLeftRadius: "10px",
              width: "399px",
              border: "0px #0C7CC3 solid",
            }}
          >
            <div className={classes.Login}>
              <form>{setupForm}</form>
              <div style={{ marginLeft: "20px", marginTop: "60px" }}>
                <button
                  disabled={!enable}
                  type="button"
                  onClick={loginHandler}
                  className={btnClasses.join(" ")}
                >
                  {"LOG-IN"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
