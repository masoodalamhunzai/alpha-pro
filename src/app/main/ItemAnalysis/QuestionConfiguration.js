import { useState } from "react";

import Typography from "@mui/material/Typography";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import {
  ExpandMore as ExpandMoreIcon,
  KeyboardArrowRight,
  List,
  BorderColor,
  SyncAlt,
  FlipToBack,
} from "@material-ui/icons";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import DraggableBox from "./DraggableBox";

function QuestionConfiguration(props) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <div style={{ width: "100%" }}>
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
              expandIcon={<ExpandMoreIcon />}
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
                  <DraggableBox
                    title="Standard"
                    component="CreateQuestion"
                    handleComponentDragDrop={props.handleComponentDragDrop}
                  />
                  <DraggableBox
                    title="Multiple Responses"
                    component="multipleResponses"
                    handleComponentDragDrop={props.handleComponentDragDrop}
                  />
                  <DraggableBox
                    title="True Or False"
                    component="TrueFalseQuestionLayout"
                    handleComponentDragDrop={props.handleComponentDragDrop}
                  />
                  <DraggableBox
                    title="Block Layout"
                    component="4"
                    handleComponentDragDrop={props.handleComponentDragDrop}
                  />
                  <DraggableBox
                    title="Ch Matrix Std"
                    component="ChoiceMatrixQuestionLayout"
                    handleComponentDragDrop={props.handleComponentDragDrop}
                  />
                  <DraggableBox
                    title="Label Image with drag & drop"
                    component="LabelImageWithDragDropLayout"
                    handleComponentDragDrop={props.handleComponentDragDrop}
                  />
                  <DraggableBox
                    title="Label Image with drop-down"
                    component="LabelImageWithDropDownLayout"
                    handleComponentDragDrop={props.handleComponentDragDrop}
                  />
                  <DraggableBox
                    title="Label Image with text"
                    component="LabelImageWithTextLayout"
                    handleComponentDragDrop={props.handleComponentDragDrop}
                  />
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
              <div className="w-full">
                <div className="flex flex-wrap">
                  <DraggableBox
                    title="Cloze With Drag & Drop"
                    component="ClozeWithDragAndDropLayout"
                    handleComponentDragDrop={props.handleComponentDragDrop}
                  />
                  <DraggableBox
                    title="Cloze With Drop Down"
                    component="ClozeWithDropDownLayout"
                    handleComponentDragDrop={props.handleComponentDragDrop}
                  />
                  <DraggableBox
                    title="Cloze With Text"
                    component="ClozeWithTextLayout"
                    handleComponentDragDrop={props.handleComponentDragDrop}
                  />
                </div>
              </div>
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
              <div className="w-full">
                <div className="flex flex-wrap">
                  <DraggableBox
                    title="Classification"
                    component="ClassificationLayout"
                    handleComponentDragDrop={props.handleComponentDragDrop}
                  />
                  <DraggableBox
                    title="Match List"
                    component="MatchListLayout"
                    handleComponentDragDrop={props.handleComponentDragDrop}
                  />
                  <DraggableBox
                    title="Order List"
                    component="OrderListLayout"
                    handleComponentDragDrop={props.handleComponentDragDrop}
                  />
                </div>
              </div>
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
              <div className="w-full">
                <div className="flex flex-wrap">
                  <DraggableBox
                    title="Essay With Plain Text"
                    component="EssayWithPlainTextLayout"
                    handleComponentDragDrop={props.handleComponentDragDrop}
                  />
                  <DraggableBox
                    title="Short Text"
                    component="ShortTextLayout"
                    handleComponentDragDrop={props.handleComponentDragDrop}
                  />
                  <DraggableBox
                    title="Audio Recorder"
                    component="AudioRecorderLayout"
                    handleComponentDragDrop={props.handleComponentDragDrop}
                  />

                  <DraggableBox
                    title="Essay With Rich Text"
                    component="EssayWithRichTextLayout"
                    handleComponentDragDrop={props.handleComponentDragDrop}
                  />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default QuestionConfiguration;
