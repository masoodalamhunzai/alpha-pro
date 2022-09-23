import {
  CheckCircle as CheckIcon,
  DeleteSweep as DeleteIcon,
  BorderColor as EditIcon,
  LocalOffer as TagIcon,
} from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { TablePagination, Tooltip } from "@material-ui/core";
import { deleteItem, getItems } from "app/services/api/ApiManager";
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
import CircularProgress from "@material-ui/core/CircularProgress";
import { memo, useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import FuseLoading from "@fuse/core/FuseLoading";
import { dataGridPageSizes } from "app/services/Settings";
import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert";
import { useSnackbar } from "notistack";
// import { DataGrid } from '@material-ui/data-grid';
import { useStateValue } from "app/services/state/State";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "app/store/alpha/itemReducer";
import { CustomToolbar } from "../../components";
import _ from '@lodash';

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

function ItemList({ page, setPage, pageSize, setPageSize }) {
  const dispatch = useDispatch();
  const items = useSelector(({ alpha }) => alpha.item.items);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector(({ alpha }) => alpha.user);
  const { enqueueSnackbar } = useSnackbar();
  const anchorRef = useRef(null);
  const [organizationId, setOrganizationId] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [{ defaultPageSize }] = useStateValue();
  const [open, setOpen] = useState(false);
  // const { payload: organizationsListList, pagination } = organizations;
  const [pagination, setPagination] = useState([]);

  async function onArchiveOrganization(id) {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this Organization?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        handleArchiveOrganization(id);
      }
    });
  }

  async function handleArchiveOrganization(id) {
    deleteItem(id)
      .then((res) => {
        console.log("res for delete", res);
      })
      .catch((err) => {
        console.error("error", err);
      });
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

  const showOrganizationDetail = (id) => {};

  async function handleEditOrganization(Id) {
    //
  }

  const handleChangePage = async (event, newPage) => {
    loadItems(newPage + 1, pageSize);
    setPage(newPage);
  };

  function handleChangeRowsPerPage(event) {
    loadItems(0, +event.target.value);
    setPage(0);
    setRowsPerPage(+event.target.value);
    setPageSize(+event.target.value);
  }

  const loadItems = async (page = 1, pageSize = 10) => {
    setLoading(true);
    const res = await getItems(page, pageSize);
    if (res && res.status === 200 && res.data) {
      dispatch(setItems(res.data));
    }
    setLoading(false);
  };
  useEffect(() => {
    if (!items) {
      loadItems(1, 10);
    }
  }, []);

  const columns = [
    { field: "title", headerName: "Item Name", flex: 1 },
    { field: "type", headerName: "Scoring Type", flex: 0.5,
    renderCell: (params) => (
        <div
          style={{
            height: "100%",
          }}
          className="flex items-center"
        >
          <text>{params.row.type && _.startCase(_.toLower(params.row.type))}</text>
        </div>  
    ),
   },
    { field: "createdby", headerName: "Created By", flex: 0.5 },
    {
      field: "tagsCount",
      headerName: "Tag",
      flex: 0.3,
      renderCell: (params) => (
        <div
          onClick={() => {
            var text = "";
            const tagArray =
              params.row.tag.length == 0 ? [] : JSON.parse(params.row.tag);
            tagArray &&
              Array.isArray(tagArray) &&
              tagArray.map(
                (t) => (text = text == "" ? t.title : text + ", " + t.title)
              );
            swal(text != "" ? text : "No tag found!");
          }}
          style={{
            width: "100%",
            height: "98%",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              height: "100%",
            }}
            className="flex items-center"
          >
            <text>{params.row.tagsCount==0?"No tag found":params.row.tagsCount}</text>
          </div>
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.3,
      renderCell: (params) => (
        <div
          className="flex wrap flex-wrap"
          style={{ paddingTop: "3px", paddingBottom: "2px" }}
        >
          <CheckIcon
            style={{ marginLeft: 2, color: "green", fill: "green" }}
            className={classes.icon}
          />
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 0.3,
      renderCell: (params) => (
        <>
          {/* <Tooltip title="View">
            <VisibilityRoundedIcon
              className={classes.icon}
              onClick={() => showOrganizationDetail(params.id)}
            />
          </Tooltip> */}
          <Link
            to={{
              pathname: "/create-new-question",
              state: {
                itemIdProps: params.id,
                itemuuIdProps: params.row.itemId,
                mode: "edit-item",
              },
            }}
          >
            <Tooltip title="Edit">
              <EditIcon
                style={{ marginLeft: 5 }}
                className={classes.icon}
                onClick={() => handleEditOrganization(params.id)}
              />
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
    items &&
    items.data &&
    items.data.map((org, index) => {
      return {
        id: org.id,
        itemId: org.itemId,
        title: org.title,
        type: org.scoringType,
        createdby:
          org.created_by &&
          (org.created_by.firstName && org.created_by.firstName) +
            " " +
            (org.created_by.lastName && org.created_by.lastName),
        tag: org.tags && org.tags.length > 0 ? org.tags : [], //['Grade 1', 'Mathematics', 'aritficial Intelligence'],
        tagsCount:
          org.tags && org.tags.length > 0 ? JSON.parse(org.tags).length : 0,
        status: org.status,
        description: org.description,
        created_at: org.created_at,
        updated_at: org.updated_at,
      };
    });
  return (
    <>
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
      <div className={classes.root}>
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
          count={items && items.total ? items.total : 0}
          className="flex-shrink-0 border-t-1"
          rowsPerPageOptions={dataGridPageSizes}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
        />
        {/*
      it is because if we need to change loading type
      {loading && (
          <div className={classes.progress} align="center">
            <FuseLoading />
          </div>
        )} */}
      </div>
    </>
  );
}

export default memo(ItemList);
