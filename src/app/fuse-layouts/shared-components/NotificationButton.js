import { useState } from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import clsx from 'clsx';

const marks = [
  {
    value: 0.7,
    label: '70%',
  },
  {
    value: 0.8,
    label: '80%',
  },
  {
    value: 0.9,
    label: '90%',
  },
  {
    value: 1,
    label: '100%',
  },
  {
    value: 1.1,
    label: '110%',
  },
  {
    value: 1.2,
    label: '120%',
  },
  {
    value: 1.3,
    label: '130%',
  },
];

function NotificationButton(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [fontSize, setFontSize] = useState(1);

  function changeHtmlFontSize() {
    const html = document.getElementsByTagName('html')[0];
    html.style.fontSize = `${fontSize * 62.5}%`;
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        className={clsx('w-40 h-40', props.className)}
        aria-controls="font-size-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Icon>notifications</Icon>
      </IconButton>
      <Menu
        classes={{ paper: 'w-320' }}
        id="font-size-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className="py-12 px-24">
          <Typography className="flex items-center justify-center text-16 font-semibold mb-8">
            <Icon color="action" className="mr-4">
              notifications
            </Icon>
            Notifications
          </Typography>
          <text>pending</text>
        </div>
      </Menu>
    </div>
  );
}

export default NotificationButton;
