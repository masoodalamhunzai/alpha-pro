import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import AppsIcon from "@mui/icons-material/Apps";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";

import DetailsConfiguration from "./DetailsConfiguration";
import LayoutConfiguration from "./LayoutConfiguration";
import TagsConfiguration from "./TagsConfiguration";
import QuestionConfiguration from "./QuestionConfiguration";

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
        <Box style={{ padding: "3%" }}>
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

function ItemConfiguration(props) {
  const [value, setValue] = useState(0);
  const [sectionTitle, setSectionTitle] = useState("Settings");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSection = (newValue) => {
    setSectionTitle(newValue);
  };
  return (
    <>
      <div className="space-y-32 flex" style={{ width: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ backgroundColor: "dimgray" }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => {
                  handleSection("Settings");
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                style={{ textAlign: "center" }}
              >
                {sectionTitle}
              </Typography>
              <IconButton
                size="large"
                aria-label="app features"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                // onClick={handleMenu}
                color="inherit"
                onClick={() => {
                  handleSection("Questions");
                }}
              >
                <AppsIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div>
            {sectionTitle == "Settings" ? (
              <div>
                <Box sx={{ width: "100%", backgroundColor: "#ebebeb" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      textColor="primary"
                      indicatorColor="primary"
                      aria-label="secondary tabs example"
                      style={{ background: "#fff" }}
                    >
                      <Tab
                        style={{ width: "33%" }}
                        label="DETAILS"
                        {...a11yProps(0)}
                      />
                      <Tab
                        style={{ width: "33%" }}
                        label="LAYOUT"
                        {...a11yProps(1)}
                      />
                      <Tab
                        style={{ width: "33%" }}
                        label="TAGS"
                        {...a11yProps(2)}
                      />
                    </Tabs>
                  </Box>
                  <TabPanel
                    value={value}
                    index={0}
                    style={{ height: "500px", overflow: "auto" }}
                  >
                    <div>
                      <DetailsConfiguration
                        setNameDetails={props.setNameDetails}
                        nameDetails={props.nameDetails}
                        descriptionDetails={props.descriptionDetails}
                        setDescriptionDetails={props.setDescriptionDetails}
                        statusButtonDetails={props.statusButtonDetails}
                        setStatusButtonDetails={props.setStatusButtonDetails}
                        difficultyButtonDetails={props.difficultyButtonDetails}
                        setDifficultyButtonDetails={
                          props.setDifficultyButtonDetails
                        }
                        scoringType={props.scoringType}
                        setScoringType={props.setScoringType}
                        contentSource={props.contentSource}
                        setContentSource={props.setContentSource}
                        contentNotes={props.contentNotes}
                        setContentNotes={props.setContentNotes}
                        contentAcknowledgements={props.contentAcknowledgements}
                        setContentAcknowledgements={
                          props.setContentAcknowledgements
                        }
                      />
                    </div>
                  </TabPanel>
                  <TabPanel
                    value={value}
                    index={1}
                    style={{ height: "500px", overflow: "auto" }}
                  >
                    <LayoutConfiguration
                      selectedLayout={props.selectedLayout}
                      setSelectedLayout={props.setSelectedLayout}
                    />
                  </TabPanel>
                  <TabPanel
                    value={value}
                    index={2}
                    style={{ height: "500px", overflow: "auto" }}
                  >
                    <TagsConfiguration />
                  </TabPanel>
                </Box>
              </div>
            ) : (
              <div>
                <Box
                  sx={{ width: "100%", backgroundColor: "#ebebeb" }}
                  style={{ height: "700px", overflow: "auto" }}
                >
                  <QuestionConfiguration />
                </Box>
              </div>
            )}
          </div>
          <Box sx={{ "& button": { m: 1 } }}>
            <div className="flex">
              <Button
                style={{
                  width: "50%",
                  height: "45px",
                  borderRadius: "0px",
                  backgroundColor: "gray",
                  margin: "0px",
                }}
                variant="contained"
                size="large"
              >
                Cancel
              </Button>
              <Button
                style={{
                  width: "50%",
                  height: "45px",
                  borderRadius: "0px",
                  margin: "0px",
                }}
                variant="contained"
                size="large"
                onClick={() => {
                  props.handleSaveItem();
                }}
              >
                Apply
              </Button>
            </div>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default ItemConfiguration;
