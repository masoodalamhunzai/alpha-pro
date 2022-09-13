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
    omrManager,
    activityManager,
    alphaProd,
    alphaDev,
    bulkUpdateManager,
    tagManager,
    tagHierarchyManager,
    roleUsers,
    accessEditProfile,
    admin,
    roleUser,
    managementAdmin,
    userManager,
    systemAdmin,
    insightAccess,
    aurthorSiteSettingManager,
  },
}) => {
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
                    control={
                      <Checkbox
                        name="alphaProd"
                        value={alphaProd}
                        onChange={handleChangeInputs}
                      />
                    }
                    label="Alpha Publishing Prod"
                    className="text-2xl"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="alphaDev"
                        value={alphaDev}
                        onChange={handleChangeInputs}
                      />
                    }
                    label="Alpha Publishing Dev"
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
                      control={
                        <Checkbox
                          name="bulkUpdateManager"
                          value={bulkUpdateManager}
                          onChange={handleChangeInputs}
                        />
                      }
                      label="Bulk Update Manager"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="tagManager"
                          value={tagManager}
                          onChange={handleChangeInputs}
                        />
                      }
                      label="Tag Manager"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="tagHierarchyManager"
                          value={tagHierarchyManager}
                          onChange={handleChangeInputs}
                        />
                      }
                      label="Tag Hierarchy Manager"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="roleUsers"
                          value={roleUsers}
                          onChange={handleChangeInputs}
                        />
                      }
                      label="Users"
                    />
                  </FormGroup>
                </Box>

                <div className="flex justify-between my-5">
                  <p
                    style={{ fontSize: "11px" }}
                    className="font-semibold text-gray-500"
                  >
                    Set Rights For Optical Mark Recognition(OMR)
                  </p>
                  {/* <span
                    style={{ fontSize: "10px" }}
                    className="underline text-blue-600 whitespace-nowrap"
                  >
                    Learn more about Aurthor Site user roles
                  </span> */}
                </div>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="omrManager"
                          value={omrManager}
                          onChange={handleChangeInputs}
                        />
                      }
                      label="OMR"
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
                    control={
                      <Checkbox
                        name="accessEditProfile"
                        value={accessEditProfile}
                        onChange={handleChangeInputs}
                      />
                    }
                    label="Access(Edit profile only)"
                    className="text-2xl"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="roleUser"
                        value={roleUser}
                        onChange={handleChangeInputs}
                      />
                    }
                    label="User"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="admin"
                        value={admin}
                        onChange={handleChangeInputs}
                      />
                    }
                    label="Admin"
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
                    control={
                      <Checkbox
                        name="managementAdmin"
                        value={managementAdmin}
                        onChange={handleChangeInputs}
                      />
                    }
                    label="Management Admin"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="userManager"
                        value={userManager}
                        onChange={handleChangeInputs}
                      />
                    }
                    label="User Manager"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="systemAdmin"
                        value={systemAdmin}
                        onChange={handleChangeInputs}
                      />
                    }
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
                  control={
                    <Checkbox
                      name="insightAccess"
                      value={insightAccess}
                      onChange={handleChangeInputs}
                    />
                  }
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
                  control={
                    <Checkbox
                      name="aurthorSiteSettingManager"
                      value={aurthorSiteSettingManager}
                      onChange={handleChangeInputs}
                    />
                  }
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
      </Box>
    </div>
  );
};

export default Permissions;
