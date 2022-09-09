import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useStateValue } from "app/services/state/State";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

const useStyles = makeStyles({
  root: {
    fontSize: "1rem",
    "&.MuiContainer-root": {
      maxWidth: "55%",
      margin: "3rem",
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

const NewSubject = () => {
  const [{ user }, dispatch] = useStateValue();
  const [organization, setOrganization] = useState("");

  const handleChange = (event) => {
    setOrganization(event.target.value);
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
              id="subject"
              label="subject"
              name="email"
              autoComplete="email"
              autoFocus
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="organization-dropdown">Grade Name</InputLabel>
            <Select
              labelId="organization-dropdown"
              id="organizationDropdown"
              label="organization"
              onChange={handleChange}
            >
              <MenuItem value={10}>Class 8TH</MenuItem>
              <MenuItem value={20}>Class 9TH</MenuItem>
              <MenuItem value={30}>Class 10TH</MenuItem>
            </Select>
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
          <div className="h-0.5 w-ful text-slate-700 bg-slate-400 " />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              my: 2,
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

export default NewSubject;
