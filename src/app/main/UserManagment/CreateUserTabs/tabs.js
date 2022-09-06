import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import Box from "@mui/material/Box";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import Breadcrumb from "../../../fuse-layouts/shared-components/Breadcrumbs";
import Button from "@mui/material/Button";
import AddUserDetails from "./AddUserDetails/AddUserDetails";
import Permissions from "./Permissions/Permissions";

const useStyles = makeStyles({
  layoutRoot: {},
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
    continueBtn: {
      "&.MuiButton-root": {
        backgroundColor: "#3287FB",
        margin: "0 1rem",
      },
    },
    cancelBtn: {
      "&.MuiButton-root": {
        backgroundColor: "#ACACAC",
      },
    },
    createBtn: {
      "&.MuiButton-root": {
        letterSpacing: 0,
        textTransform: "capitalize",
      },
    },
    "& .MuiButton-root": {
      fontWeight: "700",
      borderRadius: "1.6rem",
      margin: "2rem 0",
      padding: "1rem 2rem",
      fontSize: "1rem",
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
  const history = useHistory();
  const pageTitle = location.pathname
    .split("/")
    .filter((x) => x)
    .pop()
    .split("-")
    .join(" ");
  const classes = useStyles();

  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const USER_ROLE_CLIENT_ADMIN = "client-admin";
  const USER_ROLE_SUPER_ADMIN = "super-admin";
  const [error, setError] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { editData } = location?.state ? location?.state : "";
  const [labelCheckBox, setLabelCheckBox] = useState(null);

  const [formData, setFormData] = useState({
    email: editData?.email.length > 0 ? editData?.email : "",
    firstName: editData?.firstName.length > 0 ? editData?.firstName : "",
    lastName: editData?.lastName.length > 0 ? editData?.lastName : "",
    phone: editData?.phonenumber.length > 0 ? editData?.phonenumber : "",
    organizations:
      editData?.organization.length > 0 ? editData?.organization : "",
    password: "",
    confirmPassword: "",
    userRoles: "",
    status: editData?.status.length > 0 ? editData?.status : "",
    alphaProd: false,
    alphaDev: false,
    bulkUpdateManager: false,
    activityManager: false,
    tagManager: false,
    tagHierarchyManager: false,
    users: false,
    accessEditProfile: false,
    admin: false,
    user: false,
    managementAdmin: false,
    userManager: false,
    systemAdmin: false,
    insightAccess: false,
    aurthorSiteSettingManager: false,
  });

  const handleChangeInputs = (e) => {
    const { value } = e.target;
    const { name } = e.target;
    const { checked } = e.target;
    console.log(value, "e.target", name, checked);
    if (checked) {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
    status,
    alphaProd,
    alphaDev,
    bulkUpdateManager,
    activityManager,
    tagManager,
    tagHierarchyManager,
    users,
    accessEditProfile,
    admin,
    user,
    managementAdmin,
    userManager,
    systemAdmin,
    insightAccess,
    aurthorSiteSettingManager,
  } = formData;

  const validation = () => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const errorEmail = regex.test(email);
    if (email === "") {
      setError(true);
      return setErrorMessage("email required");
    }
    if (!errorEmail) {
      setError(true);
      return setErrorMessage("Invalid email address");
    }
    if (firstName === "") {
      setError(true);
      return setErrorMessage("firstName required");
    }
    if (lastName === "") {
      setError(true);
      return setErrorMessage("lastName required");
    }
    if (password === "") {
      setError(true);
      return setErrorMessage("password required");
    }
    if (confirmPassword === "") {
      setError(true);
      return setErrorMessage("confirmPassword required");
    }
    if (confirmPassword !== password) {
      setError(true);
      return setErrorMessage("Password doesn't match");
    }
    if (phone === "") {
      setError(true);
      return setErrorMessage("phone required");
    }
    if (organizations === "" && user?.role === USER_ROLE_SUPER_ADMIN) {
      setError(true);
      return setErrorMessage("organizations required");
    }
    if (userRoles === "" && user?.role === USER_ROLE_SUPER_ADMIN) {
      setError(true);
      return setErrorMessage("userRoles required");
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email,
      firstName,
      lastName,
      password,
      phone,
      roles: [
        {
          name: userRoles,
        },
      ],
    };
    if (user && user.role && user?.role === USER_ROLE_CLIENT_ADMIN) {
      const { id } = user?.organization;
      createOrganizationUser(id, user, payload);
    }
    if (validation()) {
      const res = createOrganizationUser(organizations, user, payload);

      setIsFormSubmitted(true);
      setTimeout(() => {
        setIsFormSubmitted(false);
      }, 3000);
      redirectTo("/user-managment");
    } else {
      setTimeout(() => {
        setError(false);
      }, 3000);
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
                {/* <AntTab label="Create User" {...a11yProps(3)} />*/}
              </AntTabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              <AddUserDetails
                formData={formData}
                handleChangeInputs={handleChangeInputs}
                handleChangePhone={handleChangePhone}
              />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Permissions
                formData={formData}
                handleChangeInputs={handleChangeInputs}
                handleChangePhone={handleChangePhone}
              />
            </TabPanel>
            {tabValue === 1 ? (
              <div className="flex justify-between my-5">
                <Button
                  sx={{
                    fontSize: "14px",
                    borderRadius: "25px",
                    padding: "2px 25px",
                  }}
                  variant="contained"
                  size="medium"
                  className={classes.createBtn}
                >
                  Create User
                </Button>
                <Button
                  className={classes.createBtn}
                  onClick={() => redirectTo("/user-managment")}
                  sx={{
                    fontSize: "14px",
                    borderRadius: "25px",
                    padding: "2px 25px",
                    backgroundColor: "gray",
                    "&:hover": {
                      backgroundColor: "black",
                    },
                  }}
                  variant="contained"
                  size="medium"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex justify-between my-5">
                <Button
                  sx={{
                    fontSize: "14px",
                    borderRadius: "25px",
                    padding: "2px 25px",
                  }}
                  variant="contained"
                  size="medium"
                  onClick={() => setTabValue(tabValue + 1)}
                  className={classes.createBtn}
                >
                  Next
                </Button>
                <Button
                  className={classes.createBtn}
                  onClick={() => redirectTo("/user-managment")}
                  sx={{
                    fontSize: "14px",
                    borderRadius: "25px",
                    padding: "2px 25px",
                    backgroundColor: "gray",
                    "&:hover": {
                      backgroundColor: "black",
                    },
                  }}
                  variant="contained"
                  size="medium"
                >
                  Cancel
                </Button>
              </div>
            )}
          </Box>
        </div>
      }
    />
  );
};
export default CreateUserTabs;
