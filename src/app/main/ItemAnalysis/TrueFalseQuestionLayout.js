import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import WYSIWYGEditor from "app/shared-components/WYSIWYGEditor";
import Icon from "@material-ui/core/Icon";
import Paper from "@mui/material/Paper";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { EditorState, convertFromRaw } from "draft-js";
import TrueFalseDraggableItem from "./TrueFalseDraggableItem";
// imports for showing preview starts
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Checkbox,
  FormControlLabel,
  Radio,
} from "@mui/material";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
// imports for showing preview ends

const useStyles = makeStyles({
  layoutRoot: {},
});

const defaultValues = { name: "", email: "", subject: "", message: "" };

const TrueFalseQuestionLayout = (props) => {
  const itemQuestionsList = useSelector(({ alpha }) => alpha.item.questions);
  // trueFalse layout starts
  const [trueFalseShuffleOption, setTrueFalseShuffleOption] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [showAnswer, setShowAnswer] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [multipleChoices, setMultipleChoices] = useState([
    {
      id: `item-1`,
      position: 0,
      title: "True",
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-2`,
      position: 1,
      title: "False",
      isCorrect: false,
      isAlternate: false,
    },
  ]);
  // trueFalse layout ends

  const classes = useStyles();

  const { control } = useForm({
    mode: "onChange",
    defaultValues,
  });

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
    console.log("choices are here: ", choices);
  }

  useEffect(() => {
    if (props.questionId != null) {
      const _filteredQuestion =
        itemQuestionsList &&
        itemQuestionsList.length > 0 &&
        itemQuestionsList.find((q) => q.id == props.questionId);
      console.log("filteredQuestion in true false ", _filteredQuestion);
      if (_filteredQuestion) {
        console.log(
          "_filteredQuestion.description in true false ",
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
            setTrueFalseShuffleOption(_config.shuffleOptionRadio);
          }
        }
      }
    } else {
      props.setMultipleChoices([...multipleChoices]);
    }
  }, []);

  return (
    <>
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
                        questionType: "true-false-question",
                        questionConfig: JSON.stringify({
                          shuffleOptionRadio: trueFalseShuffleOption,
                        }),
                        position: props.questionIndex,
                      }
                    : {
                        description: editorContent,
                        options: multipleChoices,
                        questionType: "true-false-question",
                        questionConfig: JSON.stringify({
                          shuffleOptionRadio: trueFalseShuffleOption,
                        }),
                        position: props.questionIndex,
                      };
                props.onSaveQuestion(
                  props.sectionName,
                  props.tabName,
                  props.questionId,
                  props.questionIndex,
                  "true-false-question",
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
              props.onEditQuestion();
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
        {!showPreview && (
          <form className="px-0 sm:px-24 ">
            <div className="mb-24 flex justify-between flex-wrap wrap">
              <h2 className="pose-h2 font-bold tracking-tight">
                True or false
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
                <button
                  onClick={() => setShowPreview(true)}
                  type="button"
                  className="border border-gray border-gray-300 bg-white hover:bg-gray-100 text-gray-800 text-white font-bold py-2 px-6 rounded-full mx-4"
                >
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

              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "gray",
                  fontWeight: 700,
                  mt: 2,
                }}
              >
                Multiple Choice Options
              </Typography>

              <TrueFalseDraggableItem
                onNewOptionAdded={onNewOptionAdded}
                multipleChoices={multipleChoices}
                setMultipleChoices={setMultipleChoices}
                trueFalseShuffleOption={trueFalseShuffleOption}
                setTrueFalseShuffleOption={setTrueFalseShuffleOption}
                setMultipleChoices_Main={props.setMultipleChoices}
              />
            </div>
          </form>
        )}
        {showPreview && (
          <div className="px-0 sm:px-24 ">
            <div className="mb-24 flex justify-between flex-wrap wrap">
              <h2 className="pose-h2 font-bold tracking-tight">
                True or false
              </h2>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={showAnswer}
                      onChange={(e) => setShowAnswer(e.target.checked)}
                    />
                  }
                  style={{ fontSize: "14px" }}
                  label="Show Answers"
                />
                <button
                  onClick={() => setShowPreview(false)}
                  type="button"
                  className="border border-gray border-gray-300 bg-white hover:bg-gray-100 text-gray-800 text-white font-bold py-2 px-6 rounded-full mx-4"
                >
                  <Icon
                    style={{
                      fontSize: "10px",
                    }}
                    size="small"
                  >
                    edit
                  </Icon>
                  <text className="pl-3">Edit</text>
                </button>
              </div>
            </div>
            <div className="space-y-32">
              <FormControl style={{ width: "100%" }}>
                <FormLabel
                  id={`radio-buttons-group-label${props.questionIndex}`}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: draftToHtml(
                        convertToRaw(editorState.getCurrentContent())
                      ),
                    }}
                  />
                </FormLabel>
                <RadioGroup
                  aria-labelledby={`radio-buttons-group-label${props.questionIndex}`}
                  defaultValue="female"
                  name={`radio-buttons-group${props.questionIndex}`}
                >
                  {console.log("array is here:", multipleChoices)}
                  {multipleChoices &&
                    multipleChoices.map((choice, index) => {
                      return (
                        <div
                          style={{
                            width: "100%",
                            paddingLeft: "20px",
                            backgroundColor:
                              showAnswer && choice.isCorrect
                                ? "#ccffcc"
                                : "inherit",
                          }}
                        >
                          <FormControlLabel
                            value={
                              choice.isCorrect
                                ? "correct"
                                : choice.isAlternate
                                ? `alternative${index}`
                                : `none${index}`
                            }
                            control={<Radio />}
                            label={choice.title}
                          />
                        </div>
                      );
                    })}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        )}
      </Paper>
    </>
  );
};

export default TrueFalseQuestionLayout;
