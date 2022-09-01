import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
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
import { useHistory } from "react-router";
import { truncate } from "lodash";

const useStyles = makeStyles({
  root: {
    fontSize: "1rem",
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
    "& .MuiFormControl-root": {
      margin: "1rem 0",
    },
    "& .react-tel-input": {
      width: "90%",
      border: "1px solid #b0b8c3",
      borderRadius: "5px",
    },
    "& .react-tel-input .form-control": {
      padding: "1rem",
      width: "88%",
      marginLeft: "12%",
      border: "none",
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

function AddUserDetailsTab() {
  const [{ user, organization, roles }, dispatch] = useStateValue();
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [error, setError] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    organizations: "",
    password: "",
    confirmPassword: "",
    userRoles: "",
    // photo: null,
  });
  const history = useHistory();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangePhone = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const {
    email,
    firstName,
    lastName,
    phone,
    organizations,
    userRoles,
    password,
    confirmPassword,
  } = formData;

  const validation = () => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const errorEmail = regex.test(email);
    if (email === "") {
      setError(true);
      return setErrorMessage("fields required");
    }
    if (!errorEmail) {
      setError(true);
      return setErrorMessage("Invalid email address");
    }
    if (firstName === "") {
      setError(true);
      return setErrorMessage("fields required");
    }
    if (lastName === "") {
      setError(true);
      return setErrorMessage("fields required");
    }
    if (password === "") {
      setError(true);
      return setErrorMessage("fields required");
    }
    if (confirmPassword === "") {
      setError(true);
      return setErrorMessage("fields required");
    }
    if (confirmPassword !== password) {
      setError(true);
      return setErrorMessage("Password doesn't match");
    }
    if (phone === "") {
      setError(true);
      return setErrorMessage("fields required");
    }
    if (organizations === "") {
      setError(true);
      return setErrorMessage("fields required");
    }
    if (userRoles === "") {
      setError(true);
      return setErrorMessage("fields required");
    }
    return true;
  };

  const HandleFormReset = () => {
    return setFormData({
      ...formData,
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      organizations: "",
      password: "",
      confirmPassword: "",
      userRoles: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email,
      firstName,
      lastName,
      password,
      phone,
      roles: [
        {
          name: userRoles,
        },
      ],
    };
    if (validation()) {
      const res = createOrganizationUser(organizations, user, payload);
      setIsFormSubmitted(true);
      HandleFormReset();
      setTimeout(() => {
        setIsFormSubmitted(false);
      }, 3000);
    } else {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

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
    const role = roles?.filter((role) => role?.name === "super-admin");
    if (role && role?.length > 0) {
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
      {isFormSubmitted && <Alert severity="success">successfully login</Alert>}
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
              email
            </Icon>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
          </Box>
          <Box className={classes.formInput}>
            <Icon color="action" className="text-gray-600 mr-8">
              assignment
            </Icon>
            <TextField
              error={false}
              margin="normal"
              required
              fullWidth
              name="firstName"
              label="first Name"
              type="text"
              id="name"
              onChange={handleChange}
              autoComplete="current-password"
            />
          </Box>
          <Box className={classes.formInput}>
            <Icon color="action" className="text-gray-600 mr-8">
              assignment
            </Icon>
            <TextField
              margin="normal"
              required
              fullWidth
              name="lastName"
              label="Last Name"
              type="text"
              id="name"
              onChange={handleChange}
              autoComplete="current-password"
            />
          </Box>
          <Box className={classes.formInput}>
            <PasswordIcon className="text-gray-600 mr-10" />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              id="password"
              onChange={handleChange}
              autoComplete="current-password"
            />
          </Box>
          <Box className={classes.formInput}>
            <PasswordIcon className="text-gray-600 mr-10" />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="confirmPassword"
              type="password"
              id="confirmPassword"
              onChange={handleChange}
              autoComplete="current-password"
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
            />
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
                    required
                    onChange={handleChange}
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
                  <InputLabel id="role-dropdown">Select Roles</InputLabel>
                  <Select
                    labelId="role-dropdown"
                    id="roleDropdown"
                    value={userRoles}
                    label="role"
                    name="userRoles"
                    required
                    onChange={handleChange}
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

          <Box className="flex items-center justify-end mx-40 w-full">
            <Button
              type="submit"
              variant="contained"
              className={classes.continueBtn}
              onClick={handleSubmit}
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
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default AddUserDetailsTab;
