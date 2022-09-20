import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import WYSIWYGEditor from "app/shared-components/WYSIWYGEditor";
import Icon from "@material-ui/core/Icon";
import Paper from "@mui/material/Paper";
import { Controller, useForm } from "react-hook-form";
import _ from "@lodash";
import { TextField, Checkbox } from "@mui/material";
import Switch from "app/shared-components/Switch";
import { primaryBlueColor } from "app/services/Settings";
import StimulusListDraggableItem from "./StimulusListDraggableItem";
import PossibleResponsesDraggableItem from "./PossibleResponsesDraggableItem";
import { useStateValue } from "app/services/state/State";
import { useSelector } from "react-redux";
import { EditorState, convertFromRaw } from "draft-js";

const defaultValues = { name: "", email: "", subject: "", message: "" };

const propsType = [
  /*  "multipleChoices",
  "setMultipleChoices",
  "multipleOptions",
  "setMultipleOptions",
  "editorContent",
  "setEditorContent", */
];

const MatchListLayout = (props) => {
  const itemQuestionsList = useSelector(({ alpha }) => alpha.item.questions);
  //MatchList Layout Starts
  const [groupPossibleResponses, setGroupPossibleResponses] = useState(false);
  const [trueFalseShuffleOption, setTrueFalseShuffleOption] = useState(false);
  const [trueFalseShowDragHandle, setTrueFalseShowDragHandle] = useState(false);
  const [trueFalseDuplicateResponse, setTrueFalseDuplicateResponse] =
    useState(false);

  const [editorContent, setEditorContent] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [multipleChoices, setMultipleChoices] = useState([
    {
      id: `item-1}`,
      position: 0,
      title: "Test1",
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-2`,
      position: 1,
      title: "Test2",
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-3`,
      position: 2,
      title: "Test3",
      isCorrect: false,
      isAlternate: false,
    },
  ]);
  const [multipleOptions, setMultipleOptions] = useState([
    {
      id: `item-1}`,
      position: 0,
      title: "Item1",
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-2`,
      position: 1,
      title: "Item2",
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-3`,
      position: 2,
      title: "Item2",
      isCorrect: false,
      isAlternate: false,
    },
  ]);

  //MatchList Layout Ends
  const { control } = useForm({
    mode: "onChange",
    defaultValues,
  });
  const [annotations, setAnnotations] = useState([]);
  const [annotation, setAnnotation] = useState({});

  const onChange = (newAnnotation) => {
    setAnnotation(newAnnotation);
  };

  const onSubmit = (newAnnotation) => {
    const { geometry, data } = newAnnotation;

    console.log("annotation", newAnnotation);
    console.log("annotations", annotations);
    setAnnotation({});
    setAnnotations(
      annotations.concat({
        geometry,
        data: {
          ...data,
          id: Math.random(),
        },
      })
    );
  };

  const [optionsList, setOptionsList] = useState([]);
  useEffect(() => {
    var temp = [];
    multipleOptions.map((item) => {
      temp.push({ value: item.position, label: item.title });
    });
    setOptionsList(temp);
  }, [multipleOptions]);
  /* const optionsList = [
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
  ]; */
  console.log("multipleOptions:", multipleOptions);

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
    props.setMultipleChoices(choices);
  }

  function onOptionAdded(index) {
    const option = {
      id: `item-${index + 1}`,
      position: index,
      title: "",
      isCorrect: false,
      isAlternate: false,
    };
    let choices = [];
    choices = multipleOptions;
    choices.push(option);
    setMultipleOptions(choices);
    // props.setMultipleChoices(choices);
  }

  useEffect(() => {
    if (props.questionId != null) {
      const _filteredQuestion =
        itemQuestionsList &&
        itemQuestionsList.length > 0 &&
        itemQuestionsList.find((q) => q.id == props.questionId);
      console.log("filteredQuestion in Match List ", _filteredQuestion);
      if (_filteredQuestion) {
        console.log(
          "_filteredQuestion.description in Match List ",
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
            setMultipleOptions(_config.multipleOption);

            setGroupPossibleResponses(_config.groupPossibleResponsesRadio);
            setTrueFalseShuffleOption(_config.shuffleOptions);
            setTrueFalseShowDragHandle(_config.showDragHandleRadio);
            setTrueFalseDuplicateResponse(_config.duplicateResponse);
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
                      questionType: "match-list-question",
                      questionConfig: JSON.stringify({
                        multipleOption: multipleOptions,

                        groupPossibleResponsesRadio: groupPossibleResponses,
                        showDragHandleRadio: trueFalseShowDragHandle,
                        duplicateResponse: trueFalseDuplicateResponse,
                        shuffleOptions: trueFalseShuffleOption,
                      }),
                      position: props.questionIndex,
                    }
                  : {
                      description: editorContent,
                      options: multipleChoices,
                      questionType: "match-list-question",
                      questionConfig: JSON.stringify({
                        multipleOption: multipleOptions,

                        groupPossibleResponsesRadio: groupPossibleResponses,
                        showDragHandleRadio: trueFalseShowDragHandle,
                        duplicateResponse: trueFalseDuplicateResponse,
                        shuffleOptions: trueFalseShuffleOption,
                      }),
                      position: props.questionIndex,
                    };
              console.log("Json going to save", itemObject);
              props.onSaveQuestion(
                props.sectionName,
                props.tabName,
                props.questionId,
                props.questionIndex,
                "match-list-question",
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
          <h2 className="pose-h2 font-bold tracking-tight">Match list</h2>
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

          <div className="flex">
            <div className="my-4 mr-12 flex justify-between items-center">
              <label>Group possible responses</label>
              <Switch
                checked={groupPossibleResponses}
                onChange={() =>
                  setGroupPossibleResponses(!groupPossibleResponses)
                }
              />
            </div>
          </div>

          <div class="grid gap-4 grid-cols-2">
            {" "}
            <div>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "gray",
                  fontWeight: 700,
                  mt: 2,
                }}
              >
                Stimulus list
              </Typography>

              <StimulusListDraggableItem
                onNewOptionAdded={onOptionAdded}
                multipleChoices={multipleOptions}
                setMultipleChoices={setMultipleOptions}
                optionsList={optionsList}
              />
            </div>
            <div>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "gray",
                  fontWeight: 700,
                  mt: 2,
                }}
              >
                Possible Responses
              </Typography>

              <PossibleResponsesDraggableItem
                onNewOptionAdded={onNewOptionAdded}
                multipleChoices={multipleChoices}
                setMultipleChoices={setMultipleChoices}
                optionsList={optionsList}
              />
            </div>
          </div>

          <div className="flex items-center flex-wrap">
            <div className="my-4 mr-12 flex justify-between items-center">
              <label>Duplicate responses</label>
              <Switch
                checked={trueFalseDuplicateResponse}
                onChange={() =>
                  setTrueFalseDuplicateResponse(!trueFalseDuplicateResponse)
                }
              />
            </div>

            <div className="my-4 mr-12 flex justify-between items-center">
              <label>Drag handle</label>
              <Switch
                checked={trueFalseShowDragHandle}
                onChange={() =>
                  setTrueFalseShowDragHandle(!trueFalseShowDragHandle)
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

export default MatchListLayout;
