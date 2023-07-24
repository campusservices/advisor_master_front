import React, { useState } from "react";

import Radio from "../../components/Radio";
import ComboBox from "../../components/ComboBox";
import Button from "../../components/Button";
import Input from "../input/input";

import classes from "./Filter.module.css";

const Filter = ({
  setFaculty,
  setFileType,
  fileType,
  setShowFilter,
  setEmail,
  faculty,
  email,
}) => {
  const [filterForm, setFilterForm] = useState({
    email: {
      elementType: "input",
      visibility: "visible",
      elementConfig: { type: "text", placeholder: "Enter Email Address" },
      elementName: "Email",
      value: "",
      validation: {
        required: true,
        minLength: 8,
      },
      exist: false,
      valid: false,
      touched: false,
    },
  });

  const faculties = [
    { facultyCode: "dept", faculty: "Select Faculty", selected: true },
    { facultyCode: "806", faculty: "Management Studies", selected: false },
    { facultyCode: "500", faculty: "Law", selected: false },
    { facultyCode: "808", faculty: "Social Sciences", selected: false },
    { facultyCode: "810", faculty: "GSSW", selected: false },
    { facultyCode: "801", faculty: "Economics", selected: false },
  ];

  const changeHandler = (event) => {
    event.preventDefault();
    setFaculty(event.target.value);
  };
  const emailHandler = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };
  const radioHandler = (event) => {
    setFileType(event.target.value);
  };

  return (
    <React.Fragment>
      <div className={classes.Filter}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#ccc",
          }}
        >
          <div style={{ width: "33%", margin: "auto", marginTop: "15px" }}>
            <div style={{ marginLeft: "25px" }}>
              <Radio
                value="templates"
                name="fileoptions"
                label="Advisor Templates"
                checked={
                  fileType
                    ? fileType === "templates"
                      ? "checked"
                      : null
                    : null
                }
                changed={(e) => radioHandler(e)}
              />
            </div>
            <div style={{ paddingBottom: "25px", marginLeft: "25px" }}>
              <Radio
                value="assignments"
                name="fileoptions"
                label="Updated Assignments"
                checked={
                  fileType
                    ? fileType === "assignments"
                      ? "checked"
                      : null
                    : null
                }
                changed={(e) => radioHandler(e)}
              />
            </div>
          </div>
          <div style={{ paddingBottom: "0px", margin: "auto", width: "200px" }}>
            <ComboBox
              selectOptions={faculties}
              faculty={faculty}
              changed={(e) => changeHandler(e)}
            />
          </div>
        </div>
        <div>
          <Input
            visibility={filterForm["email"].visibility}
            elementType={filterForm["email"].elementType}
            changed={(e) => emailHandler(e)}
            elementName={filterForm["email"].elementName}
            value={email}
            elementConfig={filterForm["email"].elementConfig}
            id={"email"}
          />
        </div>
        <div style={{ margin: "auto", width: "220px" }}>
          <Button
            colorStyle="btn btn-danger"
            label="Close"
            disabled={false}
            width={"220"}
            height={"50"}
            clicked={() => setShowFilter(false)}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filter;
