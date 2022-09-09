import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import CssBaseline from "@mui/material/CssBaseline";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import { useStateValue } from "app/services/state/State";
import { actions } from "app/services/state/Reducer";
import Stack from "@mui/material/Stack";
import { createUserGrade } from "app/services/api/ApiManager";

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
  const history = useHistory();
  const [{ user }, dispatch] = useStateValue();
  const [error, setError] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [grade, setGrade] = useState("");

  const redirectTo = async (goTo) => {
    try {
      history.push(goTo);
    } catch (err) {}
  };

  const handleChangeInputs = (e) => {
    setGrade(e.target.value);
  };

  const validation = () => {
    if (grade === "") {
      setError(true);
      setErrorMessage("Grade required");
      return false;
    }
    return true;
  };

  const handleGradeSubmit = (e) => {
    e.preventDefault();
    const payload = {
      grade,
    };
    console.log(payload, "payload");
    if (validation()) {
      const res = createUserGrade(user, payload);
      setIsFormSubmitted(true);
      setTimeout(() => {
        setIsFormSubmitted(false);
      }, 3000);
      redirectTo("/grade");
    } else {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
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
      {error && (
        <Alert
          severity="error"
          sx={{ fontSize: "1.3rem", width: "100%", m: 0 }}
        >
          {errorMessage}
        </Alert>
      )}
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" noValidate sx={{ my: 4, width: "100%" }}>
          <FormControl fullWidth>
            <TextField
              sx={{ width: "100%" }}
              margin="normal"
              required
              fullWidth
              onChange={handleChangeInputs}
              label="Grade"
              name="grade"
              defaultValue={grade}
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
              onClick={handleGradeSubmit}
            >
              Create
            </Button>
            <Button
              type="cancel"
              variant="contained"
              className={classes.cancelBtn}
              onClick={() => redirectTo("/grade")}
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
