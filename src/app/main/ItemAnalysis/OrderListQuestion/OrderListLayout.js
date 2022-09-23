import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';
import Icon from '@material-ui/core/Icon';
import Paper from '@mui/material/Paper';
import { Controller, useForm } from 'react-hook-form';
import Switch from 'app/shared-components/Switch';
import { useSelector } from 'react-redux';
import { EditorState, convertFromRaw } from 'draft-js';
import ListDraggableItem from './ListDraggableItem';

const defaultValues = { name: '', email: '', subject: '', message: '' };

const propsType = [
  /* "multipleChoices",
  "setMultipleChoices",
  "editorContent",
  "setEditorContent", */
];

const OrderListLayout = (props) => {
  const itemQuestionsList = useSelector(({ alpha }) => alpha.item.questions);
  // OrderList Layout starts
  const [trueFalseShuffleOption, setTrueFalseShuffleOption] = useState(false);
  const [trueFalseShowDragHandle, setTrueFalseShowDragHandle] = useState(false);

  const [editorContent, setEditorContent] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [multipleChoices, setMultipleChoices] = useState([
    {
      id: `item-1}`,
      position: 0,
      title: 'Test1',
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-2`,
      position: 1,
      title: 'Test2',
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-3`,
      position: 2,
      title: 'Test3',
      isCorrect: false,
      isAlternate: false,
    },
  ]);

  // OrderList Layout ends

  const { control } = useForm({
    mode: 'onChange',
    defaultValues,
  });

  const [optionsList, setOptionsList] = useState([]);
  useEffect(() => {
    const temp = [];
    multipleChoices.map((item, index) => {
      temp.push({ value: item.position, label: index + 1 });
    });
    setOptionsList(temp);
  }, [multipleChoices]);
  /* const optionsList = [
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
  ]; */
  console.log('multipleChoices:', multipleChoices);

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

  function onOptionAdded(index) {
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
    //  props.setMultipleChoices(choices);
  }

  useEffect(() => {
    if (props.questionId != null) {
      const _filteredQuestion =
        itemQuestionsList &&
        itemQuestionsList.length > 0 &&
        itemQuestionsList.find((q) => q.id == props.questionId);
      console.log('filteredQuestion in order list ', _filteredQuestion);
      if (_filteredQuestion) {
        console.log('_filteredQuestion.description in order list ', _filteredQuestion.description);
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
            // setMultipleOptions(_config.multipleOption);
            setTrueFalseShuffleOption(_config.shuffleOptionRadio);
            setTrueFalseShowDragHandle(_config.showDragHandleRadio);
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
                      questionType: 'order-list-question',
                      questionConfig: JSON.stringify({
                        showDragHandleRadio: trueFalseShowDragHandle,
                        shuffleOptionRadio: trueFalseShuffleOption,
                      }),
                      position: props.questionIndex,
                    }
                  : {
                      description: editorContent,
                      options: multipleChoices,
                      questionType: 'order-list-question',
                      questionConfig: JSON.stringify({
                        showDragHandleRadio: trueFalseShowDragHandle,
                        shuffleOptionRadio: trueFalseShuffleOption,
                      }),
                      position: props.questionIndex,
                    };
              console.log('Json going to save', itemObject);
              props.onSaveQuestion(
                props.sectionName,
                props.tabName,
                props.questionId,
                props.questionIndex,
                'order-list-question',
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
          <h2 className="pose-h2 font-bold tracking-tight">Order list</h2>
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
              List
            </Typography>

            <ListDraggableItem
              onNewOptionAdded={onNewOptionAdded}
              multipleChoices={multipleChoices}
              setMultipleChoices={setMultipleChoices}
              optionsList={optionsList}
              setMultipleChoices_Main={props.setMultipleChoices}
            />
          </div>
          <div className="flex items-center flex-wrap">
            <div className="my-4 mr-12 flex justify-between items-center">
              <label>Show drag handle</label>
              <Switch
                checked={trueFalseShowDragHandle}
                onChange={() => setTrueFalseShowDragHandle(!trueFalseShowDragHandle)}
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

export default OrderListLayout;
