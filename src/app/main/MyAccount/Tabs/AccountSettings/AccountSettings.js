import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import PasswordIcon from '@mui/icons-material/Password';
import { useStateValue } from 'app/services/state/State';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles({
  root: {
    fontSize: '1rem',
    '&.MuiContainer-root': {
      maxWidth: '55%',
      margin: 0,
    },
    '& .MuiInputBase-input': {
      backgroundColor: '#fff',
      textAlign: 'start',
      fontSize: '1.5rem !important',
    },
    '& .MuiButton-root': {
      fontWeight: '700',
      borderRadius: '1.6rem',
      margin: '2rem 0',
      padding: '1rem 2rem',
      fontSize: '1rem',
    },
    '& .MuiFormControlLabel-label': {
      fontSize: '1.2rem',
      margin: '1rem 0',
    },
    '& .MuiFormControl-root': {
      margin: '1rem 0',
    },
    '& .MuiInputLabel-root': {
      fontSize: '1.4rem',
      left: '-4px',
      top: '-5px',
    },
  },
  continueBtn: {
    '&.MuiButton-root': {
      backgroundColor: '#3287FB',
    },
  },
  cancelBtn: {
    '&.MuiButton-root': {
      backgroundColor: '#ACACAC',
    },
  },
  formInput: {
    '&.MuiBox-root': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
  },
});

const AccountSettingsTab = () => {
  const [{ user }, dispatch] = useStateValue();
  const [organization, setOrganization] = useState('');

  const handleChange = (event) => {
    setOrganization(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const classes = useStyles();
  const { email } = user?.user ? user?.user : '';
  console.log(user, 'user');
  return (
    <Container
      classes={{
        root: classes.root,
      }}
      component="main"
      maxWidth="xs"
      className="shadow-sm rounded-md"
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ my: 4, width: '100%' }}>
          <Box className={classes.formInput}>
            <Icon color="action" className="text-gray-600 mr-8 mb-16">
              email
            </Icon>
            <div className="flex flex-col w-full items-center mb-7">
              <TextField
                sx={{ width: '100%' }}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username/Email"
                name="email"
                autoComplete="email"
                defaultValue={email}
                autoFocus
              />
              <span className="text-gray-600 w-full text-start mb-7 px-5">
                Used for login to eAlpha apps (Community,Console,Author site)
              </span>
            </div>
          </Box>
          <Box className={classes.formInput}>
            <PasswordIcon className="text-gray-600 mr-16" />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Box>
          <Box className={classes.formInput}>
            <PasswordIcon className="text-gray-600 mr-16" />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Confirm Password"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              ml: 4,
            }}
          >
            <Button type="submit" variant="contained" className={classes.continueBtn}>
              Save Changes
            </Button>
            <Button type="cancel" variant="contained" className={classes.cancelBtn}>
              cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AccountSettingsTab;
