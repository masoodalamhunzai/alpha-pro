import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import {
  LocalPhone as LocalPhoneIcon,
  AccountBalance as AccountBalanceIcon,
  AccountCircle as AccountCircleIcon,
} from '@material-ui/icons';
import Icon from '@material-ui/core/Icon';
import { useSelector } from 'react-redux';

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
      fontSize: '1.5rem',
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

const ProfileTab = () => {
  const user = useSelector(({ alpha }) => alpha.user);
  const [organizations, setOrganizations] = useState('');
  const [formData, setFormData] = useState({
    _firstName: '',
    _lastName: '',
    _phoneNo: '',
    _email: '',
    _organization: '',
    _photo: '',
  });
  const { _firstName, _lastName, _phoneNo, _email, _organization, _photo } = formData;
  const handleChange = (event) => {
    setOrganizations(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleUploadImage = ({ target }) => {
    const fileReader = new FileReader();
    const name = target.accept.includes('image');
    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
      setFormData({ ...formData, _photo: e.target.result });
      console.log(e, 'e.target.result', e.target.result);
    };
  };

  const classes = useStyles();
  console.log('User Here:', user);
  const { email, firstName, lastName } = user && user?.user ? user?.user : '';
  const { name } = user?.user?.organization ? user?.user?.organization : '';
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
            <Icon color="action" className="text-gray-600 mr-8">
              email
            </Icon>
            <div className="flex flex-col w-full items-center mb-7">
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                defaultValue={email}
                autoFocus
              />
              <span className="text-gray-600 w-full text-start mb-7 px-5">
                Used as a login for Learnosity sites.
              </span>
            </div>
          </Box>
          <Box className={classes.formInput}>
            <Icon color="action" className="text-gray-600 mr-8">
              assignment
            </Icon>
            <TextField
              margin="normal"
              required
              fullWidth
              name="First name"
              label="First Name"
              type="text"
              id="name"
              defaultValue={firstName}
              autoComplete="current-password"
            />
          </Box>
          <Box className={classes.formInput}>
            <Icon color="action" className="text-gray-600 mr-8">
              assign
            </Icon>
            <TextField
              margin="normal"
              required
              fullWidth
              name="Last name"
              label="Last Name"
              type="text"
              id="name"
              defaultValue={lastName}
              autoComplete="current-password"
            />
          </Box>
          <Box className={classes.formInput}>
            <LocalPhoneIcon className="text-gray-600 mr-8" />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Phone"
              label="Phone"
              type="number"
              id="name"
              defaultValue={email}
              autoComplete="current-password"
            />
          </Box>
          <Box className={classes.formInput}>
            <AccountBalanceIcon className="text-gray-600 mr-8" />
            <TextField
              margin="normal"
              required
              fullWidth
              name="organization"
              label="Organization"
              id="Organization"
              defaultValue={name}
              autoComplete="current-password"
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: 'rgb(128 128 128)',
              fontWeight: 700,
              ml: 6,
              mt: 4,
              mb: 1,
              textTransform: 'capitalize',
            }}
          >
            Photo upload
          </Typography>
          <Box className="flex items-center mb-24">
            <AccountCircleIcon />
            <Box
              aria-label="upload picture"
              component="label"
              sx={{ height: '7rem' }}
              className="cursor-pointer border-slate-700 border-2 border-solid w-1/4 bg-white flex items-center justify-center ml-20"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                name="photo"
                onChange={handleUploadImage}
              />
              <Icon color="action" className="text-gray-600 mr-8">
                upload
              </Icon>
            </Box>
          </Box>
          <Box className="flex items-center ml-20 text-2xl">
            {_photo.length > 0 && (
              <>
                <Icon color="action" className="text-gray-600 mr-8">
                  attachment
                </Icon>
                1 file Attached
              </>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              ml: 4,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              className={classes.continueBtn}
              onClick={handleSubmit}
            >
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

export default ProfileTab;
