import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@material-ui/core";
import { primaryBlueColor, primaryGrayColor } from "app/services/Settings";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    border: `1px solid ${theme.palette.background.default}`,
  },
  uploadIcon: {
    color: "#01619b",
    cursor: "pointer",
  },
  icon: {
    color: "white",
    cursor: "pointer",
    float: "right",
  },
  row: {
    display: "flex",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    background: theme.palette.primary.main,
    color: "#fff",
    marginLeft: 5,
  },
  dialogHeader: {
    height: 150,
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  dialogTitle: {
    color: "#fff",
    backgroundColor: "#01619b",
  },
  name: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
  types: {
    zIndex: 1,
  },
  buttonGrey: {
    background: "grey",
    color: "#fff",
    marginLeft: 5,
    "&:hover": { backgroundColor: primaryBlueColor },
  },
  buttonSelected: {
    background: "lightblue",
    color: "#fff",
    marginLeft: 5,
  },
  activeText: {
    color: "green",
  },
  inActiveText: {
    color: "red",
  },
  btnSelected: {
    backgroundColor: primaryBlueColor,
    color: "#fff",
    marginLeft: 5,
  },
  plusButton: {
    alignSelf: "center",
    marginLeft: "-10px",
  },
}));

const scoringTypesList = [
  {
    value: 1,
    label: "Per Question",
  },
  {
    value: 2,
    label: "Dichotomous",
  },
  {
    value: 3,
    label: "Dependent (EBSR)",
  },
];

