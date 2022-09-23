import { useState } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';

import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from 'app/services/state/State';
import { actions } from 'app/services/state/Reducer';
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../fuse-layouts/shared-components/Breadcrumbs';

import HomeContent from './HomeContent';

const useStyles = makeStyles({
  layoutRoot: {},
});

function SimpleFullWidthSample() {
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
  /* useEffect(() => {
    setCount(1);
  }, []);
  useEffect(() => {
    setNews();
  }, [count]); */

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
        <div className="p-24">
          <br />
          {/* <DemoContent /> */}
          <HomeContent />
        </div>
      }
    />
  );
}

export default SimpleFullWidthSample;
