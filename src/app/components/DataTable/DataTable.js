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
  { field: "emailUserName", headerName: "Email / Username", width: 170 },
  {
    field: "mobilephone",
    headerName: "Mobile Phone",
    type: "number",
    width: 130,
  },
  { field: "organization", headerName: "Organziation", width: 150 },
  { field: "status", headerName: "Status", width: 150 },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];

const rows = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    emailUserName: "snowjon@gmail.com",
    mobilephone: 35231234,
    organization: "eAlpha",
    status: "Active",
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    emailUserName: "Cersei@gmail.com",
    mobilephone: 42345231,
    organization: "Codota",
    status: "Active",
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    emailUserName: "Jamie@gmail.com",
    mobilephone: 43432452,
    organization: "eAlpha",
    status: "Active",
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    emailUserName: "Arya@gmail.com",
    mobilephone: 34523423,
    organization: "Codota",
    status: "Inactive",
  },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    emailUserName: "Daenerys@gmail.com",
    mobilephone: null,
    organization: "eAlpha",
    status: "Inactive",
  },
  {
    id: 6,
    lastName: "Sandre",
    firstName: "Meli",
    emailUserName: "sandre@gmail.com",
    mobilephone: 15025324,
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    emailUserName: "Ferrara@gmail.com",
    mobilephone: 44245234,
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    emailUserName: "Rossini@gmail.com",
    mobilephone: 36345234,
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    emailUserName: "Harvey@gmail.com",
    mobilephone: 65245345,
  },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  margin: "0px 10px",
  height: "35px",
  borderRadius: "25px",
  marginLeft: 0,
  textAling: "end",
  background: "white",
  width: "50%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "50%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(5)})`,
    transition: theme.transitions.create("width"),
    fontSize: "14px",
    width: "100%",
    height: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100%",
      height: "100%",
    },
  },
}));

export default function DataTable() {
  const styles = {
    "&.MuiInputBase-input": {
      cursor: "pointer",
    },
  };
  const statusStyle = rows.map((row) => {
    if (row.status == "Active") {
      return {
        "& .MuiDataGrid-cellContent": {
          color: "red",
        },
      };
    } else {
      return {
        "& .MuiDataGrid-cellContent": {
          color: "black",
        },
      };
    }
  });
  console.log(statusStyle, "statusStyle");
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
      <div
        style={{
          height: 400,
          width: "100%",
        }}
      >
        <DataGrid
          sx={{
            ...statusStyle,
            fontSize: "14px",
            "& .MuiDataGrid-columnHeaderTitle": {
              color: "royalblue",
              fontSize: "15px",
            },
          }}
          rows={rows}
          columns={columns}
          pmobilephoneSize={5}
          rowsPerPmobilephoneOptions={[5]}
          checkboxSelection
        />
      </div>
    </>
  );
}
