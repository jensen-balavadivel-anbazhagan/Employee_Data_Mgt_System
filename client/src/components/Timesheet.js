import Table from "@material-ui/core/Table";
import { useState, useEffect } from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import Button from "@material-ui/core/Button";
import MessageDialog from "./MessageDialog";
import ConfirmDialog from "./ConfirmDialog";
import TimesheetService from "../store/TimesheetService";
import ClientsService from "../store/ClientsService";

/*const clients = [
  {
    value: "volvo",
    display: "VOLVO",
  },
  {
    value: "ikea",
    display: "IKEA",
  },
  {
    value: "skf",
    display: "SKF",
  },
];*/

function Timesheet() {
  useEffect(() => {
    getTimesheet();
    getClients();
  }, []);
  //Method to get all the timesheet data for the empId from backend
  const getTimesheet = () => {
    TimesheetService.getTimesheetData("Bala").then((data) => {
      if (data && data.timesheets) {
        var rowData = [];
        data.timesheets.forEach((timesheet) => {
          rowData.push({
            id: timesheet._id,
            empId: timesheet.empId,
            date: timesheet.date.split("T")[0],
            client: timesheet.client,
            activities: timesheet.activities,
            hour: timesheet.hour,
            submitted: timesheet.submitted,
            isEditMode: false,
          });
        });
        setRows(rowData);
      } else {
        alert("no data");
        if (data && data.msgBody) {
          alert(data.msgBody);
        }
      }
    });
  };

  const getClients = () => {
    ClientsService.getClientsData().then((data) => {
      if (data && data.clients) {
        setClients(data.clients);
      } else {
        alert("no data");
        if (data && data.msgBody) {
          alert(data.msgBody);
        }
      }
    });
  };
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [msgSeverity, setMsgSeverity] = useState("");
  const [msg, setMsg] = useState("");
  const [previous, setPrevious] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [clients, setClients] = useState([]);

  const onToggleEditMode = (id) => {
    getClients();
    setRows((state) => {
      return rows.map((row) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  // Function For adding new row object
  const handleAdd = () => {
    getClients();
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        empId: "Bala",
        date: "",
        client: "volvo",
        activities: "",
        hour: "",
        submitted: false,
        isEditMode: true,
      },
    ]);
  };

  // Function For saving the timesheet
  const saveTimesheet = (id) => {
    var timesheetData = rows.find((row) => {
      return row.id == id;
    });
    TimesheetService.saveTimesheetData(id, timesheetData)
      .then((resp) => {
        openMessageDisplay(true, "success", "Saved sucessfully");
        getTimesheet();
      })
      .catch((err) => {
        openMessageDisplay(
          true,
          "error",
          err.data ? err.data : "Save unsuccessful!"
        );
        onToggleEditMode(id);
      });
  };

  // Function For submitting the timesheet
  const submitTimesheet = () => {
    TimesheetService.submitTimesheet("Bala", "")
      .then((resp) => {
        getTimesheet();
        openMessageDisplay(true, "success", "Submitted sucessfully");
      })
      .catch((err) => {
        openMessageDisplay(true, "error", "Submit unsucessful");
      });
  };

  // Showing delete confirmation to users
  const handleConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  // Function For closing the alert snackbar
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // Handle the case of delete confirmation where
  // user click yes delete a specific row of id:i
  const handleRemoveClick = (id) => {
    TimesheetService.deleteTimesheetData(id)
      .then((resp) => {
        openMessageDisplay(true, "success", "Deleted sucessfully");
        var list = rows.filter((row) => {
          return id != row.id;
        });
        setRows(list);
      })
      .catch((err) => {
        openMessageDisplay(
          true,
          "error",
          err.data ? err.data : "Delete unsucessful"
        );
      });
    handleConfirm();
  };

  function openMessageDisplay(open, severity, msg) {
    setOpen(open);
    setMsgSeverity(severity);
    setMsg(msg);
  }

  const CustomInputCell = ({ row, name, onChange }) => {
    const { isEditMode } = row;
    return (
      <TableCell align="left" style={{ width: "130px" }}>
        {isEditMode ? (
          <Input
            value={row[name]}
            name={name}
            onChange={(e) => onChange(e, row)}
            className="input"
          />
        ) : (
          row[name]
        )}
      </TableCell>
    );
  };

  const CustomDateCell = ({ row, name, onChange }) => {
    const { isEditMode } = row;
    return (
      <TableCell align="left" style={{ width: "200px" }}>
        {isEditMode ? (
          <Input
            value={row[name]}
            name={name}
            onChange={(e) => onChange(e, row)}
            className="input"
            type="date"
          />
        ) : (
          row[name]
        )}
      </TableCell>
    );
  };

  const CustomSelectCell = ({ row, name, onChange }) => {
    const { isEditMode } = row;
    return (
      <TableCell align="left" style={{ width: "200px" }}>
        {isEditMode ? (
          <select
            value={row[name]}
            name={name}
            onChange={(e) => onChange(e, row)}
            className="input"
          >
            {clients.map((client) => (
              <option key={client.value} value={client.value}>
                {client.display}
              </option>
            ))}
            ;
          </select>
        ) : (
          clients
            .filter((client) => client.value === row[name])
            .map((clientSel) => clientSel.display)
        )}
      </TableCell>
    );
  };

  return (
    <div id="monthPay">
      <div className="tableDiv">
        <div className="tabButton">
          <Button
            style={{ alignSelf: "flex-end", top: "10px", right: "10px" }}
            variant="contained"
            color="primary"
            width="100px"
            height="30px"
            onClick={handleAdd}
          >
            Add
          </Button>
          &nbsp;
          <Button
            variant="contained"
            color="secondary"
            width="100px"
            height="30px"
            style={{ alignSelf: "flex-end", top: "10px", right: "10px" }}
            onClick={submitTimesheet}
          >
            Submit
          </Button>
        </div>
        {open && (
          <MessageDialog
            open={open}
            handleClose={handleClose}
            severity={msgSeverity}
            content={msg}
          />
        )}
        <Table className="table timesheetTable" aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ width: "200px" }}>
                Date
              </TableCell>
              <TableCell align="left" style={{ width: "200px" }}>
                Client
              </TableCell>
              <TableCell align="left" style={{ width: "150px" }}>
                Activities
              </TableCell>
              <TableCell align="left" style={{ width: "140px" }}>
                Hour
              </TableCell>
              <TableCell align="left" />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <CustomDateCell {...{ row, name: "date", onChange }} />
                <CustomSelectCell {...{ row, name: "client", onChange }} />
                <CustomInputCell {...{ row, name: "activities", onChange }} />
                <CustomInputCell {...{ row, name: "hour", onChange }} />
                <TableCell className="selectTableCell">
                  {row.submitted ? (
                    <p
                      style={{
                        margin: "0",
                        alignSelf: "center",
                        color: "green",
                      }}
                    >
                      Submitted
                    </p>
                  ) : (
                    <>
                      {row.isEditMode ? (
                        <>
                          <IconButton
                            aria-label="done"
                            onClick={() => saveTimesheet(row.id)}
                          >
                            <DoneIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleConfirm()}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      ) : (
                        <div>
                          <IconButton
                            aria-label="edit"
                            onClick={() => onToggleEditMode(row.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleConfirm()}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      )}
                    </>
                  )}
                  {showConfirm && (
                    <ConfirmDialog
                      content={
                        <>
                          <b>
                            Are you sure you want do delete the timesheet row?{" "}
                          </b>
                        </>
                      }
                      handleCancel={handleConfirm}
                      handleOk={() => handleRemoveClick(row.id)}
                      cancelText="No"
                      okText="Yes"
                      isConfirmOpen={showConfirm}
                      id={row.id}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Timesheet;
