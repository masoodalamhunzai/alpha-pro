import Annotation from "react-image-annotation";
import {
  PointSelector,
  RectangleSelector,
  OvalSelector,
} from "react-image-annotation/lib/selectors";
//<Annotation type={PointSelector.TYPE} />;
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import WYSIWYGEditor from "app/shared-components/WYSIWYGEditor";
import Icon from "@material-ui/core/Icon";
import Paper from "@mui/material/Paper";
import { Controller, useForm } from "react-hook-form";
import _ from "@lodash";
import ChoiceMatrixDraggableItem from "./ChoiceMatrixDraggableItem";
import ChoiceMatrixDraggableOption from "./ChoiceMatrixDraggableOption";
import { TextField, Checkbox } from "@mui/material";
import Switch from "app/shared-components/Switch";
import { DeleteSweep, ToggleOff, Upload } from "@mui/icons-material";
import { primaryBlueColor } from "app/services/Settings";
import LabelImageWithDragDropDraggableItem from "./LabelImageWithDragDropDraggableItem";

const defaultValues = { name: "", email: "", subject: "", message: "" };

const LabelImageWithDragDropLayout = (props) => {
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

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
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
            Label Image With Drag & Drop
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
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "gray",
                fontWeight: 700,
                mt: 2,
              }}
            >
              Response Containers
            </Typography>
            <div className="flex">
              <div style={{ width: "50%", paddingRight: "1%" }}>
                <div>
                  <div
                    style={{
                      backgroundColor: primaryBlueColor,
                      borderRadius: "10px 10px 0px 0px",
                    }}
                    className="flex justify-around items-center py-12"
                  >
                    <button className="btn-white-blue py-2 px-6 rounded-full mx-4">
                      <text className="pl-3">Draw & Resize</text>
                    </button>

                    <button className="py-2 px-6 rounded-full mx-4 font-white-black">
                      <ToggleOff /> Pointer
                    </button>

                    <button className="py-2 px-6 rounded-full mx-4 font-white-black">
                      <DeleteSweep /> Delete
                    </button>
                  </div>

                  <div className="border border-blue">
                    {selectedImageUrl ? (
                      <>
                        <Annotation
                          src={selectedImageUrl}
                          alt="Two pebbles anthropomorphized holding hands"
                          annotations={annotations}
                          type={RectangleSelector.TYPE} //PointSelector,RectangleSelector,OvalSelector,
                          value={annotation}
                          onChange={onChange}
                          onSubmit={onSubmit}
                          allowTouch
                        />

                        {/* <img
                          src={selectedImageUrl}
                          alt="beach"
                          style={{
                            width: "100%",
                            height: "auto",
                          }}
                        /> */}
                      </>
                    ) : (
                      <>
                        {/* <img
                          src="assets/images/Home-1.png"
                          alt="beach"
                          style={{
                            width: "100%",
                            height: "auto",
                          }}
                        /> */}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ width: "50%", paddingLeft: "1%" }}>
                <div className="">
                  <div>
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
                      id="outlined-required"
                      label="Image Alternative Text"
                    />
                  </div>

                  <div className="mt-12">
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
                      id="outlined-required"
                      label="Text On Hover"
                    />
                  </div>

                  <div className="mt-12">
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
                      id="outlined-required"
                      label="Image Width"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <label>Fill color</label>
                      <Checkbox size="large" />
                    </div>

                    <div className="my-4 flex justify-between items-center">
                      <label>Show Dashed Border</label>
                      <Switch />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="my-4 flex justify-between items-center">
                      <label>Edit ARIA Labels</label>
                      <Switch />
                    </div>
                  </div>

                  <div className="">
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
                      id="outlined-required"
                      label="1"
                    />
                  </div>

                  <div className="mt-12">
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
                      id="outlined-required"
                      label="2"
                    />
                  </div>

                  <div className="mt-12">
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
                      id="outlined-required"
                      label="3"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <label
                style={{ padding: "6px 12px" }}
                htmlFor="upload-now-image"
                className="btn-blue-white py-4 px-6 rounded-full mx-4"
              >
                <text className="pl-3">
                  <Upload /> Upload Now
                </text>
              </label>

              <input
                style={{ display: "none" }}
                type="file"
                id="upload-now-image"
                name="upload-now-image"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => {
                  console.log(e.target.files);
                  if (
                    e &&
                    e.target &&
                    e.target.files &&
                    e.target.files.length > 0
                  ) {
                    setSelectedImageUrl(URL.createObjectURL(e.target.files[0]));
                    setSelectedImage(e.target.files[0]);
                    setAnnotations([]);
                    setAnnotation({});
                  }
                }}
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
            Possible Responses
          </Typography>

          <LabelImageWithDragDropDraggableItem
            onNewOptionAdded={onNewOptionAdded}
            multipleChoices={props.multipleChoices}
            setMultipleChoices={props.setMultipleChoices}
            optionsList={optionsList}
          />

          <div className="flex items-center flex-wrap">
            <div className="my-4 mr-12 flex justify-between items-center">
              <label>Duplicate Responses</label>
              <Switch />
            </div>

            <div className="my-4 mr-12 flex justify-between items-center">
              <label>Show drag handle</label>
              <Switch />
            </div>

            <div className="my-4 mr-12 flex justify-between items-center">
              <label>Multiple Responses</label>
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

export default LabelImageWithDragDropLayout;
