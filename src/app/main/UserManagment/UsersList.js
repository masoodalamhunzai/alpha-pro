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
import FuseLoading from "@fuse/core/FuseLoading";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@mui/material/Typography";
// import { actions } from "app/services/state/Reducer";
import { useSnackbar } from "notistack";
import swal from "sweetalert";
// import moment from "moment";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import EditUser from "./EditUser";
import { CustomToolbar } from "../../components";
import {
  getOrganizationUsers,
  getOrganizations,
} from "app/services/api/ApiManager";

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
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    padding: "10px",
    textAlign: "center",
  },
}));

function UsersList({ page, loading, organizationUsers }) {
  const history = useHistory();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const anchorRef = useRef(null);
  const [userId, setUserId] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [{ user, patients, defaultPageSize, organization }, dispatch] =
    useStateValue();
  const [usersList, setUsersList] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      // console.log(err);
    }
  };

  async function handleArchiveUser(Id) {}

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
  async function handleRestoreUser(Id) {}

  // const showUserDetail = (id) => {};

  // async function handleEditUser(Id) {}

  const handleChangePage = async (event, newPage) => {};

  function handleChangeRowsPerPage(event) {}

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email/username", flex: 1 },
    { field: "phonenumber", headerName: "Mobile Phone", flex: 1 },
    { field: "organization", headerName: "Organization", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <>
          {" "}
          <span
            style={{
              color: params.row.status === "inActive" ? "red" : "green",
            }}
          >
            {params.row.status}
          </span>
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
                state: { editData: params?.row },
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

  const rows = organizationUsers?.map((user) => {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phonenumber: "",
      organization: "",
      status: "",
    };
  });

  return (
    <>
      <div className={classes.root}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes.modalStyle}>
            <EditUser setOpen={setOpen} />
          </Box>
        </Modal>
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

export default memo(UsersList);
