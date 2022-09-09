import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "app/shared-components/Switch";
import {
  TextField,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { primaryBlueColor, primaryGrayColor } from "app/services/Settings";
import DraggableDistractor from "./DraggableDistractor";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: 20,
  },

  buttonsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonGrey: {
    background: "grey",
    color: "#fff",
    marginLeft: 5,
    padding: "2px 15px",
    borderRadius: "20px",
    "&:hover": { backgroundColor: primaryBlueColor },
  },
  btnSelected: {
    backgroundColor: primaryBlueColor,
    color: "#fff",
    marginLeft: 5,
    padding: "2px 15px",
    borderRadius: "20px",
  },
}));

function QuestionOptions(props) {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();
  const [numberOfColumn, setNumberOfColumn] = useState(1);
  const [orientation, setOrientation] = useState("Horizantal");

  const scoringTypesList = [
    {
      value: 1,
      label: "Exact match",
    },
    {
      value: 2,
      label: "Partial match per response",
    },
    {
      value: 3,
      label: "Partial match",
    },
  ];

  const styleList = [
    {
      value: 1,
      label: "Standard",
    },
    {
      value: 2,
      label: "Block",
    },
    {
      value: 3,
      label: "Radio button under option",
    },
  ];

  const fontSizeList = [
    {
      value: 1,
      label: "Small",
    },
    {
      value: 2,
      label: "Normal",
    },
    {
      value: 3,
      label: "Large",
    },
    {
      value: 4,
      label: "Extra large",
    },
    {
      value: 5,
      label: "Huge",
    },
  ];

  const [multipleChoices, setMultipleChoices] = useState([]);
  function onNewOptionAdded(index) {
    const option = {
      id: `item-${index + 1}`,
      position: index,
      title: "",
      isCorrect: false,
      isAlternate: false,
    };
    let choices = [];
    choices = multipleChoices;
    choices.push(option);
    setMultipleChoices(choices);
  }
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <div style={{ width: "100%" }}>
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
              <h6 className="">Scoring</h6>
            </AccordionSummary>
            <AccordionDetails>
              <div className="w-full">
                <div className="mb-4 flex justify-between items-center">
                  <label>Unscored/Practice usage</label>
                  <Switch />
                </div>

                <div className="my-4">
                  <TextField
                    className="mx-6"
                    style={{ width: "100%" }}
                    inputProps={{
                      style: {
                        backgroundColor: "white",
                        fontSize: "13px",
                      },
                    }}
                    size="small"
                    required
                    defaultValue={0}
                    id="outlined-required"
                    label="Penality point(s)"
                    focused
                  />
                </div>

                <div className="my-4 flex justify-between items-center">
                  <label>Check answer button</label>
                  <Switch />
                </div>

                <div className="my-4">
                  <TextField
                    className="mx-6"
                    style={{ width: "100%" }}
                    inputProps={{
                      style: {
                        backgroundColor: "white",
                        fontSize: "13px",
                      },
                    }}
                    size="small"
                    required
                    defaultValue={0}
                    id="outlined-required"
                    label="Check answer attempts"
                    focused
                  />
                </div>

                <div className="mt-4">
                  <TextField
                    style={{
                      backgroundColor: "white",
                      width: "100%",
                      marginTop: "7%",
                    }}
                    id="outlined-select-currency"
                    size="small"
                    inputProps={{
                      style: {
                        backgroundColor: "white",
                        fontSize: "13px",
                      },
                    }}
                    select
                    label="Scoring Type"
                    // value={answer}
                    onChange={(e) => {
                      console.log("score type", e.target.value);
                    }}
                    // helperText="Correct Ans"
                  >
                    {scoringTypesList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>

                <div className="my-4 flex justify-between items-center">
                  <label>Enable auto scoring</label>
                  <Switch />
                </div>

                <div className="my-4">
                  <TextField
                    className="mx-6"
                    style={{ width: "100%" }}
                    inputProps={{
                      style: {
                        backgroundColor: "white",
                        fontSize: "13px",
                      },
                    }}
                    size="small"
                    required
                    defaultValue={0}
                    id="outlined-required"
                    label="Minimum score if attempted"
                    focused
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
              <h6>Layout and Selection</h6>
            </AccordionSummary>
            <AccordionDetails>
              <div className="w-full">
                <div style={{ margin: "0px 0px" }}>
                  <TextField
                    style={{
                      backgroundColor: "white",
                      width: "100%",
                      marginTop: "7%",
                    }}
                    id="outlined-select-currency"
                    size="small"
                    inputProps={{
                      style: {
                        backgroundColor: "white",
                        fontSize: "13px",
                      },
                    }}
                    select
                    label="Scoring Type"
                    // value={answer}
                    onChange={(e) => {
                      console.log("score type", e.target.value);
                    }}
                    // helperText="Correct Ans"
                  >
                    {styleList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>

                <div style={{ margin: "5px 0px" }} className="py-4">
                  <label>Number of columns</label>
                  <div style={{ margin: "5px 0px 0px 0px" }}>
                    <button
                      onClick={() => {
                        setNumberOfColumn(1);
                      }}
                      className={
                        numberOfColumn == 1
                          ? classes.btnSelected
                          : classes.buttonGrey
                      }
                    >
                      <text className="pl-3">1</text>
                    </button>
                    <button
                      onClick={() => {
                        setNumberOfColumn(2);
                      }}
                      className={
                        numberOfColumn == 2
                          ? classes.btnSelected
                          : classes.buttonGrey
                      }
                    >
                      <text className="pl-3">2</text>
                    </button>
                    <button
                      onClick={() => {
                        setNumberOfColumn(3);
                      }}
                      className={
                        numberOfColumn == 3
                          ? classes.btnSelected
                          : classes.buttonGrey
                      }
                    >
                      <text className="pl-3">3</text>
                    </button>
                    <button
                      onClick={() => {
                        setNumberOfColumn(4);
                      }}
                      className={
                        numberOfColumn == 4
                          ? classes.btnSelected
                          : classes.buttonGrey
                      }
                    >
                      <text className="pl-3">4</text>
                    </button>
                  </div>
                </div>

                <div style={{ margin: "5px 0px" }} className="py-4">
                  <label>Orientation</label>
                  <div style={{ margin: "5px 0px 0px 0px" }}>
                    <button
                      onClick={() => {
                        setOrientation("Horizantal");
                      }}
                      className={
                        orientation == "Horizantal"
                          ? classes.btnSelected
                          : classes.buttonGrey
                      }
                    >
                      <text className="pl-3">Horizantal</text>
                    </button>
                    <button
                      onClick={() => {
                        setOrientation("Vertical");
                      }}
                      className={
                        orientation == "Vertical"
                          ? classes.btnSelected
                          : classes.buttonGrey
                      }
                    >
                      <text className="pl-3">Vertical</text>
                    </button>
                  </div>
                </div>

                <div style={{ margin: "0px 0px" }}>
                  <TextField
                    style={{
                      backgroundColor: "white",
                      width: "100%",
                      marginTop: "7%",
                    }}
                    id="outlined-select-currency"
                    size="small"
                    inputProps={{
                      style: {
                        backgroundColor: "white",
                        fontSize: "13px",
                      },
                    }}
                    select
                    label="Font size"
                    // value={answer}
                    onChange={(e) => {
                      console.log("score type", e.target.value);
                    }}
                    // helperText="Correct Ans"
                  >
                    {fontSizeList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
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
              <h6>Extras</h6>
            </AccordionSummary>
            <AccordionDetails>
              <div className="w-full">
                <div className="my-4">
                  <label>Acknowledgements</label>
                  <TextField
                    className="mx-6"
                    style={{ width: "100%", marginTop: "3px" }}
                    inputProps={{
                      style: {
                        backgroundColor: "white",
                        fontSize: "13px",
                      },
                    }}
                    size="small"
                    required
                    id="outlined-required"
                  />
                </div>

                <div className="my-4">
                  <label>Distractor rationale</label>
                  <TextField
                    className="mx-6"
                    style={{ width: "100%", marginTop: "3px" }}
                    inputProps={{
                      style: {
                        backgroundColor: "white",
                        fontSize: "13px",
                      },
                    }}
                    size="small"
                    required
                    id="outlined-required"
                  />
                </div>

                <div className="my-4">
                  <label>Rubic reference</label>
                  <TextField
                    className="mx-6"
                    style={{ width: "100%", marginTop: "3px" }}
                    inputProps={{
                      style: {
                        backgroundColor: "white",
                        fontSize: "13px",
                      },
                    }}
                    size="small"
                    required
                    id="outlined-required"
                  />
                </div>

                <div className="my-4">
                  <label>Stimulus (review only)</label>
                  <TextField
                    className="mx-6"
                    style={{ width: "100%", marginTop: "3px" }}
                    inputProps={{
                      style: {
                        backgroundColor: "white",
                        fontSize: "13px",
                      },
                    }}
                    size="small"
                    required
                    id="outlined-required"
                  />
                </div>

                <div className="my-4">
                  <label>Instructor stimulus</label>
                  <TextField
                    className="mx-6"
                    style={{ width: "100%", marginTop: "3px" }}
                    inputProps={{
                      style: {
                        backgroundColor: "white",
                        fontSize: "13px",
                      },
                    }}
                    size="small"
                    required
                    id="outlined-required"
                  />
                </div>

                <div className="my-4">
                  <label>Sample answer</label>
                  <TextField
                    className="mx-6"
                    style={{ width: "100%", marginTop: "3px" }}
                    inputProps={{
                      style: {
                        backgroundColor: "white",
                        fontSize: "13px",
                      },
                    }}
                    size="small"
                    required
                    id="outlined-required"
                  />
                </div>

                <div className="my-4">
                  <label>Distractors</label>
                  <DraggableDistractor
                    onNewOptionAdded={onNewOptionAdded}
                    multipleChoices={multipleChoices}
                    setMultipleChoices={setMultipleChoices}
                  />
                </div>

                <div className="my-4">
                  <div className="flex items-center">
                    <Checkbox size="large" />
                    <label>Contains math</label>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default QuestionOptions;
