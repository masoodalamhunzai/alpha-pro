import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import WYSIWYGEditor from "app/shared-components/WYSIWYGEditor";
import Icon from "@material-ui/core/Icon";
import Paper from "@mui/material/Paper";
import { Controller, useForm } from "react-hook-form";
import _ from "@lodash";
import ChoiceMatrixDraggableItem from "./ChoiceMatrixDraggableItem";
import ChoiceMatrixDraggableOption from "./ChoiceMatrixDraggableOption";

const defaultValues = { name: "", email: "", subject: "", message: "" };

const ChoiceMatrixQuestionLayout = (props) => {
  const { control } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const [optionsList, setOptionsList] = useState([]);
  useEffect(() => {
    var temp = [];
    props.multipleOptions.map((item) => {
      temp.push({ value: item.position, label: item.title });
    });
    setOptionsList(temp);
  }, [props.multipleOptions]);
  console.log("props.multipleOptions:", props.multipleOptions);

  function onNewOptionAdded(index) {
    const option = {
      id: `item-${index + 1}`,
      position: index,
      title: "",
      isCorrect: false,
      isAlternate: false,
    };
    let choices = [];
    choices = props.multipleChoices;
    choices.push(option);
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
    choices = props.multipleOptions;
    choices.push(option);
    props.setMultipleOptions(choices);
  }
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
          className="p-3 bg bg-blue bg-blue-600"
          style={{
            padding: "2px 24px 24px 4px",
            color: "white",
          }}
          size="small"
        >
          edit
        </Icon>
      </div>
      <form className="px-0 sm:px-24 ">
        <div className="mb-24 flex justify-between flex-wrap wrap">
          <h2 className="pose-h2 font-bold tracking-tight">
            Choice Matrix - standard
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
                setEditorContent={props.setEditorContent}
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

          <ChoiceMatrixDraggableItem
            onNewOptionAdded={onNewOptionAdded}
            multipleChoices={props.multipleChoices}
            setMultipleChoices={props.setMultipleChoices}
            optionsList={optionsList}
          />

          <ChoiceMatrixDraggableOption
            onNewOptionAdded={onOptionAdded}
            multipleChoices={props.multipleOptions}
            setMultipleChoices={props.setMultipleOptions}
          />
        </div>
      </form>
    </Paper>
  );
};

export default ChoiceMatrixQuestionLayout;
