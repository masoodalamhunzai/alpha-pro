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
import {
  getOrganizationUsers,
  getOrganizations,
  searchOrganizationUser,
} from "app/services/api/ApiManager";
import { useHistory } from "react-router";
import UsersList from "./UsersList";
import Breadcrumb from "../../fuse-layouts/shared-components/Breadcrumbs";

const useStyles = makeStyles({
  layoutRoot: {
    fontSize: "1.5rem",
    "& .MuiFormControlLabel-label": {
      fontSize: "1.2rem",
      margin: "1rem 0",
    },
    "& .MuiInputBase-input": {
      backgroundColor: "#fff",
      textAlign: "start",
    },
    "& .MuiInputLabel-root": {
      fontSize: "1.4rem",
      left: "-4px",
      top: "-5px",
    },
  },
});
const UserManagment = () => {
  const [
    { user, patients, defaultPageSize, organization, organizationUsers },
    dispatch,
  ] = useStateValue();
  const location = useLocation();
  const history = useHistory();
  const pageTitle = location.pathname
    .split("/")
    .filter((x) => x)
    .pop()
    .split("-")
    .join(" ");

  const classes = useStyles();
  const [organizationSelected, setOrganizationSelected] = useState("");
  const [count, setCount] = useState(0);
  const theme = useTheme();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const USER_ROLE_SUPER_ADMIN = "super-admin";
  const USER_ROLE_CLIENT_ADMIN = "client-admin";

  function handleSearch(event) {
    setSearchText(event.target.value);
  }
  const handleChange = (e) => {
    const orgId = e.target.value;
    setOrganizationSelected(orgId);
    handleGetOrganizationUsers(orgId);
  };
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
  const handleGetOrganizationUsers = async (id) => {
    const res = await getOrganizationUsers(id, user);
    if (res && res.status === 200 && res.data) {
      setLoading(false);
      dispatch({
        type: actions.SET_ORGANIZATION_USERS,
        payload: res.data,
      });
    }
  };
  const handleGetClientAdminOrgUsers = async () => {
    if (user && user.role && user?.role === USER_ROLE_CLIENT_ADMIN) {
      const { id } = user.organization;
      await handleGetOrganizationUsers(id);
    }
  };
  const handleSearchOrganizationUsers = async () => {
    if (searchText?.length === 0) {
      return false;
    }
    let res = null;
    let userRole = user && user.role && user?.role;
    if (userRole === USER_ROLE_SUPER_ADMIN) {
      res = await searchOrganizationUser(
        organizationSelected,
        user,
        searchText
      );
    } else if (userRole !== USER_ROLE_SUPER_ADMIN) {
      const { id } = user?.organization;
      res = await searchOrganizationUser(id, user, searchText);
    }
    if (res && res.status === 200 && res.data) {
      dispatch({
        type: actions.SET_SEARCH_ORGANIZATION_USERS,
        payload: res.data,
      });
    }
  };

  const loadOrganizations = async () => {
    const res = await getOrganizations(user);
    if (res && res.status === 200 && res.data && res.data.length > 0) {
      setLoading(false);
      dispatch({
        type: actions.SET_ORGANIZATION,
        payload: res.data,
      });
    }
  };

  useEffect(() => {
    loadOrganizations();
  }, []);

  useEffect(() => {
    handleGetClientAdminOrgUsers();
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
            onClick={() => redirectTo("/user-management/create-user")}
            startIcon={<AddIcon />}
          >
            Create User
          </Button>
        </div>
      }
      content={
        <div className="p-24">
          {/*start*/}
          <div className="flex flex-wrap flex-1 items-center justify-between mb-10 p-8">
            {user && user.role && user.role === USER_ROLE_SUPER_ADMIN && (
              <div className="flex flex-1 w-full sm:w-auto ">
                <FormControl sx={{ width: "60%" }} size="small">
                  <InputLabel id="organization-dropdown">
                    Select Organization
                  </InputLabel>
                  <Select
                    labelId="organization-dropdown"
                    id="organizationDropdown"
                    value={organizationSelected}
                    label="organization"
                    onChange={handleChange}
                  >
                    {organization?.map((org) => (
                      <MenuItem value={org?.id} key={org?.id}>
                        {org?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
            <div className="flex flex-1 items-center justify-end w-full sm:w-auto sm:px-6 mx-4">
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

            <div className="flex items-center justify-end -mx-4 md:mt-0">
              <Button
                variant="contained"
                color="secondary"
                aria-label="Send Message"
                onClick={handleSearchOrganizationUsers}
              >
                Search
              </Button>
            </div>
          </div>
          {/*end*/}
          <UsersList
            page={page}
            setPage={setPage}
            loading={loading}
            organizationUsers={organizationUsers}
          />
        </div>
      }
    />
  );
};

export default UserManagment;
