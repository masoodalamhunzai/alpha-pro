import { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import clsx from 'clsx';


function Messages(props) {
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
        <Icon>chat</Icon>
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
       Messages
        </div>
      </Menu>
    </div>
  );
}

export default Messages;
