import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import { useStateValue } from "app/services/state/State";
import swal from "sweetalert";
import Box from "@mui/material/Box";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import { createOrganizationUser } from "app/services/api/ApiManager";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AddUserDetails from "./AddUserDetails/AddUserDetails";
import Permissions from "./Permissions/Permissions";
import Breadcrumb from "../../../fuse-layouts/shared-components/Breadcrumbs";

const useStyles = makeStyles({
  layoutRoot: {
    "& .MuiButton-root": {
      fontWeight: "700",
      borderRadius: "20px",
      margin: "0 2rem ",
      padding: "1rem 3rem",
      fontSize: "1.3rem",
      textTransform: "capitalize",
    },
  },
  cancelBtn: {
    "&.MuiButton-root": {
      backgroundColor: "gray",
      "&:hover": {
        backgroundColor: "black",
      },
    },
  },
  createBtn: {
    "& .MuiButton-root": {
      fontSize: "1.3rem",
    },
  },
});
const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    fontSize: "1.5rem",
    fontWeight: 600,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    marginRight: theme.spacing(1),
    color: "#1f8b1f",
    letterSpacing: 0,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#0e9f0e",
      fontWeight: 600,
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CreateUserTabs = () => {
  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();
  const pageTitle = location.pathname
    .split("/")
    .filter((x) => x)
    .pop()
    .split("-")
    .join(" ");

  const [tabValue, setTabValue] = useState(0);

  const [{ user }, dispatch] = useStateValue();
  const USER_ROLE_CLIENT_ADMIN = "client-admin";
  const USER_ROLE_SUPER_ADMIN = "super-admin";
  const EDIT_MODE = "edit-user";
  const CREATE_NEW_MODE = "create-user";

  const { editData, mode, selectedOrg } = location?.state
    ? location?.state
    : "";
  const organzationID = mode === EDIT_MODE ? selectedOrg : selectedOrg;
  const [formData, setFormData] = useState({
    email: editData?.email?.length > 0 ? editData?.email : "",
    firstName: editData?.firstName?.length > 0 ? editData?.firstName : "",
    lastName: editData?.lastName?.length > 0 ? editData?.lastName : "",
    phone: editData?.phoneNumber?.length > 0 ? editData?.phoneNumber : "",
    organizations: selectedOrg?.trim() !== "" ? selectedOrg : "",
    password: "",
    confirmPassword: "",
    userRoles: editData?.roles !== "" ? editData?.roles : "",
    isActive: editData?.isActive ? editData?.isActive : "",
  });
  const [permissions, setPermissions] = useState({
    alphaProd: false,
    alphaDev: false,
    bulkUpdateManager: false,
    activityManager: false,
    tagManager: false,
    tagHierarchyManager: false,
    roleUsers: false,
    accessEditProfile: false,
    roleAdmin: false,
    roleUser: false,
    managementAdmin: false,
    userManager: false,
    systemAdmin: false,
    insightAccess: false,
    authorSiteSettingManager: false,
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChangeInputs = (e) => {
    const { value } = e.target;
    const { name } = e.target;
    const { checked } = e.target;
    if (checked || !checked) {
      setFormData({ ...formData, [name]: checked || value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleChangePermissions = (e) => {
    const { value } = e.target;
    const { name } = e.target;
    const { checked } = e.target;
    setPermissions({ ...permissions, [name]: checked || value });
  };
  const handleChangePhone = (value) => {
    setFormData({ ...formData, phone: value });
  };
  const {
    email,
    firstName,
    lastName,
    phone,
    organizations,
    userRoles,
    password,
    confirmPassword,
  } = formData;
  const {
    alphaProd,
    alphaDev,
    bulkUpdateManager,
    activityManager,
    tagManager,
    tagHierarchyManager,
    roleUsers,
    accessEditProfile,
    roleAdmin,
    roleUser,
    managementAdmin,
    userManager,
    systemAdmin,
    insightAccess,
    authorSiteSettingManager,
  } = permissions;
  const redirectTo = async (goTo) => {
    try {
      history.push(goTo);
    } catch (err) {}
  };

  const validation = () => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const errorEmail = regex.test(email);
    if (email === "") {
      setError(true);
      return setErrorMessage("email is required");
    }
    if (!errorEmail) {
      setError(true);
      return setErrorMessage("Invalid email address");
    }
    if (firstName === "") {
      setError(true);
      return setErrorMessage("First Name is required");
    }
    if (lastName === "") {
      setError(true);
      return setErrorMessage("Last Name is required");
    }
    if (password === "" && mode === CREATE_NEW_MODE) {
      setError(true);
      return setErrorMessage("Password is required");
    }
    if (confirmPassword === "" && mode === CREATE_NEW_MODE) {
      setError(true);
      return setErrorMessage("Confirm Password is required");
    }
    if (confirmPassword !== password && mode === CREATE_NEW_MODE) {
      setError(true);
      return setErrorMessage("Password doesn't match");
    }
    if (phone === "") {
      setError(true);
      return setErrorMessage("Phone is required");
    }
    if (organizations === "" && user?.role === USER_ROLE_SUPER_ADMIN) {
      setError(true);
      return setErrorMessage("Organizations is required");
    }
    if (userRoles === "" && user?.role === USER_ROLE_SUPER_ADMIN) {
      setError(true);
      return setErrorMessage("user Roles is required");
    }
    return true;
  };
  const permissionArray = [
    alphaProd ? "alpha-publishing-prod" : null,
    alphaDev ? "alpha-publishing-dev" : null,
    bulkUpdateManager ? "bulk-update-manager" : null,
    activityManager ? "activity-manager" : null,
    tagManager ? "tag-manager" : null,
    tagHierarchyManager ? "tag-hierarchy-manager" : null,
    roleUsers ? "role-users" : null,
    accessEditProfile ? "access-edit-profile" : null,
    roleAdmin ? "role-admin" : null,
    roleUser ? "role-user" : null,
    managementAdmin ? "management-admin" : null,
    userManager ? "user-manager" : null,
    systemAdmin ? "system-admin" : null,
    insightAccess ? "insight-access" : null,
    authorSiteSettingManager ? "author-site-setting-manager" : null,
  ];
  const result = permissionArray?.filter((permission) => permission);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email,
      firstName,
      lastName,
      phone,
      permissions: [...result],
      roles: [
        {
          name: userRoles,
        },
      ],
    };
    if (mode === CREATE_NEW_MODE) {
      payload["password"] = password;
    }
    if (validation()) {
      const id =
        user?.role === USER_ROLE_SUPER_ADMIN
          ? organizations
          : user?.user?.organizationId;
      const res = await createOrganizationUser(id, user, payload);

      if (res && res.data && res.data.status === "success") {
        swal({
          title: "Good job!",
          text:
            mode === EDIT_MODE
              ? "Organization User Updated Successfully!"
              : "Organization User Saved Successfully!",
          icon: "success",
          button: "Ok!",
        }).then((value) => {
          history.push({
            pathname: "/user-managment",
            state: {
              _orgId: organizations,
            },
          });
        });
      }
    } else {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
    // }
  };

  const handleChangeTabs = () => {
    if (tabValue < 1) {
      setTabValue(tabValue + 1);
    } else {
      setTabValue(0);
    }
  };

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
        </div>
      }
      content={
        <div className="p-24">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <AntTabs
                className={classes.tabs}
                value={tabValue}
                onChange={handleChange}
                aria-label="create-user-tabs"
              >
                <AntTab
                  className={classes.tabs}
                  label="Add User Details"
                  {...a11yProps(0)}
                />
                <AntTab label="Permissions" {...a11yProps(1)} />
              </AntTabs>
            </Box>
            {error && (
              <Alert
                severity="error"
                sx={{ fontSize: "1.3rem", margin: "1rem" }}
              >
                {errorMessage}
              </Alert>
            )}
            <TabPanel value={tabValue} index={0}>
              <AddUserDetails
                formData={formData}
                handleChangeInputs={handleChangeInputs}
                handleChangePhone={handleChangePhone}
                organzationID={organzationID}
                mode={mode}
              />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Permissions
                permissions={permissions}
                handleChangePermissions={handleChangePermissions}
                handleChangePhone={handleChangePhone}
              />
            </TabPanel>

            <div className="flex justify-between my-5">
              <Button
                variant="contained"
                size="medium"
                onClick={(e) =>
                  tabValue > 0 ? handleSubmit(e) : handleChangeTabs()
                }
                className={classes.createBtn}
              >
                {tabValue === 1 ? "Create user" : "Next"}
              </Button>
              <Button
                className={classes.cancelBtn}
                onClick={() => redirectTo("/user-managment")}
                variant="contained"
                size="medium"
              >
                Cancel
              </Button>
            </div>
          </Box>
        </div>
      }
    />
  );
};
export default CreateUserTabs;
