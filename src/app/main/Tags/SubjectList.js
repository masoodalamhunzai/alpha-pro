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
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@mui/material/Typography";
import swal from "sweetalert";
import StatusIcon from "app/shared-components/StatusIcon";
import { deleteSubject } from "app/services/api/ApiManager";
import { CustomToolbar } from "../../components";

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

function SubjectList({ page, loading, subjects }) {
  const history = useHistory();
  const classes = useStyles();
  const [{ user, defaultPageSize }, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);

  const redirectTo = async (goTo) => {
    try {
      history.push(goTo);
    } catch (err) {
      // console.log(err);
    }
  };
  async function onArchiveSubject(id) {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to archive this subject?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await deleteSubject(id, user);
        if (res && res.data && res.data.status === "success") {
          swal({
            title: "Good job!",
            text: "subject archive successfully!",
            icon: "success",
            button: "Ok!",
          }).then((value) => {
            redirectTo("/subject");
          });
        }
      }
    });
  }

  async function handleArchiveUser(Id) {}

  const handleChangePage = async (event, newPage) => {};

  function handleChangeRowsPerPage(event) {}

  const columns = [
    { field: "sNo", headerName: "ID", flex: 1 },
    { field: "subject", headerName: "Subject", flex: 1 },
    { field: "grade", headerName: "Grade", flex: 1 },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   headerAlign: "center",
    //   align: "center",

    //   renderCell: (params) => (
    //     <>
    //       {params.row.status === "inActive" ? (
    //         <StatusIcon isActive={params?.row?.status} />
    //       ) : (
    //         <StatusIcon isActive={params?.row?.status} />
    //       )}
    //     </>
    //   ),
    // },
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
                pathname: "/edit-subject",
                state: {
                  editData: params?.row,
                  mode: "edit-subject",
                },
              }}
            >
              <EditIcon style={{ marginLeft: 5 }} className={classes.icon} />
            </Link>
          </Tooltip>
          <Tooltip title="Archive">
            <DeleteIcon
              className={classes.icon}
              style={{ marginLeft: 5 }}
              onClick={() => onArchiveSubject(params?.id)}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  const rows = subjects?.map((subject, id) => {
    return {
      sNo: id + 1,
      id: subject?.id,
      gradeId: subject?.gradeId,
      subject: subject?.title,
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

export default memo(SubjectList);
