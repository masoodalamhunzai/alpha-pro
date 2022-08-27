import * as React from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@mui/material/InputBase";

export default function DataTable({ columns = [], rows = [] }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          padding: "20px 20px 40px 0px",
          "& .MuiInputBase-root": {
            width: "300px",
            fontSize: "17px",
            color: "black",
            borderRadius: "25px",
            padding: "0px 10px",
          },
        }}
      >
        <Search>
          <SearchIconWrapper>
            <IconButton>
              <Icon>search</Icon>
            </IconButton>
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
              width: "100%",
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
