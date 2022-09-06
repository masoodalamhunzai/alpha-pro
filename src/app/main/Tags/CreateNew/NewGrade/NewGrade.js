import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import CssBaseline from "@mui/material/CssBaseline";
import { useStateValue } from "app/services/state/State";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

const useStyles = makeStyles({
  root: {
    fontSize: "1rem",
    "&.MuiContainer-root": {
      maxWidth: "55%",
      margin: "2rem",
    },
    "& .MuiInputBase-input": {
      backgroundColor: "#fff",
      textAlign: "start",
      fontSize: "1.5rem !important",
    },
    "& .MuiButton-root": {
      fontWeight: "700",
      borderRadius: "1.6rem",
      margin: "1rem 0.5rem",
      padding: "0.5rem 2rem",
      fontSize: "1rem",
    },
    "& .MuiFormControlLabel-label": {
      fontSize: "1.2rem",
      margin: "1rem 0",
    },
    "& .MuiFormControl-root": {
      margin: "1rem 0",
    },
    "& .MuiInputLabel-root": {
      fontSize: "1.4rem",
      left: "-4px",
      top: "-5px",
    },
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
  formInput: {
    "&.MuiBox-root": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
  },
});

const NewGrade = () => {
  const [{ user }, dispatch] = useStateValue();
  const [grade, setGrade] = useState("");

  const handleChange = (event) => {
    setGrade(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const classes = useStyles();
  return (
    <Container
      classes={{
        root: classes.root,
      }}
      component="main"
      maxWidth="xs"
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
          onSubmit={handleSubmit}
          noValidate
          sx={{ my: 4, width: "100%" }}
        >
          <FormControl fullWidth>
            <TextField
              sx={{ width: "100%" }}
              margin="normal"
              required
              fullWidth
              label="Grade"
              name="grade"
              autoComplete="grade"
              autoFocus
            />
          </FormControl>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <span className="text-gray-500 text-base">status:</span>
            <Stack
              spacing={3}
              direction="row"
              alignItems="center"
              display="flex"
              className="w-full"
              justifyContent="center"
              gap="2rem"
            >
              <Button variant="contained" sx={{ textTransform: "lowercase" }}>
                published
              </Button>
              <Button variant="contained" sx={{ textTransform: "lowercase" }}>
                unpublished
              </Button>
              <Button variant="contained" sx={{ textTransform: "lowercase" }}>
                archive
              </Button>
            </Stack>
          </Box>
          <div class="h-0.5 w-ful text-slate-700 bg-slate-400 " />  
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              my:2
            }}
          >
            <Button
              type="submit"
              variant="contained"
              className={classes.continueBtn}
            >
              Create
            </Button>
            <Button
              type="cancel"
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
};

export default NewGrade;
