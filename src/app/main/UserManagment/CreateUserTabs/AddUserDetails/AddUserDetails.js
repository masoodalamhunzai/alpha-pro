import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import PasswordIcon from "@mui/icons-material/Password";
import {
  LocalPhone as LocalPhoneIcon,
  AccountBalance as AccountBalanceIcon,
  // Upload as UploadIcon,
} from "@material-ui/icons";
import Icon from "@material-ui/core/Icon";
import { actions } from "app/services/state/Reducer";
import {
  getAllRoles,
  getOrganizations,
  createOrganizationUser,
} from "app/services/api/ApiManager";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { useStateValue } from "app/services/state/State";
import { useHistory, useLocation } from "react-router";
import { truncate } from "lodash";

const useStyles = makeStyles({
  root: {
    fontSize: "1.6rem",
    "&.MuiContainer-root": {
      maxWidth: "100%",
      margin: 0,
    },
    "& .MuiInputBase-input": {
      backgroundColor: "#fff",
      textAlign: "start",
    },
    "& .MuiButton-root": {
      fontWeight: "700",
      borderRadius: "1.6rem",
      margin: "2rem 0",
      padding: "1rem 2rem",
      fontSize: "1rem",
    },
    "& .MuiFormControlLabel-label": {
      fontSize: "1.2rem",
      margin: "1rem 0",
    },
    "& .Mui-focused": {
      fontSize: "1.6rem !important",
    },
    "& .MuiFormControl-root": {
      margin: "1rem 0",
    },
    "& .MuiInputLabel-root": {
      fontSize: "1.4rem",
      left: "-4px",
      top: "-5px",
    },
    "& .MuiOutlinedInput-input:focus": {
      height: "14px",
    },
    "& .react-tel-input": {
      width: "90%",
      border: "1px solid #b0b8c3",
      borderRadius: "5px",
      "&:focus": {
        border: "1px solid #1976d2",
        boxShadow: "0 0 0 1px #1976d2",
      },
      "&:hover": {
        border: "1px solid #1976d2",
        boxShadow: "0 0 0 1px #1976d2",
      },
    },
    "& .react-tel-input .form-control": {
      padding: "1rem",
      width: "88%",
      marginLeft: "12%",
      border: "none",
      "&:focus": {
        border: "none",
        boxShadow: "none",
      },
    },
    "& .MuiAlert-root": {
      width: "50%",
      fontSize: "1.2rem",
      textTransform: "capitalize",
    },
  },
  continueBtn: {
    "&.MuiButton-root": {
      backgroundColor: "#3287FB",
      margin: "0 1rem",
    },
  },
  cancelBtn: {
    "&.MuiButton-root": {
      backgroundColor: "#ACACAC",
    },
  },
  formInput: {
    "&.MuiBox-root": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "48%",
    },
  },
});

