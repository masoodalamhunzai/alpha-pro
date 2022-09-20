import React, { useEffect } from "react";
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
import { useLocation, useHistory } from "react-router-dom";
import Divider from "@mui/material/Divider";
import swal from "sweetalert";
import Alert from "@mui/material/Alert";
import { primaryBlueColor, primaryGrayColor } from "app/services/Settings";
import Stack from "@mui/material/Stack";
import { actions } from "app/services/state/Reducer";
import { createUserSubject, getAllGrades } from "app/services/api/ApiManager";

const useStyles = makeStyles({
  root: {
    fontSize: "1rem",
    "&.MuiContainer-root": {
      maxWidth: "90%",
      margin: "3rem",
      "& .MuiInputBase-input": {
        backgroundColor: "#fff",
        textAlign: "start",
        fontSize: "1.5rem !important",
      },
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
      "&:hover": { backgroundColor: primaryBlueColor },
      textTransform: "capitalize",
    },
  },
  buttonSelected: {
    "&.MuiButton-root": {
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
const subjectStatusArr = [
  { id: 1, status: "published" },
  { id: 2, status: "unPublished" },
  { id: 3, status: "archive" },
];
const NewSubject = () => {
  const history = useHistory();
  const location = useLocation();
  const EDIT_MODE = "edit-subject";
  const CREATE_NEW_MODE = "create-subject";
  const { editData, mode } = location?.state ? location?.state : "";
  const [{ user, grades }, dispatch] = useStateValue();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [subjectStatus, setSubjectStatus] = useState(0);

  const [newSubject, setNewSubject] = useState(
    mode === EDIT_MODE ? editData.subject : ""
  );
  const [selectGrade, setSelectGrade] = useState(
    mode === EDIT_MODE ? editData.gradeId : ""
  );

  const handleChangeStatus = (key) => {
    setSubjectStatus(key);
  };
  const redirectTo = async (goTo) => {
    try {
      history.push(goTo);
    } catch (err) {
      console.error("error", err);
    }
  };

  const slugify = (text) => {
    return text
      .toString()
      .normalize("NFD") // split an accented letter in the base letter and the acent
      .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
  };
  const handleChangeInputs = (e) => {
    setNewSubject(e.target.value);
  };
  const validation = () => {
    if (newSubject.trim() === "") {
      setError(true);
      setErrorMessage("Subject field is Required");
      return false;
    }
    if (selectGrade === "") {
      setError(true);
      setErrorMessage("grade field is Required");
      return false;
    }
    return true;
  };
  const handleSubjectSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: mode === EDIT_MODE ? editData?.id : "",
      title: newSubject,
      slug: slugify(newSubject),
      gradeId: selectGrade,
    };
    if (validation()) {
      const res = await createUserSubject(payload);
      if (res && res.data && res.data.status === "success") {
        swal({
          title: "Good job!",
          text:
            mode === EDIT_MODE
              ? "Subject Updated Successfully!"
              : "Subject Saved Successfully!",
          icon: "success",
          button: "Ok!",
        }).then((value) => {
          redirectTo("/subject");
        });
      }
    } else {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleChangeGrade = (event) => {
    setSelectGrade(event.target.value);
  };

  const handleGetGrade = async () => {
    const res = await getAllGrades();
    if (res && res.status === 200 && res.data) {
      dispatch({
        type: actions.SET_GRADES,
        payload: res.data,
      });
    }
  };

  useEffect(() => {
    handleGetGrade();
  }, []);

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
        }}
      >
        <Box component="form" noValidate sx={{ my: 2, width: "50%" }}>
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
              id="subject"
              label="subject"
              name="subject"
              defaultValue={newSubject}
              autoComplete="subject"
              autoFocus
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="organization-dropdown">Grade Name</InputLabel>
            <Select
              labelId="organization-dropdown"
              id="organizationDropdown"
              label="organization"
              value={selectGrade}
              onChange={handleChangeGrade}
            >
              {grades?.map((grade) => (
                <MenuItem value={grade?.id} key={grade?.id}>
                  {grade?.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {newSubject && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <span className="text-gray-500 text-base">Slug:</span>
              <Stack
                direction="row"
                alignItems="center"
                display="flex"
                className="w-full"
                justifyContent="start"
              >
                <Button variant="contained" sx={{ textTransform: "lowercase" }}>
                  {slugify(newSubject)}
                </Button>
              </Stack>
            </Box>
          )}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <span className="text-gray-500 text-base">Status:</span>
            <Stack
              spacing={3}
              direction="row"
              alignItems="center"
              display="flex"
              className="w-full"
              justifyContent="center"
            >
              {subjectStatusArr?.map((item) => (
                <Button
                  key={item.id}
                  variant="contained"
                  className={
                    item.id === subjectStatus
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
        </Box>
        <div className="mt-8 mb-5 w-full">
          <Divider />
        </div>
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
            onClick={handleSubjectSubmit}
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
    </Container>
  );
};

export default NewSubject;
