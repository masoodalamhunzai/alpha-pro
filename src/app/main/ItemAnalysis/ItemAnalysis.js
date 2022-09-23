import FusePageSimple from '@fuse/core/FusePageSimple';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from 'app/services/state/State';
import { useLocation } from 'react-router-dom';

import { useHistory } from 'react-router';
import Error500 from 'app/shared-components/Error500';
import Breadcrumb from '../../fuse-layouts/shared-components/Breadcrumbs';

const useStyles = makeStyles({
  layoutRoot: {},
});

const ItemAnalysis = () => {
  const location = useLocation();
  const history = useHistory();
  const pageTitle = location.pathname
    .split('/')
    .filter((x) => x)[0]
    .split('-')
    .join(' ');
  const classes = useStyles();
  const [{ user, news }, dispatch] = useStateValue();

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
            All Questions
          </Typography>
        </div>
      }
      content={
        <div className="p-6">
          {/* start */}
          <Error500 />
          {/* end */}
        </div>
      }
    />
  );
};

export default ItemAnalysis;
