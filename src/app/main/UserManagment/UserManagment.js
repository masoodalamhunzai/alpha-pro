import { Link, useHistory, useLocation } from "react-router-dom";
import { ThemeProvider, makeStyles, useTheme } from "@material-ui/core/styles";
import {
  getOrganizationUsers,
  getOrganizations,
  searchOrganizationUser,
} from "app/services/api/ApiManager";
import { useEffect, useState } from "react";

import { Add as AddIcon } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import FormControl from "@mui/material/FormControl";
// import DemoContent from "@fuse/core/DemoContent";
import FusePageSimple from "@fuse/core/FusePageSimple";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { actions } from "app/services/state/Reducer";
import { useStateValue } from "app/services/state/State";
import UsersList from "./UsersList";
import Breadcrumb from "../../fuse-layouts/shared-components/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { setOrgsNameList, setOrgUsers } from "app/store/alpha/orgReducer";
import { getUserRole } from "app/services/utils/utils";

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
      borderRadius: "1.6rem",
      textAlign: "start",
      backgroundColor: "#fff",
    },
    "& .MuiInputLabel-root": {
      fontSize: "1.4rem",
      left: "-4px",
      top: "-5px",
    },
  },
});
const UserManagment = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.alpha.user);
  const user = useSelector(({ alpha }) => alpha.user);
  const role = getUserRole(user);
  console.log("User is here: ", user);
  const organization = useSelector(({ alpha }) => alpha.org.orgsNameList);
  const organizationUsers = useSelector(({ alpha }) => alpha.org.orgUsers);
  const location = useLocation();
  const history = useHistory();
  const pageTitle = location.pathname
    .split("/")
    .filter((x) => x)
    .pop()
    .split("-")
    .join(" ");

  const classes = useStyles();
  const { _orgId } = location?.state ? location?.state : "";

  const [organizationSelected, setOrganizationSelected] = useState("");
  const [count, setCount] = useState(0);
  const theme = useTheme();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const USER_ROLE_SUPER_ADMIN = "super-admin";
  const USER_ROLE_CLIENT_ADMIN = "client-admin";

  function handleSearch(event) {
    setSearchText(event.target.value);
  }
  const handleChange = (e) => {
    const orgId = e.target.value;
    setOrganizationSelected(orgId);
    setPage(0);
    handleGetOrganizationUsers(orgId, 1, pageSize);
  };

  const handleGetOrganizationUsers = async (id, pageNo = 1, pageSize = 10) => {
    const res = await getOrganizationUsers(id, pageNo, pageSize);
    if (res && res.status === 200 && res.data) {
      console.log("res is:", res.data);
      dispatch(setOrgUsers(res.data));
    }
    setLoading(false);
  };

  const handleGetClientAdminOrgUsers = async () => {
    if (role === USER_ROLE_CLIENT_ADMIN) {
      const id = user?.user?.organizationId;
      await handleGetOrganizationUsers(id, page, pageSize);
    }
  };

  const handleSearchOrganizationUsers = async (page = 1, pageSize = 10) => {
    let res = null;
    const userRole = role;
    if (userRole === USER_ROLE_SUPER_ADMIN) {
      if (searchText.trim() === "") {
        handleGetOrganizationUsers(organizationSelected, page, pageSize);
      } else {
        res = await searchOrganizationUser(
          organizationSelected,
          searchText,
          page,
          pageSize
        );
      }
    } else if (userRole !== USER_ROLE_SUPER_ADMIN) {
      const id = user?.user?.organizationId;
      if (searchText.trim() === "") {
        handleGetOrganizationUsers(id, page, pageSize);
      } else {
        res = await searchOrganizationUser(id, searchText);
      }
    }
    if (res && res.status === 200 && res.data) {
      console.log("res is:", res.data);
      dispatch(setOrgUsers(res.data));
    }
  };

  const loadOrganizations = async () => {
    const res = await getOrganizations();
    console.log(res);
    if (res && res.status === 200 && res.data) {
      var list = [];
      res.data.data &&
        res.data.data.map((item) => {
          list.push({ id: item.id, name: item.name });
        });
      dispatch(setOrgsNameList(list));
    }
    setLoading(false);
  };

  useEffect(() => {
    loadOrganizations();
  }, []);

  useEffect(() => {
    handleGetClientAdminOrgUsers();
  });

  const handleChangePage = async (event, newPage) => {
    handleSearchOrganizationUsers(newPage + 1, pageSize);
    setPage(newPage);
  };

  function handleChangeRowsPerPage(event) {
    handleSearchOrganizationUsers(page, +event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(0);
    setPageSize(+event.target.value);
  }

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
          <Link
            to={{
              pathname: "/user-management/create-user",
              state: { selectedOrg: organizationSelected, mode: "create-user" },
            }}
          >
            <Button
              variant="contained"
              style={{ float: "right" }}
              color="secondary"
              aria-label="Send Message"
              startIcon={<AddIcon />}
            >
              Create User
            </Button>
          </Link>
        </div>
      }
      content={
        <div className="p-24">
          {/* start */}
          <div className="flex flex-wrap flex-1 items-center justify-between mb-10 p-8">
            {role && role === USER_ROLE_SUPER_ADMIN && (
              <div className="flex flex-1 w-full sm:w-auto ">
                <FormControl sx={{ width: "60%" }} size="small">
                  <InputLabel id="organization-dropdown">
                    Select Organization
                  </InputLabel>
                  <Select
                    labelId="organization-dropdown"
                    id="organizationDropdown"
                    value={
                      organizationSelected === ""
                        ? _orgId
                        : organizationSelected
                    }
                    label="organization"
                    onChange={handleChange}
                  >
                    {organization?.map((org) =>
                      _orgId === org?.id ? (
                        <MenuItem value={_orgId} key={_orgId}>
                          {org?.name}
                        </MenuItem>
                      ) : (
                        <MenuItem value={org?.id} key={org?.id}>
                          {org?.name}
                        </MenuItem>
                      )
                    )}
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
                onClick={() => handleSearchOrganizationUsers(1, pageSize)}
              >
                Search
              </Button>
            </div>
          </div>
          {/* end */}
          <UsersList
            page={page}
            setPage={setPage}
            loading={loading}
            organizationUsers={organizationUsers}
            organizationSelected={organizationSelected}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
      }
    />
  );
};

export default UserManagment;
