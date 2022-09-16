import { useState } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useLocation, useHistory } from "react-router-dom";
import { useStateValue } from "app/services/state/State";

const useStyles = makeStyles({
  root: {
    fontSize: "1rem",
    "&.MuiContainer-root": {
      maxWidth: "55%",
      margin: "2rem",
    },
  },
});

const EditTagType = () => {
  const history = useHistory();
  const location = useLocation();
  const [{ user }, dispatch] = useStateValue();

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
      maxWidth="xs"
    >
      <Box>
        <Grid xs={4}>
          <div>xs=4</div>
        </Grid>
        <Grid xs={8}>
          <div>xs=8</div>
        </Grid>
      </Box>
    </Container>
  );
};

export default EditTagType;
