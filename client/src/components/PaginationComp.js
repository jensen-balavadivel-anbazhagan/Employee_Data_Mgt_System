import * as React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { useState } from "react";

function PaginationComp(props) {
  return (
    <Pagination
      count={props.count}
      variant="outlined"
      color="primary"
      page={props.page}
      onChange={props.handleChange}
      siblingCount={1}
      showFirstButton
      showLastButton
    />
  );
}

export default PaginationComp;
