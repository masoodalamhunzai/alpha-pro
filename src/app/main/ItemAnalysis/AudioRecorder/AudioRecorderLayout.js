import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import WYSIWYGEditor from "app/shared-components/WYSIWYGEditor";
import Icon from "@material-ui/core/Icon";
import Paper from "@mui/material/Paper";
import { Save, Close } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import _ from "@lodash";
import { TextField, Checkbox } from "@mui/material";
import Switch from "app/shared-components/Switch";
import { primaryBlueColor } from "app/services/Settings";
import MenuItem from "@mui/material/MenuItem";
import { useStateValue } from "app/services/state/State";
import { useSelector } from "react-redux";
import { EditorState, convertFromRaw } from "draft-js";

const defaultValues = { name: "", email: "", subject: "", message: "" };

const propsType = [
  /*  "editorContent={audioRecorderEditorContent}",
  "setEditorContent={setAudioRecorderEditorContent}",
  "maximumSecond={audioRecorderMaximumSecond}",
  "setMaximumSecond={setAudioRecorderMaximumSecond}",
  "playerType={audioRecorderPlayerType}",
  "setPlayerType={setAudioRecorderPlayerType}", */
  "removeAnItem={removeAnItem}",
  "editAnItem={removeAnItem}",
  "saveAnItem={saveAnItem}",
];

const AudioRecorderLayout = (props) => {
  const itemQuestionsList = useSelector(({ alpha }) => alpha.item.questions);
  //Audio recorder Layout starts

  const [editorContent, setEditorContent] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [maximumSecond, setMaximumSecond] = useState(1);
  const [playerType, setPlayerType] = useState("");

  //audio recorder Layout ends

  const { control } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const optionsList = [
    {
      value: 1,
      label: "Always visible",
    },
    {
      value: 2,
      label: "On limit",
    },
    {
      value: 3,
      label: "Off",
    },
  ];

  useEffect(() => {
    if (props.questionId != null) {
      const _filteredQuestion =
        itemQuestionsList &&
        itemQuestionsList.length > 0 &&
        itemQuestionsList.find((q) => q.id == props.questionId);
      console.log("filteredQuestion in audio recorder  ", _filteredQuestion);
      if (_filteredQuestion) {
        console.log(
          "_filteredQuestion.description in audio recorder ",
          _filteredQuestion.description
        );
        const convertedState = convertFromRaw(
          JSON.parse(_filteredQuestion.description)
        );
        const _editorValue = EditorState.createWithContent(convertedState);
        setEditorState(_editorValue);

        setEditorContent(_filteredQuestion.description);

        props.setEditorContent(_filteredQuestion.description);
        props.setMultipleChoices([{ data: "no data found" }]);
        if (_filteredQuestion.questionConfig) {
          const _config = JSON.parse(_filteredQuestion.questionConfig);
          if (_config) {
            setMaximumSecond(_config.maximumSecond);
            setPlayerType(_config.playerType);
          }
        }
      }
    } else {
      props.setMultipleChoices([{ data: "no data found" }]);
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
            } else {
              const itemObject =
                props.questionId != null
                  ? {
                      id: props.questionId,
                      description: editorContent,
                      options: [{}],
                      questionType: "audio-recorder-question",
                      questionConfig: JSON.stringify({
                        maximumSecond: maximumSecond,
                        playerType: playerType,
                      }),
                      position: props.questionIndex,
                    }
                  : {
                      description: editorContent,
                      options: [{}],
                      questionType: "audio-recorder-question",
                      questionConfig: JSON.stringify({
                        maximumSecond: maximumSecond,
                        playerType: playerType,
                      }),
                      position: props.questionIndex,
                    };
              props.onSaveQuestion(
                props.sectionName,
                props.tabName,
                props.questionId,
                props.questionIndex,
                "audio-recorder-question",
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
          <h2 className="pose-h2 font-bold tracking-tight">Audio recorder</h2>
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

          <div className="grid gap-4 grid-cols-2">
            <div className="pr-12">
              <TextField
                style={{ width: "100%" }}
                id="outlined-select-currency"
                select
                label="Player type"
                value={playerType}
                onChange={(e) => {
                  setPlayerType(e.target.value);
                }}
                // helperText="Correct Ans"
              >
                {optionsList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className="pl-12">
              <TextField
                className="mx-6"
                style={{ width: "100%" }}
                inputProps={{
                  style: {
                    height: "5",
                  },
                }}
                size="large"
                required
                id="outlined-required"
                label={"Maximum length (seconds)"}
                value={maximumSecond}
                onChange={(e) => {
                  setMaximumSecond(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </Paper>
  );
};

export default AudioRecorderLayout;
