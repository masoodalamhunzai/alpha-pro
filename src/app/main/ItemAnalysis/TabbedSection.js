import { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import QuestionConfiguration from './QuestionConfiguration';
import DropAndAdd from './DrapAndAdd';
import CreateQuestion from './CreateQuestion';

import TrueFalseQuestionLayout from './TrueFalseQuestionLayout';
import LabelImageWithTextLayout from './LabelImageWithTextLayout';
import LabelImageWithDropDownLayout from './LabelImageWithDropDownLayout';
import LabelImageWithDragDropLayout from './LabelImageWithDragDropLayout';
import ChoiceMatrixQuestionLayout from './ChoiceMatrixQuestionLayout';

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

function TabbedSection(props) {
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
                  <Box
                    sx={{ maxWidth: { xs: 320, sm: 480 }, borderBottom: 1, borderColor: 'divider' }}
                  >
                    <Tabs
                      value={value}
                      // onChange={handleChange}
                      textColor="primary"
                      indicatorColor="primary"
                      variant="scrollable"
                      scrollButtons
                      allowScrollButtonsMobile
                      aria-label="secondary tabs example"
                      style={{ background: '#fff' }}
                    >
                      {props.TabsList.map((item, index) => {
                        return (
                          <>
                            {console.log('index val ', index)}
                            <Tab
                              onClick={(e) => handleChange(e, index, item.TabName + index)}
                              label={item.TabName}
                              {...a11yProps(index)}
                            />
                          </>
                        );
                      })}
                      <Button
                        className="mx-8"
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          props.handleNewTab(props.sectionName, `Tab ${props.TabsList.length + 1}`)
                        }
                        style={{
                          borderRadius: '0px',
                          background: '#b1acac',
                          border: '0.1px dotted lightgray',
                        }}
                        // component={NavLinkAdapter}
                        // to="new/edit"
                      >
                        <AddIcon />
                      </Button>
                      {/* <Tab label="item.TabName" {...a11yProps(0)} />
                      <Tab style={{ width: '33%' }} label="Tab 2" {...a11yProps(1)} />
                      <Tab style={{ width: '33%' }} label="Tab 3" {...a11yProps(2)} /> */}
                    </Tabs>
                  </Box>
                  {props.TabsList.map((item, index) => {
                    return (
                      <div key={index}>
                        <TabPanel
                          value={value}
                          index={index}
                          style={{ height: '592px', overflow: 'auto' }}
                        >
                          <div>
                            {item.QuestionsList.map((ques, i) => {
                              return (
                                <>
                                 {ques.component === 'CreateQuestion' ? (
                            <CreateQuestion key={index} />
                          ) : ques.component === 'TrueFalseQuestionLayout' ? (
                            <TrueFalseQuestionLayout key={index}
                  multipleChoices={props.multipleChoicestrueFalse}
                  setMultipleChoices={props.setMultipleChoicestrueFalse}
                  editorContent={props.editorContenttrueFalse}
                  setEditorContent={props.setEditorContenttrueFalse}
                  trueFalseShuffleOption={props.trueFalseShuffleOptiontrueFalse}
                  setTrueFalseShuffleOption={props.setTrueFalseShuffleOptiontrueFalse}
                             />
                          ) : ques.component === 'ChoiceMatrixQuestionLayout' ? (
                            <ChoiceMatrixQuestionLayout key={index} 
                            multipleChoices={props.multipleChoiceschoiceMatric}
                  setMultipleChoices={props.setMultipleChoiceschoiceMatric}
                  multipleOptions={props.multipleOptionschoiceMatric}
                  setMultipleOptions={props.setMultipleOptionschoiceMatric}
                  editorContent={props.editorContentchoiceMatric}
                  setEditorContent={props.setEditorContentchoiceMatric}
                            />
                          ) : ques.component === 'LabelImageWithDragDropLayout' ? (
                            <LabelImageWithDragDropLayout key={index}
                            multipleChoices={props.multipleChoiceschoiceMatric}
                  setMultipleChoices={props.setMultipleChoiceschoiceMatric}
                  multipleOptions={props.multipleOptionschoiceMatric}
                  setMultipleOptions={props.setMultipleOptionschoiceMatric}
                  editorContent={props.editorContentchoiceMatric}
                  setEditorContent={props.setEditorContentchoiceMatric}
                             />
                          ) : ques.component === 'LabelImageWithDropDownLayout' ? (
                            <LabelImageWithDropDownLayout key={index}
                            multipleChoices={props.multipleChoiceschoiceMatric}
                  setMultipleChoices={props.setMultipleChoiceschoiceMatric}
                  multipleOptions={props.multipleOptionschoiceMatric}
                  setMultipleOptions={props.setMultipleOptionschoiceMatric}
                  editorContent={props.editorContentchoiceMatric}
                  setEditorContent={props.setEditorContentchoiceMatric}
                            />
                          ) : ques.component === 'LabelImageWithTextLayout' ? (
                            <LabelImageWithTextLayout key={index}
                            multipleChoices={props.multipleChoiceschoiceMatric}
                  setMultipleChoices={props.setMultipleChoiceschoiceMatric}
                  multipleOptions={props.multipleOptionschoiceMatric}
                  setMultipleOptions={props.setMultipleOptionschoiceMatric}
                  editorContent={props.editorContentchoiceMatric}
                  setEditorContent={props.setEditorContentchoiceMatric}
                            />
                          ) : (
                            <p>This Component is under construction..</p>
                          )}
                          <br />
                                </>
                              );
                            })}
                            <br />
                            <DropAndAdd
                              handleQuestionDragDrop={props.handleQuestionDragDrop}
                              SectionName={props.sectionName}
                              TabName={item.TabName}
                            />
                          </div>
                        </TabPanel>
                      </div>
                    );
                  })}
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

export default TabbedSection;
