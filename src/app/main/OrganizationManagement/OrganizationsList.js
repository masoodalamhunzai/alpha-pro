/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
import { memo, useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TablePagination, Tooltip } from "@material-ui/core";
import {
  DeleteSweep as DeleteIcon,
  BorderColor as EditIcon,
  VisibilityRounded as VisibilityRoundedIcon,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
// import { DataGrid } from '@material-ui/data-grid';
import { useStateValue } from "app/services/state/State";
import { dataGridPageSizes } from "app/services/Settings";

import FuseLoading from "@fuse/core/FuseLoading";
import { actions } from "app/services/state/Reducer";
import { useSnackbar } from "notistack";
import swal from "sweetalert";
import { getOrganizations } from "app/services/api/ApiManager";
import { CustomToolbar } from "../../components";


const useStyles = makeStyles((theme) => ({
  root: {
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

function OrganizationsList({
  page,
  setPage,
  loading,
  setLoading,
  fetchOrganizations,
}) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const anchorRef = useRef(null);
  const [organizationId, setOrganizationId] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [{ user, organization, patients, defaultPageSize }, dispatch] =
    useStateValue();
  const [open, setOpen] = useState(false);
  // const { payload: organizationsListList, pagination } = organizations;
  const [pagination, setPagination] = useState([]);

  async function onArchiveOrganization(Id) {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to archive this Organization?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        handleArchiveOrganization(Id);
      }
    });
  }

  async function handleArchiveOrganization(Id) { }

  async function onRestoreOrganization(Id) {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to restore this Organization?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        handleRestoreOrganization(Id);
      }
    });
  }

  async function handleRestoreOrganization(Id) { }

  const showOrganizationDetail = (id) => { };


  async function handleEditOrganization(Id) { }

  const handleChangePage = async (event, newPage) => { };

  function handleChangeRowsPerPage(event) { }

  const loadOrganizations = async () => {
    const res = await getOrganizations(user);

    if (res && res.status == 200 && res.data && res.data.length > 0) {
      dispatch({
        type: actions.SET_ORGANIZATION,
        payload: res.data,
      });
    }
  };
  useEffect(() => {
    loadOrganizations();
  }, []);
  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "contactperson", headerName: "Contact Person", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "phonenumber", headerName: "Phone Number", flex: 0.5 },
    {
      field: "action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 0.3,
      renderCell: (params) => (

        <>
          <Tooltip title="View">
            <VisibilityRoundedIcon
              className={classes.icon}
              onClick={() => showOrganizationDetail(params.id)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <EditIcon
              style={{ marginLeft: 5 }}
              className={classes.icon}
              onClick={() => handleEditOrganization(params.id)}
            />
          </Tooltip>

          <Tooltip title="Archive">
            <DeleteIcon
              className={classes.icon}
              style={{ marginLeft: 5 }}
              onClick={() => onArchiveOrganization(params.id)}
            />
          </Tooltip>

        </>
      ),
    },
  ];

  const rows =
    organization &&
    organization.map((org) => {
      return {
        id: org.id,
        name: org.name,
        contactperson: org.contactFullName,
        email: org.contactEmail,
        phonenumber: org.contactNumber,
        address: org.description,
      };
    }); /*  [
    {
      id: 1,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "123123",
      address: "test address",
    },
    {
      id: 2,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "143123",
      address: "test address",
    },
    {
      id: 3,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "153123",
      address: "test address",
    },
    {
      id: 4,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "163123",
      address: "test address",
    },
    {
      id: 5,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "173123",
      address: "test address",
    },
    {
      id: 6,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "183123",
      address: "test address",
    },
    {
      id: 7,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "193123",
      address: "test address",
    },
    {
      id: 8,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "103123",
      address: "test address",
    },
    {
      id: 9,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "153123",
      address: "test address",
    },
>>>>>>> 160c28ed35c48271205b77ee68e1751cb5ad5fcd
  ];
 */
  return (
    <>
      {/*  <button
        onClick={() => {
          loadOrganizations();
        }}
      >
        Load Organizations
      </button> */}
      <div className={classes.root}>
        {rows && (
          <DataGrid
            sx={{
              "& .MuiDataGrid-columnHeaderTitle": {
                fontSize: "14px",
                fontWeight: "600",
              },
              "& .MuiDataGrid-cell": {
                fontSize: "12px",
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
            style={{ height: "70vh" }}
            pageSize={defaultPageSize}
            hideFooterSelectedRowCount
            rowCount={10 /* pagination.totalItemsCount */}
            rowsPerPageOptions={dataGridPageSizes}
          />
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
        {loading && (
          <div className={classes.progress} align="center">
            <FuseLoading />
          </div>
        )}
      </div>
    </>
  );
}

export default memo(OrganizationsList);
