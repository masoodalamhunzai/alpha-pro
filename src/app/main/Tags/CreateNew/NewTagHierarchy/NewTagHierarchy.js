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
      maxWidth: "90%",
      margin: "3rem",
    },
    "& .MuiInputBase-input": {
      backgroundColor: "#fff",
      textAlign: "center",
      fontSize: "1.5rem !important",
    },
    "& .MuiButton-root": {
      fontWeight: "700",
      borderRadius: "1.6rem",
      margin: "1rem 0.5rem",
      padding: "0.5rem 3rem",
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
});
const tagTypeStatusArr = [
  { id: 1, status: "Items" },
  { id: 2, status: "Activities" },
];
const NewTagType = () => {
  const history = useHistory();
  const location = useLocation();
  // const EDIT_MODE = "edit-subject";
  // const CREATE_NEW_MODE = "create-subject";
  const { editData, mode } = location?.state ? location?.state : "";
  // const [{ user, grades }, dispatch] = useStateValue();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [tagTypeStatus, setTagTypeStatus] = useState(0);

  // const [newSubject, setNewSubject] = useState(
  //   mode === EDIT_MODE ? editData.subject : ""
  // );

  const handleChangeStatus = (key) => {
    setTagTypeStatus(key);
  };

  const handleChangeInputs = (e) => {
    // setNewSubject(e.target.value);
  };

  // const validation = () => {
  //   if (newSubject.trim() === "") {
  //     setError(true);
  //     setErrorMessage("Subject field is Required");
  //     return false;
  //   }
  //   if (selectGrade === "") {
  //     setError(true);
  //     setErrorMessage("grade field is Required");
  //     return false;
  //   }
  //   return true;
  // };
  // const handleSubjectSubmit = async (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     id: mode === EDIT_MODE ? editData?.id : "",
  //     title: newSubject,
  //     slug: slugify(newSubject),
  //     gradeId: selectGrade,
  //   };
  //   if (validation()) {
  //     const res = await createUserSubject(user, payload);
  //     if (res && res.data && res.data.status === "success") {
  //       swal({
  //         title: "Good job!",
  //         text:
  //           mode === EDIT_MODE
  //             ? "Subject Updated Successfully!"
  //             : "Subject Saved Successfully!",
  //         icon: "success",
  //         button: "Ok!",
  //       }).then((value) => {
  //         redirectTo("/subject");
  //       });
  //     }
  //   } else {
  //     setTimeout(() => {
  //       setError(false);
  //     }, 3000);
  //   }
  // };

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
              id="reference"
              label="Reference"
              name="reference"
              // defaultValue={newName}
              autoComplete="Reference"
              autoFocus
            />
          </FormControl>
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

export default NewTagType;
