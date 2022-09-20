import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "app/services/state/State";
import { useHistory, useLocation } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import { Controller, useForm } from "react-hook-form";

// import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import _ from "@lodash";
import WYSIWYGEditor from "app/shared-components/WYSIWYGEditor";
import DraggableItem from "./DraggableItem";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { useSelector } from "react-redux";
import draftToHtml from "draftjs-to-html";
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

const useStyles = makeStyles({
  layoutRoot: {},
});

const defaultValues = { name: "", email: "", subject: "", message: "" };
/* const schema = yup.object().shape({
  name: yup.string().required('You must enter a name'),
  subject: yup.string().required('You must enter a subject'),
  message: yup.string().required('You must enter a message'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
}); */

const CreateQuestion = (props) => {
  const location = useLocation();
  const history = useHistory();
  const pageTitle = location.pathname
    .split("/")
    .filter((x) => x)[0]
    .split("-")
    .join(" ");
  const classes = useStyles();
  const itemQuestionsList = useSelector(({ alpha }) => alpha.item.questions);

  const [{ user }, dispatch] = useStateValue();
  const { control, handleSubmit, watch, formState } = useForm({
    mode: "onChange",
    defaultValues,
    // resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const form = watch();
  const [filteredQuestion, setFilteredQuestion] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [multipleChoices, setMultipleChoices] = useState([]);
  const [componentValues, setcomponentValues] = useState(itemQuestionsList);

  if (_.isEmpty(form)) {
    return null;
  }
  function onNewOptionAdded(index) {
    const option = {
      id: `item-${index + 1}`,
      position: index + 2,
      title: "",
      isCorrect: false,
      isAlternate: false,
    };
    var choices = [];
    console.log(index, multipleChoices);
    choices = multipleChoices.slice(); /* props.multipleChoices */
    choices.push(option);
    setMultipleChoices(choices);
    props.setMultipleChoices(choices);
  }
  useEffect(() => {
    if (props.questionId != null) {
      const _filteredQuestion =
        itemQuestionsList &&
        itemQuestionsList.length > 0 &&
        itemQuestionsList.find((q) => q.id == props.questionId);
      console.log("filteredQuestion in createquestion ", _filteredQuestion);
      if (_filteredQuestion) {
        console.log(
          "_filteredQuestion.description in createquestion ",
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
        props.setMultipleChoices(_filteredQuestion.options);
      }
    }

    console.log("props.questionId in createquestion ", props.questionId);
    console.log("itemQuestionsList in createquestion ", itemQuestionsList);
  }, []);
  console.log("props.selectedQuestionId ", props.selectedQuestionId);
  return (
    <>
      <Paper
        style={{
          paddingTop: "0px",
          paddingLeft: "0px",
          paddingRight: "0px",
          borderRadius: "0px",
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
                        questionType: "simple-mcqs",
                        questionConfig: JSON.stringify({ data: "" }),
                        position: props.questionIndex,
                      }
                    : {
                        description: editorContent,
                        options: multipleChoices,
                        questionType: "simple-mcqs",
                        questionConfig: JSON.stringify({ data: "" }),
                        position: props.questionIndex,
                      };
                props.onSaveQuestion(
                  props.sectionName,
                  props.tabName,
                  props.questionId,
                  props.questionIndex,
                  "simple-mcqs",
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
              props.setSelectedQuestionId(
                props.questionId != null
                  ? props.questionId
                  : props.questionIndex
              );
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
        <form className="px-0 sm:px-24 ">
          <div className="mb-24 flex justify-between flex-wrap wrap">
            <h2 className="pose-h2 font-bold tracking-tight">
              Multiple choice - standard
            </h2>
            <div>
              <button
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
                <text className="pl-3">Undo</text>
              </button>
              <button
                type="button"
                className="border border-gray border-gray-300 bg-white hover:bg-gray-100 text-gray-800 text-white font-bold py-2 px-6 rounded-full mx-4"
              >
                <text className="pl-3">Redo</text>
              </button>
              <button
                type="button"
                className="border border-gray border-gray-300 bg-white hover:bg-gray-100 text-gray-800 text-white font-bold py-2 px-6 rounded-full mx-4"
              >
                <text className="pl-3">Source</text>
              </button>
              <button
                type="button"
                className="border border-gray border-gray-300 bg-white hover:bg-gray-100 text-gray-800 text-white font-bold py-2 px-6 rounded-full mx-4"
              >
                <text className="pl-3">Preview</text>
              </button>
              <button
                type="button"
                className="border border-gray border-gray-300 bg-white hover:bg-gray-100 text-gray-800 text-white font-bold py-2 px-6 rounded-full mx-4"
              >
                <text className="pl-3">Help</text>
              </button>
            </div>
          </div>
          <div className="space-y-32">
            <Controller
              className="mt-8 mb-16"
              render={({ field }) => (
                <WYSIWYGEditor
                  setEditorContent={
                    setEditorContent /* props.setEditorContent */
                  }
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

            <DraggableItem
              onNewOptionAdded={onNewOptionAdded}
              multipleChoices={multipleChoices /* props.multipleChoices */}
              setMultipleChoices={
                setMultipleChoices /* props.setMultipleChoices */
              }
              setMultipleChoices_Main={props.setMultipleChoices}
            />
          </div>
        </form>
      </Paper>
    </>
  );
};

export default CreateQuestion;
