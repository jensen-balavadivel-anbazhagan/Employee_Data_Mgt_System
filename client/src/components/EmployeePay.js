import PaginationComp from "./PaginationComp";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { InputAdornment } from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import TableComp from "./TableComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmployeeService from "../store/EmployeeService";
import "bootstrap/dist/css/bootstrap.min.css";
import usePagination from "../store/Paginations";

function Pay() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterDataAvailable, setFilterDataAvailable] = useState([true]);
  const dataPerPage = 5;
  const pageData = usePagination(filteredData, dataPerPage);
  const [page, setPage] = useState(1);
  const columns = [
    {
      Header: "First Name",
      accessor: "firstName",
    },
    {
      Header: "Last Name",
      accessor: "lastName",
    },
    {
      Header: "Phone",
      accessor: "phone",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Uploaded Payroll Date",
      accessor: "uploaded",
    },
    {
      Header: "FileName",
      accessor: "filename",
      Cell: ({ value }) => {
        return (
          <div>
            {value && (
              <FontAwesomeIcon icon="fas fa-file" className="redIcons" />
            )}
            &nbsp;
            {value}
          </div>
        );
      },
    },
  ];

  //Method to filter the data based on the filter value
  const filterData = (event) => {
    setFilterDataAvailable(true);
    var name = event.target.value;
    if (name && name != "") {
      var filteredData = data.filter((employee) => {
        return employee.firstName.toUpperCase().includes(name.toUpperCase());
      });
      if (filteredData && filteredData.length > 0) {
        setFilteredData(filteredData);
        setFilterDataAvailable(true);
      } else {
        setFilterDataAvailable(false);
      }
    } else {
      setFilterDataAvailable(true);
      setFilteredData(data);
    }
  };

  //Method to get all the employee data from backend
  const getEmployees = () => {
    EmployeeService.getEmployees().then((data) => {
      if (data && data.employees) {
        setData(data.employees);
        setFilteredData(data.employees);
      } else {
        alert("no data");
        if (data && data.msgBody) {
          alert(data.msgBody);
        }
      }
    });
  };

  //Method to update the file name in the data
  const updateFileName = (email, filename) => {
    data.forEach((employee) => {
      if (employee.email === email) {
        employee.filename = filename;
      }
    });
    setData(data);
    setFilteredData(data);
  };

  //method to handle the page change and data
  const handleChange = (e, p) => {
    setPage(p);
    pageData.jump(p);
  };

  //method called when the page is changed
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    getEmployees();
    setFilteredData(data);
  }, []);

  return (
    <div id="monthPay">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Employee Payroll- Jan2021
      <div className="tableDiv">
        <div
          style={{
            alignSelf: "flex-end",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {!filterDataAvailable && (
            <p style={{ margin: "0", alignSelf: "center", color: "orangered" }}>
              {" "}
              Search value does not return data&nbsp;&nbsp;&nbsp;
            </p>
          )}
          <TextField
            name="search"
            className="seachTextField"
            placeholder="Search with First Name"
            variant="outlined"
            size="small"
            justify="flex-end"
            onChange={filterData}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search style={{ color: "red" }} />
                </InputAdornment>
              ),
            }}
          />
        </div>
        {Array.isArray(filteredData) && filteredData.length ? (
          <div>
            <TableComp
              columns={columns}
              data={pageData.currentData()}
              updateFileName={updateFileName}
            />
            <div className="pagination">
              <PaginationComp
                count={Math.ceil(data.length / dataPerPage)}
                data={filteredData}
                dataPerPage={dataPerPage}
                page={page}
                handleChangePage={handleChangePage}
                handleChange={handleChange}
              />
            </div>
          </div>
        ) : (
          <p style={{ top: "40%", left: "30%", position: "absolute" }}>
            {" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No Employee Data available
          </p>
        )}
      </div>
    </div>
  );
}

export default Pay;
