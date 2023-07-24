import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Advisors.module.css";
import DragDrop from "../assets/drag_drop.png";
import Button from "../components/Button";
import Header from "../containers/header/header";
import { FileUploader } from "react-drag-drop-files";
import {
  upload,
  loadTemplate,
  sendMail,
  download,
  confirm,
  process,
  exportToSpreadsheet,
} from "../api/advisorApi";
import Filter from "../containers/Filter/Filter";
import Cover from "../containers/cover/cover";
import { SUCCESS } from "../constants/HttpStatus";
import Modal from "../containers/ModalForm/ModalForm";
import Processing from "../assets/processing.gif";
import * as advisorActions from "../containers/store/actions/surepayAction";
import Logout from "../logout/logout";

const Advisors = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const confirmed = useSelector((state) => state.authenticate.confirmed);
  const filterInfo = useSelector((state) => state.filter.data);
  const [faculty, setFaculty] = useState("");
  const [email, setEmail] = useState("");

  const [dragActive, setDragActive] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [dropActive, setDropActive] = useState(false);
  const [target, setTarget] = useState(null);
  const fileTypes = ["CSV", "XLS"];
  const [fileType, setFileType] = useState("templates");
  const [showFilter, setShowFilter] = useState(false);
  const [disableCreateTemplate, setDisableCreateTemplate] = useState(true);
  const [disableProcessAssignments, setDisableProcessAssignments] =
    useState(true);
  const [disableOutputResult, setDisableOutputResult] = useState(true);
  const [disablePushToBanner, setDisablePushToBanner] = useState(true);
  const [disableExportToSpreadSheet, setDisableExportToSpreadSheet] =
    useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [showProcessing, setShowProcessing] = useState(false);
  const [createTemplate, setCreateTemplate] = useState(false);
  const [processAssignments, setProcessAssignments] = useState(false);
  const [outputResult, setOutputResult] = useState(false);
  const [pushToBanner, setPushToBanner] = useState(false);
  const [exportAssignments, setExportAssignments] = useState(false);

  useEffect(() => {
    if (!confirmed) {
      navigate("/");
    }
  }, [confirmed]);

  useEffect(() => {
    if (faculty && email && fileType) {
      dispatch(advisorActions.saveFilter(fileType, faculty, email));
    }
  }, [showFilter]);

  useEffect(() => {
    if (target) {
      if (fileType) {
        const formData = new FormData();
        formData.append("file", target);
        formData.append(
          "finalAssignment",
          fileType == "templates" ? false : true
        );
        upload({
          formData,
        }).then((data) => {
          if (data.status === SUCCESS) {
            fileType === "templates"
              ? setDisableCreateTemplate(false)
              : setDisableCreateTemplate(true);
            const fileStatus =
              fileType === "templates" ? "Template" : "Assignment";
            setShowModal(true);
            setMessage(`${fileStatus} File Uploaded Successfully`);
            setTitle("Success");
          } else {
            setDisableCreateTemplate(true);
          }
        });
      }
      setTarget(null);
    }
  }, [target]);

  const handleDragDropChange = (file) => {
    setDragActive(true);
    setTarget(file);
  };

  useEffect(() => {
    if (createTemplate) {
      loadTemplate({ deptCode: faculty })
        .then((data) => {
          setShowProcessing(false);
          if (data.status === 200) {
            setShowModal(true);
            setMessage("Template Loaded!");
            setTitle("Success");
            sendMail({
              email: email,
              msg: "Template has been loaded!",
              subject: "Loading Advisor Template",
            }).then((data) => {
              if (data.status === 200) {
                setDisableProcessAssignments(false);
                setDisableOutputResult(true);
                setDisableCreateTemplate(true);
                setDisablePushToBanner(true);
                setDisableExportToSpreadSheet(true);
              }
            });
          }
        })
        .catch((err) => {
          setShowProcessing(false);
        });
      setCreateTemplate(false);
    }
  }, [createTemplate]);

  useEffect(() => {
    if (processAssignments) {
      process({ deptCode: faculty }).then((data) => {
        setShowModal(true);
        setTitle("Success");
        setMessage("Assignments Processed");
        setShowProcessing(false);
        setDisableProcessAssignments(true);
        setDisableOutputResult(true);
        setDisableCreateTemplate(true);
        setDisablePushToBanner(true);
        setDisableExportToSpreadSheet(false);
        sendMail({
          email: email,
          msg: "Assignments have been processed!",
          subject: "Processing Assignments",
        }).then((data) => {});
      });
    }

    setProcessAssignments(false);
  }, [processAssignments]);

  useEffect(() => {
    if (exportAssignments) {
      exportToSpreadsheet({ deptCode: faculty }).then((data) => {
        setShowModal(true);
        setTitle("Success");
        setMessage("Exported Successfully");
        setShowProcessing(false);
        setDisableProcessAssignments(true);
        setDisableOutputResult(false);
        setDisableCreateTemplate(true);
        setDisablePushToBanner(true);
        setDisableExportToSpreadSheet(true);
      });
    }
  }, [exportAssignments]);

  useEffect(() => {
    if (outputResult) {
      setTimeout(function () {
        navigate("/advisors");
      }, 5000);
      download().then((data) => {
        setShowProcessing(false);
        setDisableProcessAssignments(true);
        setDisableOutputResult(true);
        setDisableCreateTemplate(true);
        setDisablePushToBanner(false);
        setDisableExportToSpreadSheet(true);
      });
    }
    setOutputResult(false);
  }, [outputResult]);

  useEffect(() => {
    console.log(showLogout);
  }, [showLogout]);
  useEffect(() => {
    if (pushToBanner) {
      confirm().then((data) => {
        setShowProcessing(false);
        setDisableProcessAssignments(true);
        setDisableOutputResult(true);
        setDisableCreateTemplate(true);
        setDisablePushToBanner(true);
        setDisableExportToSpreadSheet(true);
      });
    }
    setPushToBanner(false);
  }, [pushToBanner]);

  const closeFilterHandler = (val) => {
    setShowFilter(val);
  };

  const leave = () => {};

  const handleButtonEvents = (val) => {
    console.log(filterInfo.deptCode, filterInfo.fileType, filterInfo.email);
    if (email && fileType && faculty) {
      if (faculty !== "dept") {
        setShowProcessing(true);
        if (val === "createTemplates") setCreateTemplate(true);
        if (val === "processAssignments") setProcessAssignments(true);
        if (val === "outputResult") setOutputResult(true);
        if (val === "pushToBanner") setPushToBanner(true);
        if (val === "exportAssignments") setExportAssignments(true);
      } else {
        setShowModal(true);
        setMessage("Please select faculty!");
        setTitle("Error");
      }
    } else {
      setShowModal(true);
      setMessage("Please select all default filters!");
      setTitle("Error");
    }
  };

  return (
    <React.Fragment>
      {showLogout && <Logout />}
      {showProcessing && (
        <div className={classes.Processing}>
          <img src={Processing} style={{ width: "100px" }} />
          <label
            className="text-center"
            style={{
              font: "icon",
              fontFamily: "cursive",
              fontSize: "25px",
              color: "#fff",
            }}
          >
            Processing...
          </label>
        </div>
      )}
      {showModal && (
        <Modal
          closeModal={() => setShowModal(false)}
          message={message}
          title={title}
        />
      )}
      <Header
        clicked={() => setShowFilter(true)}
        showLogout={(val) => setShowLogout(val)}
      />

      {showFilter && (
        <div style={{ zIndex: 40 }}>
          <Filter
            setFaculty={(val) => setFaculty(val)}
            faculty={faculty}
            setFileType={(val) => setFileType(val)}
            email={email}
            fileType={fileType}
            setShowFilter={(val) => closeFilterHandler(val)}
            setEmail={(val) => setEmail(val)}
          />
        </div>
      )}
      {(showFilter || showModal || showProcessing) && <Cover />}
      <div className={classes.Advisors}>
        <div className={classes.Col}>
          <div
            style={{
              flexDirection: "row",
              border: "2px dashed #000",
              width: "900px",
              height: "500px",
              borderRadius: "15px",
              backgroundColor: "#C1D1D6",
            }}
          >
            <div
              style={{
                cursor: "pointer",
                height: "100px!important",
                margin: "200px auto",
                width: "240px",
                marginTop: "0px",
              }}
            >
              <FileUploader
                handleChange={handleDragDropChange}
                name="file"
                types={fileTypes}
              >
                <div
                  style={{
                    display: "flex",
                    margin: "200px auto",
                    width: "39px",
                    cursor: "pointer",
                  }}
                >
                  <img src={DragDrop} />
                </div>
                <div
                  className="text-center"
                  style={{ marginTop: "-180px", cursor: "pointer" }}
                >
                  {"Choose a file or drag it here."}
                </div>
              </FileUploader>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: "0px" }} className={classes.Col}>
          <Button
            disabled={disableCreateTemplate}
            colorStyle="btn btn-primary"
            label="Create Template"
            width={"220"}
            height={"55"}
            clicked={() => handleButtonEvents("createTemplates")}
          />
          <Button
            disabled={disableProcessAssignments}
            colorStyle="btn btn-danger"
            label="Process Assignments"
            width={"220"}
            height={"55"}
            clicked={() => handleButtonEvents("processAssignments")}
          />
          <Button
            disabled={disableExportToSpreadSheet}
            colorStyle="btn btn-info"
            label="Export to Spreadsheet"
            width={"220"}
            height={"55"}
            clicked={() => handleButtonEvents("exportAssignments")}
          />
          <Button
            disabled={disableOutputResult}
            colorStyle="btn btn-warning"
            label="Download File"
            width={"220"}
            height={"55"}
            clicked={() => handleButtonEvents("outputResult")}
          />
          <Button
            disabled={disablePushToBanner}
            colorStyle="btn btn-success"
            label="Push to Banner"
            width={"220"}
            height={"55"}
            clicked={() => handleButtonEvents("pushToBanner")}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Advisors;
