import React, { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
// import { useStateValue } from "app/services/state/State";
import { useLocation, useHistory } from "react-router-dom";
// import swal from "sweetalert";
import Alert from "@mui/material/Alert";
import { primaryBlueColor } from "app/services/Settings";
import Stack from "@mui/material/Stack";
import { actions } from "app/services/state/Reducer";

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
  buttonGrey: {
    "&.MuiButton-root": {
      backgroundColor: "grey",
      color: "#fff",
      fontSize: "11px",
      "&:hover": { backgroundColor: primaryBlueColor },
      textTransform: "capitalize",
      fontSize: "11px",
    },
  },
  buttonSelected: {
    "&.MuiButton-root": {
      fontSize: "11px",
      backgroundColor: "#3287FB",
      color: "#fff",
      textTransform: "capitalize",
    },
  },
  continueBtn: {
    "&.MuiButton-root": {
      backgroundColor: "#3287FB",
      fontSize: "1.3rem",
      textTransform: "capitalize",
    },
  },
  cancelBtn: {
    "&.MuiButton-root": {
      backgroundColor: "#ACACAC",
      fontSize: "1.3rem",
      textTransform: "capitalize",
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
const tagTypeStatusArr = [
  { id: 1, status: "Items" },
  { id: 2, status: "Activities" },
];
const NewTagType = () => {
  const history = useHistory();
  const location = useLocation();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [tagTypeStatus, setTagTypeStatus] = useState(0);

  const handleChangeStatus = (key) => {
    setTagTypeStatus(key);
  };

  const handleChangeInputs = (e) => {
    setNewSubject(e.target.value);
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
        <Box component="form" noValidate sx={{ my: 4, width: "80%" }}>
          {error && (
            <Alert
              severity="error"
              sx={{ fontSize: "1.3rem", m: 0, width: "100%" }}
            >
              {errorMessage}
            </Alert>
          )}
          <FormControl fullWidth>
            <TextField
              fullWidth
              margin="normal"
              required
              onChange={handleChangeInputs}
              id="name"
              label="Name"
              name="name"
              // defaultValue={newName}
              autoComplete="Name"
              autoFocus
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              fullWidth
              margin="normal"
              required
              onChange={handleChangeInputs}
              id="longName"
              label="Long Name"
              name="longName"
              autoComplete="Long Name"
              autoFocus
            />
          </FormControl>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <span className="text-gray-500 text-base w-1/2">Used In * :</span>
            <Stack
              spacing={3}
              direction="row"
              alignItems="center"
              display="flex"
              className="w-full"
              justifyContent="start"
            >
              {tagTypeStatusArr?.map((item) => (
                <Button
                  key={item.id}
                  variant="contained"
                  size="medium"
                  className={
                    item.id === tagTypeStatus
                      ? classes.buttonSelected
                      : classes.buttonGrey
                  }
                  onClick={() => handleChangeStatus(item.id)}
                >
                  {item.status}
                </Button>
              ))}
            </Stack>
          </Box>
          <div className="mt-10 mb-5 w-full">
            <Divider />
          </div>
          <div className="h-0.5 w-full text-slate-700 bg-slate-400 " />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              my: 2,
            }}
          >
            <Button
              // type="submit"
              variant="contained"
              className={classes.continueBtn}
            >
              Save Changes
            </Button>
            <Button
              // type="cancel"
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

export default NewTagType;
