import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function SetUserAccess() {
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          "& .MuiFormControlLabel-label": {
            fontSize: "12px",
            fontWeight: "bold",
          },
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
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardContent sx={{ width: "100%" }}>
                <div className="flex justify-between my-5">
                  <p className="text-sm text-gray-600">
                    Select item bank(s) access*
                  </p>
                  <span className="underline text-blue-600">
                    Learn about permission group
                  </span>
                </div>
                <FormGroup sx={{ display: "flex" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Alpha Publishing Prod"
                    className="text-2xl"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Alpha Publishing Dev"
                  />
                </FormGroup>
                <div className="flex justify-between my-5">
                  <p className="text-sm text-gray-600">
                    Set default user roles for all item banks*
                  </p>
                  <span className="underline text-blue-600">
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
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardContent sx={{ width: "100%" }}>
                <div className="flex justify-between my-5">
                  <p className="text-sm text-gray-600">Set user roles*</p>
                  <span className="underline text-blue-600">
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
                  <p className="text-sm text-gray-600">Management roles</p>
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
                  <p className="text-sm text-gray-600">Insight roles</p>
                </div>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Insight Access"
                />
                <div className="flex justify-between my-5">
                  <p className="text-sm text-gray-600">Insight roles</p>
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
            margin: "10px 10px 10px 20px",
            color: "gray",
          }}
        >
          The new user newuser@gmail.com will be sent an email with a set
          password link that will expire in 7 days.
        </Typography>
        <div className="flex justify-between my-5">
          <Button
            sx={{ fontSize: "14px", borderRadius: "25px", padding: "2px 25px" }}
            variant="contained"
            size="medium"
          >
            Create User
          </Button>
          <Button
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
}

export default SetUserAccess;
