import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumb from "../../../fuse-layouts/shared-components/Breadcrumbs";
import SetUserAccess from "./CreateUserTabs/SetUserAccess";
import CreateUserTab from "./CreateUserTabs/CreateUserTab";

const useStyles = makeStyles({
  layoutRoot: {},
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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

export default function CreateUser() {
  const location = useLocation();
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
            {pageTitle}
          </Typography>
        </div>
      }
      content={
        <div className="p-24">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{
                  "& .MuiButtonBase-root": {
                    fontSize: "12px",
                    fontWeight: "bold",
                    textTransfrom: "capitalize",
                  },
                }}
              >
                <Tab label="Add User Details" {...a11yProps(0)} />
                <Tab label="Select User Sites" {...a11yProps(1)} />
                <Tab label="Set User Access" {...a11yProps(2)} />
                <Tab label="Create User" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              <SetUserAccess />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <CreateUserTab />
            </TabPanel>
          </Box>
        </div>
      }
    />
  );
}
