/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
import { memo, useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TablePagination, Tooltip } from "@material-ui/core";
import { Folder } from "@material-ui/icons";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
// import { DataGrid } from '@material-ui/data-grid';
import { useStateValue } from "app/services/state/State";
import { actions } from "app/services/state/Reducer";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: 20,
    border: "1px dashed gray",
    minHeight: "150px",
  },
  container: {
    height: "100%",
  },
  textCenter: {
    textAlign: "center",
  },
}));

function DropAndAdd() {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const anchorRef = useRef(null);
  const [{ user, items, defaultPageSize }, dispatch] = useStateValue();

  return (
    <>
      <div className={classes.root}>
        <div className={"mt-32" + " " + classes.textCenter}>
          <span className="p-12">
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </span>

          <span className="p-12"></span>

          <span className="p-12">
            <Fab style={{ backgroundColor: "lightgray" }} aria-label="folder">
              <Folder style={{ color: "white" }} />
            </Fab>
          </span>
        </div>

        <div className={classes.textCenter}>
          <h5
            style={{
              color: "gray",
              padding: "2%",
            }}
          >
            Drag widget here
          </h5>
        </div>
      </div>
    </>
  );
}

export default memo(DropAndAdd);
