
import { useState } from "react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppsIcon from '@mui/icons-material/Apps';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';


import DetailsConfiguration from './DetailsConfiguration';
import LayoutConfiguration from './LayoutConfiguration';
import TagsConfiguration from './TagsConfiguration';
import QuestionConfiguration from './QuestionConfiguration';


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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}





function ItemConfiguration(props) {
  const [value, setValue] = useState(0);
  const [sectionTitle, setSectionTitle] = useState('Settings');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
   const handleSection = (newValue) => {
    setSectionTitle(newValue);
  };
  return (
    <>    
                        <div className="space-y-32 flex" style={{width:'100%'}}>

                         <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static" style={{backgroundColor:'dimgray'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>{handleSection('Settings')}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{textAlign:'center'}}>
            {sectionTitle}
          </Typography>
              <IconButton
                size="large"
                aria-label="app features"
                aria-controls="menu-appbar"
                aria-haspopup="true"
               // onClick={handleMenu}
                color="inherit"
                onClick={()=>{handleSection('Question')}}
              >
                <AppsIcon />
              </IconButton>
            
        </Toolbar>
      </AppBar>
     {sectionTitle=="Settings"?(
<div>
<Box sx={{ width: '100%',backgroundColor:'#ebebeb'  }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
<Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
        style={{background:'#fff'}}
      >
        <Tab label="DETAILS" {...a11yProps(0)} />
          <Tab label="LAYOUT" {...a11yProps(1)} />
          <Tab label="TAGS" {...a11yProps(2)} />
        </Tabs>

</Box>
      <TabPanel value={value} index={0}>
        <div>
      <DetailsConfiguration/>
      </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <LayoutConfiguration/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <TagsConfiguration/>
      </TabPanel>
    </Box>      
</div>
     ):(
<div>
<Box sx={{ width: '100%',backgroundColor:'#ebebeb'  }}>
     
      
  <QuestionConfiguration/>

    </Box>      
</div>
     )}

    </Box>

                          
                         
                        </div>                     
    </>
  );
}

export default ItemConfiguration;

