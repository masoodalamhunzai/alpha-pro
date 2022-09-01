import { useState } from "react";
import FusePageSimple from "@fuse/core/FusePageSimple";
import Typography from "@mui/material/Typography";
import { makeStyles, ThemeProvider, useTheme } from "@material-ui/core/styles";
import { useStateValue } from "app/services/state/State";
import { actions } from "app/services/state/Reducer";
import { useLocation } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router";
import Breadcrumb from "../../fuse-layouts/shared-components/Breadcrumbs";
import ItemsList from "./ItemsList";
import { Add as AddIcon } from "@material-ui/icons";
import Error500 from "app/shared-components/Error500";

const useStyles = makeStyles({
  layoutRoot: {},
});

const ItemAnalysis = () => {
  const location = useLocation();
  const history = useHistory();
  const pageTitle = location.pathname
    .split("/")
    .filter((x) => x)[0]
    .split("-")
    .join(" ");
  const classes = useStyles();
  const [{ user, news }, dispatch] = useStateValue();

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <div className="p-24">
          <Breadcrumb />
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              color: "#000",
              fontWeight: 700,
              mt: 2,
              textTransform: "capitalize",
            }}
          >
            {"All Questions"}
          </Typography>
        </div>
      }
      content={
        <div className="p-6">
          {/* start */}
          <Error500 />
          {/* end */}
        </div>
      }
    />
  );
};

export default ItemAnalysis;
