const ClientsService = {
  getClientsData: () => {
    return fetch("http://localhost:5000/clients/getAll").then((response) => {
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

export default ClientsService;
