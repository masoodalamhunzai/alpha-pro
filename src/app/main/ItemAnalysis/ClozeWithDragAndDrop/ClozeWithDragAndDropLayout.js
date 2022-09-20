import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import WYSIWYGEditor from "app/shared-components/WYSIWYGEditor";
import Icon from "@material-ui/core/Icon";
import Paper from "@mui/material/Paper";
import { Controller, useForm } from "react-hook-form";
import _ from "@lodash";
import { TextField, Checkbox } from "@mui/material";
import Switch from "app/shared-components/Switch";
import { DeleteSweep, ToggleOff, Upload } from "@mui/icons-material";
import { primaryBlueColor } from "app/services/Settings";
import ClozeWithDragAndDropDraggableItem from "./ClozeWithDragAndDropDraggableItem";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useStateValue } from "app/services/state/State";
import { useSelector } from "react-redux";
import { EditorState, convertFromRaw } from "draft-js";

const defaultValues = { name: "", email: "", subject: "", message: "" };

const ClozeWithDragAndDropLayout = (props) => {
  const itemQuestionsList = useSelector(({ alpha }) => alpha.item.questions);
  //ClozeWithDragAndDrop starts
  const [groupPossibleOption, setGroupPossibleOption] = useState(false);

  const [trueFalseShuffleOption, setTrueFalseShuffleOption] = useState(false);
  const [trueFalsemultipleResponse, setTrueFalsemultipleResponse] =
    useState(false);

  const [trueFalseShowDragHandle, setTrueFalseShowDragHandle] = useState(false);
  const [trueFalseDuplicateResponse, setTrueFalseDuplicateResponse] =
    useState(false);

  const [editorContent, setEditorContent] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [templateMarkup, setTemplateMarkup] = useState("");
  const [multipleChoices, setMultipleChoices] = useState([
    {
      groupTitle: "Title 1",
      responses: [
        {
          id: `item-1}`,
          position: 0,
          choice: "",
          title: "first 1",
          isCorrect: false,
          isAlternate: false,
        },
        {
          id: `item-2}`,
          position: 1,
          choice: "",
          title: "first 2",
          isCorrect: false,
          isAlternate: false,
        },
      ],
    },
    {
      groupTitle: "Title 2",
      responses: [
        {
          id: `item-1}`,
          position: 0,
          choice: "",
          title: "second 1",
          isCorrect: false,
          isAlternate: false,
        },
        {
          id: `item-2}`,
          position: 1,
          choice: "",
          title: "second 2",
          isCorrect: false,
          isAlternate: false,
        },
      ],
    },
  ]);
  //ClozeWithDragAndDrop ends

  const { control } = useForm({
    mode: "onChange",
    defaultValues,
  });
  const optionsList = [
    {
      value: 1,
      label: "Correct",
    },
    {
      value: 2,
      label: "Alternative",
    },
    {
      value: 3,
      label: "None",
    },
  ];

  function onNewOptionAdded() {
    const option = {
      responses: [
        {
          id: `item-1}`,
          position: 0,
          choice: "",
          title: "first 1",
          isCorrect: false,
          isAlternate: false,
        },
        {
          id: `item-2}`,
          position: 1,
          choice: "",
          title: "first 2",
          isCorrect: false,
          isAlternate: false,
        },
      ],
    };
    let choices = [];
    choices = multipleChoices;
    choices.push(option);
    setMultipleChoices([...choices]);
    props.setMultipleChoices([...choices]);
  }

  useEffect(() => {
    if (props.questionId != null) {
      const _filteredQuestion =
        itemQuestionsList &&
        itemQuestionsList.length > 0 &&
        itemQuestionsList.find((q) => q.id == props.questionId);
      console.log(
        "filteredQuestion in Close with Drag and drop ",
        _filteredQuestion
      );
      if (_filteredQuestion) {
        console.log(
          "_filteredQuestion.description in Close with Drag and drop ",
          _filteredQuestion.description
        );
        const convertedState = convertFromRaw(
          JSON.parse(_filteredQuestion.description)
        );
        const _editorValue = EditorState.createWithContent(convertedState);
        setEditorState(_editorValue);

        setMultipleChoices(_filteredQuestion.options);
        setEditorContent(_filteredQuestion.description);

        props.setEditorContent(_filteredQuestion.description);
        props.setMultipleChoices([..._filteredQuestion.options]);

        if (_filteredQuestion.questionConfig) {
          const _config = JSON.parse(_filteredQuestion.questionConfig);
          if (_config) {
            setTemplateMarkup(_config.templatemarkup);

            setGroupPossibleOption(_config.groupPossibleResponsesRadio);
            setTrueFalseShuffleOption(_config.shuffleOptionRadio);
            setTrueFalsemultipleResponse(_config.multipleResponsesRadio);
            setTrueFalseShowDragHandle(_config.showDraghandleRadio);
            setTrueFalseDuplicateResponse(_config.duplicateResponsesRadio);
          }
        }
      }
    } else {
      props.setMultipleChoices([...multipleChoices]);
    }
  }, []);

  return (
    <Paper
      style={{
        paddingTop: "0px",
        paddingLeft: "0px",
        paddingRight: "0px",
      }}
      className="border border-blue border-2 pb-28 sm:pb-28 rounded-2xl border-blue-600"
    >
      <div className="text-right">
        <Icon
          onClick={() => {
            if (editorContent === "" || editorContent === "<p></p>\n") {
              swal({
                title: "Error!",
                text: "Question Description is Required!",
                icon: "error",
                button: "Ok!",
              });
            }
            if (multipleChoices === [] || multipleChoices.length === 0) {
              swal({
                title: "Error!",
                text: "Multiple Choice Options are Required!",
                icon: "error",
                button: "Ok!",
              });
            } else {
              const itemObject =
                props.questionId != null
                  ? {
                      id: props.questionId,
                      description: editorContent,
                      options: multipleChoices,
                      questionType: "close-with-drag-and-drop-question",
                      questionConfig: JSON.stringify({
                        templatemarkup: templateMarkup,
                        groupPossibleResponsesRadio: groupPossibleOption,
                        duplicateResponsesRadio: trueFalseDuplicateResponse,
                        showDraghandleRadio: trueFalseShowDragHandle,
                        multipleResponsesRadio: trueFalsemultipleResponse,
                        shuffleOptionRadio: trueFalseShuffleOption,
                      }),
                      position: props.questionIndex,
                    }
                  : {
                      description: editorContent,
                      options: multipleChoices,
                      questionType: "close-with-drag-and-drop-question",
                      questionConfig: JSON.stringify({
                        templatemarkup: templateMarkup,
                        groupPossibleResponsesRadio: groupPossibleOption,
                        duplicateResponsesRadio: trueFalseDuplicateResponse,
                        showDraghandleRadio: trueFalseShowDragHandle,
                        multipleResponsesRadio: trueFalsemultipleResponse,
                        shuffleOptionRadio: trueFalseShuffleOption,
                      }),
                      position: props.questionIndex,
                    };
              props.onSaveQuestion(
                props.sectionName,
                props.tabName,
                props.questionId,
                props.questionIndex,
                "close-with-drag-and-drop-question",
                itemObject
              );
            }
          }}
          className="p-3 bg bg-green bg-green-500 hover:bg-green-700"
          style={{
            padding: "2px 24px 24px 4px",
            color: "white",
          }}
          size="small"
        >
          save
        </Icon>

        <Icon
          onClick={() => {
            props.editAnItem();
          }}
          className="p-3 bg bg-blue bg-blue-500 hover:bg-blue-700"
          style={{
            padding: "2px 24px 24px 4px",
            color: "white",
          }}
          size="small"
        >
          edit
        </Icon>

        <Icon
          onClick={() => {
            props.onRemoveQuestion(
              props.sectionName,
              props.tabName,
              props.questionId,
              props.questionIndex
            );
          }}
          className="p-3 bg bg-red bg-red-500 hover:bg-red-700"
          style={{
            padding: "2px 24px 24px 4px",
            color: "white",
          }}
          size="small"
        >
          close
        </Icon>
      </div>
      <form className="px-0 sm:px-24 ">
        <div className="mb-24 flex justify-between flex-wrap wrap">
          <h2 className="pose-h2 font-bold tracking-tight">
            Cloze With Drag & Drop
          </h2>
          <div>
            <button className="border border-gray border-gray-300 bg-white hover:bg-gray-100 text-gray-800 text-white font-bold py-2 px-6 rounded-full mx-4">
              <Icon
                style={{
                  fontSize: "10px",
                }}
                size="small"
              >
                edit
              </Icon>
              <text className="pl-3">Undo</text>
            </button>
            <button className="border border-gray border-gray-300 bg-white hover:bg-gray-100 text-gray-800 text-white font-bold py-2 px-6 rounded-full mx-4">
              <text className="pl-3">Redo</text>
            </button>
            <button className="border border-gray border-gray-300 bg-white hover:bg-gray-100 text-gray-800 text-white font-bold py-2 px-6 rounded-full mx-4">
              <text className="pl-3">Source</text>
            </button>
            <button className="border border-gray border-gray-300 bg-white hover:bg-gray-100 text-gray-800 text-white font-bold py-2 px-6 rounded-full mx-4">
              <text className="pl-3">Preview</text>
            </button>
            <button className="border border-gray border-gray-300 bg-white hover:bg-gray-100 text-gray-800 text-white font-bold py-2 px-6 rounded-full mx-4">
              <text className="pl-3">Help</text>
            </button>
          </div>
        </div>
        <div className="space-y-32">
          <Controller
            className="mt-8 mb-16"
            render={({ field }) => (
              <WYSIWYGEditor
                setEditorContent={setEditorContent}
                editorState={editorState}
                setEditorState={setEditorState}
                setEditorContentMain={props.setEditorContent}
                {...field}
              />
            )}
            name="message"
            control={control}
          />

          <div>
            <TextField
              className="mx-6"
              style={{ width: "100%" }}
              multiline
              rows={4}
              inputProps={{
                style: {
                  height: "5",
                },
              }}
              size="large"
              required
              id="outlined-required"
              label={"Title"}
              placeholder="Template Markup"
              onChange={(e) => {
                setTemplateMarkup(e.target.value);
              }}
              value={templateMarkup}
            />
          </div>
          <div className="flex">
            <div className="my-4 mr-12 flex justify-between items-center">
              <label>Group Possible Responses</label>
              <Switch
                checked={groupPossibleOption}
                onChange={() => setGroupPossibleOption(!groupPossibleOption)}
              />
            </div>
          </div>

          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "gray",
              fontWeight: 700,
              mt: 2,
            }}
          >
            Group 1
          </Typography>

          <div>
            <div className="grid gap-8 grid-cols-1">
              {multipleChoices &&
                multipleChoices.map((item, index) => {
                  return (
                    <div
                      style={{
                        padding: "20px",
                        backgroundColor: "#e9f3ff",
                        borderRadius: "10px",
                      }}
                    >
                      <h3 style={{ marginBottom: "10px" }}>
                        Group {index + 1}
                      </h3>
                      <TextField
                        className="mt-12"
                        style={{ width: "100%" }}
                        inputProps={{
                          style: {
                            height: "5",
                          },
                        }}
                        size="large"
                        required
                        id="outlined-required"
                        label={"Title"}
                        value={item.groupTitle}
                        onChange={(e) => {
                          var tempState = [...multipleChoices];
                          var tempObject = { ...tempState[index] };

                          tempObject.groupTitle = e.target.value;
                          tempState[index] = tempObject;

                          console.log("group title", tempObject);
                          console.log("group title obj", tempState);
                          setMultipleChoices(tempState);
                          //setTemplateMarkup(e.target.value);
                        }}
                      />
                      <ClozeWithDragAndDropDraggableItem
                        object={item}
                        objectIndex={index}
                        multipleChoices={multipleChoices}
                        setMultipleChoices={setMultipleChoices}
                        optionsList={optionsList}
                      />
                    </div>
                  );
                })}
            </div>
            <div style={{ marginTop: "10px" }} className="flex items-center">
              <Fab
                onClick={() => onNewOptionAdded()}
                color="primary"
                aria-label="add"
              >
                <AddIcon />
              </Fab>
              <h6 style={{ marginLeft: "10px" }}>Add Group</h6>
            </div>
            {/* <ClozeWithDragAndDropDraggableItem
              onNewOptionAdded={onNewOptionAdded}
              multipleChoices={multipleChoices}
              setMultipleChoices={setMultipleChoices}
              optionsList={optionsList}
            />*/}
          </div>
          <div className="flex items-center flex-wrap">
            <div className="my-4 mr-12 flex justify-between items-center">
              <label>Duplicate Responses</label>
              <Switch
                checked={trueFalseDuplicateResponse}
                onChange={() =>
                  setTrueFalseDuplicateResponse(!trueFalseDuplicateResponse)
                }
              />
            </div>

            <div className="my-4 mr-12 flex justify-between items-center">
              <label>Show drag handle</label>
              <Switch
                checked={trueFalseShowDragHandle}
                onChange={() =>
                  setTrueFalseShowDragHandle(!trueFalseShowDragHandle)
                }
              />
            </div>

            <div className="my-4 mr-12 flex justify-between items-center">
              <label>Multiple Responses</label>
              <Switch
                checked={trueFalsemultipleResponse}
                onChange={() =>
                  setTrueFalsemultipleResponse(!trueFalsemultipleResponse)
                }
              />
            </div>

            <div className="my-4 mr-12 flex justify-between items-center">
              <label>Shuffle options</label>
              <Switch
                checked={trueFalseShuffleOption}
                onChange={() =>
                  setTrueFalseShuffleOption(!trueFalseShuffleOption)
                }
              />
            </div>
          </div>
        </div>
      </form>
    </Paper>
  );
};

export default ClozeWithDragAndDropLayout;
