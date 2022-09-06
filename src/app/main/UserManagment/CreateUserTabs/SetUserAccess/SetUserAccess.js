import React from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Icon from "@material-ui/core/Icon";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const useStyles = makeStyles({
  root: {
    fontSize: "1rem",
  },
  createBtn: {
    "&.MuiButton-root": {
      letterSpacing: 0,
      textTransform: "capitalize",
    },
  },
});

const SetUserAccess = () => {
  const classes = useStyles();
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          "& .MuiFormControlLabel-label": {
            fontSize: "12px",
            fontWeight: "bold",
            color: "#20292F",
          },
        }}
        classes={{
          root: classes.root,
        }}
      >
        <Typography
          variant="h5"
          sx={{ margin: "10px 5px", fontWeight: "bold" }}
        >
          Set user access to site(s)
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Card
              sx={{
                minWidth: 300,
                minHeight: 300,
                height: "100%",
                display: "flex",
                alignItems: "start",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="button"
                display="block"
                sx={{
                  px: 2,
                  py: 0.5,
                  fontWeight: 700,
                  width: "250px",
                }}
              >
                <img
                  className="logo-icon w-full h-full"
                  src="assets/images/eAlpha_03.png"
                  alt="logo"
                />
              </Typography>

              <CardContent sx={{ width: "100%" }}>
                <div className="flex justify-between my-5">
                  <p
                    style={{ fontSize: "11px" }}
                    className="font-semibold text-gray-500"
                  >
                    Select item bank(s) access*
                  </p>
                  <span
                    style={{ fontSize: "10px" }}
                    className="underline text-blue-600 whitespace-nowrap"
                  >
                    Learn about permission group
                  </span>
                </div>
                <FormGroup sx={{ display: "flex" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Alpha Publishing Prod"
                    className="text-2xl"
                    name="alphaProd"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Alpha Publishing Dev"
                    name="alphaDev"
                  />
                </FormGroup>
                <div className="flex justify-between my-5">
                  <p
                    style={{ fontSize: "11px" }}
                    className="font-semibold text-gray-500"
                  >
                    Set default user roles for all item banks*
                  </p>
                  <span
                    style={{ fontSize: "10px" }}
                    className="underline text-blue-600 whitespace-nowrap"
                  >
                    Learn more about Aurthor Site user roles
                  </span>
                </div>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Activity Manager"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Bulk Update Manager"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Tag Manager"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Tag Hierarchy Manager"
                    />
                    <FormControlLabel control={<Checkbox />} label="Users" />
                  </FormGroup>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card
              sx={{
                minWidth: 300,
                minHeight: 300,
                height: "100%",
                display: "flex",
                alignItems: "start",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="button"
                display="block"
                sx={{ px: 2, py: 0.5, fontWeight: 700, mt: 2, width: "250px" }}
              >
                <img
                  className="logo-icon w-full h-full"
                  src="assets/images/eAlpha_05.png"
                  alt="logo"
                />
              </Typography>
              <CardContent sx={{ width: "100%" }}>
                <div className="flex justify-between my-5">
                  <p
                    style={{ fontSize: "11px" }}
                    className="font-semibold text-gray-500"
                  >
                    Set user roles*
                  </p>
                  <span
                    style={{ fontSize: "10px" }}
                    className="underline text-blue-600 whitespace-nowrap"
                  >
                    Learn more about user roles
                  </span>
                </div>
                <FormGroup sx={{ display: "inline-block" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Access(Edit profile only)"
                    className="text-2xl"
                  />
                  <FormControlLabel control={<Checkbox />} label="User" />
                  <FormControlLabel control={<Checkbox />} label="Admin" />
                </FormGroup>
                <div className="flex justify-between my-5">
                  <p
                    style={{ fontSize: "11px" }}
                    className="font-semibold text-gray-500"
                  >
                    Management roles
                  </p>
                </div>
                <FormGroup sx={{ display: "inline-block" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Management Admin"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="User Manager"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="System Admin"
                  />
                </FormGroup>
                <div className="flex justify-between my-5">
                  <p
                    style={{ fontSize: "11px" }}
                    className="font-semibold text-gray-500"
                  >
                    Insight roles
                  </p>
                </div>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Insight Access"
                />
                <div className="flex justify-between my-5">
                  <p
                    style={{ fontSize: "11px" }}
                    className="font-semibold text-gray-500"
                  >
                    Insight roles
                  </p>
                </div>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Aurthor Site Setting Manager"
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Typography
          sx={{
            fontSize: "13px",
            margin: "30px 10px 30px 20px",
            color: "gray",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Icon color="action" style={{ color: "#0078d2", margin: "0 0.8rem" }}>
            infoicon
          </Icon>
          The new user newuser@gmail.com will be sent an email with a set
          password link that will expire in 7 days.
        </Typography>
        <div className="flex justify-between my-5">
          <Button
            sx={{ fontSize: "14px", borderRadius: "25px", padding: "2px 25px" }}
            variant="contained"
            size="medium"
            className={classes.createBtn}
          >
            Create User
          </Button>
          <Button
            className={classes.createBtn}
            sx={{
              fontSize: "14px",
              borderRadius: "25px",
              padding: "2px 25px",
              backgroundColor: "gray",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
            variant="contained"
            size="medium"
          >
            Cancel
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default SetUserAccess;
