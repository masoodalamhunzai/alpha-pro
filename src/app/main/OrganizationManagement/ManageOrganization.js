/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */

import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import Typography from "@mui/material/Typography";
import swal from "sweetalert";
import { useHistory, useLocation } from "react-router-dom";
import {
  DialogActions,
  DialogContent,
  Button,
  Grid,
  TextField,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
// import { PlusCircle as PlusCircleIcon } from 'react-feather';
/* import {
  CloudUpload as CloudUploadIcon,
  Cancel as CancelIcon,
  CalendarToday as DateIcon,
} from '@material-ui/icons'; */
import { AddOrganization } from "app/services/api/ApiManager";
import { useStateValue } from "app/services/state/State";
// import * as Yup from 'yup';
import { states, countries, countriesState } from "app/services/Settings";

import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { Autocomplete } from "@material-ui/lab";
// import AddProviderDialog from 'app/main/providers/CreateProviderDialog';
import Breadcrumb from "../../fuse-layouts/shared-components/Breadcrumbs";
import PhoneInput from "react-phone-input-2";
//import "react-phone-input-2/lib/style.css";

import "react-phone-input-2/lib/material.css";

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
  },
  activeText: {
    color: "green",
  },
  inActiveText: {
    color: "red",
  },
  plusButton: {
    alignSelf: "center",
    marginLeft: "-10px",
  },
}));

