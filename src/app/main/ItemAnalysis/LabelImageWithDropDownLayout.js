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
import LabelImageWithDropDownDraggableItem from './LabelImageWithDropDownDraggableItem';

const defaultValues = { name: '', email: '', subject: '', message: '' };

const LabelImageWithDropDownLayout = (props) => {
  const htmlForId = Math.random();
  const { control } = useForm({
    mode: 'onChange',
    defaultValues,
  });
  const itemQuestionsList = useSelector(({ alpha }) => alpha.item.questions);

  // States start
  const [trueFalseShuffleOption, setTrueFalseShuffleOption] = useState(false);
  const [trueFalseMatchAllPossibleResponses, setTrueFalseMatchAllPossibleResponses] =
    useState(false);

  const [trueFalseShowDashedBorder, setTrueFalseShowDashedBorder] = useState(false);
  const [trueFalseEditAriaLabel, setTrueFalseEditAriaLabel] = useState(false);

  const [imageAlternativeText, setImageAlternativeText] = useState('');
  const [textOnHover, setTextOnHover] = useState('');
  const [imageWidth, setImageWidth] = useState('');
  const [fillColor, setFillColor] = useState(false);

  const [editorContent, setEditorContent] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [multipleChoices, setMultipleChoices] = useState([]);
  // States end

  const [annotations, setAnnotations] = useState([]);
  const [annotation, setAnnotation] = useState({});

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

    onNewOptionAdded();
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const optionsList = [
    {
      value: 1,
      label: 'Correct',
    },
    {
      value: 2,
      label: 'Alternative',
    },
    {
      value: 3,
      label: 'None',
    },
  ];

  /* function onNewOptionAdded(index) {
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
  } */

  function onNewOptionAdded(index) {
    const option = {
      responses: [
        {
          id: `item-1}`,
          position: 0,
          choice: '',
          title: 'first 1',
          isCorrect: false,
          isAlternate: false,
        },
        {
          id: `item-2}`,
          position: 1,
          choice: '',
          title: 'first 2',
          isCorrect: false,
          isAlternate: false,
        },
      ],
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
      console.log('filteredQuestion in Lable Image with Drop Down ', _filteredQuestion);
      if (_filteredQuestion) {
        console.log(
          '_filteredQuestion.description in Lable Image with Drop Down ',
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
            setAnnotations(_config.annotation);
            setSelectedImageUrl(_config.selectedImageUrl);

            setTrueFalseShuffleOption(_config.shuffleOptionRadio);
            setTrueFalseMatchAllPossibleResponses(_config.matchAllPossibleResponsesRadio);
            setTrueFalseShowDashedBorder(_config.showDashedBorderRadio);
            setTrueFalseEditAriaLabel(_config.editARIALabelsRadio);
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
                      questionType: 'label-image-with-drop-down-question',
                      questionConfig: JSON.stringify({
                        annotation: annotations,
                        selectedImageUrl: '',
                        fillColor,
                        showDashedBorderRadio: trueFalseShowDashedBorder,
                        editARIALabelsRadio: trueFalseEditAriaLabel,
                        matchAllPossibleResponsesRadio: trueFalseMatchAllPossibleResponses,
                        shuffleOptionRadio: trueFalseShuffleOption,
                        imageAlternativeText,
                        textOnHover,
                        imageWidth,
                      }),
                      position: props.questionIndex,
                    }
                  : {
                      description: editorContent,
                      options: multipleChoices,
                      questionType: 'label-image-with-drop-down-question',
                      questionConfig: JSON.stringify({
                        annotation: annotations,
                        selectedImageUrl: '',
                        fillColor,
                        showDashedBorderRadio: trueFalseShowDashedBorder,
                        editARIALabelsRadio: trueFalseEditAriaLabel,
                        matchAllPossibleResponsesRadio: trueFalseMatchAllPossibleResponses,
                        shuffleOptionRadio: trueFalseShuffleOption,
                        imageAlternativeText,
                        textOnHover,
                        imageWidth,
                      }),
                      position: props.questionIndex,
                    };
              props.onSaveQuestion(
                props.sectionName,
                props.tabName,
                props.questionId,
                props.questionIndex,
                'label-image-with-drop-down-question',
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
          <h2 className="pose-h2 font-bold tracking-tight">Label Image With Drop-Down</h2>
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
                          type={RectangleSelector.TYPE} // PointSelector,RectangleSelector,OvalSelector,
                          value={annotation}
                          onChange={onChange}
                          onSubmit={onSubmit}
                          allowTouch
                        />
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
              <label
                style={{ padding: '6px 12px' }}
                htmlFor={htmlForId}
                className="btn-blue-white py-4 px-6 rounded-full mx-4"
              >
                <text className="py-12">
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

          <div className="grid gap-8 grid-cols-2">
            {multipleChoices &&
              multipleChoices.map((item, index) => {
                return (
                  <div
                    style={{
                      padding: '20px',
                      backgroundColor: 'white', // "#e9f3ff",
                      borderRadius: '10px',
                    }}
                  >
                    <h3>Responses {index + 1}</h3>
                    <LabelImageWithDropDownDraggableItem
                      object={item}
                      objectIndex={index}
                      onNewOptionAdded={onNewOptionAdded}
                      multipleChoices={multipleChoices}
                      setMultipleChoices={setMultipleChoices}
                      optionsList={optionsList}
                    />
                  </div>
                );
              })}
          </div>

          {/* <div className="grid gap-4 grid-cols-2">
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

              <LabelImageWithDropDownDraggableItem
                onNewOptionAdded={onNewOptionAdded}
                multipleChoices={multipleChoices}
                setMultipleChoices={setMultipleChoices}
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

              <LabelImageWithDropDownDraggableItem
                onNewOptionAdded={onNewOptionAdded}
                multipleChoices={multipleChoices}
                setMultipleChoices={setMultipleChoices}
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

              <LabelImageWithDropDownDraggableItem
                onNewOptionAdded={onNewOptionAdded}
                multipleChoices={multipleChoices}
                setMultipleChoices={setMultipleChoices}
                optionsList={optionsList}
              />
            </div>
          </div> */}
          <div className="flex items-center flex-wrap">
            <div className="my-4 mr-12 flex justify-between items-center">
              <label>Match All Possible Responses</label>
              <Switch
                checked={trueFalseMatchAllPossibleResponses}
                onChange={() =>
                  setTrueFalseMatchAllPossibleResponses(!trueFalseMatchAllPossibleResponses)
                }
              />
            </div>

            <div className="my-4 mr-12 flex justify-between items-center">
              <label>Shuffle option</label>
              <Switch
                checked={trueFalseShuffleOption}
                onChange={() => setTrueFalseShuffleOption(!trueFalseShuffleOption)}
              />
            </div>
          </div>
        </div>
      </form>
    </Paper>
  );
};

export default LabelImageWithDropDownLayout;
