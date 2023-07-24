import React from "react";
import classes from "./input.module.css";

const Input = (props) => {
  let inputElement = null;

  let inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = (
      <p style={{ color: "red" }}>Please enter a valid value!</p>
    );
  }

  inputClasses.push("form-control");
  inputClasses.push(classes.InputColor);
  if (props.elementType === "input") {
  }
  if (props.elementType !== undefined) {
    // alert(props.elementType);
  }
  switch (props.elementType) {
    case "input":
      if (props.elementName !== "Password") {
        inputElement = (
          <div>
            <input
              autoFocus
              onFocus={props.handleFocus}
              onChange={props.changed}
              className={inputClasses.join(" ")}
              {...props.elementConfig}
              value={props.value ? props.value : null}
              name={props.elementName}
              id={props.elementName}
              // type={props.visibility}
            />
          </div>
        );
      } else {
        inputElement = (
          <input
            onChange={props.changed}
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            // value={props.value}
            name={props.elementName}
            id={props.elementName}
            placeholder={props.elementName}
          />
        );
      }
      break;
    case "date":
      inputElement = (
        <input
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          name={props.elementName}
          id={props.elementName}
        />
      );
      break;
    case "radio":
      inputElement = (
        <input
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          name={props.elementName}
          id={props.elementName}
          checked={props.checked}
        >
          {props.value}
        </input>
      );
      break;
    case "file":
      inputElement = (
        <div>
          <label htmlFor={props.elementName} className={classes.uploadlabel}>
            <div className="text-center">
              {/* <img src={Upload} className={classes.Size} /> */}
            </div>
          </label>
          <input
            onChange={props.changed}
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            value={props.value}
            name={props.elementName}
            id={props.elementName}
            hidden
          />

          <span className="ml-3 mt-3">
            <b>{props.message}</b>
          </span>
        </div>
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.changed}
          className={inputClasses.join()}
          {...props}
        />
      );
      break;
    case "checkbox":
      inputElement = (
        <input
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          name={props.elementName}
          id={props.elementName}
          checked={props.checked}
        >
          {props.value}
        </input>
      );
      break;
    case "select":
      if (props.elementConfig !== undefined) {
        inputElement = (
          <select onChange={props.changed} className={classes.Select}>
            {props.elementConfig.selectoptions.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.displayValue}
                </option>
              );
            })}
          </select>
        );
      }
      break;
    default:
      inputElement = (
        <input
          key={props.key}
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementconfig}
          value={props.value}
          name={props.elementName}
          id={props.elementName}
          type={props.visibility}
        />
      );
  }

  return (
    <div className={inputClasses}>
      {inputElement}
      {validationError}
    </div>
  );
};

export default Input;
