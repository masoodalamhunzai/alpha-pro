import * as React from "react";
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
import SetUserAccess from "./SetUserAccess/SetUserAccess";
import CreateUser from "./CreateUser/CreateUser";
import AddUserDetails from "./AddUserDetails/AddUserDetails";
import SelectUserSite from "./SelectUserSite/SelectUserSite";

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
}

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
    .filter((x) => x)[0]
    .split("-")
    .join(" ");
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
            {/* {pageTitle} */}
            Create User
          </Typography>
        </div>
      }
      content={
        <div className="p-24">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <AntTabs
                className={classes.tabs}
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <AntTab
                  className={classes.tabs}
                  label="Add User Details"
                  {...a11yProps(0)}
                />
                {/* <AntTab label="Select User Sites" {...a11yProps(1)} />
                <AntTab label="Set User Access" {...a11yProps(2)} />
                <AntTab label="Create User" {...a11yProps(3)} />*/}
              </AntTabs>
            </Box>
            <TabPanel value={value} index={0}>
              <AddUserDetails />
            </TabPanel>
            {/* <TabPanel value={value} index={1}>
              <SelectUserSite />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <SetUserAccess />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <CreateUser />
            </TabPanel> */}
          </Box>
        </div>
      }
    />
  );
};
export default CreateUserTabs;
