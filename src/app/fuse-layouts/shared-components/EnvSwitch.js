/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from '@material-ui/core';
import { actions } from 'app/services/state/Reducer';
import { makeStyles } from '@material-ui/core/styles';
import { switchAlphaEnvironments } from 'app/services/api/ApiManager';
import { toUpper } from 'lodash';
import { useStateValue } from 'app/services/state/State';

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
  const [{ user, currentEnv }, dispatch] = useStateValue();

  const switchEnvironment = (env) => {
    switchAlphaEnvironments(env, user)
      .then((res) => {
        const { data = {} } = res || {};
        const { status = '' } = data || {};
        if (status === 'success') {
          dispatch({
            type: actions.SET_CURRENT_ENV,
            payload: env,
          });
          // window.location.reload();
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
