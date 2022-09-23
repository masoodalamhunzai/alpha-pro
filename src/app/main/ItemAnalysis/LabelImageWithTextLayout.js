import Annotation from 'react-image-annotation';
import { RectangleSelector } from 'react-image-annotation/lib/selectors';
// <Annotation type={PointSelector.TYPE} />;
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';
import Icon from '@material-ui/core/Icon';
import Paper from '@mui/material/Paper';
import { Controller, useForm } from 'react-hook-form';
import { TextField, Checkbox } from '@mui/material';
import Switch from 'app/shared-components/Switch';
import { DeleteSweep, ToggleOff, Upload } from '@mui/icons-material';
import { primaryBlueColor } from 'app/services/Settings';
import { useSelector } from 'react-redux';

import { EditorState, convertFromRaw } from 'draft-js';
import LabelImageWithTextDraggableItem from './LabelImageWithTextDraggableItem';

const defaultValues = { name: '', email: '', subject: '', message: '' };

const LabelImageWithTextLayout = (props) => {
  const htmlForId = Math.random();
  const { control } = useForm({
    mode: 'onChange',
    defaultValues,
  });
  const itemQuestionsList = useSelector(({ alpha }) => alpha.item.questions);
  const [annotations, setAnnotations] = useState([]);
  const [annotation, setAnnotation] = useState({});

  // States start
  const [trueFalseShowDashedBorder, setTrueFalseShowDashedBorder] = useState(false);
  const [trueFalseEditAriaLabel, setTrueFalseEditAriaLabel] = useState(false);

  const [imageAlternativeText, setImageAlternativeText] = useState('');
  const [textOnHover, setTextOnHover] = useState('');
  const [imageWidth, setImageWidth] = useState('');
  const [fillColor, setFillColor] = useState(false);

  const [editorContent, setEditorContent] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [multipleChoices, setMultipleChoices] = useState([
    {
      id: `item-1}`,
      position: 0,
      title: '',
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-2`,
      position: 1,
      title: '',
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-3`,
      position: 2,
      title: '',
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-4`,
      position: 3,
      title: '',
      isCorrect: false,
      isAlternate: false,
    },
  ]);
  const [multipleOptions, setMultipleOptions] = useState([
    {
      id: `item-1}`,
      position: 0,
      title: 'True',
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-2`,
      position: 1,
      title: 'False',
      isCorrect: false,
      isAlternate: false,
    },
  ]);
  // States end

  const onChange = (newAnnotation) => {
    setAnnotation(newAnnotation);
  };

  const onSubmit = (newAnnotation) => {
    const { geometry, data } = newAnnotation;

    console.log('annotation', newAnnotation);
    console.log('annotations', annotations);
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

  const [optionsList, setOptionsList] = useState([]);

  useEffect(() => {
    const temp = [];
    annotations.map((ant) => {
      temp.push({ value: ant.data.id, label: ant.data.text });
    });
    setOptionsList(temp);
  }, [annotations]);

  function onNewOptionAdded(index) {
    const option = {
      id: `item-${index + 1}`,
      position: index,
      title: '',
      isCorrect: false,
      isAlternate: false,
    };
    let choices = [];
    choices = multipleChoices;
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
      console.log('filteredQuestion in Label Image With Text ', _filteredQuestion);
      if (_filteredQuestion) {
        console.log(
          '_filteredQuestion.description in Label Image With Text ',
          _filteredQuestion.description
        );
        const convertedState = convertFromRaw(JSON.parse(_filteredQuestion.description));
        const _editorValue = EditorState.createWithContent(convertedState);
        setEditorState(_editorValue);

        setMultipleChoices(_filteredQuestion.options);
        setEditorContent(_filteredQuestion.description);

        props.setEditorContent(_filteredQuestion.description);
        props.setMultipleChoices([..._filteredQuestion.options]);

        if (_filteredQuestion.questionConfig) {
          const _config = JSON.parse(_filteredQuestion.questionConfig);
          if (_config) {
            setAnnotations(_config.annotations);
            setMultipleOptions(_config.multipleOption);
            setSelectedImageUrl(_config.imageUrl);

            setTrueFalseShowDashedBorder(_config.showDashedBorder);
            setTrueFalseEditAriaLabel(_config.editAriaLabel);
            setImageAlternativeText(_config.imageAlternativeText);
            setTextOnHover(_config.textOnHover);
            setImageWidth(_config.imageWidth);
            setFillColor(_config.fillColor);
          }
        }
      }
    } else {
      props.setMultipleChoices([...multipleChoices]);
    }
  }, []);
  const handleFillColorChange = (event) => {
    setFillColor(event.target.checked);
  };
  return (
    <Paper
      style={{
        paddingTop: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
      }}
      className="border border-blue border-2 pb-28 sm:pb-28 rounded-2xl border-blue-600"
    >
      <div className="text-right">
        <Icon
          onClick={() => {
            if (editorContent === '' || editorContent === '<p></p>\n') {
              swal({
                title: 'Error!',
                text: 'Question Description is Required!',
                icon: 'error',
                button: 'Ok!',
              });
            }
            if (multipleChoices === [] || multipleChoices.length === 0) {
              swal({
                title: 'Error!',
                text: 'Multiple Choice Options are Required!',
                icon: 'error',
                button: 'Ok!',
              });
            } else {
              const itemObject =
                props.questionId != null
                  ? {
                      id: props.questionId,
                      description: editorContent,
                      options: multipleChoices,
                      questionType: 'label-image-with-text-question',
                      questionConfig: JSON.stringify({
                        multipleOption: multipleOptions,
                        imageUrl: '',
                        annotations,
                        imageAlternativeText,
                        textOnHover,
                        imageWidth,
                        fillColor,
                        showDashedBorder: trueFalseShowDashedBorder,
                        editAriaLabel: trueFalseEditAriaLabel,
                      }),
                      position: props.questionIndex,
                    }
                  : {
                      description: editorContent,
                      options: multipleChoices,
                      questionType: 'label-image-with-text-question',
                      questionConfig: JSON.stringify({
                        multipleOption: multipleOptions,
                        imageUrl: '',
                        annotations,
                        imageAlternativeText,
                        textOnHover,
                        imageWidth,
                        fillColor,
                        showDashedBorder: trueFalseShowDashedBorder,
                        editAriaLabel: trueFalseEditAriaLabel,
                      }),
                      position: props.questionIndex,
                    };
              console.log('Json going to save', itemObject);
              props.onSaveQuestion(
                props.sectionName,
                props.tabName,
                props.questionId,
                props.questionIndex,
                'label-image-with-text-question',
                itemObject
              );
            }
          }}
          className="p-3 bg bg-green bg-green-500 hover:bg-green-700"
          style={{
            padding: '2px 24px 24px 4px',
            color: 'white',
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
            padding: '2px 24px 24px 4px',
            color: 'white',
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
            padding: '2px 24px 24px 4px',
            color: 'white',
          }}
          size="small"
        >
          close
        </Icon>
      </div>
      <form className="px-0 sm:px-24 ">
        <div className="mb-24 flex justify-between flex-wrap wrap">
          <h2 className="pose-h2 font-bold tracking-tight">Label Image With Text</h2>
          <div>
            <button className="border border-gray border-gray-300 bg-white hover:bg-gray-100 text-gray-800 text-white font-bold py-2 px-6 rounded-full mx-4">
              <Icon
                style={{
                  fontSize: '10px',
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
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: 'gray',
                fontWeight: 700,
                mt: 2,
              }}
            >
              Response Containers
            </Typography>
            <div className="flex">
              <div style={{ width: '50%', paddingRight: '1%' }}>
                <div>
                  <div
                    style={{
                      backgroundColor: primaryBlueColor,
                      borderRadius: '10px 10px 0px 0px',
                    }}
                    className="flex justify-around items-center py-12"
                  >
                    <button className="btn-white-blue py-2 px-6 rounded-full mx-4">
                      <text className="pl-3">Draw & Resize</text>
                    </button>

                    <button className="py-2 px-6 rounded-full mx-4">
                      <ToggleOff /> Pointer
                    </button>

                    <button className="py-2 px-6 rounded-full mx-4">
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
                          type={RectangleSelector.TYPE} // PointSelector,RectangleSelector,OvalSelector,
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
              <div style={{ width: '50%', paddingLeft: '1%' }}>
                <div className="">
                  <div>
                    <TextField
                      className="mx-6"
                      style={{ width: '100%' }}
                      inputProps={{
                        style: {
                          backgroundColor: 'white',
                          fontSize: '13px',
                        },
                      }}
                      value={imageAlternativeText}
                      onChange={(e) => setImageAlternativeText(e.target.value)}
                      size="small"
                      required
                      id="outlined-required"
                      label="Image Alternative Text"
                    />
                  </div>

                  <div className="mt-12">
                    <TextField
                      className="mx-6"
                      style={{ width: '100%' }}
                      inputProps={{
                        style: {
                          backgroundColor: 'white',
                          fontSize: '13px',
                        },
                      }}
                      value={textOnHover}
                      onChange={(e) => setTextOnHover(e.target.value)}
                      size="small"
                      required
                      id="outlined-required"
                      label="Text On Hover"
                    />
                  </div>

                  <div className="mt-12">
                    <TextField
                      className="mx-6"
                      style={{ width: '100%' }}
                      inputProps={{
                        style: {
                          backgroundColor: 'white',
                          fontSize: '13px',
                        },
                      }}
                      value={imageWidth}
                      onChange={(e) => setImageWidth(e.target.value)}
                      size="small"
                      required
                      id="outlined-required"
                      label="Image Width"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <label>Fill color</label>
                      <Checkbox checked={fillColor} onChange={handleFillColorChange} size="large" />
                    </div>

                    <div className="my-4 flex justify-between items-center">
                      <label>Show Dashed Border</label>
                      <Switch
                        checked={trueFalseShowDashedBorder}
                        onChange={() => setTrueFalseShowDashedBorder(!trueFalseShowDashedBorder)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="my-4 flex justify-between items-center">
                      <label>Edit ARIA Labels</label>
                      <Switch
                        checked={trueFalseEditAriaLabel}
                        onChange={() => setTrueFalseEditAriaLabel(!trueFalseEditAriaLabel)}
                      />
                    </div>
                  </div>
                  {annotations &&
                    annotations.length > 0 &&
                    annotations.map((annt, index) => {
                      return (
                        <div className={index == 0 ? '' : 'mt-12'}>
                          <TextField
                            className="mx-6"
                            style={{ width: '100%' }}
                            inputProps={{
                              style: {
                                backgroundColor: 'white',
                                fontSize: '13px',
                              },
                            }}
                            onChange={(e) => {
                              const temp = annotations.slice();
                              const tem = annt;
                              tem.data.text = e.target.value;

                              temp[index] = tem;
                              setAnnotations(temp);
                            }}
                            value={annt.data.text}
                            size="small"
                            id="outlined-required"
                            label={index + 1}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className="mt-12">
              <label htmlFor={htmlForId} className="btn-blue-white py-4 px-6 rounded-full mx-4">
                <text className="pl-3">
                  <Upload /> Upload Now
                </text>
              </label>

              <input
                style={{ display: 'none' }}
                type="file"
                id={htmlForId}
                name={htmlForId}
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => {
                  console.log(e.target.files);
                  if (e && e.target && e.target.files && e.target.files.length > 0) {
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
              color: 'gray',
              fontWeight: 700,
              mt: 2,
            }}
          >
            Correct Answsers
          </Typography>

          <LabelImageWithTextDraggableItem
            onNewOptionAdded={onNewOptionAdded}
            multipleChoices={multipleChoices}
            setMultipleChoices={setMultipleChoices}
            optionsList={optionsList}
            setMultipleChoices_Main={props.setMultipleChoices}
          />
        </div>
      </form>
    </Paper>
  );
};

export default LabelImageWithTextLayout;
