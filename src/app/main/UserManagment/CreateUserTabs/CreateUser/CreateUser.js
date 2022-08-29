import * as React from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const useStyles = makeStyles({
  root: {
    fontSize:'1rem',
    '&.MuiContainer-root':{
      maxWidth:'55%',
      margin:0
    },
    '& .MuiInputBase-input':{
      backgroundColor: "#fff",
    },
    '& .MuiButton-root':{
      fontWeight:'700',
    borderRadius:'1.6rem',
    margin:'2rem 0',
    padding:'1rem 2rem',
    fontSize:'1rem',
    },
    '& .MuiFormControlLabel-label':{
      fontSize:'1rem',
      margin: '1rem 0'
    }
  },
  continueBtn: {
    '&.MuiButton-root':{
      backgroundColor: "#3287FB",
    }
  },
  cancelBtn: {
    '&.MuiButton-root':{
      backgroundColor: "#ACACAC",
    }
  },
});

function CreateUserTab() {
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
          <Box
            component="form"
            // onSubmit={handleSubmit}
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="organization"
              label="organization"
              type="text"
              id="organization"
              autoComplete="current-organization"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                className={classes.continueBtn}
              >
                 
                continue
              </Button>
              <Button
                type="continue"
                variant="contained"
                className={classes.cancelBtn}
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
