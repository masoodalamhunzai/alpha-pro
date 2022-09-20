import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useStateValue } from "app/services/state/State";

import QuestionConfiguration from "./QuestionConfiguration";
import DropAndAdd from "./DrapAndAdd";
import CreateQuestion from "./CreateQuestion";

import TrueFalseQuestionLayout from "./TrueFalseQuestionLayout";
import LabelImageWithTextLayout from "./LabelImageWithTextLayout";
import LabelImageWithDropDownLayout from "./LabelImageWithDropDownLayout";
import LabelImageWithDragDropLayout from "./LabelImageWithDragDropLayout";
import ChoiceMatrixQuestionLayout from "./ChoiceMatrixQuestionLayout";
import EssayWithRichTextLayout from "./EssayWithRichText/EssayWithRichTextLayout";
import AudioRecorderLayout from "./AudioRecorder/AudioRecorderLayout";
import ShortTextLayout from "./ShortText/ShortTextLayout";
import EssayWithPlainTextLayout from "./EssayWithPlainText/EssayWithPlainTextLayout";
import ClassificationLayout from "./ClassificationQuestion/ClassificationLayout";
import MatchListLayout from "./MatchListQuestion/MatchListLayout";
import OrderListLayout from "./OrderListQuestion/OrderListLayout";
import ClozeWithDragAndDropLayout from "./ClozeWithDragAndDrop/ClozeWithDragAndDropLayout";
import ClozeWithDropDownLayout from "./ClozeWithDropDown/ClozeWithDropDownLayout";
import ClozeWithTextLayout from "./ClozeWithText/ClozeWithTextLayout";
import { useSelector } from "react-redux";

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

