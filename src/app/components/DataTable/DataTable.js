import * as React from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Icon from "@material-ui/core/Icon";
import InputBase from "@mui/material/InputBase";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function DataTable() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          padding: "20px 20px 40px 0px",
        }}
      >
        <Search>
          <SearchIconWrapper>
            <Icon>search</Icon>
          </SearchIconWrapper>
          <StyledInputBase
            sx={{ height: "100%", width: "100%" }}
            placeholder="Search for anything"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Link to="/user-management/create-user">
          <Button
            variant="contained"
            size="medium"
            sx={{
              width: "15%",
              padding: "10px",
              fontSize: "13px",
              borderRadius: "25px",
              margin: "0px 10px",
              height: "35px",
            }}
          >
            <Icon>person</Icon>
            Create User
          </Button>
        </Link>
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </>
  );
}
