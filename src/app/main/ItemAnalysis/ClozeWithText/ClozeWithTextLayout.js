import { useEffect, useState } from 'react';
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import WYSIWYGEditor from "app/shared-components/WYSIWYGEditor";
import { TextField } from "@mui/material";
import Icon from "@material-ui/core/Icon";
import Paper from "@mui/material/Paper";
import { Controller, useForm } from "react-hook-form";
import _ from "@lodash";
import ClozeWithTextDraggableItem from "./ClozeWithTextDraggableItem";
import { useStateValue } from 'app/services/state/State';

import { EditorState,convertFromRaw } from "draft-js";

const propsType = [
  /* "editorContent={clozeWithTextEditorContent}",
  "setEditorContent={setClozeWithTextEditorContent}",
  "templateMarkup={clozeWithTextTemplateMarkup}",
  "setTemplateMarkup={setClozeWithTextTemplateMarkup}",
  "matchAllResponses={clozeWithTextMatchAllResponses}",
  "setMatchAllResponses={setClozeWithTextMatchAllResponses}",
  "multipleChoices={clozeWithTextCorrectAnswer}",
  "setMultipleChoices={setClozeWithTextCorrectAnswer}", */
];

const useStyles = makeStyles({
  layoutRoot: {},
});

const defaultValues = { name: "", email: "", subject: "", message: "" };

const ClozeWithTextLayout = (props) => {
  const [{itemQuestionsList}] =useStateValue();
  //Cloze With Text Layout starts

  const [matchAllResponses, setMatchAllResponses] = useState(false);
  const [templateMarkup, setTemplateMarkup] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [multipleChoices, setMultipleChoices] = useState([
    {
      id: `item-1`,
      position: 0,
      title: "Response 1",
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-2`,
      position: 1,
      title: "Response 2",
      isCorrect: false,
      isAlternate: false,
    },
  ]);

  //Cloze With Texts Layout ends

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

  useEffect(()=>{
    if(props.questionId!=null)
    {
    const _filteredQuestion=itemQuestionsList.find(q => q.id==props.questionId);
    console.log('filteredQuestion in close with text ',_filteredQuestion);
    if(_filteredQuestion)
    {
      console.log('_filteredQuestion.description in close with text ',_filteredQuestion.description);
      const convertedState = convertFromRaw(JSON.parse(_filteredQuestion.description));
      const _editorValue = EditorState.createWithContent(convertedState);
      setEditorState(_editorValue);

      setMultipleChoices(_filteredQuestion.options);
      setEditorContent(_filteredQuestion.description);

      props.setEditorContent(_filteredQuestion.description);
      props.setMultipleChoices([..._filteredQuestion.options]);

      if(_filteredQuestion.questionConfig)
      {
        const _config=JSON.parse(_filteredQuestion.questionConfig);
        if(_config)
        {
          setMatchAllResponses(_config.matchAllPossibleResponsesRadio);
          setTemplateMarkup(_config.templatemarkup);
        }
      }
    }
    }else{
      props.setMultipleChoices([...multipleChoices]);
    }
  },[]);


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
              }else{
              const itemObject =props.questionId!=null? {
                id:props.questionId,
                description: editorContent,
                options: multipleChoices,
                questionType: "close-with-text-question",
                questionConfig:JSON.stringify({templatemarkup:templateMarkup,matchAllPossibleResponsesRadio:matchAllResponses
              }),
                position: props.questionIndex
              }:{
                description: editorContent,
                options: multipleChoices,
                questionType: "close-with-text-question",
                questionConfig:JSON.stringify({templatemarkup:templateMarkup,matchAllPossibleResponsesRadio:matchAllResponses}),
                position: props.questionIndex
              };
              props.onSaveQuestion(
                props.sectionName,
                props.tabName,
                props.questionId,
                props.questionIndex,
                "close-with-text-question",
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
              Cloze With Text
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
                <WYSIWYGEditor setEditorContent={setEditorContent}
                editorState={editorState} setEditorState={setEditorState}
                setEditorContentMain={props.setEditorContent}
                {...field} />
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
                label="Template Markup"
                onChange={(e) => {
                  setTemplateMarkup(e.target.value);
                }}
                value={templateMarkup}
              />
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
              Correct Answer
            </Typography>

            <ClozeWithTextDraggableItem
              onNewOptionAdded={onNewOptionAdded}
              multipleChoices={multipleChoices}
              setMultipleChoices={setMultipleChoices}
              matchAllResponses={matchAllResponses}
              setMatchAllResponses={setMatchAllResponses}

              setMultipleChoices_Main={props.setMultipleChoices}
            />
          </div>
        </form>
      </Paper>
    </>
  );
};

export default ClozeWithTextLayout;
