import { useState } from "react";
// import DemoContent from "@fuse/core/DemoContent";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { ThemeProvider, useTheme, makeStyles } from "@material-ui/core/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Header from "app/shared-components/Header";
import { getAllGrades } from "app/services/api/ApiManager";
import { useDispatch, useSelector } from "react-redux";
import { setGrade } from "app/store/alpha/gradesReducer";
import GradeList from "./GradeList";

const useStyles = makeStyles({
  layoutRoot: {
    fontSize: "1.5rem",
    "& .MuiFormControlLabel-label": {
      fontSize: "1.2rem",
      margin: "1rem 0",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "1.6rem",
    },
    "& .MuiInputBase-input": {
      textAlign: "start",
      borderRadius: "1.6rem",
      backgroundColor: "#fff",
    },
    "& .MuiInputLabel-root": {
      fontSize: "1.4rem",
      left: "-4px",
      top: "-5px",
    },
  },
  refreshButton: {
    backgroundColor: "#0d870d",
    color: "white",
    padding: "0.5rem 3rem",
    display: "flex",
    justifyContent: "center",
    marginLeft: "1rem",
  },
});
const Grade = () => {
  const dispatch = useDispatch();
  const grades = useSelector(({ alpha }) => alpha.grades.grade);

  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handleGetGrade = async (page = 1, pageSize = 10) => {
    setLoading(true);
    const res = await getAllGrades(page, pageSize);
    if (res && res.data) {
      dispatch(setGrade(res));
    }
    setLoading(false);
  };

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <Header
          redirectTo={{
            pathname: "create-grade",
            state: { data: "", mode: "" },
          }}
          buttonTitle="create new"
        />
      }
      content={
        <div className="p-24">
          {/* start */}
          <div className="flex flex-wrap flex-1 items-center justify-between mb-10 p-8">
            <div className="flex flex-1 items-center w-full sm:w-auto sm:px-6 mx-4">
              <ThemeProvider theme={theme}>
                <Paper className="flex items-center min-w-full sm:min-w-0 w-full px-12 py-4 rounded-16 shadow">
                  <Icon color="action">search</Icon>
                  <Input
                    placeholder="Search..."
                    className="flex flex-1 px-8"
                    disableUnderline
                    fullWidth
                    inputProps={{
                      "aria-label": "Search",
                    }}
                  />
                </Paper>
              </ThemeProvider>
            </div>
            <div className="flex w-1/6 mx-10 sm:min-w-0 justify-center rounded-16 bg-transparent">
              <FormControl sx={{ width: "100%" }} size="small">
                <InputLabel id="grade-status">Status</InputLabel>
                <Select
                  labelId="grade-status"
                  id="gradeDropdown"
                  label="Status"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">InActive</MenuItem>
                  <MenuItem value="idle">Idle</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="flex items-center justify-end -mx-4 md:mt-0">
              <Button
                variant="contained"
                color="secondary"
                aria-label="Send Message"
              >
                Search
              </Button>
              <Button
                variant="contained"
                className={classes.refreshButton}
                onClick={() => {
                  setPage(0);
                  handleGetGrade(1, pageSize);
                }}
              >
                <Icon
                  color="white"
                  style={{
                    marginRight: "0.6rem",
                    fontSize: "1.6rem",
                  }}
                >
                  refresh
                </Icon>{" "}
                Refresh
              </Button>
            </div>
          </div>
          {/* end */}
          <GradeList
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      }
    />
  );
};

export default Grade;