function DetailsConfiguration(props) {
  const classes = useStyles();
  const [scoringType, setScoringType] = useState(1);

  const handleChange = (event, index) => {
    setScoringType(event.target.value);
  };
  const handleNameChange = (event) => {
    props.setNameDetails(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    props.setDescriptionDetails(event.target.value);
  };

  const handleStatusButtonClick = (val) => {
    // console.log('props.statusButtonDetails ', val);
    // props.setStatusButtonDetails(val);
  };

  return (
    <>
      <div className="space-y-32 flex" style={{ width: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            className="mx-6"
            style={{ width: "100%" }}
            inputProps={{
              style: {
                backgroundColor: "white",
                fontSize: "13px",
              },
            }}
            size="small"
            required
            id="outlined-required"
            label="Name"
            placeholder="Name"
            value={props.nameDetails}
            onChange={handleNameChange}
          />

          <Typography
            gutterBottom
            sx={{
              color: "gray",
              fontWeight: 720,
              padding: "2%",
            }}
          >
            The unique identifying code for an item
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "gray",
              fontWeight: 700,
              mt: 2,
            }}
          >
            Status
          </Typography>
          <div>
            <Button
              className={
                props.statusButtonDetails == "Published"
                  ? classes.btnSelected
                  : classes.buttonGrey
              }
              onClick={() => {
                props.setStatusButtonDetails("Published");
              }}
              variant="contained"
              color="secondary"
            >
              <Typography>Published</Typography>
            </Button>
            <Button
              className={
                props.statusButtonDetails == "Unpublished"
                  ? classes.btnSelected
                  : classes.buttonGrey
              }
              onClick={() => {
                props.setStatusButtonDetails("Unpublished");
              }}
              variant="contained"
              color="secondary"
            >
              <Typography>Unpublished</Typography>
            </Button>
            <Button
              className={
                props.statusButtonDetails == "Archive"
                  ? classes.btnSelected
                  : classes.buttonGrey
              }
              onClick={() => {
                props.setStatusButtonDetails("Archive");
              }}
              variant="contained"
              color="secondary"
            >
              <Typography>Archive</Typography>
            </Button>
          </div>

          <TextField
            style={{ backgroundColor: "white", width: "100%", marginTop: "7%" }}
            id="outlined-select-currency"
            size="small"
            inputProps={{
              style: {
                backgroundColor: "white",
                fontSize: "13px",
              },
            }}
            select
            label="Scoring Type"
            // value={answer}
            value={props.scoringType}
            onChange={(e) => {
              console.log(
                "score type",
                e.target.value + " vs" + props.scoringType
              );
              props.setScoringType(e.target.value);
            }}
            // helperText="Correct Ans"
          >
            {scoringTypesList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            focused
            style={{ backgroundColor: "white", width: "100%", marginTop: "7%" }}
            multiline
            rows={3}
            className="mx-6"
            /*  inputProps={{
                                style: {
                                  backgroundColor: "white",
                                },
                              }}  */
            size="large"
            inputProps={{
              style: {
                backgroundColor: "white",
                fontSize: "13px",
              },
            }}
            required
            id="outlined-required"
            label="Description"
            placeholder="Description here"
            value={props.descriptionDetails}
            onChange={handleDescriptionChange}
          />

          <Typography
            gutterBottom
            sx={{
              color: "gray",
              fontWeight: 720,
              padding: "2%",
            }}
          >
            Describe the item for other authors
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "gray",
              fontWeight: 700,
              mt: 2,
            }}
          >
            Difficulty Level
          </Typography>

          <div>
            <Button
              className={
                props.difficultyButtonDetails == "Easy"
                  ? classes.btnSelected
                  : classes.buttonGrey
              }
              onClick={() => {
                props.setDifficultyButtonDetails("Easy");
              }}
              variant="contained"
              color="secondary"
            >
              <Typography>Easy</Typography>
            </Button>
            <Button
              className={
                props.difficultyButtonDetails == "Medium"
                  ? classes.btnSelected
                  : classes.buttonGrey
              }
              onClick={() => {
                props.setDifficultyButtonDetails("Medium");
              }}
              variant="contained"
              color="secondary"
            >
              <Typography>Medium</Typography>
            </Button>
            <Button
              className={
                props.difficultyButtonDetails == "Hard"
                  ? classes.btnSelected
                  : classes.buttonGrey
              }
              onClick={() => {
                props.setDifficultyButtonDetails("Hard");
              }}
              variant="contained"
              color="secondary"
            >
              <Typography>Hard</Typography>
            </Button>
          </div>

          <TextField
            focused
            style={{ backgroundColor: "white", width: "100%", marginTop: "7%" }}
            multiline
            rows={3}
            className="mx-6"
            value={props.contentSource}
            onChange={(e) => {
              props.setContentSource(e.target.value);
            }}
            /*  inputProps={{
                                style: {
                                  backgroundColor: "white",
                                },
                              }}  */
            size="large"
            required
            id="outlined-required"
            label="Source"
            placeholder="Source"
          />

          <Typography
            gutterBottom
            sx={{
              color: "gray",
              fontWeight: 720,
              padding: "2%",
            }}
          >
            Capture the source of the item content
          </Typography>

          <TextField
            focused
            style={{ backgroundColor: "white", width: "100%", marginTop: "3%" }}
            multiline
            rows={3}
            className="mx-6"
            value={props.contentNotes}
            onChange={(e) => {
              props.setContentNotes(e.target.value);
            }}
            /*  inputProps={{
                                style: {
                                  backgroundColor: "white",
                                },
                              }}  */
            size="large"
            required
            id="outlined-required"
            label="Notes"
            placeholder="Notes"
          />

          <Typography
            gutterBottom
            sx={{
              color: "gray",
              fontWeight: 720,
              padding: "2%",
            }}
          >
            Makes notes against the item
          </Typography>

          <TextField
            focused
            style={{ backgroundColor: "white", width: "100%", marginTop: "3%" }}
            multiline
            rows={3}
            className="mx-6"
            value={props.contentAcknowledgements}
            onChange={(e) => {
              props.setContentAcknowledgements(e.target.value);
            }}
            /*  inputProps={{
                                style: {
                                  backgroundColor: "white",
                                },
                              }}  */
            size="large"
            required
            id="outlined-required"
            label="Acknowledgements"
            placeholder="Acknowledgements"
          />
          <Typography
            gutterBottom
            sx={{
              color: "gray",
              fontWeight: 720,
              padding: "2%",
            }}
          >
            Acknowledgements to contributors of the item content
          </Typography>
        </Box>
      </div>
    </>
  );
}

export default DetailsConfiguration;
