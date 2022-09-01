
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
    LocalOffer,
    DeleteSweep,
  } from "@material-ui/icons";
  import Icon from "@material-ui/core/Icon";
  import Input from "@material-ui/core/Input";
  import Paper from "@material-ui/core/Paper";

function TagsConfiguration(props) {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
 
  return (
    <>    
                       <div style={{width: "100%"}}>

                        
     <div className="px-4 py-4">
          <Typography className="mx-10" sx={{ width: "100%", flexShrink: 0 }}>
            Attach tags to this item
          </Typography>
          <Paper className="flex items-center min-w-full sm:min-w-0 w-full px-12 py-4 my-3 rounded-16 shdaow">
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
          <div className="badge badge-gray flex justify-between">
            <span>
              <LocalOffer className="color-white" />
              <b className="color-white px-8">Final Test</b>
            </span>
            <span>
              <DeleteSweep className="color-white" />
            </span>
          </div>

          <div className="badge badge-gray flex justify-between">
            <span>
              <LocalOffer className="color-white" />
              <b className="color-white px-8">Final Test</b>
            </span>
            <span>
              <DeleteSweep className="color-white" />
            </span>
          </div>

          <div className="badge badge-gray flex justify-between">
            <span>
              <LocalOffer className="color-white" />
              <b className="color-white px-8">Final Test</b>
            </span>
            <span>
              <DeleteSweep className="color-white" />
            </span>
          </div>

          <div className="badge badge-gray flex justify-between">
            <span>
              <LocalOffer className="color-white" />
              <b className="color-white px-8">Final Test</b>
            </span>
            <span>
              <DeleteSweep className="color-white" />
            </span>
          </div>
        </div>


         </div>                     
    </>
  );
}

export default TagsConfiguration;

