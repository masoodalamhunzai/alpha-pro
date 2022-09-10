import { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import QuestionConfiguration from './QuestionConfiguration';
import DropAndAdd from './DrapAndAdd';
import CreateQuestion from './CreateQuestion';

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
        <Box style={{ padding: '3%' }}>
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

function SimpleSection(props) {
  const [value, setValue] = useState(0);
  const [sectionTitle, setSectionTitle] = useState('Settings');

  const handleChange = (event, newValue, tabTitle) => {
    setValue(newValue);
    // props.handleNewTab(props.sectionName, tabTitle, newValue);
  };
  const handleSection = (newValue) => {
    setSectionTitle(newValue);
  };
  return (
    <>
      <div className="space-y-32 flex" style={{ width: '100%' }}>
        <Box sx={{ flexGrow: 1 }}>
          <div>
            {sectionTitle === 'Settings' ? (
              <div>
                <Box sx={{ width: '100%', backgroundColor: '#ebebeb' }}>
                  {props.QuestionsList.map((item, index) => {
                    return (
                      <div key={index}>
                        <div>
                          {' '}
                          <CreateQuestion key={index} />
                          <br />
                        </div>
                      </div>
                    );
                  })}
                  <DropAndAdd
                    handleQuestionDragDrop={props.handleQuestionDragDrop}
                    SectionName={props.sectionName}
                    TabName="No Tab"
                  />
                  {/* <TabPanel value={value} index={1} style={{ height: '500px', overflow: 'auto' }}>
                    <div>
                      <CreateQuestion key={2} />
                      <br />
                      <CreateQuestion key={3} />
                      <br />
                      <DropAndAdd />
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={2} style={{ height: '500px', overflow: 'auto' }}>
                    <div>
                      <CreateQuestion key={4} />
                      <br />
                      <DropAndAdd />
                    </div>
                  </TabPanel> */}
                </Box>
              </div>
            ) : (
              <div>
                <Box
                  sx={{ width: '100%', backgroundColor: '#ebebeb' }}
                  style={{ height: '700px', overflow: 'auto' }}
                >
                  <QuestionConfiguration handleComponentDragDrop={props.handleComponentDragDrop} />
                </Box>
              </div>
            )}
          </div>
        </Box>
      </div>
    </>
  );
}

export default SimpleSection;
