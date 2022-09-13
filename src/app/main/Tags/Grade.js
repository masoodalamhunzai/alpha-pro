import { useEffect, useState } from "react";
// import DemoContent from "@fuse/core/DemoContent";
import FusePageSimple from "@fuse/core/FusePageSimple";
import Typography from "@mui/material/Typography";
import { useStateValue } from "app/services/state/State";
import { actions } from "app/services/state/Reducer";
import { useLocation } from "react-router-dom";
import { ThemeProvider, useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { Add as AddIcon } from "@material-ui/icons";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router";
import Breadcrumb from "../../fuse-layouts/shared-components/Breadcrumbs";
import GradeList from "./GradeList";
import { getAllGrades } from "app/services/api/ApiManager";

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
    },
    "& .MuiInputLabel-root": {
      fontSize: "1.4rem",
      left: "-4px",
      top: "-5px",
    },
  },
});
const Grade = () => {
  const [{ user, grades }, dispatch] = useStateValue();
  const location = useLocation();
  const history = useHistory();
  const pageTitle = location.pathname
    .split("/")
    .filter((x) => x)
    .pop()
    .split("-")
    .join(" ");

  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const theme = useTheme();
  const [page, setPage] = useState(0);

  const redirectTo = async (goTo) => {
    try {
      history.push(goTo);
    } catch (err) {
      // console.log(err);
    }
  };
  const handleGetGrade = async () => {
    const res = await getAllGrades(user);
    if (res && res.status === 200 && res.data) {
      setLoading(false);
      dispatch({
        type: actions.SET_GRADES,
        payload: res.data,
      });
    }
  };

  useEffect(() => {
    handleGetGrade();
  }, []);
  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <div className="p-24">
          <Breadcrumb />
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              color: "#000",
              fontWeight: 700,
              mt: 2,
              textTransform: "capitalize",
            }}
          >
            {pageTitle}
          </Typography>
          <Button
            variant="contained"
            style={{ float: "right" }}
            color="secondary"
            aria-label="Send Message"
            startIcon={<AddIcon />}
            onClick={() => redirectTo("/create-grade")}
          >
            Create New
          </Button>
        </div>
      }
      content={
        <div className="p-24">
          {/*start*/}
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
            </div>
          </div>
          {/*end*/}
          <GradeList
            page={page}
            setPage={setPage}
            loading={loading}
            grades={grades}
          />
        </div>
      }
    />
  );
};

export default Grade;
