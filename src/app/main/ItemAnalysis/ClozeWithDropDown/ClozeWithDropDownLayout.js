import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';
import Icon from '@material-ui/core/Icon';
import Paper from '@mui/material/Paper';
import { Controller, useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import Switch from 'app/shared-components/Switch';
import { useSelector } from 'react-redux';
import { EditorState, convertFromRaw } from 'draft-js';
import ClozeWithDropDownDraggableItem from './ClozeWithDropDownDraggableItem';

const defaultValues = { name: '', email: '', subject: '', message: '' };

const props = [
  'multipleChoices={clozeWithDropDownMultipleChoices}',
  'setMultipleChoices={setClozeWithDropDownMultipleChoices}',
  'editorContent={clozeWithDropDownEditorContent}',
  'setEditorContent={setClozeWithDropDownEditorContent}',
  'templateMarkup={clozeWithDropDownTemplateMarkup}',
  'setTemplateMarkup={setClozeWithDropDownTemplateMarkup}',
];

const ClozeWithDropDownLayout = (props) => {
  const itemQuestionsList = useSelector(({ alpha }) => alpha.item.questions);
  // ClozeWithDropDown starts
  const [trueFalseShuffleOption, setTrueFalseShuffleOption] = useState(false);
  const [trueFalseMatchAllPossibleResponse, setTrueFalseMatchAllPossibleResponse] = useState(false);

  const [editorContent, setEditorContent] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [templateMarkup, setTemplateMarkup] = useState('');
  const [multipleChoices, setMultipleChoices] = useState([
    {
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
    },
    {
      responses: [
        {
          id: `item-1}`,
          position: 0,
          choice: '',
          title: 'second 1',
          isCorrect: false,
          isAlternate: false,
        },
        {
          id: `item-2}`,
          position: 1,
          choice: '',
          title: 'second 2',
          isCorrect: false,
          isAlternate: false,
        },
      ],
    },
  ]);

  // ClozeWithDropDown ends

  const { control } = useForm({
    mode: 'onChange',
    defaultValues,
  });

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
      console.log('filteredQuestion in close with drop down ', _filteredQuestion);
      if (_filteredQuestion) {
        console.log(
          '_filteredQuestion.description in close with drop down ',
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
            setTemplateMarkup(_config.templatemarkup);
            setTrueFalseShuffleOption(_config.shuffleOptionRadio);
            setTrueFalseMatchAllPossibleResponse(_config.matchAllPossibleResponsesRadio);
          }
        }
      }
    } else {
      props.setMultipleChoices([...multipleChoices]);
    }
  }, []);

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
                      questionType: 'close-with-drop-down-question',
                      questionConfig: JSON.stringify({
                        templatemarkup: templateMarkup,
                        matchAllPossibleResponsesRadio: trueFalseMatchAllPossibleResponse,
                        shuffleOptionRadio: trueFalseShuffleOption,
                      }),
                      position: props.questionIndex,
                    }
                  : {
                      description: editorContent,
                      options: multipleChoices,
                      questionType: 'close-with-drop-down-question',
                      questionConfig: JSON.stringify({
                        templatemarkup: templateMarkup,
                        matchAllPossibleResponsesRadio: trueFalseMatchAllPossibleResponse,
                        shuffleOptionRadio: trueFalseShuffleOption,
                      }),
                      position: props.questionIndex,
                    };
              props.onSaveQuestion(
                props.sectionName,
                props.tabName,
                props.questionId,
                props.questionIndex,
                'close-with-drop-down-question',
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
          <h2 className="pose-h2 font-bold tracking-tight">Cloze With Drop Down</h2>
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
            <TextField
              className="mx-6"
              style={{ width: '100%' }}
              multiline
              rows={4}
              inputProps={{
                style: {
                  height: '5',
                },
              }}
              size="large"
              required
              id="outlined-required"
              label="Title"
              placeholder="Template Markup"
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
              color: 'gray',
              fontWeight: 700,
              mt: 2,
            }}
          >
            Possible Responses
          </Typography>

          <div className="grid gap-8 grid-cols-2">
            {multipleChoices &&
              multipleChoices.map((item, index) => {
                return (
                  <div
                    style={{
                      padding: '20px',
                      backgroundColor: '#e9f3ff',
                      borderRadius: '10px',
                    }}
                  >
                    <h3>Responses {index + 1}</h3>
                    <ClozeWithDropDownDraggableItem
                      object={item}
                      objectIndex={index}
                      multipleChoices={multipleChoices}
                      setMultipleChoices={setMultipleChoices}
                      optionsList={optionsList}
                    />
                  </div>
                );
              })}
          </div>
          <div className="flex items-center flex-wrap">
            <div className="my-4 mr-12 flex justify-between items-center">
              <label>Match All Possible Responses</label>
              <Switch
                checked={trueFalseMatchAllPossibleResponse}
                onChange={() =>
                  setTrueFalseMatchAllPossibleResponse(!trueFalseMatchAllPossibleResponse)
                }
              />
            </div>

            <div className="my-4 mr-12 flex justify-between items-center">
              <label>Shuffle options</label>
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

export default ClozeWithDropDownLayout;
