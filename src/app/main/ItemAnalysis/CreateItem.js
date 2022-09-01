import { useState } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from 'app/services/state/State';
import { actions } from 'app/services/state/Reducer';
import { useHistory, useLocation } from 'react-router-dom';
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { saveQuestion } from 'app/services/api/ApiManager';
import swal from 'sweetalert';

// import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Paper from '@mui/material/Paper';
import { Controller, useForm } from 'react-hook-form';
import _ from '@lodash';
import Breadcrumb from '../../fuse-layouts/shared-components/Breadcrumbs';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import DraggableItem from './DraggableItem';
import ItemConfiguration from './ItemConfiguration';

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

const CreateItem = () => {
  const location = useLocation();
  const history = useHistory();
  const pageTitle = location.pathname
    .split('/')
    .filter((x) => x)[0]
    .split('-')
    .join(' ');
  const classes = useStyles();
  const [{ news, user }, dispatch] = useStateValue();
  const [count, setCount] = useState(0);
  const [editorContent, setEditorContent] = useState('');
  const [multipleChoices, setMultipleChoices] = useState([]);

  const setNews = async () => {
    dispatch({
      type: actions.SET_NEWS,
      payload: { header: 'new header text', des: 'new description text' },
    });
  };

  const { control, handleSubmit, watch, formState } = useForm({
    mode: 'onChange',
    defaultValues,
    // resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const form = watch();
  const redirectTo = async (goTo) => {
    try {
      history.push(goTo);
    } catch (err) {
      // console.log(err);
    }
  };
  const onSaveQuestion = async () => {
    try {
      const finalItemObject = {
        description: editorContent,
        options: multipleChoices,
        itemId: '1eff4c49-fcb1-432e-83c8-c5a0023ee5e0',
        questionType: 'simple-mcqs',
      };
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
        console.log('final item object ', finalItemObject);
        const res = await saveQuestion(
          finalItemObject,
          '1eff4c49-fcb1-432e-83c8-c5a0023ee5e0',
          user
        );

        if (res && res.data && res.data.status === 'success') {
          swal({
            title: 'Good job!',
            text: 'Question Saved Successfully!',
            icon: 'success',
            button: 'Ok!',
          }).then((value) => {
            setEditorContent('');
            setMultipleChoices([]);
            console.log('saved successfully');
            redirectTo('/all-items');
          });
        }
      }
    } catch (error) {
      // setStatus({ success: false });
      // setErrors({ submit: error.message });
      // setSubmitting(false);
    }
  };

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
    console.log('onNewOptionAdded ItemAnalysis option ', option);
    console.log('onNewOptionAdded ItemAnalysis choices ', choices);
  }
  console.log('value in ItemAnalysis ', editorContent);

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <div className="p-24">
          <Breadcrumb />
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              color: '#000',
              fontWeight: 700,
              mt: 2,
              textTransform: 'capitalize',
            }}
          >
            {"Create New Question"}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ float: 'right' }}
            aria-label="Save Draft"
            onClick={() => onSaveQuestion()}
            // startIcon={<AddIcon />}
          >
            Save Draft
          </Button>
        </div>
      }
      content={
        /*  <div className="p-24"> */
        <>
          <div className="flex flex-col items-center p-24 sm:p-40 container">
            {/* <div className="flex flex-col w-full max-w-4xl">
              <Paper
                style={{
                  paddingTop: '0px',
                  paddingLeft: '0px',
                  paddingRight: '0px',
                }}
                className="border border-blue border-2 mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl border-blue-600"
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
            </div> */}

            {/* this is for cofiguraton component */}

            <div className="flex flex-col w-full max-w-4xl" style={{width:'30%'}}>

              <ItemConfiguration />
            </div>

            {/* this is for configuration component */}
          </div>
        </>

        /*   </div> */
      }
    />
  );
};

export default CreateItem;