function AddUserDetailsTab({
  handleChangeInputs,
  handleChangePhone,
  formData,
}) {
  const history = useHistory();
  const location = useLocation();
  const [{ user, organization, roles }, dispatch] = useStateValue();
  const USER_ROLE_CLIENT_ADMIN = "client-admin";
  const USER_ROLE_SUPER_ADMIN = "super-admin";
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [error, setError] = useState(false);
  // const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const { editData } = location?.state ? location?.state : "";

  // const [formData, setFormData] = useState({
  //   email: editData?.email.length > 0 ? editData?.email : "",
  //   firstName: editData?.firstName.length > 0 ? editData?.firstName : "",
  //   lastName: editData?.lastName.length > 0 ? editData?.lastName : "",
  //   phone: editData?.phonenumber.length > 0 ? editData?.phonenumber : "",
  //   organizations:
  //     editData?.organization.length > 0 ? editData?.organization : "",
  //   password: "",
  //   confirmPassword: "",
  //   userRoles: "",
  //   status: editData?.status.length > 0 ? editData?.status : "",
  //   // photo: null,
  // });

  // const handleChange = (e) => {
  //   const { value } = e.target;
  //   const { name } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleChangePhone = (value) => {
  //   setFormData({ ...formData, phone: value });
  // };

  const {
    email,
    firstName,
    lastName,
    phone,
    organizations,
    userRoles,
    password,
    confirmPassword,
    status,
  } = formData;

  // const validation = () => {
  //   const regex =
  //     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   const errorEmail = regex.test(email);
  //   if (email === "") {
  //     setError(true);
  //     return setErrorMessage("email required");
  //   }
  //   if (!errorEmail) {
  //     setError(true);
  //     return setErrorMessage("Invalid email address");
  //   }
  //   if (firstName === "") {
  //     setError(true);
  //     return setErrorMessage("firstName required");
  //   }
  //   if (lastName === "") {
  //     setError(true);
  //     return setErrorMessage("lastName required");
  //   }
  //   if (password === "") {
  //     setError(true);
  //     return setErrorMessage("password required");
  //   }
  //   if (confirmPassword === "") {
  //     setError(true);
  //     return setErrorMessage("confirmPassword required");
  //   }
  //   if (confirmPassword !== password) {
  //     setError(true);
  //     return setErrorMessage("Password doesn't match");
  //   }
  //   if (phone === "") {
  //     setError(true);
  //     return setErrorMessage("phone required");
  //   }
  //   if (organizations === "" && user?.role === USER_ROLE_SUPER_ADMIN) {
  //     setError(true);
  //     return setErrorMessage("organizations required");
  //   }
  //   if (userRoles === "" && user?.role === USER_ROLE_SUPER_ADMIN) {
  //     setError(true);
  //     return setErrorMessage("userRoles required");
  //   }
  //   return true;
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     email,
  //     firstName,
  //     lastName,
  //     password,
  //     phone,
  //     roles: [
  //       {
  //         name: userRoles,
  //       },
  //     ],
  //   };
  //   if (user && user.role && user?.role === USER_ROLE_CLIENT_ADMIN) {
  //     const { id } = user?.organization;
  //     createOrganizationUser(id, user, payload);
  //   }
  //   if (validation()) {
  //     const res = createOrganizationUser(organizations, user, payload);

  //     setIsFormSubmitted(true);
  //     setTimeout(() => {
  //       setIsFormSubmitted(false);
  //     }, 3000);
  //     redirectTo("/user-managment");
  //   } else {
  //     setTimeout(() => {
  //       setError(false);
  //     }, 3000);
  //   }
  // };

  const getAllUserRoles = async () => {
    const res = await getAllRoles(user);
    if (res && res?.status === 200 && res?.data && res?.data?.length > 0) {
      dispatch({
        type: actions.SET_ROLES,
        payload: res.data,
      });
    }
  };
  const handleRole = () => {
    if (user && user.role && user.role === USER_ROLE_SUPER_ADMIN) {
      setIsSuperAdmin(true);
    }
  };
  useEffect(() => {
    getAllUserRoles();
  }, []);
  useEffect(() => {
    handleRole();
  }, [roles]);

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
      className="shadow-md rounded-md"
    >
      {error && <Alert severity="error">{errorMessage}</Alert>}
      {/* {isFormSubmitted && (
        <Alert severity="success">
          {editData ? "successfully Updated" : "successfully Created"}
        </Alert>
      )} */}
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          noValidate
          sx={{ my: 4, width: "100%" }}
          className="flex justify-between flex-wrap gap-4"
        >
          <Box className={classes.formInput}>
            <Icon color="action" className="text-gray-600 mr-8">
              assignment
            </Icon>
            <TextField
              margin="normal"
              fullWidth
              name="firstName"
              label="First Name"
              type="text"
              id="name"
              onChange={handleChangeInputs}
              defaultValue={firstName}
              autoComplete="current-password"
            />
          </Box>
          <Box className={classes.formInput}>
            <Icon color="action" className="text-gray-600 mr-8">
              assignment
            </Icon>
            <TextField
              margin="normal"
              fullWidth
              name="lastName"
              label="Last Name"
              type="text"
              id="name"
              onChange={handleChangeInputs}
              defaultValue={lastName}
              autoComplete="current-password"
            />
          </Box>
          <Box className={classes.formInput}>
            <Icon color="action" className="text-gray-600 mr-8">
              email
            </Icon>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              onChange={handleChangeInputs}
              defaultValue={email}
            />
          </Box>
          <Box className={classes.formInput}>
            <LocalPhoneIcon className="text-gray-600 mr-8" />
            <PhoneInput
              style={{ width: "100%", background: "#fff", p: 2 }}
              country="us"
              inputExtraProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              placeholder="Phone Number"
              name="phone"
              onChange={handleChangePhone}
              defaultValue={phone}
            />
          </Box>
          <Box className={classes.formInput}>
            <PasswordIcon className="text-gray-600 mr-16" />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChangeInputs}
              autoComplete="current-password"
            />
          </Box>
          <Box className={classes.formInput}>
            <PasswordIcon className="text-gray-600 mr-16" />
            <TextField
              margin="normal"
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              onChange={handleChangeInputs}
              autoComplete="current-password"
            />
          </Box>
          <Box className={classes.formInput}>
            <AccountBalanceIcon className="text-gray-600 mr-8" />
            <FormControl fullWidth>
              <InputLabel id="status-dropdown">Select status</InputLabel>
              <Select
                labelId="status-dropdown"
                id="statusDropdown"
                value={status}
                label="status"
                name="status"
                onChange={handleChangeInputs}
                // defaultValue={}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">InActive</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {isSuperAdmin && (
            <>
              <Box className={classes.formInput}>
                <AccountBalanceIcon className="text-gray-600 mr-8" />
                <FormControl fullWidth>
                  <InputLabel id="organization-dropdown">
                    Select Organization
                  </InputLabel>
                  <Select
                    labelId="organization-dropdown"
                    id="organizationDropdown"
                    value={organizations}
                    label="organizations"
                    name="organizations"
                    onChange={handleChangeInputs}
                    // defaultValue={}
                  >
                    {organization?.map((org) => (
                      <MenuItem value={org?.id} key={org?.id}>
                        {org?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box className={classes.formInput}>
                <AccountBalanceIcon className="text-gray-600 mr-8" />
                <FormControl fullWidth>
                  <InputLabel id="role-dropdown">Select Role</InputLabel>

                  <Select
                    labelId="role-dropdown"
                    id="roleDropdown"
                    defaultValue={userRoles}
                    label="role"
                    name="userRoles"
                    onChange={handleChangeInputs}
                  >
                    {roles?.map(
                      (role) =>
                        role?.name !== "super-admin" && (
                          <MenuItem value={role?.name} key={role?.id}>
                            {role?.name}
                          </MenuItem>
                        )
                    )}
                  </Select>
                </FormControl>
              </Box>
            </>
          )}
          {/* <Box className="flex items-center justify-end mx-40 w-full">
            <Button
              type="submit"
              variant="contained"
              className={classes.continueBtn}
            >
              Save
            </Button>
            <Button
              type="continue"
              variant="contained"
              className={classes.cancelBtn}
              onClick={() => redirectTo("/user-managment")}
            >
              cancel
            </Button>
          </Box> */}
        </Box>
      </Box>
    </Container>
  );
}

export default AddUserDetailsTab;
