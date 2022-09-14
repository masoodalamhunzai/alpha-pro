import { useState } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import CssBaseline from "@mui/material/CssBaseline";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useLocation, useHistory } from "react-router-dom";
import { primaryBlueColor, primaryGrayColor } from "app/services/Settings";
import { useStateValue } from "app/services/state/State";
import { actions } from "app/services/state/Reducer";
import Alert from "@mui/material/Alert";
import swal from "sweetalert";
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
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fff",
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
const gradeStatusArr = [
  { id: 1, status: "published" },
  { id: 2, status: "unPublished" },
  { id: 3, status: "archive" },
];
const NewGrade = () => {
  const history = useHistory();
  const location = useLocation();
  const EDIT_MODE = "edit-grade";
  const CREATE_NEW_MODE = "create-grade";
  const { editData, mode } = location?.state ? location?.state : "";
  const [{ user }, dispatch] = useStateValue();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [grade, setGrade] = useState(mode === EDIT_MODE ? editData?.title : "");
  const [description, setDescription] = useState(
    mode === EDIT_MODE ? editData?.description : ""
  );
  const [gradeStatus, setGradeStatus] = useState(0);
  const handleChangeStatus = (key) => {
    setGradeStatus(key);
  };
  const redirectTo = async (goTo) => {
    try {
      history.push(goTo);
    } catch (err) {}
  };

  const handleChangeInputs = (e) => {
    setGrade(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const validation = () => {
    if (grade.trim() === "") {
      setError(true);
      setErrorMessage("grade is required");
      return false;
    }
    if (description.trim() === "") {
      setError(true);
      setErrorMessage("description is required");
      return false;
    }
    return true;
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
  const handleGradeSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: mode === EDIT_MODE ? editData?.id : "",
      title: grade,
      slug: slugify(grade),
      description,
      org_search_key: mode === EDIT_MODE ? editData?.org_search_key : 1,
      curriculumId:
        mode === EDIT_MODE
          ? editData?.curriculumId
          : "fad64cae-edff-41c3-bbcb-ca3c77b54087",
    };
    if (validation()) {
      const res = await createUserGrade(user, payload);
      if (res && res.data && res.data.status === "success") {
        swal({
          title: "Good job!",
          text:
            mode === EDIT_MODE
              ? "Grade Updated Successfully!"
              : "Grade Saved Successfully!",
          icon: "success",
          button: "Ok!",
        }).then((value) => {
          redirectTo("/grade");
        });
      }
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

      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" noValidate sx={{ my: 1, width: "80%" }}>
          {error && (
            <Alert
              severity="error"
              sx={{ fontSize: "1.3rem", width: "100%", m: 0 }}
            >
              {errorMessage}
            </Alert>
          )}
          <FormControl fullWidth>
            <TextField
              fullWidth
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
          <FormControl fullWidth>
            <TextField
              fullWidth
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              rows={4}
              placeholder="Description"
              defaultValue={description}
              onChange={handleChangeDescription}
            />
          </FormControl>
          {grade && (
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
                  {slugify(grade)}
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
              {gradeStatusArr?.map((item) => (
                <Button
                  key={item.id}
                  variant="contained"
                  className={
                    item.id === gradeStatus
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
