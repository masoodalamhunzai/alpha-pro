import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { useStateValue } from 'app/services/state/State';
import { actions } from 'app/services/state/Reducer';

const publishingEnviroment = [
  {
    id: 'prod',
    title: 'Prod',
  },
  {
    id: 'dev',
    title: 'Dev',
  },
];

function PublishingEnviromentSwitch(props) {
  // const dispatch = useDispatch();
  const [{ publishingEnvironment }, dispatch] = useStateValue();

  const currentLanguageId = publishingEnvironment || 'prod';
  const currentLanguage = publishingEnviroment.find((lng) => lng.id === currentLanguageId);

  const [menu, setMenu] = useState(null);

  const langMenuClick = (event) => {
    setMenu(event.currentTarget);
  };

  const langMenuClose = () => {
    setMenu(null);
  };

  function handleLanguageChange(lng) {
    dispatch({ type: actions.SET_PUBLISHING_ENVIRONMENT, payload: lng.id });
    /* dispatch(changeLanguage(lng.id));
     */
    langMenuClose();
  }

  return (
    <>
      <Button className="h-40 w-64" onClick={langMenuClick}>
        <Typography className="mx-4 font-semibold uppercase" color="textSecondary">
          {currentLanguage.id}
        </Typography>
      </Button>

      <Popover
        open={Boolean(menu)}
        anchorEl={menu}
        onClose={langMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: 'py-8',
        }}
      >
        {publishingEnviroment.map((lng) => (
          <MenuItem key={lng.id} onClick={() => handleLanguageChange(lng)}>
            {/* <ListItemIcon className="min-w-40"></ListItemIcon> */}
            <ListItemText primary={lng.title} />
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}

export default PublishingEnviromentSwitch;