function ManageOrganization({ open, onClose, organizationId, onAddedUpdated }) {
  const location = useLocation();
  const history = useHistory();
  const pageTitle = location.pathname
    .split("/")
    .filter((x) => x)
    .pop()
    .split("-")
    .join(" ");
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { editData, mode } = location?.state && location?.state;

  const editOrganization = mode === "edit-org" ? editData : editData;
  console.log(editOrganization, "editOrganization");
  const [loading, setLoading] = useState(true);
  const [organization, setOrganization] = useState(null);
  const [serviceProviderDialog, setServiceProviderDialog] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const [statesArray, setStatesArray] = useState([]);
  const [countriesArray, setCountriesArray] = useState([]);

  useEffect(() => {
    var temp = [];
    countriesState.map((cnt) => {
      temp.push({ name: cnt.country, code: cnt.alpha2Code });
    });
    setCountriesArray(temp);
  }, []);

  const redirectTo = async (goTo) => {
    try {
      history.push(goTo);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
      <FusePageSimple
        classes={{
          root: classes.layoutRoot,
        }}
        header={
          <div className="p-24">
            <Breadcrumb />
            <Typography
              variant="h3"
              style={{ color: "#000" }}
              gutterBottom
              sx={{
                color: "#000",
                fontWeight: 700,
                mt: 2,
                textTransform: "capitalize",
              }}
            >
              Manage Organization
            </Typography>
          </div>
        }
        content={
          <Formik
            initialValues={{
              name:
                (organization && organization.name) ||
                editOrganization?.name ||
                "",
              contactperson:
                (organization && organization.contactperson) ||
                editOrganization?.contactperson ||
                "",
              email:
                (organization && organization.email) ||
                editOrganization?.email ||
                "",
              phonenumber:
                (organization && organization.phonenumber) ||
                editOrganization?.phonenumber ||
                "",
              address:
                (organization && organization.address) ||
                editOrganization?.address ||
                "",
              city:
                (organization && organization.city) ||
                editOrganization?.city ||
                "",
              state:
                (organization && organization.state) ||
                editOrganization?.state ||
                "",
              country:
                (organization && organization.country) ||
                editOrganization?.country ||
                "",
              website:
                (organization && organization.website) ||
                editOrganization?.website ||
                "",
              isActive: (organization && organization.isActive) || false,
            }}
            onSubmit={async (
              values,
              { resetForm, setErrors, setStatus, setSubmitting }
            ) => {
              try {
                const orgReq = {
                  id: "",
                  name: values.name.trim(),
                  description: "This is test organization 1",
                  contactFullName: values.contactperson.trim(),
                  contactDesignation: "Developer",
                  contactNumber: values.phonenumber.trim(),
                  contactEmail: values.email.trim(),
                };

                const res = await AddOrganization(orgReq, user);

                if (res && res.data && res.data.status === "success") {
                  swal({
                    title: "Good job!",
                    text: "Organization Saved Successfully!",
                    icon: "success",
                    button: "Ok!",
                  }).then((value) => {
                    redirectTo("/organization-management");
                  });
                }

                /*  const patientReq = new FormData();
                patientReq.append('FirstName', values.name.trim());
                patientReq.append('LastName', values.contactperson.trim());
                patientReq.append('Email', values.email.trim());
                patientReq.append('PhoneNumber', values.phonenumber.trim());
                patientReq.append('Address', values.address.trim());
                patientReq.append('City', values.city.trim());
                patientReq.append('State', values.state);
                patientReq.append('Country', values.country);
                patientReq.append('Website', values.website.trim());
                 */
              } catch (error) {
                setStatus({ success: false });
                setErrors({ submit: error.message });
                setSubmitting(false);
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <DialogContent>
                  <Grid container spacing={2} style={{ display: "flex" }}>
                    <Grid item lg={6} md={6} sm={6}>
                      <TextField
                        error={Boolean(touched.name && errors.name)}
                        fullWidth
                        helperText={touched.name && errors.name}
                        label="Name"
                        name="name"
                        color="secondary"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        value={values.name}
                        variant="outlined"
                        style={{ background: "#fff" }}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6}>
                      <TextField
                        error={Boolean(
                          touched.contactperson && errors.contactperson
                        )}
                        fullWidth
                        helperText={
                          touched.contactperson && errors.contactperson
                        }
                        label="Contact Person"
                        name="contactperson"
                        color="secondary"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        value={values.contactperson}
                        variant="outlined"
                        style={{ background: "#fff" }}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6}>
                      <TextField
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email}
                        label="Email"
                        name="email"
                        color="secondary"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        variant="outlined"
                        type="email"
                        style={{ background: "#fff" }}
                      />
                    </Grid>
                    {/* <Grid item lg={6} md={6} sm={6}>
                      <TextField
                        error={Boolean(
                          touched.phonenumber && errors.phonenumber
                        )}
                        fullWidth
                        helperText={touched.phonenumber && errors.phonenumber}
                        label="Phone Number"
                        name="phonenumber"
                        color="secondary"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phonenumber}
                        variant="outlined"
                        style={{ background: "#fff" }}
                      />
                    </Grid> */}
                    <Grid item lg={6} md={6} sm={6} className="ph-no-field">
                      <PhoneInput
                        style={{ width: "100%", background: "#fff" }}
                        country={"us"}
                        inputProps={{
                          name: "phonenumber",
                          required: true,
                          autoFocus: true,
                        }}
                        placeholder="Phone Number"
                        name="phonenumber"
                        onChange={(e) => setFieldValue("phonenumber", e)}
                        value={values.phonenumber}
                      />
                    </Grid>

                    {/* <Grid item lg={6} md={6} sm={6}>
                        <DatePicker
                          format="MM-dd-yyyy"
                          inputVariant="outlined"
                          value={values.dateOfBirth}
                          onChange={(e) => setFieldValue('dateOfBirth', e)}
                          maxDate={moment()}
                          TextFieldComponent={(props) => (
                            <TextField
                              {...props}
                              error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                              fullWidth
                              helperText={touched.dateOfBirth && errors.dateOfBirth}
                              label="Date Of Birth"
                              name="dateOfBirth"
                              color="secondary"
                              onBlur={handleBlur}
                              required
                              variant="outlined"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                     <DateIcon fontSize="inherit" /> 
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                        />
                      </Grid> */}
                    {/* <Grid item lg={12} md={12} sm={12}>
                      <TextField
                        error={Boolean(touched.address && errors.address)}
                        fullWidth
                        helperText={touched.address && errors.address}
                        label="Address"
                        name="address"
                        color="secondary"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address}
                        variant="outlined"
                        style={{ background: '#fff' }}
                        required
                      />
                    </Grid> */}

                    <Grid item lg={6} md={6} sm={6}>
                      <Autocomplete
                        freeSolo
                        multiple={false}
                        options={countriesArray || []}
                        getOptionLabel={(o) => o.name || ""}
                        value={
                          (countriesArray &&
                            countriesArray.length > 0 &&
                            countriesArray.find(
                              (s) => s.code === values.country
                            )) ||
                          ""
                        }
                        onChange={(event, newValue) => {
                          if (newValue && newValue.code) {
                            setFieldValue("country", newValue.code);
                            setFieldValue("state", "");
                            console.log(newValue);
                            console.log(
                              countriesState.map((s) => {
                                if (s.alpha2Code === newValue.code) {
                                  setStatesArray(s.states);
                                }
                              })
                            );
                          } else {
                            setFieldValue("country", "");
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select Country"
                            error={Boolean(touched.country && errors.country)}
                            fullWidth
                            helperText={touched.country && errors.country}
                            label="Select Country"
                            name="country"
                            color="secondary"
                            onBlur={handleBlur}
                            variant="outlined"
                            required
                            style={{ background: "#fff" }}
                          />
                        )}
                      />
                    </Grid>
                    {/* <Grid item lg={6} md={6} sm={6}>
                      <Autocomplete
                        freeSolo
                        multiple={false}
                        options={states || []}
                        getOptionLabel={(o) => o.name || ""}
                        value={
                          (states &&
                            states.length > 0 &&
                            states.find((s) => s.code === values.state)) ||
                          ""
                        }
                        onChange={(event, newValue) => {
                          if (newValue && newValue.code) {
                            setFieldValue("state", newValue.code);
                          } else {
                            setFieldValue("state", "");
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select State"
                            error={Boolean(touched.state && errors.state)}
                            fullWidth
                            helperText={touched.state && errors.state}
                            label="Select State"
                            name="state"
                            color="secondary"
                            onBlur={handleBlur}
                            variant="outlined"
                            style={{ background: "#fff" }}
                            required
                          />
                        )}
                      />
                    </Grid> */}

                    <Grid item lg={6} md={6} sm={6}>
                      <Autocomplete
                        freeSolo
                        multiple={false}
                        options={statesArray || []}
                        value={
                          (statesArray &&
                            statesArray.length > 0 &&
                            states.find((s) => s === values.state)) ||
                          ""
                        }
                        onChange={(event, newValue) => {
                          if (newValue && newValue) {
                            setFieldValue("state", newValue);
                          } else {
                            setFieldValue("state", "");
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select State"
                            error={Boolean(touched.state && errors.state)}
                            fullWidth
                            helperText={touched.state && errors.state}
                            label="Select State"
                            name="state"
                            color="secondary"
                            onBlur={handleBlur}
                            variant="outlined"
                            style={{ background: "#fff" }}
                            required
                          />
                        )}
                      />
                    </Grid>

                    <Grid item lg={6} md={6} sm={6}>
                      <TextField
                        error={Boolean(touched.city && errors.city)}
                        fullWidth
                        helperText={touched.city && errors.city}
                        label="City"
                        name="city"
                        color="secondary"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.city}
                        variant="outlined"
                        style={{ background: "#fff" }}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6}>
                      <TextField
                        error={Boolean(touched.website && errors.website)}
                        fullWidth
                        helperText={touched.website && errors.website}
                        label="Website"
                        name="website"
                        color="secondary"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        // required
                        value={values.website}
                        variant="outlined"
                        style={{ background: "#fff" }}
                      />
                    </Grid>

                    <Grid
                      item
                      lg={6}
                      md={6}
                      sm={6}
                      align="left"
                      style={{ marginLeft: "1%" }}
                    >
                      <Typography>Status</Typography>
                      {console.log(values.isActive, "values.isActive")}
                      <FormControlLabel
                        control={
                          <Switch
                            checked={values.isActive}
                            onChange={(_, v) => setFieldValue("isActive", v)}
                          />
                        }
                        classes={{
                          label: values.isActive
                            ? classes.activeText
                            : classes.inActiveText,
                        }}
                        label={values.isActive ? "Active" : "InActive"}
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Grid container>
                    <Grid
                      item
                      lg={12}
                      md={12}
                      sm={12}
                      align="right"
                      style={{ marginRight: "2%" }}
                    >
                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        disabled={isSubmitting}
                        className={classes.button}
                      >
                        <Typography>Save</Typography>
                      </Button>
                      <Button
                        className={classes.buttonGrey}
                        variant="contained"
                        color="secondary"
                        onClick={() => redirectTo("/organization-management")}
                      >
                        <Typography>Cancel</Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </DialogActions>
              </form>
            )}
          </Formik>
        }
      />
    </>
  );
}

export default ManageOrganization;
