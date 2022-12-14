import { useDispatch, useSelector } from 'react-redux';

/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { switchAlphaEnvironments } from 'app/services/api/ApiManager';
import { toUpper } from 'lodash';
import { updateUserInfo } from 'app/store/alpha/userReducer';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  envSwitchContainer: {
    width: '100px',
    fontSize: '10px',
    padding: '5px',
  },
  currentEnv: {
    width: '100%',
    margin: '5px 0px',
  },
  switchLabel: {
    width: '100%',
    margin: '5px 0px',
  },
  linkButton: {
    fontSize: '10px',
  },
}));

function EnvSwitch(props) {
  const classes = useStyles(props);
  const history = useHistory();
  const _user = useSelector(({ alpha }) => alpha.user);
  const { user = {} } = _user || {};
  const { currentEnv = '' } = user || {};
  const dispatch = useDispatch();

  const switchEnvironment = (env) => {
    switchAlphaEnvironments(env, user)
      .then((res) => {
        const { data = {} } = res || {};
        const { status = '', user: u = {} } = data || {};
        if (status === 'success') {
          dispatch(updateUserInfo(u));
          setTimeout(() => {
            history.push('/home');
            window.location.reload(true);
          }, 500);
        }
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  return currentEnv ? (
    <div className={classes.envSwitchContainer}>
      <div className={classes.currentEnv}>Current Env: {toUpper(currentEnv)}</div>
      <div className={classes.switchLabel}>
        <Link
          component="button"
          variant="body2"
          className={classes.linkButton}
          color="inherit"
          onClick={() => {
            switchEnvironment(currentEnv === 'prod' ? 'dev' : 'prod');
          }}
        >
          Switch to {currentEnv === 'prod' ? 'DEV' : 'PROD'}
        </Link>
      </div>
    </div>
  ) : null;
}

export default EnvSwitch;
