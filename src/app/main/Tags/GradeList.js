/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
import { memo, useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TablePagination, Tooltip } from "@material-ui/core";
import {
  DeleteSweep as DeleteIcon,
  BorderColor as EditIcon,
} from "@material-ui/icons";
import { useHistory, Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { dataGridPageSizes } from "app/services/Settings";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@mui/material/Typography";
import swal from "sweetalert";
import { deleteGrade, getAllGrades } from "app/services/api/ApiManager";
import { useDispatch, useSelector } from "react-redux";
import { setGrade } from "app/store/alpha/gradesReducer";
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

function GradeList({
  page,
  setPage,
  loading,
  setLoading,
  pageSize,
  setPageSize,
}) {
  const dispatch = useDispatch();
  const grades = useSelector(({ alpha }) => alpha.grades.grade);
  const history = useHistory();
  const classes = useStyles();
  const anchorRef = useRef(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [rowCount, setRowCount] = useState(1);
  const [open, setOpen] = useState(false);

  const handleGetGrade = async (page = 1, pageSize = 10) => {
    setLoading(true);
    const res = await getAllGrades(page, pageSize);
    if (res && res.data) {
      dispatch(setGrade(res));
    }
    setLoading(false);
  };

  const redirectTo = async (goTo) => {
    try {
      history.push(goTo);
    } catch (err) {}
  };

  async function onArchiveGrade(id) {
    swal({
      title: "Are you sure?",
      text: "Are you sure yo u want to arc hi ve this grade?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await deleteGrade(id);
        if (res?.status === "success") {
          swal({
            title: "Good job!",
            text: "grade archive successfully!",
            icon: "success",
            button: "Ok!",
          }).then((value) => {
            redirectTo("/grade");
          });
        }
      }
    });
  }

  async function handleArchiveUser(Id) {}

  const handleChangePage = async (event, newPage) => {
    handleGetGrade(newPage + 1, pageSize);
    setPage(newPage);
    setRowCount(newPage);
  };

  function handleChangeRowsPerPage(event) {
    handleGetGrade(1, +event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(0);
    setPageSize(+event.target.value);
  }
  const columns = [
    { field: "title", headerName: "Grade Name", flex: 1 },
    { field: "createAt", headerName: "Created At", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <Link
              to={{
                pathname: "/edit-grade",
                state: {
                  editData: params?.row,
                  mode: "edit-grade",
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
              onClick={() => onArchiveGrade(params.id)}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  const rows = grades?.data?.map((grade, id) => {
    const createdAt = new Date(grade?.created_at);
    return {
      id: grade?.id,
      title: grade?.title,
      description: grade?.description,
      org_search_key: grade?.org_search_key,
      curriculumId: grade?.curriculumId,
      createAt: createdAt.toLocaleString("en-US"),
    };
  });

  useEffect(() => {
    if (!grades) {
      handleGetGrade(1, pageSize);
    }
  }, []);

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
            checkboxSelection
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
          count={
            grades && grades.total
              ? grades.total
              : 0 /* rowCount /* pagination.totalItemsCount */
          }
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
