import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from 'app/services/state/State';
import { useHistory, useLocation } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import { Controller, useForm } from 'react-hook-form';

// import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import _ from '@lodash';
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';
import DraggableItem from './DraggableItem';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

const useStyles = makeStyles({
  layoutRoot: {},
});

const defaultValues = { name: '', email: '', subject: '', message: '' };
/* const schema = yup.object().shape({
  name: yup.string().required('You must enter a name'),
  subject: yup.string().required('You must enter a subject'),
  message: yup.string().required('You must enter a message'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
}); */

const CreateQuestion = () => {
  const location = useLocation();
  const history = useHistory();
  const pageTitle = location.pathname
    .split('/')
    .filter((x) => x)[0]
    .split('-')
    .join(' ');
  const classes = useStyles();
  const [{ user }, dispatch] = useStateValue();
  const [count, setCount] = useState(0);
  const [editorContent, setEditorContent] = useState('');
  const [multipleChoices, setMultipleChoices] = useState([]);

  const { control, handleSubmit, watch, formState } = useForm({
    mode: 'onChange',
    defaultValues,
    // resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const form = watch();

  if (_.isEmpty(form)) {
    return null;
  }
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
  }

  return (
    <>
      <Paper
        style={{
          paddingTop: '0px',
          paddingLeft: '0px',
          paddingRight: '0px',
          borderRadius: '0px',
        }}
        className="border border-blue border-2 pb-28 sm:pb-28 rounded-2xl border-blue-600"
      >
        <div className="text-right">
          <Icon
            className="p-3 bg bg-blue bg-blue-600"
            style={{
              padding: '2px 24px 24px 4px',
              color: 'white',
            }}
            size="small"
          >
            edit
          </Icon>
        </div>
        <form className="px-0 sm:px-24 ">
          <div className="mb-24 flex justify-between flex-wrap wrap">
            <h2 className="pose-h2 font-bold tracking-tight">Multiple choice - standard</h2>
            <div>
              <button
                type="button"
                className="border border-gray border-gray-300 bg-white hover:bg-gray-100 text-gray-800 text-white font-bold py-2 px-6 rounded-full mx-4"
              >
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
                <WYSIWYGEditor setEditorContent={setEditorContent} {...field} />
              )}
              name="message"
              control={control}
            />

            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: 'gray',
                fontWeight: 700,
                mt: 2,
              }}
            >
              Multiple Choice Options
            </Typography>

            <DraggableItem
              onNewOptionAdded={onNewOptionAdded}
              multipleChoices={multipleChoices}
              setMultipleChoices={setMultipleChoices}
            />
          </div>
        </form>
      </Paper>
    </>
  );
};

export default CreateQuestion;
