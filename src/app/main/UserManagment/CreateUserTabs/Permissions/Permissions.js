import React from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Icon from "@material-ui/core/Icon";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const useStyles = makeStyles({
  root: {
    fontSize: "1rem",
  },
});

const Permissions = ({
  handleChangeInputs,
  formData: {
    activityManager,
    alphaProd,
    alphaDev,
    bulkUpdateManager,
    tagManager,
    tagHierarchyManager,
    usersChkbox,
    accessEditProfile,
    admin,
    userChkbox,
    managementAdmin,
    userManager,
    systemAdmin,
    insightAccess,
    aurthorSiteSettingManager,
  },
}) => {
  const classes = useStyles();

  // const [checked, setChecked] = React.useState(true);

  // const handleChange = (event) => {
  //   setChecked(event.target.checked);
  // };
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
                    // checked={checked}
                    label="Alpha Publishing Prod"
                    className="text-2xl"
                    name="alphaProd"
                    value={alphaProd}
                    onChange={handleChangeInputs}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    // checked={checked}
                    label="Alpha Publishing Dev"
                    name="alphaDev"
                    value={alphaDev}
                    onChange={handleChangeInputs}
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
                      control={
                        <Checkbox
                          name="activityManager"
                          value={activityManager}
                          onChange={handleChangeInputs}
                        />
                      }
                      label="Activity Manager"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      // checked={checked}
                      label="Bulk Update Manager"
                      name="bulkUpdateManager"
                      value={bulkUpdateManager}
                      onChange={handleChangeInputs}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      // checked={checked}
                      label="Tag Manager"
                      name="tagManager"
                      value={tagManager}
                      onChange={handleChangeInputs}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Tag Hierarchy Manager"
                      name="tagHierarchyManager"
                      value={tagHierarchyManager}
                      onChange={handleChangeInputs}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Users"
                      name="usersChkbox"
                      value={usersChkbox}
                      onChange={handleChangeInputs}
                    />
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
                    name="accessEditProfile"
                    value={accessEditProfile}
                    className="text-2xl"
                    onChange={handleChangeInputs}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="User"
                    name="userChkbox"
                    value={userChkbox}
                    onChange={handleChangeInputs}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Admin"
                    name="admin"
                    value={admin}
                    onChange={handleChangeInputs}
                  />
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
                    name="managementAdmin"
                    value={managementAdmin}
                    onChange={handleChangeInputs}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="User Manager"
                    name="userManager"
                    value={userManager}
                    onChange={handleChangeInputs}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="System Admin"
                    name="systemAdmin"
                    value={systemAdmin}
                    onChange={handleChangeInputs}
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
                  name="insightAccess"
                  value={insightAccess}
                  onChange={handleChangeInputs}
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
                  name="aurthorSiteSettingManager"
                  value={aurthorSiteSettingManager}
                  onChange={handleChangeInputs}
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
      </Box>
    </div>
  );
};

export default Permissions;
