
import { useState } from "react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppsIcon from '@mui/icons-material/Apps';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary
  } from "@material-ui/core";
  import {
    ExpandMore as ExpandMoreIcon,
    ExpandLess,
    KeyboardArrowRight,
    List,
    BorderColor,
    SyncAlt,
    FlipToBack,
  } from "@material-ui/icons";
  import Icon from "@material-ui/core/Icon";
  import Input from "@material-ui/core/Input";
  import Paper from "@material-ui/core/Paper";



function LayoutConfiguration(props) {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>    
                    {/*  <div style={{ border: "2px solid", width: "100%", maxWidth: "350px" }}> */}
                    <div style={{width: "100%"}}>
        <div className="w-full">
          <div className="flex flex-wrap">
            <div style={{ padding: "1% 2%", width: "50%" }}>
              <div className="flex flex-col items-center">
                <img
                  style={{ width: "100%", height: "100px" }}
                  src="assets/images/uicapture/StandardIcon.png"
                  alt="Image"
                />
                <text className="my-4">Single Column</text>
              </div>
            </div>

            <div style={{ padding: "1% 2%", width: "50%" }}>
              <div className="flex flex-col items-center">
                <div className="flex">
                  <img
                    style={{
                      width: "50%",
                      height: "100px",
                      paddingRight: "2px",
                    }}
                    src="assets/images/uicapture/MultipleIcon.png"
                    alt="Image"
                  />
                  <img
                    style={{
                      width: "50%",
                      height: "100px",
                      paddingLeft: "2px",
                    }}
                    src="assets/images/uicapture/MultipleIcon.png"
                    alt="Image"
                  />
                </div>
                <text className="my-4">1/2</text>
              </div>
            </div>

            <div style={{ padding: "1% 2%", width: "50%" }}>
              <div className="flex">
                <div
                  style={{ width: "34%" }}
                  className="flex flex-col items-center"
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100px",
                      paddingRight: "2px",
                    }}
                    src="assets/images/uicapture/TrueFalseIcon.png"
                    alt="Image"
                  />
                  <text className="my-4">1/3</text>
                </div>
                <div
                  style={{ width: "66%" }}
                  className="flex flex-col items-center justfy-center"
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100px",
                      paddingLeft: "2px",
                    }}
                    src="assets/images/uicapture/TrueFalseIcon.png"
                    alt="Image"
                  />
                  <text className="my-4">2/3</text>
                </div>
              </div>
            </div>

            <div style={{ padding: "1% 2%", width: "50%" }}>
              <div className="flex">
                <div
                  style={{ width: "66%" }}
                  className="flex flex-col items-center"
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100px",
                      paddingRight: "2px",
                    }}
                    src="assets/images/uicapture/TrueFalseIcon.png"
                    alt="Image"
                  />
                  <text className="my-4">2/3</text>
                </div>
                <div
                  style={{ width: "34%" }}
                  className="flex flex-col items-center justfy-center"
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100px",
                      paddingLeft: "2px",
                    }}
                    src="assets/images/uicapture/TrueFalseIcon.png"
                    alt="Image"
                  />
                  <text className="my-4">1/3</text>
                </div>
              </div>
            </div>

            <div style={{ padding: "1% 2%", width: "50%" }}>
              <div className="flex">
                <div
                  style={{ width: "40%" }}
                  className="flex flex-col items-center"
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100px",
                      paddingRight: "2px",
                    }}
                    src="assets/images/uicapture/TrueFalseIcon.png"
                    alt="Image"
                  />
                  <text className="my-4">2/6</text>
                </div>
                <div
                  style={{ width: "60%" }}
                  className="flex flex-col items-center justfy-center"
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100px",
                      paddingLeft: "2px",
                    }}
                    src="assets/images/uicapture/TrueFalseIcon.png"
                    alt="Image"
                  />
                  <text className="my-4">4/6</text>
                </div>
              </div>
            </div>

            <div style={{ padding: "1% 2%", width: "50%" }}>
              <div className="flex">
                <div
                  style={{ width: "60%" }}
                  className="flex flex-col items-center"
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100px",
                      paddingRight: "2px",
                    }}
                    src="assets/images/uicapture/TrueFalseIcon.png"
                    alt="Image"
                  />
                  <text className="my-4">4/6</text>
                </div>
                <div
                  style={{ width: "40%" }}
                  className="flex flex-col items-center justfy-center"
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100px",
                      paddingLeft: "2px",
                    }}
                    src="assets/images/uicapture/TrueFalseIcon.png"
                    alt="Image"
                  />
                  <text className="my-4">2/6</text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>                     
    </>
  );
}

export default LayoutConfiguration;

