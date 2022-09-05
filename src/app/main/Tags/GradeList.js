/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
import { memo, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TablePagination, Tooltip } from "@material-ui/core";
import {
  DeleteSweep as DeleteIcon,
  BorderColor as EditIcon,
} from "@material-ui/icons";
import { useHistory, Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useStateValue } from "app/services/state/State";
import {
  dataGridPageSizes,
  settings as s,
  states,
} from "app/services/Settings";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@mui/material/Typography";
import swal from "sweetalert";
import { CustomToolbar } from "../../components";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "1.2rem",
    backgroundColor: theme.palette.background.paper,
    padding: 20,
  },

  icon: {
    color: "grey",
    cursor: "pointer",
  },
  row: {
    display: "flex",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  "& .MuiDataGrid-cell": {
    fontSize: "16px",
  },
  "& .MuiDataGrid-root": {
    fontSize: "16px",
  },
}));

function GradeList({ page, loading }) {
  const history = useHistory();
  const classes = useStyles();
  const anchorRef = useRef(null);
  const [{ user, patients, defaultPageSize, organization }, dispatch] =
    useStateValue();
  const [open, setOpen] = useState(false);

  async function onArchiveGrade(Id) {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to archive this User?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        handleArchiveUser(Id);
      }
    });
  }
  const redirectTo = async (goTo) => {
    try {
      history.push(goTo);
    } catch (err) {
      // console.log(err);
    }
  };

  async function handleArchiveUser(Id) {}

  const handleChangePage = async (event, newPage) => {};

  function handleChangeRowsPerPage(event) {}

  const columns = [
    { field: "gradeName", headerName: "Grade Name", flex: 1 },
    { field: "createdBy", headerName: "Created By" },
    {
      field: "status",
      headerName: "Status",

      renderCell: (params) => (
        <>
          {params.row.status === "inActive" ? (
            <span
              style={{
                color: "white",
                background: "red",
                borderRadius: " 50%",
                height: "24px",
                width: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon>close</Icon>
            </span>
          ) : (
            <span
              style={{
                color: "white",
                background: "#0bbf0b",
                borderRadius: " 50%",
                height: "24px",
                width: "24px",
              }}
            >
              <Icon>checkcirclerounded</Icon>
            </span>
          )}
        </>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <Link>
              <EditIcon style={{ marginLeft: 5 }} className={classes.icon} />
            </Link>
          </Tooltip>
          <Tooltip title="Archive">
            <DeleteIcon
              className={classes.icon}
              style={{ marginLeft: 5 }}
              onClick={() => onArchiveGrade(params.id)}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      gradeName: "Class 8",
      createdBy: "Ranjith Pattu",
      status: "active",
    },
    {
      id: 2,
      gradeName: "Class 9",
      createdBy: "Ranjith Pattu",
      status: "inActive",
    },
    {
      id: 3,
      gradeName: "Class 8",
      createdBy: "Ranjith Pattu",
      status: "active",
    },
    {
      id: 4,
      gradeName: "Class 7",
      createdBy: "Ranjith Pattu",
      status: "active",
    },
    {
      id: 5,
      gradeName: "Class 9",
      createdBy: "Ranjith Pattu",
      status: "active",
    },
    {
      id: 6,
      gradeName: "Class 6",
      createdBy: "Ranjith Pattu",
      status: "active",
    },
    {
      id: 7,
      gradeName: "Class 9",
      createdBy: "Ranjith Pattu",
      status: "inActive",
    },
    {
      id: 8,
      gradeName: "Class 8",
      createdBy: "Ranjith Pattu",
      status: "inActive",
    },
    {
      id: 9,
      gradeName: "Class 7",
      createdBy: "Ranjith Pattu",
      status: "active",
    },
  ];

  return (
    <>
      <div className={classes.root}>
        {loading && (
          <div className="flex justify-center flex-col items-center py-12">
            <Typography
              variant="body1"
              gutterBottom
              color="textSecondary"
              align="center"
            >
              Loading...
            </Typography>
            <CircularProgress
              className="w-192 sm:w-320 max-w-full rounded-2"
              color="secondary"
            />
          </div>
        )}
        {rows ? (
          <DataGrid
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                border: "none",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontSize: "14px",
                fontWeight: "600",
                color: "#189AF5",
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                fontSize: "12px",
                border: "none",
              },
            }}
            rows={rows}
            page={page}
            hideFooter
            columns={columns}
            components={{
              Toolbar: () => <CustomToolbar />,
            }}
            checkboxSelection
            hideFooterRowCount
            hideFooterPagination
            style={{ height: "70vh", border: "none", boxSizing: "unset" }}
            pageSize={defaultPageSize}
            hideFooterSelectedRowCount
            rowCount={10 /* pagination.totalItemsCount */}
            rowsPerPageOptions={dataGridPageSizes}
          />
        ) : (
          ""
        )}
        <TablePagination
          page={page}
          component="div"
          rowsPerPage={defaultPageSize}
          onPageChange={handleChangePage}
          count={100 /* pagination.totalItemsCount */}
          className="flex-shrink-0 border-t-1"
          rowsPerPageOptions={dataGridPageSizes}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
        />
      </div>
    </>
  );
}

export default memo(GradeList);
