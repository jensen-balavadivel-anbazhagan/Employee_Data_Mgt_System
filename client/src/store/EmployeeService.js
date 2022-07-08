/* All operations related to employees like adding, updating etc*/
const EmployeeService = {
  getEmployees: () => {
    return fetch("http://localhost:5000/employee/getAll").then((response) => {
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
  getEmployee: (id) => {
    return fetch("http://localhost:5000/employee/" + id).then((response) => {
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

  uploadFile: (id, fileData) => {
    return fetch("http://localhost:5000/employee/uploadFile/" + id, {
      method: "put",
      body: fileData,
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

  deleteFile: (id) => {
    return fetch("http://localhost:5000/employee/deleteFile/" + id, {
      method: "post",
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

export default EmployeeService;
