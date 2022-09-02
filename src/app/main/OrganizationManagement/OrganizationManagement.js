import { useState } from "react";
import FusePageSimple from "@fuse/core/FusePageSimple";
import Typography from "@mui/material/Typography";
import { makeStyles, ThemeProvider, useTheme } from "@material-ui/core/styles";
import { useStateValue } from "app/services/state/State";
import { actions } from "app/services/state/Reducer";
import { useLocation } from "react-router-dom";
import { Add as AddIcon } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router";
import Breadcrumb from "../../fuse-layouts/shared-components/Breadcrumbs";
import { searchOrganizations } from "app/services/api/ApiManager";
import OrganizationsList from "./OrganizationsList";

const useStyles = makeStyles({
  layoutRoot: {},
});

const OrganizationManagement = () => {
  const location = useLocation();
  const history = useHistory();
  const pageTitle = location.pathname
    .split("/")
    .filter((x) => x)[0]
    .split("-")
    .join(" ");
  const classes = useStyles();
  const [{ user, news }, dispatch] = useStateValue();
  const [count, setCount] = useState(0);
  const theme = useTheme();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);

  function handleSearch(event) {
    setSearchText(event.target.value);
  }
  const setNews = async () => {
    dispatch({
      type: actions.SET_NEWS,
      payload: { header: "new header text", des: "new description text" },
    });
  };
  const redirectTo = async (goTo) => {
    try {
      history.push(goTo);
    } catch (err) {
      // console.log(err);
    }
  };
  const handleSearchOrganizations = async () => {
    if (searchText?.length === 0) {
      return false;
    }
    const res = await searchOrganizations(searchText, user);
    if (res && res.status === 200 && res.data) {
      dispatch({
        type: actions.SET_SEARCH_ORGANIZATION,
        payload: res.data,
      });
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 70 },
    { field: "contactperson", headerName: "Contact Person", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    {
      field: "phonenumber",
      headerName: "Phone Number",
      width: 90,
    },
    {
      field: "address",
      headerName: "Address",
      description: "",
      sortable: false,
      width: 160,
    },
  ];

  const rows = [
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
      phonenumber: "123123",
      address: "test address",
    },
    {
      id: 3,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "123123",
      address: "test address",
    },
    {
      id: 4,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "123123",
      address: "test address",
    },
    {
      id: 5,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "123123",
      address: "test address",
    },
    {
      id: 6,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "123123",
      address: "test address",
    },
    {
      id: 7,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "123123",
      address: "test address",
    },
    {
      id: 8,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "123123",
      address: "test address",
    },
    {
      id: 9,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "123123",
      address: "test address",
    },
  ];

  /* useEffect(() => {
    setCount(1);
  }, []);
  useEffect(() => {
    setNews();
  }, [count]); */

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
            onClick={() => redirectTo("/manage-organization")}
            startIcon={<AddIcon />}
          >
            Create Organization
          </Button>
        </div>
      }
      content={
        <div className="p-24">
          {/* start */}

          <div className="flex flex-wrap flex-1 items-center justify-between mb-10 p-8">
            <div className="flex flex-col w-full sm:w-auto" />

            <div className="flex flex-1 items-center justify-end w-full sm:w-auto sm:px-12">
              <ThemeProvider theme={theme}>
                <Paper className="flex items-center min-w-full sm:min-w-0 w-full max-w-512 px-12 py-4 rounded-16 shdaow">
                  <Icon color="action">search</Icon>
                  <Input
                    placeholder="Search..."
                    className="flex flex-1 px-8"
                    disableUnderline
                    fullWidth
                    value={searchText}
                    onChange={handleSearch}
                    inputProps={{
                      "aria-label": "Search",
                    }}
                  />
                </Paper>
              </ThemeProvider>
            </div>
            <div className="flex items-center justify-end -mx-4 mt-24 md:mt-0">
              <Button
                variant="contained"
                color="secondary"
                aria-label="Send Message"
                onClick={handleSearchOrganizations}
              >
                Search
              </Button>
            </div>
          </div>

          {/* end */}

          <OrganizationsList page={page} setPage={setPage} />
        </div>
      }
    />
  );
};

export default OrganizationManagement;
