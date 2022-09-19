import { useState } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useLocation, useHistory } from "react-router-dom";
import { useStateValue } from "app/services/state/State";
import TagTypeList from "../../TagTypeList";

const useStyles = makeStyles({
  root: {
    fontSize: "1rem",
    "&.MuiContainer-root": {
      maxWidth: "100%",
      margin: "0px",
      padding: "0px",
    },
    inputBox: {
      flexDirection: "column",
      display: "flex",
    },
    inputFieldTxt: {
      margin: "10px 0px",
    },
    editTagInput: {
      margin: "10px 0px",
      width: "50%",
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
      "&:hover": { backgroundColor: "#3287fb" },
      textTransform: "capitalize",
    },
  },
  editButtonGrey: {
    "&.MuiButton-root": {
      backgroundColor: "grey",
      fontSize: "1.3rem",
      color: "#fff",
      "&:hover": { backgroundColor: "#3287fb" },
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
      width: "50%",
      borderRadius: "0px",
      margin: "0px",
    },
  },
  saveBtn: {
    "&.MuiButton-root": {
      backgroundColor: "#3287FB",
      fontSize: "1.3rem",
      textTransform: "capitalize",
    },
  },
  deleteBtn: {
    "&.MuiButton-root": {
      backgroundColor: "red",
      fontSize: "1.3rem",
      textTransform: "capitalize",
    },
  },
  cancelBtn: {
    "&.MuiButton-root": {
      backgroundColor: "#ACACAC",
      fontSize: "1.3rem",
      textTransform: "capitalize",
      width: "50%",
      borderRadius: "0px",
      margin: "0px",
    },
  },
});

const EditTagType = () => {
  const history = useHistory();
  const location = useLocation();
  const [{ user }, dispatch] = useStateValue();
  const [name, setName] = useState("");
  const [page, setPage] = useState(0);
  const [usedInStatus, setUsedInStatus] = useState(0);

  const handleChangeStatus = (key) => {
    setUsedInStatus(key);
  };
  const handleChange = (event) => {
    setName(event.target.value);
  };

  const usedInArr = [
    { id: 1, status: "item" },
    { id: 2, status: "activities" },
  ];
  const editTagArry = [
    { id: 1, value: "saveDraft" },
    { id: 2, value: "UnPublished" },
    { id: 3, value: "Cancel" },
  ];

  const redirectTo = async (goTo) => {
    try {
      history.push(goTo);
    } catch (err) {}
  };

  const classes = useStyles();
  return (
    <Container
      classes={{
        root: classes.root,
      }}
      component="main"
    >
      <Box sx={{ display: "flex" }}>
        <Grid
          xs={4}
          sx={{
            backgroundColor: "#ededed",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ padding: "10px" }}>
            <Typography variant="h3">Tag Type</Typography>
            <Box ClassName={classes.inputBox}>
              <FormControl fullWidth>
                <TextField
                  margin="normal"
                  required
                  onChange={handleChange}
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Long Name"
                  multiline
                  rows={4}
                  placeholder="Long Name"
                />
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <span className="text-gray-500 text-base w-full block">
                Used In* :
              </span>
              <Stack
                spacing={3}
                direction="row"
                alignItems="center"
                display="flex"
                className="w-full"
                justifyContent="center"
              >
                {usedInArr?.map((item) => (
                  <Button
                    key={item.id}
                    variant="contained"
                    className={
                      item.id === usedInStatus
                        ? classes.buttonGrey
                        : classes.buttonSelected
                    }
                    onClick={() => handleChangeStatus(item.id)}
                  >
                    {item.status}
                  </Button>
                ))}
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              type="cancel"
              variant="contained"
              className={classes.cancelBtn}
              onClick={() => redirectTo("/tag-types")}
            >
              cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              className={classes.continueBtn}
            >
              Update
            </Button>
          </Box>
        </Grid>
        <Grid xs={8} sx={{ width: "100%", paddingLeft: "20px" }}>
          <Box>
            <Box sx={{ padding: "10px 20px" }}>
              <Typography variant="h3">Edit Tag</Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <FormControl sx={{ margin: "10px", width: "50%" }}>
                  <TextField
                    margin="normal"
                    required
                    onChange={handleChange}
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                  />
                </FormControl>
                <FormControl sx={{ margin: "10px", width: "50%" }}>
                  <TextField
                    margin="normal"
                    required
                    onChange={handleChange}
                    label="Long Name"
                    name="longName"
                    autoComplete="Long Name"
                    autoFocus
                  />
                </FormControl>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Stack
                  spacing={3}
                  direction="row"
                  alignItems="center"
                  display="flex"
                  className="w-full"
                  justifyContent="center"
                >
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.saveBtn}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.editButtonGrey}
                  >
                    Save Draft
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.editButtonGrey}
                  >
                    Unpublished
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.editButtonGrey}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.deleteBtn}
                  >
                    Delete
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Box>
          <div className="mt-8 mb-5 w-full">
            <Divider />
          </div>
          <Box>
            <TagTypeList
              page={page}
              setPage={setPage}
              // loading={loading}
            />
          </Box>
        </Grid>
      </Box>
    </Container>
  );
};

export default EditTagType;
