import { useState } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from 'app/services/state/State';
import { actions } from 'app/services/state/Reducer';
import { useLocation } from 'react-router-dom';
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';
import Icon from '@material-ui/core/Icon';

// import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Paper from '@mui/material/Paper';
import { Controller, useForm } from 'react-hook-form';
import _ from '@lodash';
import Breadcrumb from '../../fuse-layouts/shared-components/Breadcrumbs';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import DraggableItem from './DraggableItem';

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

const ItemAnalysis = () => {
  const location = useLocation();
  const pageTitle = location.pathname
    .split('/')
    .filter((x) => x)[0]
    .split('-')
    .join(' ');
  const classes = useStyles();
  const [{ news }, dispatch] = useStateValue();
  const [count, setCount] = useState(0);

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

  function onSubmit(data) {
    console.log(data);
  }

  if (_.isEmpty(form)) {
    return null;
  }

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
            {pageTitle}
          </Typography>
        </div>
      }
      content={
        /*  <div className="p-24"> */
        <>
          <div className="flex flex-col items-center p-24 sm:p-40 container">
            <div className="flex flex-col w-full max-w-4xl">
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
                <form onSubmit={handleSubmit(onSubmit)} className="px-0 sm:px-24 ">
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
                      render={({ field }) => <WYSIWYGEditor {...field} />}
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
                        // textTransform: 'capitalize',
                      }}
                    >
                      Multiple Choice Options
                    </Typography>

                    <DraggableItem />
                  </div>
                </form>
                {/*  <div className="flex items-center justify-end mt-32">
                  <Button className="mx-8">Cancel</Button>
                  <Button
                    className="mx-8"
                    variant="contained"
                    color="secondary"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Save
                  </Button>
                </div> */}
              </Paper>
            </div>
          </div>
        </>

        /*   </div> */
      }
    />
  );
};

export default ItemAnalysis;
