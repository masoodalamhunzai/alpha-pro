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
import { useHistory, Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
// import { DataGrid } from '@material-ui/data-grid';
import { dataGridPageSizes } from "app/services/Settings";
import FuseLoading from "@fuse/core/FuseLoading";
import { useSnackbar } from "notistack";
import swal from "sweetalert";
import { getOrganizations } from "app/services/api/ApiManager";
import ViewModal from "app/main/OrganizationManagement/ViewModal";
import { useDispatch, useSelector } from "react-redux";
import { setOrgs } from "app/store/alpha/orgReducer";
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
  pageSize,
  setPageSize,
  loading,
  setLoading,
  fetchOrganizations,
}) {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.alpha.user);
  const organizations = useSelector(({ alpha }) => alpha.org.orgs);
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const anchorRef = useRef(null);
  const [organizationId, setOrganizationId] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(0);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [organizationDetailsView, setOrganizationDetailsView] = useState(null);
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

  async function handleArchiveOrganization(Id) {
    //
  }

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

  async function handleRestoreOrganization(Id) {
    //
  }

  const handleModalClose = () => setOpenViewModal(false);

  const showOrganizationDetail = (details) => {
    setOrganizationDetailsView(details);
    setOpenViewModal(true);
  };

  async function handleEditOrganization(Id) {
    console.log(Id, "eidt");
  }

  const handleChangePage = async (event, newPage) => {
    loadOrganizations(newPage + 1, pageSize);
    setPage(newPage);
  };

  function handleChangeRowsPerPage(event) {
    loadOrganizations(page, +event.target.value);
    setRowsPerPage(+event.target.value);
    // setPage(0);
    setPageSize(+event.target.value);
  }

  const loadOrganizations = async (page = 1, items = 10) => {
    const res = await getOrganizations(page, items);
    if (res) {
      dispatch(setOrgs(res));
    }
  };

  useEffect(() => {
    if (!organizations) {
      loadOrganizations(1, 10);
    }
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
              onClick={() => showOrganizationDetail(params.row)}
            />
          </Tooltip>

          <Link
            to={{
              pathname: "/manage-organization",
              state: {
                editData: params?.row,
                mode: "edit-org",
              },
            }}
          >
            <Tooltip title="Edit">
              <EditIcon style={{ marginLeft: 5 }} className={classes.icon} />
            </Tooltip>
          </Link>
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
    organizations &&
    organizations.data &&
    organizations.data.map((org) => {
      return {
        id: org.id,
        name: org.name,
        contactperson: org.contactFullName,
        email: org.contactEmail,
        phonenumber: org.contactNumber,
        address: org.description,
        country: org.country,
        state: org.state,
        city: org.city,
        website: org.website,
        isActive: org.isActive,
        created_at: org.created_at,
      };
    });

  return (
    <>
      <div className={classes.root}>
        {openViewModal && (
          <ViewModal
            handleClose={handleModalClose}
            open={openViewModal}
            organization={organizationDetailsView}
          />
        )}
        {rows && (
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
        )}
        <TablePagination
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          count={organizations && organizations.total ? organizations.total : 0}
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
