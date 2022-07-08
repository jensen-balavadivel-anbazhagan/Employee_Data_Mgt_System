import React from "react";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const MessageDialog = (props) => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
      }}
    >
      <Snackbar
        open={props.open}
        autoHideDuration={2000}
        onClose={() => props.handleClose()}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Alert onClose={() => props.handleClose()} severity={props.severity}>
          {props.content}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MessageDialog;
