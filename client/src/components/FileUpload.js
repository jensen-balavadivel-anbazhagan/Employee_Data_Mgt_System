import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ConfirmDialog from "./ConfirmDialog";
import EmployeeService from "../store/EmployeeService";

const FileUpload = (props) => {
  const email = props.email;
  const file = props.file;
  const id = props.id;
  const [selectedFile, setSelectedFile] = useState({
    id: "",
    email: null,
    file: "",
  });
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isDelConfOpen, setIsDelConfOpen] = useState(false);

  useEffect(() => {
    setSelectedFile({
      id: id,
      email: email,
      file: file,
    });
    setIsFileSelected(file ? true : false);
  }, []);

  const fileUpload = (event) => {
    const fileSel = {
      id: id,
      email: email,
      file: event.target.files[0],
    };
    const formData = new FormData();
    formData.append("file", fileSel.file);
    EmployeeService.uploadFile(id, formData);
    fileProcess(fileSel, true);
  };

  const deleteFile = () => {
    const fileSel = {
      email: email,
      file: "",
    };
    EmployeeService.deleteFile(id);
    fileProcess(fileSel, false);
  };

  const fileProcess = (fileSelected, isSelected) => {
    setSelectedFile(fileSelected);
    setIsFileSelected(isSelected);
    props.updateMethod(email, fileSelected.file.name);
  };

  /*const handleSubmission = (event) => {
    const formData = new FormData();

    formData.append("File", selectedFile);

    fetch("https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };*/

  const toggleDelConf = () => {
    setIsDelConfOpen(!isDelConfOpen);
  };

  const deleteConfirmedByUser = () => {
    toggleDelConf();
    deleteFile();
  };

  return (
    <div>
      {isFileSelected ? (
        <div style={{ justifySelf: "center" }}>
          <IconButton aria-label="Change file" component="label">
            <FontAwesomeIcon icon="fas fa-edit" className="redIcons" />
            <input type="file" name="file" hidden onChange={fileUpload} />
          </IconButton>
          <IconButton
            aria-label="Delete File"
            component="label"
            onClick={toggleDelConf}
          >
            <FontAwesomeIcon
              icon="fa-solid fa-trash-can"
              className="redIcons"
            />
          </IconButton>
          {isDelConfOpen && (
            <ConfirmDialog
              content={
                <>
                  <b>
                    Are you sure you want do delete the file for the user{" "}
                    {email} ?
                  </b>
                </>
              }
              handleCancel={toggleDelConf}
              handleOk={deleteConfirmedByUser}
              cancelText="No"
              okText="Yes"
              isConfirmOpen={isDelConfOpen}
            />
          )}
        </div>
      ) : (
        /*<p>Filename: {selectedFile.name}</p>*/
        <Button variant="contained" color="primary" component="label">
          {" "}
          Upload
          <input type="file" name="file" hidden onChange={fileUpload} />
        </Button>
      )}
    </div>
  );
};

export default FileUpload;
