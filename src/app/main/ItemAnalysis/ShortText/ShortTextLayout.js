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
import MenuItem from "@mui/material/MenuItem";

const defaultValues = { name: "", email: "", subject: "", message: "" };

const propsType = [
  "editorContent={shortTextEditorContent}",
  "setEditorContent={setShortTextEditorContent}",
  "points={shortTextPoints}",
  "setPoints={setShortTextPoints}",
  "allow={shortTextAllow}",
  "setAllow={setShortTextAllow}",
  "textValue={shortTextValue}",
  "setTextValue={setShortTextValue}",
];

const ShortTextLayout = (props) => {
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
          <h2 className="pose-h2 font-bold tracking-tight">Short text</h2>
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

          <div className="grid gap-4 grid-cols-2">
            <div className="pr-12">
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
                label={"Point(s)"}
                value={props.points}
                onChange={(e) => {
                  props.setPoints(e.target.value);
                }}
              />
            </div>

            <div className="pl-12">
              <TextField
                style={{ width: "100%" }}
                id="outlined-select-currency"
                select
                label="Allow"
                // value={answer}
                onChange={(e) => {
                  props.setAllow(e.target.value);
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
          </div>

          <div className="grid gap-4 grid-cols-1">
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
              label={"Value"}
              value={props.textValue}
              onChange={(e) => {
                props.setTextValue(e.target.value);
              }}
            />
          </div>
        </div>
      </form>
    </Paper>
  );
};

export default ShortTextLayout;
