import { useTable } from "react-table";
import FileUpload from "./FileUpload";

function TableComp(props) {
  const columns = props.columns;
  const data = props.data;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table className="table employeeTable" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
            <th> Action </th>
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
              <td>
                <FileUpload
                  key={row.original._id}
                  email={row.original.email}
                  file={row.original.filename}
                  updateMethod={props.updateFileName}
                  id={row.original._id}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableComp;
