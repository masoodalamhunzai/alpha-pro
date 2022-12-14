import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PasswordIcon from "@mui/icons-material/Password";
import {
  LocalPhone as LocalPhoneIcon,
  AccountBalance as AccountBalanceIcon,
  // Upload as UploadIcon,
} from "@material-ui/icons";
import Icon from "@material-ui/core/Icon";
import { actions } from "app/services/state/Reducer";
import { getAllRoles, getOrganizationList } from "app/services/api/ApiManager";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { useStateValue } from "app/services/state/State";
import { getUserRole } from "app/services/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { setOrgsNameList } from "app/store/alpha/orgReducer";
import { setRoles } from "app/store/alpha/userReducer";

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
    "& .MuiOutlinedInput-input:focus": {
      fontSize: "1.4rem",
    },
    "& .MuiOutlinedInput-root": {
      fontSize: "1.4rem",
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
  organzationID,
  mode,
}) {
  const dispatch = useDispatch();
  const user = useSelector(({ alpha }) => alpha.user);
  const role = getUserRole(user);
  const organization = useSelector(({ alpha }) => alpha.org.orgsNameList);
  const roles = useSelector(({ alpha }) => alpha.user.roles);
  //const [{ roles }, dispatch] = useStateValue();
  const USER_ROLE_SUPER_ADMIN = "super-admin";
  const EDIT_MODE = "edit-user";
  const CREATE_NEW_MODE = "create-user";
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const {
    email,
    firstName,
    lastName,
    phone,
    organizations,
    userRoles,
    isActive,
  } = formData;

  const getAllUserRoles = async () => {
    const res = await getAllRoles();
    if (res && res?.status === 200 && res?.data && res?.data?.length > 0) {
      dispatch(setRoles(res.data));
      /* dispatch( {
        type: actions.SET_ROLES,
        payload: res.data,
      }); */
    }
  };

  const loadOrganizations = async () => {
    const res = await getOrganizationList();
    console.log(res);
    if (res && Array.isArray(res)) {
      const orgs = res.map((o) => {
        return { id: o.id, name: o.name };
      });
      dispatch(setOrgsNameList(orgs));
    }
  };

  const handleRole = () => {
    if (role && role === USER_ROLE_SUPER_ADMIN) {
      setIsSuperAdmin(true);
    }
  };
  useEffect(() => {
    getAllUserRoles();
    loadOrganizations();
  }, []);
  useEffect(() => {
    handleRole();
  }, [roles]);
  const classes = useStyles();
  return (
    <Container
      classes={{
        root: classes.root,
      }}
      component="main"
      maxWidth="xs"
      className="shadow-sm rounded-md"
    >
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
          {mode === CREATE_NEW_MODE && (
            <>
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
            </>
          )}

          <Box className={classes.formInput}>
            <Icon color="action" className="text-gray-600 mr-8">
              toggle_on
            </Icon>
            <FormControl fullWidth>
              <InputLabel id="status-dropdown">Select status</InputLabel>
              <Select
                labelId="status-dropdown"
                id="statusDropdown"
                value={isActive}
                defaultValue={isActive}
                label="status"
                name="isActive"
                onChange={handleChangeInputs}
              >
                <MenuItem value>Active</MenuItem>
                <MenuItem value={false}>InActive</MenuItem>
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
                    defaultValue={
                      organizations === "" ? organzationID : organizations
                    }
                    value={organizations === "" ? organzationID : organizations}
                    label="organizations"
                    name="organizations"
                    onChange={handleChangeInputs}
                  >
                    {organization?.map((org) =>
                      org.id === organzationID ? (
                        <MenuItem value={org?.id} key={org?.id}>
                          {org?.name}
                        </MenuItem>
                      ) : (
                        <MenuItem value={org?.id} key={org?.id}>
                          {org?.name}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Box>
            </>
          )}
          {(isSuperAdmin ||
            role == "client-admin") && (
              <Box className={classes.formInput}>
                <AccountBalanceIcon className="text-gray-600 mr-8" />
                <FormControl fullWidth>
                  <InputLabel id="role-dropdown">Select Role</InputLabel>
                  <Select
                    labelId="role-dropdown"
                    id="roleDropdown"
                    defaultValue={userRoles}
                    value={userRoles}
                    label="role"
                    name="userRoles"
                    onChange={handleChangeInputs}
                  >
                    {roles?.map(
                      (role) =>
                        role?.name !== USER_ROLE_SUPER_ADMIN &&
                        (userRoles === role?.name ? (
                          <MenuItem value={role?.name} key={role?.id}>
                            {role?.name}
                          </MenuItem>
                        ) : (
                          <MenuItem value={role?.name} key={role?.id}>
                            {role?.name}
                          </MenuItem>
                        ))
                    )}
                  </Select>
                </FormControl>
              </Box>
            )}
        </Box>
      </Box>
    </Container>
  );
}

export default AddUserDetailsTab;