function TabbedSection(props) {
  const [value, setValue] = useState(0);
  const [sectionTitle, setSectionTitle] = useState("Settings");
  const [{}, dispatch] = useStateValue();

  const itemQuestionsList = useSelector(({ alpha }) => alpha.item.questions);

  const handleChange = (event, newValue, tabTitle) => {
    setValue(newValue);
    // props.handleNewTab(props.sectionName, tabTitle, newValue);
  };
  const handleSection = (newValue) => {
    setSectionTitle(newValue);
  };
  return (
    <>
      <div className="space-y-32 flex" style={{ width: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <div>
            {sectionTitle === "Settings" ? (
              <div>
                <Box sx={{ width: "100%", backgroundColor: "#ebebeb" }}>
                  <Box
                    sx={{
                      maxWidth: { xs: 320, sm: 480 },
                      borderBottom: 1,
                      borderColor: "divider",
                    }}
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
                      style={{ background: "#fff" }}
                    >
                      {props.TabsList.map((item, index) => {
                        return (
                          <>
                            {console.log("index val ", index)}
                            <Tab
                              onClick={(e) =>
                                handleChange(e, index, item.TabName + index)
                              }
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
                          props.handleNewTab(
                            props.sectionName,
                            `Tab ${props.TabsList.length + 1}`
                          )
                        }
                        style={{
                          borderRadius: "0px",
                          background: "#b1acac",
                          border: "0.1px dotted lightgray",
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
                          style={{ height: "592px", overflow: "auto" }}
                        >
                          <div>
                            {item.QuestionsList.map((ques, i) => {
                              return (
                                <>
                                  {ques.component === "CreateQuestion" ? (
                                    <CreateQuestion
                                      key={i}
                                      questionIndex={i}
                                      questionId={ques.id}
                                      sectionName={props.sectionName}
                                      tabName={item.TabName}
                                      onSaveQuestion={props.onSaveQuestion}
                                      onRemoveQuestion={props.onRemoveQuestion}
                                      onEditQuestion={props.onEditQuestion}
                                      onNewOptionAdded={props.onNewOptionAdded}
                                      multipleChoices={props.multipleChoices}
                                      setMultipleChoices={
                                        props.setMultipleChoices
                                      }
                                      editorContent={props.editorContent}
                                      setEditorContent={props.setEditorContent}
                                    />
                                  ) : ques.component ===
                                    "TrueFalseQuestionLayout" ? (
                                    <TrueFalseQuestionLayout
                                      key={i}
                                      questionIndex={i}
                                      questionId={ques.id}
                                      sectionName={props.sectionName}
                                      tabName={item.TabName}
                                      onSaveQuestion={props.onSaveQuestion}
                                      onRemoveQuestion={props.onRemoveQuestion}
                                      onEditQuestion={props.onEditQuestion}
                                      onNewOptionAdded={props.onNewOptionAdded}
                                      multipleChoices={props.multipleChoices}
                                      setMultipleChoices={
                                        props.setMultipleChoices
                                      }
                                      editorContent={props.editorContent}
                                      setEditorContent={props.setEditorContent}
                                      trueFalseShuffleOption={
                                        props.trueFalseShuffleOptiontrueFalse
                                      }
                                      setTrueFalseShuffleOption={
                                        props.setTrueFalseShuffleOptiontrueFalse
                                      }
                                      removeAnItem={props.removeAnItem}
                                      editAnItem={props.editAnItem}
                                      saveAnItem={props.saveAnItem}
                                    />
                                  ) : ques.component ===
                                    "ChoiceMatrixQuestionLayout" ? (
                                    <ChoiceMatrixQuestionLayout
                                      key={i}
                                      questionIndex={i}
                                      questionId={ques.id}
                                      sectionName={props.sectionName}
                                      tabName={item.TabName}
                                      onSaveQuestion={props.onSaveQuestion}
                                      onRemoveQuestion={props.onRemoveQuestion}
                                      onEditQuestion={props.onEditQuestion}
                                      onNewOptionAdded={props.onNewOptionAdded}
                                      multipleChoices={props.multipleChoices}
                                      setMultipleChoices={
                                        props.setMultipleChoices
                                      }
                                      multipleOptions={
                                        props.multipleOptionschoiceMatric
                                      }
                                      setMultipleOptions={
                                        props.setMultipleOptionschoiceMatric
                                      }
                                      editorContent={props.editorContent}
                                      setEditorContent={props.setEditorContent}
                                      removeAnItem={props.removeAnItem}
                                      editAnItem={props.editAnItem}
                                      saveAnItem={props.saveAnItem}
                                    />
                                  ) : ques.component ===
                                    "LabelImageWithDragDropLayout" ? (
                                    <LabelImageWithDragDropLayout
                                      key={i}
                                      questionIndex={i}
                                      questionId={ques.id}
                                      sectionName={props.sectionName}
                                      tabName={item.TabName}
                                      onSaveQuestion={props.onSaveQuestion}
                                      onRemoveQuestion={props.onRemoveQuestion}
                                      onEditQuestion={props.onEditQuestion}
                                      onNewOptionAdded={props.onNewOptionAdded}
                                      multipleChoices={props.multipleChoices}
                                      setMultipleChoices={
                                        props.setMultipleChoices
                                      }
                                      multipleOptions={
                                        props.multipleOptionschoiceMatric
                                      }
                                      setMultipleOptions={
                                        props.setMultipleOptionschoiceMatric
                                      }
                                      editorContent={props.editorContent}
                                      setEditorContent={props.setEditorContent}
                                      removeAnItem={props.removeAnItem}
                                      editAnItem={props.editAnItem}
                                      saveAnItem={props.saveAnItem}
                                    />
                                  ) : ques.component ===
                                    "LabelImageWithDropDownLayout" ? (
                                    <LabelImageWithDropDownLayout
                                      key={i}
                                      questionIndex={i}
                                      questionId={ques.id}
                                      sectionName={props.sectionName}
                                      tabName={item.TabName}
                                      onSaveQuestion={props.onSaveQuestion}
                                      onRemoveQuestion={props.onRemoveQuestion}
                                      onEditQuestion={props.onEditQuestion}
                                      onNewOptionAdded={props.onNewOptionAdded}
                                      multipleChoices={props.multipleChoices}
                                      setMultipleChoices={
                                        props.setMultipleChoices
                                      }
                                      multipleOptions={
                                        props.multipleOptionschoiceMatric
                                      }
                                      setMultipleOptions={
                                        props.setMultipleOptionschoiceMatric
                                      }
                                      editorContent={props.editorContent}
                                      setEditorContent={props.setEditorContent}
                                      removeAnItem={props.removeAnItem}
                                      editAnItem={props.editAnItem}
                                      saveAnItem={props.saveAnItem}
                                    />
                                  ) : ques.component ===
                                    "LabelImageWithTextLayout" ? (
                                    <LabelImageWithTextLayout
                                      key={i}
                                      questionIndex={i}
                                      questionId={ques.id}
                                      sectionName={props.sectionName}
                                      tabName={item.TabName}
                                      onSaveQuestion={props.onSaveQuestion}
                                      onRemoveQuestion={props.onRemoveQuestion}
                                      onEditQuestion={props.onEditQuestion}
                                      onNewOptionAdded={props.onNewOptionAdded}
                                      multipleChoices={props.multipleChoices}
                                      setMultipleChoices={
                                        props.setMultipleChoices
                                      }
                                      multipleOptions={
                                        props.multipleOptionschoiceMatric
                                      }
                                      setMultipleOptions={
                                        props.setMultipleOptionschoiceMatric
                                      }
                                      editorContent={props.editorContent}
                                      setEditorContent={props.setEditorContent}
                                      removeAnItem={props.removeAnItem}
                                      editAnItem={props.editAnItem}
                                      saveAnItem={props.saveAnItem}
                                    />
                                  ) : ques.component ===
                                    "EssayWithRichTextLayout" ? (
                                    <EssayWithRichTextLayout
                                      key={i}
                                      questionIndex={i}
                                      questionId={ques.id}
                                      sectionName={props.sectionName}
                                      tabName={item.TabName}
                                      onSaveQuestion={props.onSaveQuestion}
                                      onRemoveQuestion={props.onRemoveQuestion}
                                      onEditQuestion={props.onEditQuestion}
                                      onNewOptionAdded={props.onNewOptionAdded}
                                      multipleChoices={props.multipleChoices}
                                      setMultipleChoices={
                                        props.setMultipleChoices
                                      }
                                      editorContent={props.editorContent}
                                      setEditorContent={props.setEditorContent}
                                      wordLimit={
                                        props.essayWithRichTextWordLimit
                                      }
                                      setWordLimit={
                                        props.setEssayWithRichTextWordLimit
                                      }
                                      wordLimitType={
                                        props.essayWithRichTextWordLimitType
                                      }
                                      setWordLimitType={
                                        props.setEssayWithRichTextWordLimitType
                                      }
                                      removeAnItem={props.removeAnItem}
                                      editAnItem={props.editAnItem}
                                      saveAnItem={props.saveAnItem}
                                    />
                                  ) : ques.component ===
                                    "AudioRecorderLayout" ? (
                                    <AudioRecorderLayout
                                      key={i}
                                      questionIndex={i}
                                      questionId={ques.id}
                                      sectionName={props.sectionName}
                                      tabName={item.TabName}
                                      onSaveQuestion={props.onSaveQuestion}
                                      onRemoveQuestion={props.onRemoveQuestion}
                                      onEditQuestion={props.onEditQuestion}
                                      onNewOptionAdded={props.onNewOptionAdded}
                                      multipleChoices={props.multipleChoices}
                                      setMultipleChoices={
                                        props.setMultipleChoices
                                      }
                                      editorContent={props.editorContent}
                                      setEditorContent={props.setEditorContent}
                                      maximumSecond={
                                        props.audioRecorderMaximumSecond
                                      }
                                      setMaximumSecond={
                                        props.setAudioRecorderMaximumSecond
                                      }
                                      playerType={props.audioRecorderPlayerType}
                                      setPlayerType={
                                        props.setAudioRecorderPlayerType
                                      }
                                      removeAnItem={props.removeAnItem}
                                      editAnItem={props.editAnItem}
                                      saveAnItem={props.saveAnItem}
                                    />
                                  ) : ques.component === "ShortTextLayout" ? (
                                    <ShortTextLayout
                                      key={i}
                                      questionIndex={i}
                                      questionId={ques.id}
                                      sectionName={props.sectionName}
                                      tabName={item.TabName}
                                      onSaveQuestion={props.onSaveQuestion}
                                      onRemoveQuestion={props.onRemoveQuestion}
                                      onEditQuestion={props.onEditQuestion}
                                      onNewOptionAdded={props.onNewOptionAdded}
                                      multipleChoices={props.multipleChoices}
                                      setMultipleChoices={
                                        props.setMultipleChoices
                                      }
                                      editorContent={props.editorContent}
                                      setEditorContent={props.setEditorContent}
                                      points={props.shortTextPoints}
                                      setPoints={props.setShortTextPoints}
                                      allow={props.shortTextAllow}
                                      setAllow={props.setShortTextAllow}
                                      textValue={props.shortTextValue}
                                      setTextValue={props.setShortTextValue}
                                      removeAnItem={props.removeAnItem}
                                      editAnItem={props.editAnItem}
                                      saveAnItem={props.saveAnItem}
                                    />
                                  ) : ques.component ===
                                    "EssayWithPlainTextLayout" ? (
                                    <EssayWithPlainTextLayout
                                      key={i}
                                      questionIndex={i}
                                      questionId={ques.id}
                                      sectionName={props.sectionName}
                                      tabName={item.TabName}
                                      onSaveQuestion={props.onSaveQuestion}
                                      onRemoveQuestion={props.onRemoveQuestion}
                                      onEditQuestion={props.onEditQuestion}
                                      onNewOptionAdded={props.onNewOptionAdded}
                                      multipleChoices={props.multipleChoices}
                                      setMultipleChoices={
                                        props.setMultipleChoices
                                      }
                                      wordLimit={
                                        props.essayWithPlainTextLayoutWordLimit
                                      }
                                      setWordLimit={
                                        props.setEssayWithPlainTextLayoutWordLimit
                                      }
                                      wordType={
                                        props.essayWithPlainTextLayoutWordType
                                      }
                                      setWordType={
                                        props.setEssayWithPlainTextLayoutWordType
                                      }
                                      editorContent={props.editorContent}
                                      setEditorContent={props.setEditorContent}
                                      removeAnItem={props.removeAnItem}
                                      editAnItem={props.editAnItem}
                                      saveAnItem={props.saveAnItem}
                                    />
                                  ) : ques.component ===
                                    "ClassificationLayout" ? (
                                    <ClassificationLayout
                                      key={i}
                                      questionIndex={i}
                                      questionId={ques.id}
                                      sectionName={props.sectionName}
                                      tabName={item.TabName}
                                      onSaveQuestion={props.onSaveQuestion}
                                      onRemoveQuestion={props.onRemoveQuestion}
                                      onEditQuestion={props.onEditQuestion}
                                      onNewOptionAdded={props.onNewOptionAdded}
                                      multipleChoices={props.multipleChoices}
                                      setMultipleChoices={
                                        props.setMultipleChoices
                                      }
                                      multipleOptions={
                                        props.classificationColumnTitles
                                      }
                                      setMultipleOptions={
                                        props.setClassificationColumnTitles
                                      }
                                      editorContent={props.editorContent}
                                      setEditorContent={props.setEditorContent}
                                      columnCount={
                                        props.classificationColumnCount
                                      }
                                      setColumnCount={
                                        props.setClassificationColumnCount
                                      }
                                      rowCount={props.classificationRowCount}
                                      setRowCount={
                                        props.setClassificationRowCount
                                      }
                                      removeAnItem={props.removeAnItem}
                                      editAnItem={props.editAnItem}
                                      saveAnItem={props.saveAnItem}
                                    />
                                  ) : ques.component === "MatchListLayout" ? (
                                    <MatchListLayout
                                      key={i}
                                      questionIndex={i}
                                      questionId={ques.id}
                                      sectionName={props.sectionName}
                                      tabName={item.TabName}
                                      onSaveQuestion={props.onSaveQuestion}
                                      onRemoveQuestion={props.onRemoveQuestion}
                                      onEditQuestion={props.onEditQuestion}
                                      onNewOptionAdded={props.onNewOptionAdded}
                                      multipleChoices={props.multipleChoices}
                                      setMultipleChoices={
                                        props.setMultipleChoices
                                      }
                                      multipleOptions={
                                        props.matchListStimulusList
                                      }
                                      setMultipleOptions={
                                        props.setMatchListStimulusList
                                      }
                                      editorContent={props.editorContent}
                                      setEditorContent={props.setEditorContent}
                                      removeAnItem={props.removeAnItem}
                                      editAnItem={props.editAnItem}
                                      saveAnItem={props.saveAnItem}
                                    />
                                  ) : ques.component === "OrderListLayout" ? (
                                    <OrderListLayout
                                      key={i}
                                      questionIndex={i}
                                      questionId={ques.id}
                                      sectionName={props.sectionName}
                                      tabName={item.TabName}
                                      onSaveQuestion={props.onSaveQuestion}
                                      onRemoveQuestion={props.onRemoveQuestion}
                                      onEditQuestion={props.onEditQuestion}
                                      onNewOptionAdded={props.onNewOptionAdded}
                                      multipleChoices={props.multipleChoices}
                                      setMultipleChoices={
                                        props.setMultipleChoices
                                      }
                                      editorContent={props.editorContent}
                                      setEditorContent={props.setEditorContent}
                                      removeAnItem={props.removeAnItem}
                                      editAnItem={props.editAnItem}
                                      saveAnItem={props.saveAnItem}
                                    />
                                  ) : ques.component ===
                                    "ClozeWithDragAndDropLayout" ? (
                                    <ClozeWithDragAndDropLayout
                                      key={i}
                                      questionIndex={i}
                                      questionId={ques.id}
                                      sectionName={props.sectionName}
                                      tabName={item.TabName}
                                      onSaveQuestion={props.onSaveQuestion}
                                      onRemoveQuestion={props.onRemoveQuestion}
                                      onEditQuestion={props.onEditQuestion}
                                      onNewOptionAdded={props.onNewOptionAdded}
                                      multipleChoices={props.multipleChoices}
                                      setMultipleChoices={
                                        props.setMultipleChoices
                                      }
                                      editorContent={props.editorContent}
                                      setEditorContent={props.setEditorContent}
                                      templateMarkup={
                                        props.clozeWithDragAndDropTemplateMarkup
                                      }
                                      setTemplateMarkup={
                                        props.setClozeWithDragAndDropTemplateMarkup
                                      }
                                      removeAnItem={props.removeAnItem}
                                      editAnItem={props.editAnItem}
                                      saveAnItem={props.saveAnItem}
                                    />
                                  ) : ques.component ===
                                    "ClozeWithDropDownLayout" ? (
                                    <ClozeWithDropDownLayout
                                      key={i}
                                      questionIndex={i}
                                      questionId={ques.id}
                                      sectionName={props.sectionName}
                                      tabName={item.TabName}
                                      onSaveQuestion={props.onSaveQuestion}
                                      onRemoveQuestion={props.onRemoveQuestion}
                                      onEditQuestion={props.onEditQuestion}
                                      onNewOptionAdded={props.onNewOptionAdded}
                                      multipleChoices={props.multipleChoices}
                                      setMultipleChoices={
                                        props.setMultipleChoices
                                      }
                                      editorContent={props.editorContent}
                                      setEditorContent={props.setEditorContent}
                                      templateMarkup={
                                        props.clozeWithDropDownTemplateMarkup
                                      }
                                      setTemplateMarkup={
                                        props.setClozeWithDropDownTemplateMarkup
                                      }
                                      removeAnItem={props.removeAnItem}
                                      editAnItem={props.editAnItem}
                                      saveAnItem={props.saveAnItem}
                                    />
                                  ) : ques.component ===
                                    "ClozeWithTextLayout" ? (
                                    <ClozeWithTextLayout
                                      key={i}
                                      questionIndex={i}
                                      questionId={ques.id}
                                      sectionName={props.sectionName}
                                      tabName={item.TabName}
                                      onSaveQuestion={props.onSaveQuestion}
                                      onRemoveQuestion={props.onRemoveQuestion}
                                      onEditQuestion={props.onEditQuestion}
                                      onNewOptionAdded={props.onNewOptionAdded}
                                      editorContent={props.editorContent}
                                      setEditorContent={props.setEditorContent}
                                      templateMarkup={
                                        props.clozeWithTextTemplateMarkup
                                      }
                                      setTemplateMarkup={
                                        props.setClozeWithTextTemplateMarkup
                                      }
                                      matchAllResponses={
                                        props.clozeWithTextMatchAllResponses
                                      }
                                      setMatchAllResponses={
                                        props.setClozeWithTextMatchAllResponses
                                      }
                                      multipleChoices={props.multipleChoices}
                                      setMultipleChoices={
                                        props.setMultipleChoices
                                      }
                                      removeAnItem={props.removeAnItem}
                                      editAnItem={props.editAnItem}
                                      saveAnItem={props.saveAnItem}
                                    />
                                  ) : (
                                    <p>This Component doesn't exist...</p>
                                  )}
                                  <br />
                                </>
                              );
                            })}
                            <br />
                            <DropAndAdd
                              handleQuestionDragDrop={
                                props.handleQuestionDragDrop
                              }
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
                  sx={{ width: "100%", backgroundColor: "#ebebeb" }}
                  style={{ height: "700px", overflow: "auto" }}
                >
                  <QuestionConfiguration
                    handleComponentDragDrop={props.handleComponentDragDrop}
                  />
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
