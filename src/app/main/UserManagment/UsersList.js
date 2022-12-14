import {
  DeleteSweep as DeleteIcon,
  BorderColor as EditIcon,
} from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { TablePagination, Tooltip } from "@material-ui/core";
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
import { memo, useRef, useState } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
// import moment from "moment";
import StatusIcon from "app/shared-components/StatusIcon";
import Typography from "@mui/material/Typography";
import { dataGridPageSizes } from "app/services/Settings";
import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert";
// import { actions } from "app/services/state/Reducer";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";

import { CustomToolbar } from "../../components";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "1rem",
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
  types: {
    zIndex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    border: `1px solid ${theme.palette.background.default}`,
  },
  cardRow: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  rowLabel: {
    width: "40%",
    fontWeight: 500,
    fontSize: 16,
  },
  rowValue: {
    color: "#01619b",
    width: "60%",
    fontWeight: "bold",
    fontSize: 16,
  },
}));

function UsersList({
  page,
  setPage,
  loading,
  organizationUsers,
  organizationSelected,
  rowsPerPage,
  setRowsPerPage,
  pageSize,
  setPageSize,
  handleChangePage,
  handleChangeRowsPerPage,
}) {
  const history = useHistory();
  const classes = useStyles();
  const MODE = "edit-user";
  const { enqueueSnackbar } = useSnackbar();
  const anchorRef = useRef(null);
  const [userId, setUserId] = useState(0);
  // const [{ user, patients, defaultPageSize, organization }, dispatch] = useStateValue();
  const users = useSelector(({ alpha }) => alpha.org.orgUsers);
  const [usersList, setUsersList] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [open, setOpen] = useState(false);
  const [rowCount, setRowCount] = useState(1);

  async function onArchiveUser(Id) {
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
      console.error("error", err);
    }
  };

  async function handleArchiveUser(Id) {
    //
  }

  async function onRestoreUser(Id) {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to restore this User?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        handleRestoreUser(Id);
      }
    });
  }
  async function handleRestoreUser(Id) {
    //
  }

  /* const handleChangePage = async (event, newPage) => {
    setPage(newPage);
  };

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setPageSize(+event.target.value);
  } */

  const columns = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email/username", flex: 1 },
    { field: "roles", headerName: "Role", flex: 1 },
    { field: "phonenumber", headerName: "Mobile Phone", flex: 1 },
    {
      field: "isActive",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <>
          {params?.row?.isActive ? (
            <StatusIcon isActive={params?.row?.isActive} />
          ) : (
            <StatusIcon isActive={params?.row?.isActive} />
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
            <Link
              to={{
                pathname: "/user-management/edit-user",
                state: {
                  editData: params?.row,
                  selectedOrg: organizationSelected,
                  mode: MODE,
                },
              }}
            >
              <EditIcon
                style={{ marginLeft: 5 }}
                className={classes.icon}
                // onClick={() => redirectTo("/user-management/edit-user")}
              />
            </Link>
          </Tooltip>
          <Tooltip title="Archive">
            <DeleteIcon
              className={classes.icon}
              style={{ marginLeft: 5 }}
              onClick={() => onArchiveUser(params.id)}
            />
          </Tooltip>
        </>
      ),
    },
  ];
  const rows =
    users &&
    users.data &&
    Array.isArray(users.data) &&
    users.data.map((user) => {
      return {
        id: user?.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        isActive: user?.isActive,
        organizationId: user?.organizationId,
        roles: user && user.roles && user.roles[0].name,
        permissions: user && user.permissions ? user.permissions : [],
      };
    });

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
            hideFooter
            columns={columns}
            components={{
              Toolbar: () => <CustomToolbar />,
            }}
            hideFooterRowCount
            hideFooterPagination
            style={{ height: "70vh", border: "none", boxSizing: "unset" }}
            hideFooterSelectedRowCount
            pageSize={pageSize}
          />
        ) : (
          ""
        )}
        <TablePagination
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          count={users && users.total ? users.total : 0}
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

export default memo(UsersList);
