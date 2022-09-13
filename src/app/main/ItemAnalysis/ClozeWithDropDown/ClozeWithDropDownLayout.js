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
import ClozeWithDropDownDraggableItem from "./ClozeWithDropDownDraggableItem";
import { defaultProps } from "velocity-react/velocity-component";

const defaultValues = { name: "", email: "", subject: "", message: "" };

const props = [
  "multipleChoices={clozeWithDropDownMultipleChoices}",
  "setMultipleChoices={setClozeWithDropDownMultipleChoices}",
  "editorContent={clozeWithDropDownEditorContent}",
  "setEditorContent={setClozeWithDropDownEditorContent}",
  "templateMarkup={clozeWithDropDownTemplateMarkup}",
  "setTemplateMarkup={setClozeWithDropDownTemplateMarkup}",
];

const ClozeWithDropDownLayout = (props) => {
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

  function onNewOptionAdded(index) {
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
      /* id: `item-${index + 1}`,
      position: index,
      title: "",
      isCorrect: false,
      isAlternate: false, */
    };
    let choices = [];
    choices = props.multipleChoices;
    choices.push(option);
    props.setMultipleChoices(choices);
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
                setEditorContent={props.setEditorContent}
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
                props.setTemplateMarkup(e.target.value);
              }}
              value={props.templateMarkup}
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
            Possible Responses
          </Typography>

          <div className="grid gap-8 grid-cols-2">
            {props.multipleChoices &&
              props.multipleChoices.map((item, index) => {
                return (
                  <div
                    style={{
                      padding: "20px",
                      backgroundColor: "#e9f3ff",
                      borderRadius: "10px",
                    }}
                  >
                    <h3>Responses {index + 1}</h3>
                    <ClozeWithDropDownDraggableItem
                      object={item}
                      objectIndex={index}
                      multipleChoices={props.multipleChoices}
                      setMultipleChoices={props.setMultipleChoices}
                      optionsList={optionsList}
                    />
                  </div>
                );
              })}
          </div>

          <div className="flex items-center flex-wrap">
            <div className="my-4 mr-12 flex justify-between items-center">
              <label>Match All Possible Responses</label>
              <Switch />
            </div>

            <div className="my-4 mr-12 flex justify-between items-center">
              <label>Shuffle options</label>
              <Switch />
            </div>
          </div>
        </div>
      </form>
    </Paper>
  );
};

export default ClozeWithDropDownLayout;