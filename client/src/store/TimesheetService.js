/* All operations related to timesheet like saving, submiting etc*/
const TimesheetService = {
  getTimesheetData: (id) => {
    return fetch("http://localhost:5000/timesheet/getAll/" + id).then(
      (response) => {
        if (response.status != 200) {
          return response.json().then((errResData) => {
            const error = new Error(
              `Something went wrong! ${errResData.data.msgBody}`
            );
            error.data = errResData;
            throw error;
          });
        }
        return response.json().then((data) => data);
      }
    );
  },
  getTimesheetForMonth: (id, month) => {
    return fetch("http://localhost:5000/timesheet/getDataForMonth", {
      method: "get",
      body: JSON.stringify({
        id: id,
        month: month,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status != 200) {
        return response.json().then((errResData) => {
          const error = new Error(
            `Something went wrong! ${errResData.data.msgBody}`
          );
          error.data = errResData;
          throw error;
        });
      }
      return response.json().then((data) => data);
    });
  },

  saveTimesheetData: (id, timesheetData) => {
    return fetch("http://localhost:5000/timesheet/saveTimesheetData", {
      method: "post",
      body: JSON.stringify({
        id: id,
        timesheetData: timesheetData,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status != 200) {
        return response.json().then((errResData) => {
          const error = new Error(
            `Something went wrong! ${errResData.data.msgBody}`
          );
          error.data = errResData;
          throw error;
        });
      }
      return response.json().then((data) => data);
    });
  },

  submitTimesheet: (id, month) => {
    return fetch("http://localhost:5000/timesheet/submitTimesheet", {
      method: "post",
      body: JSON.stringify({
        id: id,
        month: month,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status != 200) {
        return response.json().then((errResData) => {
          const error = new Error(
            `Something went wrong! ${errResData.data.msgBody}`
          );
          error.data = errResData;
          throw error;
        });
      }
      return response.json().then((data) => data);
    });
  },

  deleteTimesheetData: (id) => {
    return fetch("http://localhost:5000/timesheet/deleteTimesheetData", {
      method: "post",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status != 200) {
        return response.json().then((errResData) => {
          const error = new Error(
            `Something went wrong! ${errResData.data.msgBody}`
          );
          error.data = errResData;
          throw error;
        });
      }
      return response.json().then((data) => data);
    });
  },
};

export default TimesheetService;
