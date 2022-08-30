import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles({
  root: {
    fontSize: "1rem",
    "&.MuiContainer-root": {
      margin: 0,
    },
    "& .MuiInputBase-input": {
      backgroundColor: "#fff",
      textAlign: 'start'
    },
    "& .MuiButton-root": {
      fontWeight: "700",
      borderRadius: "1.6rem",
      padding: "1rem 2rem",
      fontSize: "1rem",
    },
    "& .MuiFormControlLabel-label": {
      fontSize: "1.2rem",
      margin: "1rem 0",
    },
    '& .MuiFormControl-root': {
      margin: '1rem 0'
    }
  },
  continueBtn: {
    "&.MuiButton-root": {
      backgroundColor: "#3287FB",
    },
  },
  cancelBtn: {
    "&.MuiButton-root": {
      backgroundColor: "#ACACAC",
    },
  },
});

function CreateUserTab({ setOpen }) {
  const [organization, setOrganization] = useState("");

  const handleChange = (e) => {
    setOrganization(e.target.value);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <Container
      classes={{
        root: classes.root,
      }}
      component="main"
      maxWidth="xs"
      className="shadow-md rounded-md"
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Edit User Form</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="First name"
            label="first Name"
            type="text"
            id="name"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="Last name"
            label="Last Name"
            type="text"
            id="name"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="Phone"
            label="Phone"
            type="number"
            id="name"
            autoComplete="current-password"
          />
          <FormControl fullWidth>
            <InputLabel id="organization-dropdown">Organization</InputLabel>
            <Select
              labelId="organization-dropdown"
              id="organizationDropdown"
              value={organization}
              label="organization"
              onChange={handleChange}
            >
              <MenuItem value={"eAlpha1"}>eAlpha1</MenuItem>
              <MenuItem value={"eAlpha2"}>eAlpha2</MenuItem>
              <MenuItem value={"eAlpha3"}>eAlpha3</MenuItem>
            </Select>
          </FormControl>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              my: 2
            }}
          >
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2
            }}
          >
            <Button
              type="submit"
              variant="contained"
              className={classes.continueBtn}
              onClick={handleUpdate}
            >
              update
            </Button>
            <Button
              type="continue"
              variant="contained"
              className={classes.cancelBtn}
              onClick={handleClose}
            >
              cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default CreateUserTab;
