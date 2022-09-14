import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

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

function SimpleSection(props) {
  const [value, setValue] = useState(0);
  const [sectionTitle, setSectionTitle] = useState("Settings");

  const handleChange = (event, newValue, tabTitle) => {
    setValue(newValue);
    // props.handleNewTab(props.sectionName, tabTitle, newValue);
  };
  const handleSection = (newValue) => {
    setSectionTitle(newValue);
  };
  return (
    <>
      <div
        className="space-y-32 flex"
        style={{ width: "100%", height: "592px", overflow: "auto" }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <div>
            {sectionTitle === "Settings" ? (
              <div>
                <Box sx={{ width: "100%", backgroundColor: "#ebebeb" }}>
                  {props.QuestionsList.map((item, index) => {
                    return (
                      <div key={index}>
                        <div>
                          {item.component === "CreateQuestion" ? (
                            <CreateQuestion
                              key={index}
                              questionIndex={index}
                              questionId={item.id}
                              sectionName={props.sectionName}
                              tabName={""}
                              onSaveQuestion={props.onSaveQuestion}
                              onRemoveQuestion={props.onRemoveQuestion}
                              onEditQuestion={props.onEditQuestion}
                              onNewOptionAdded={props.onNewOptionAdded}
                              multipleChoices={props.multipleChoices}
                              setMultipleChoices={props.setMultipleChoices}
                              editorContent={props.editorContent}
                              setEditorContent={props.setEditorContent}

                              selectedQuestionId={props.selectedQuestionId}
                        setSelectedQuestionId={props.setSelectedQuestionId}
                            />
                          ) : item.component === "TrueFalseQuestionLayout" ? (
                            <TrueFalseQuestionLayout
                              key={index}
                              questionIndex={index}
                              questionId={item.id}
                              sectionName={props.sectionName}
                              tabName={""}
                              onSaveQuestion={props.onSaveQuestion}
                              onRemoveQuestion={props.onRemoveQuestion}
                              onEditQuestion={props.onEditQuestion}
                              onNewOptionAdded={props.onNewOptionAdded}
                              multipleChoices={props.multipleChoices}
                              setMultipleChoices={props.setMultipleChoices}
                              editorContent={props.editorContent}
                              setEditorContent={props.setEditorContent}

                              trueFalseShuffleOption={ props.trueFalseShuffleOptiontrueFalse}
                              setTrueFalseShuffleOption={props.setTrueFalseShuffleOptiontrueFalse}
                              removeAnItem={props.removeAnItem}
                              editAnItem={props.editAnItem}
                              saveAnItem={props.saveAnItem}
                            />
                          ) : item.component ===
                            "ChoiceMatrixQuestionLayout" ? (
                            <ChoiceMatrixQuestionLayout
                            key={index}
                            questionIndex={index}
                            questionId={item.id}
                            sectionName={props.sectionName}
                            tabName={""}
                            onSaveQuestion={props.onSaveQuestion}
                            onRemoveQuestion={props.onRemoveQuestion}
                            onEditQuestion={props.onEditQuestion}
                            onNewOptionAdded={props.onNewOptionAdded}
                            multipleChoices={props.multipleChoices}
                            setMultipleChoices={props.setMultipleChoices}

                              multipleOptions={ props.multipleOptionschoiceMatric}
                              setMultipleOptions={props.setMultipleOptionschoiceMatric}
                              editorContent={props.editorContent}
                              setEditorContent={ props.setEditorContent}
                              removeAnItem={props.removeAnItem}
                              editAnItem={props.editAnItem}
                              saveAnItem={props.saveAnItem}
                            />
                          ) : item.component ===
                            "LabelImageWithDragDropLayout" ? (
                            <LabelImageWithDragDropLayout
                              key={index}
                              questionIndex={index}
                              questionId={item.id}
                              sectionName={props.sectionName}
                              tabName={""}
                              onSaveQuestion={props.onSaveQuestion}
                              onRemoveQuestion={props.onRemoveQuestion}
                              onEditQuestion={props.onEditQuestion}
                              onNewOptionAdded={props.onNewOptionAdded}
                              multipleChoices={props.multipleChoices}
                              setMultipleChoices={props.setMultipleChoices}

                              multipleOptions={ props.multipleOptionschoiceMatric}                             
                              setMultipleOptions={ props.setMultipleOptionschoiceMatric}
                              editorContent={props.editorContent}
                              setEditorContent={props.setEditorContent}
                              removeAnItem={props.removeAnItem}
                              editAnItem={props.editAnItem}
                              saveAnItem={props.saveAnItem}
                            />
                          ) : item.component ===
                            "LabelImageWithDropDownLayout" ? (
                            <LabelImageWithDropDownLayout
                              key={index}
                              questionIndex={index}
                              questionId={item.id}
                              sectionName={props.sectionName}
                              tabName={""}
                              onSaveQuestion={props.onSaveQuestion}
                              onRemoveQuestion={props.onRemoveQuestion}
                              onEditQuestion={props.onEditQuestion}
                              onNewOptionAdded={props.onNewOptionAdded}
                              multipleChoices={props.multipleChoices}
                              setMultipleChoices={props.setMultipleChoices}

                              multipleOptions={ props.multipleOptionschoiceMatric}
                              setMultipleOptions={ props.setMultipleOptionschoiceMatric}
                              editorContent={props.editorContent}
                              setEditorContent={ props.setEditorContent}
                              removeAnItem={props.removeAnItem}
                              editAnItem={props.editAnItem}
                              saveAnItem={props.saveAnItem}
                            />
                          ) : item.component === "LabelImageWithTextLayout" ? (
                            <LabelImageWithTextLayout
                              key={index}
                              questionIndex={index}
                              questionId={item.id}
                              sectionName={props.sectionName}
                              tabName={""}
                              onSaveQuestion={props.onSaveQuestion}
                              onRemoveQuestion={props.onRemoveQuestion}
                              onEditQuestion={props.onEditQuestion}
                              onNewOptionAdded={props.onNewOptionAdded}
                              multipleChoices={props.multipleChoices}
                              setMultipleChoices={props.setMultipleChoices}

                              multipleOptions={ props.multipleOptionschoiceMatric }
                              setMultipleOptions={ props.setMultipleOptionschoiceMatric}
                              editorContent={props.editorContent}
                              setEditorContent={ props.setEditorContent}
                              removeAnItem={props.removeAnItem}
                              editAnItem={props.editAnItem}
                              saveAnItem={props.saveAnItem}
                            />
                          ) : item.component === "EssayWithRichTextLayout" ? (
                            <EssayWithRichTextLayout
                            key={index}
                            questionIndex={index}
                              questionId={item.id}
                              sectionName={props.sectionName}
                              tabName={""}
                              onSaveQuestion={props.onSaveQuestion}
                              onRemoveQuestion={props.onRemoveQuestion}
                              onEditQuestion={props.onEditQuestion}
                              onNewOptionAdded={props.onNewOptionAdded}
                              multipleChoices={props.multipleChoices}
                              setMultipleChoices={props.setMultipleChoices}
                              editorContent={props.editorContent}
                              setEditorContent={props.setEditorContent}

                              wordLimit={props.essayWithRichTextWordLimit}
                              setWordLimit={props.setEssayWithRichTextWordLimit}
                              wordLimitType={ props.essayWithRichTextWordLimitType}
                              setWordLimitType={ props.setEssayWithRichTextWordLimitType}
                              removeAnItem={props.removeAnItem}
                              editAnItem={props.editAnItem}
                              saveAnItem={props.saveAnItem}
                            />
                          ) : item.component === "AudioRecorderLayout" ? (
                            <AudioRecorderLayout
                            key={index}
                            questionIndex={index}
                            questionId={item.id}
                            sectionName={props.sectionName}
                            tabName={""}
                            onSaveQuestion={props.onSaveQuestion}
                            onRemoveQuestion={props.onRemoveQuestion}
                            onEditQuestion={props.onEditQuestion}
                            onNewOptionAdded={props.onNewOptionAdded}
                            multipleChoices={props.multipleChoices}
                            setMultipleChoices={props.setMultipleChoices}
                            editorContent={props.editorContent}
                            setEditorContent={props.setEditorContent}
                              
                              maximumSecond={props.audioRecorderMaximumSecond}
                              setMaximumSecond={ props.setAudioRecorderMaximumSecond}
                              playerType={props.audioRecorderPlayerType}
                              setPlayerType={props.setAudioRecorderPlayerType}
                              removeAnItem={props.removeAnItem}
                              editAnItem={props.editAnItem}
                              saveAnItem={props.saveAnItem}
                            />
                          ) : item.component === "ShortTextLayout" ? (
                            <ShortTextLayout
                            key={index}
                            questionIndex={index}
                            questionId={item.id}
                            sectionName={props.sectionName}
                            tabName={""}
                            onSaveQuestion={props.onSaveQuestion}
                            onRemoveQuestion={props.onRemoveQuestion}
                            onEditQuestion={props.onEditQuestion}
                            onNewOptionAdded={props.onNewOptionAdded}
                            multipleChoices={props.multipleChoices}
                            setMultipleChoices={props.setMultipleChoices}
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
                          ) : item.component === "EssayWithPlainTextLayout" ? (
                            <EssayWithPlainTextLayout
                            key={index}
                            questionIndex={index}
                              questionId={item.id}
                              sectionName={props.sectionName}
                              tabName={""}
                              onSaveQuestion={props.onSaveQuestion}
                              onRemoveQuestion={props.onRemoveQuestion}
                              onEditQuestion={props.onEditQuestion}
                              onNewOptionAdded={props.onNewOptionAdded}
                              multipleChoices={props.multipleChoices}
                              setMultipleChoices={props.setMultipleChoices}
                              editorContent={props.editorContent}
                              setEditorContent={props.setEditorContent}

                              wordLimit={props.essayWithPlainTextLayoutWordLimit}
                              setWordLimit={props.setEssayWithPlainTextLayoutWordLimit}
                              wordType={props.essayWithPlainTextLayoutWordType}
                              setWordType={props.setEssayWithPlainTextLayoutWordType}
                              removeAnItem={props.removeAnItem}
                              editAnItem={props.editAnItem}
                              saveAnItem={props.saveAnItem}
                            />
                          ) : item.component === "ClassificationLayout" ? (
                            <ClassificationLayout
                            key={index}
                            questionIndex={index}
                            questionId={item.id}
                            sectionName={props.sectionName}
                            tabName={""}
                            onSaveQuestion={props.onSaveQuestion}
                            onRemoveQuestion={props.onRemoveQuestion}
                            onEditQuestion={props.onEditQuestion}
                            onNewOptionAdded={props.onNewOptionAdded}
                            multipleChoices={props.multipleChoices}
                            setMultipleChoices={props.setMultipleChoices}
                            editorContent={props.editorContent}
                            setEditorContent={props.setEditorContent}

                             multipleOptions={props.classificationColumnTitles}
                              setMultipleOptions={ props.setClassificationColumnTitles }
                              columnCount={props.classificationColumnCount}
                              setColumnCount={ props.setClassificationColumnCount}
                              rowCount={props.classificationRowCount}
                              setRowCount={props.setClassificationRowCount}
                              removeAnItem={props.removeAnItem}
                              editAnItem={props.editAnItem}
                              saveAnItem={props.saveAnItem}
                            />
                          ) : item.component === "MatchListLayout" ? (
                            <MatchListLayout
                            key={index}
                            questionIndex={index}
                            questionId={item.id}
                            sectionName={props.sectionName}
                            tabName={""}
                            onSaveQuestion={props.onSaveQuestion}
                            onRemoveQuestion={props.onRemoveQuestion}
                            onEditQuestion={props.onEditQuestion}
                            onNewOptionAdded={props.onNewOptionAdded}
                            multipleChoices={props.multipleChoices}
                            setMultipleChoices={props.setMultipleChoices}
                            editorContent={props.editorContent}
                            setEditorContent={props.setEditorContent}

                              multipleOptions={props.matchListStimulusList}
                              setMultipleOptions={ props.setMatchListStimulusList}
                              removeAnItem={props.removeAnItem}
                              editAnItem={props.editAnItem}
                              saveAnItem={props.saveAnItem}
                            />
                          ) : item.component === "OrderListLayout" ? (
                            <OrderListLayout
                            key={index}
                            questionIndex={index}
                            questionId={item.id}
                            sectionName={props.sectionName}
                            tabName={""}
                            onSaveQuestion={props.onSaveQuestion}
                            onRemoveQuestion={props.onRemoveQuestion}
                            onEditQuestion={props.onEditQuestion}
                            onNewOptionAdded={props.onNewOptionAdded}
                            multipleChoices={props.multipleChoices}
                            setMultipleChoices={props.setMultipleChoices}
                            editorContent={props.editorContent}
                            setEditorContent={props.setEditorContent}

                              removeAnItem={props.removeAnItem}
                              editAnItem={props.editAnItem}
                              saveAnItem={props.saveAnItem}
                            />
                          ) : item.component ===
                            "ClozeWithDragAndDropLayout" ? (
                            <ClozeWithDragAndDropLayout
                            key={index}
                            questionIndex={index}
                            questionId={item.id}
                            sectionName={props.sectionName}
                            tabName={""}
                            onSaveQuestion={props.onSaveQuestion}
                            onRemoveQuestion={props.onRemoveQuestion}
                            onEditQuestion={props.onEditQuestion}
                            onNewOptionAdded={props.onNewOptionAdded}
                            multipleChoices={props.multipleChoices}
                            setMultipleChoices={props.setMultipleChoices}
                            editorContent={props.editorContent}
                            setEditorContent={props.setEditorContent}

                              templateMarkup={ props.clozeWithDragAndDropTemplateMarkup}
                              setTemplateMarkup={ props.setClozeWithDragAndDropTemplateMarkup}
                              removeAnItem={props.removeAnItem}
                              editAnItem={props.editAnItem}
                              saveAnItem={props.saveAnItem}
                            />
                          ) : item.component === "ClozeWithDropDownLayout" ? (
                            <ClozeWithDropDownLayout
                            key={index}
                            questionIndex={index}
                            questionId={item.id}
                            sectionName={props.sectionName}
                            tabName={""}
                            onSaveQuestion={props.onSaveQuestion}
                            onRemoveQuestion={props.onRemoveQuestion}
                            onEditQuestion={props.onEditQuestion}
                            onNewOptionAdded={props.onNewOptionAdded}
                            multipleChoices={props.multipleChoices}
                            setMultipleChoices={props.setMultipleChoices}
                            editorContent={props.editorContent}
                            setEditorContent={props.setEditorContent}

                              templateMarkup={ props.clozeWithDropDownTemplateMarkup }
                              setTemplateMarkup={ props.setClozeWithDropDownTemplateMarkup}
                              removeAnItem={props.removeAnItem}
                              editAnItem={props.editAnItem}
                              saveAnItem={props.saveAnItem}
                            />
                          ) : item.component === "ClozeWithTextLayout" ? (
                            <ClozeWithTextLayout
                            key={index}
                            questionIndex={index}
                            questionId={item.id}
                            sectionName={props.sectionName}
                            tabName={""}
                            onSaveQuestion={props.onSaveQuestion}
                            onRemoveQuestion={props.onRemoveQuestion}
                            onEditQuestion={props.onEditQuestion}
                            onNewOptionAdded={props.onNewOptionAdded}
                            multipleChoices={props.multipleChoices}
                            setMultipleChoices={props.setMultipleChoices}
                            editorContent={props.editorContent}
                            setEditorContent={props.setEditorContent} 

                              templateMarkup={props.clozeWithTextTemplateMarkup}
                              setTemplateMarkup={ props.setClozeWithTextTemplateMarkup }
                              matchAllResponses={ props.clozeWithTextMatchAllResponses}
                              setMatchAllResponses={ props.setClozeWithTextMatchAllResponses}
                              removeAnItem={props.removeAnItem}
                              editAnItem={props.editAnItem}
                              saveAnItem={props.saveAnItem}
                            />
                          ) : (
                            <p>
                             This Component doesn't exist...
                            </p>
                          )}
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

export default SimpleSection;
