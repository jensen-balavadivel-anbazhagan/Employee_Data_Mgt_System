import React from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";

const ConfirmDialog = (props) => {
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
      <Dialog open={props.isConfirmOpen}>
        <DialogContent>
          <DialogContentText
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0 auto",
              color: "black",
            }}
          >
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "0 auto",
            }}
          >
            <Button
              color="secondary"
              variant="outlined"
              style={{
                marginTop: "10px",
                position: "inherit",
                justifyContent: "center",
                textAlign: "center",
                color: "black",
                width: "100px",
                marginLeft: "15px",
              }}
              onClick={() => props.handleCancel()}
            >
              {props.cancelText}
            </Button>

            <Button
              color="primary"
              variant="contained"
              style={{
                marginTop: "10px",
                position: "inherit",
                justifyContent: "center",
                textAlign: "center",
                color: "white",
                width: "100px",
                marginLeft: "15px",
              }}
              onClick={() => props.handleOk()}
            >
              {props.okText}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
