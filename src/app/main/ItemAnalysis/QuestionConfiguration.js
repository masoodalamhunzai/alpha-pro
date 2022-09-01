
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

function QuestionConfiguration(props) {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
 
  return (
    <>    
                       <div style={{width: "100%"}}>

                       <div className="px-4 py-4">
          <Paper className="flex items-center min-w-full sm:min-w-0 w-full px-12 py-4 rounded-16 shdaow">
            <Icon color="action">search</Icon>
            <Input
              placeholder="Search by Reference"
              className="flex flex-1 px-8"
              disableUnderline
              fullWidth
              inputProps={{
                "aria-label": "Search",
              }}
            />
          </Paper>
        </div>
        <div className="p-4">
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowRight />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <List fontSize="small" />
              <Typography
                className="mx-10"
                sx={{ marginLeft: "3%", flexShrink: 0 }}
              >
                Multiple Choice
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="w-full">
                <div className="flex flex-wrap">
                  <div style={{ padding: "1% 2%", width: "50%" }}>
                    <div className="flex flex-col items-center">
                      <img
                        src="assets/images/uicapture/StandardIcon.png"
                        alt="Image"
                      />
                      <text className="my-4">Standard</text>
                    </div>
                  </div>

                  <div style={{ padding: "1% 2%", width: "50%" }}>
                    <div className="flex flex-col items-center">
                      <img
                        src="assets/images/uicapture/MultipleIcon.png"
                        alt="Image"
                      />
                      <text className="my-4">Multiple Responses</text>
                    </div>
                  </div>

                  <div style={{ padding: "1% 2%", width: "50%" }}>
                    <div className="flex flex-col items-center">
                      <img
                        src="assets/images/uicapture/TrueFalseIcon.png"
                        alt="Image"
                      />
                      <text className="my-4">True Or False</text>
                    </div>
                  </div>

                  <div style={{ padding: "1% 2%", width: "50%" }}>
                    <div className="flex flex-col items-center">
                      <img
                        src="assets/images/uicapture/BlockLayoutIcon.png"
                        alt="Image"
                      />
                      <text className="my-4">Block Layout</text>
                    </div>
                  </div>

                  <div style={{ padding: "1% 2%", width: "50%" }}>
                    <div className="flex flex-col items-center">
                      <img
                        src="assets/images/uicapture/ChMixedIcon.png"
                        alt="Image"
                      />
                      <text className="my-4">Ch Matrix Std</text>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <FlipToBack fontSize="small" />
              <Typography
                className="mx-10"
                sx={{ marginLeft: "3%", flexShrink: 0 }}
              >
                Fill in the Blanks (Cloze)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Donec placerat, lectus sed mattis semper, neque lectus feugiat
                lectus, varius pulvinar diam eros in elit. Pellentesque
                convallis laoreet laoreet.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <SyncAlt fontSize="small" />
              <Typography
                className="mx-10"
                sx={{ marginLeft: "3%", flexShrink: 0 }}
              >
                Classify, Match & Order
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                Integer sit amet egestas eros, vitae egestas augue. Duis vel est
                augue.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <BorderColor fontSize="small" />
              <Typography
                className="mx-10"
                sx={{ marginLeft: "3%", flexShrink: 0 }}
              >
                Written & Recorded
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                Integer sit amet egestas eros, vitae egestas augue. Duis vel est
                augue.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>


         </div>                     
    </>
  );
}

export default QuestionConfiguration;

