/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import * as yup from "yup";

import { Controller, useForm } from "react-hook-form";
import { updateUserInfo } from "app/store/alpha/userReducer";
import { useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { LOGIN_FAILURE } from "app/services/authService/accountActions";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import _ from "@lodash";
import { login } from "app/services/api/ApiManager";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useSnackbar } from "notistack";
import { yupResolver } from "@hookform/resolvers/yup";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  username: yup
    .string()
    .email("Invalid email address")
    .required("You must enter email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(4, "Password is too short - should be 4 chars minimum."),
});

const defaultValues = {
  username: "",
  password: "",
};

function JWTLoginTab(props) {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  // const [{ user }, dispatch] = useStateValue();
  const dispatch = useDispatch();
  const {
    control,
    setValue,
    formState,
    handleSubmit,
    reset,
    trigger,
    setError,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    //setValue("username", "", { shouldDirty: true, shouldValidate: true });
    //setValue("password", "", { shouldDirty: true, shouldValidate: true });
  }, [reset, setValue, trigger]);

  async function onSubmit(model) {
    try {
      // dispatch({ type: LOGIN_REQUEST });
      const res = await login({
        email: model.username,
        password: model.password,
      });
      if (res && res.status === "success" && res.token) {
        const loggedInUser = {
          user: res.user,
          role:
            res.user &&
            res.user.roles &&
            res.user.roles !== [] &&
            res.user.roles[0].name,
          token: res.token || "",
          organization: res.organization || null,
        };
        // authService.setUser(loggedInUser);
        // authService.setSession(res.token);
        dispatch(updateUserInfo(res.user));
        localStorage.setItem("user", JSON.stringify(res));
        setTimeout(() => {
          history.push("/home");
          window.location.reload(true);
        }, 500);
      } else if (
        (res && res.message) ||
        (res.responseException &&
          res.responseException.exceptionMessage &&
          res.responseException.exceptionMessage.message)
      ) {
        enqueueSnackbar(
          res.message || res.responseException.exceptionMessage.message,
          {
            variant: "error",
          }
        );
        dispatch({ type: LOGIN_FAILURE });
      } else {
        enqueueSnackbar("Either username or password is incorrect", {
          variant: "error",
        });
        dispatch({ type: LOGIN_FAILURE });
      }
    } catch (error) {
      console.error("error", error);
      const message =
        (error.response && error.response.data.message) ||
        "Something went wrong";
      enqueueSnackbar(message, {
        variant: "error",
      });
    }
  }

  return (
    <div className="w-full">
      <span style={{ fontWeight: "bold", fontSize: "150%" }}>Sign in</span>
      <form
        style={{ marginTop: "10px" }}
        className="flex flex-col justify-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="username"
          control={control}
          required
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              autoComplete={false}
              size="small"
              type="email"
              error={!!errors.username}
              helperText={errors?.username?.message}
              label="Email"
              /* InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      user
                    </Icon>
                  </InputAdornment>
                ),
              }} */
              variant="outlined"
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              size="small"
              label="Password"
              type="password"
              error={!!errors.password}
              helperText={errors?.password?.message}
              variant="outlined"
              InputProps={{
                className: "pr-2",
                type: showPassword ? "text" : "password",
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      <Icon className="text-20" color="action">
                        {showPassword ? "visibility" : "visibility_off"}
                      </Icon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />
          )}
        />

        <div className="flex items-center justify-between">
          <div>
            <input type="checkbox" className="mr-6" />
            <label>Remember me</label>
          </div>

          <div>
            <Link className="font-normal font-semibold text-14" to="#">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          style={{ backgroundColor: "#0099ff" }}
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mx-auto mt-16"
          aria-label="LOG IN"
          disabled={
            errors.password ||
            errors.username /* _.isEmpty(dirtyFields) || !isValid */
          }
          value="legacy"
        >
          Sign In
        </Button>
        {/* <Button
          style={{ backgroundColor: "#0099ff" }}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            history.push("/home");
          }}
          variant="contained"
          color="primary"
          className="w-full mx-auto mt-16"
        >
          Sign In
        </Button> */}
      </form>
      {/* <div class="divider pt-5">Or continue with</div> */}
      {/* <div className="flex justify-between">
        <Button
          type="submit"
          variant="contained"
          style={{ background: "#ae0000", color: "#fff" }}
          className="w-full mx-auto mt-16"
          aria-label="LOG IN"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          value="legacy"
        >
          gle
        </Button>

        <Button
          type="submit"
          variant="contained"
          style={{ background: "#3b5999", color: "#fff" }}
          className="w-full mx-auto mt-16"
          aria-label="LOG IN"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          value="legacy"
        >
          Fb
        </Button>

        <Button
          type="submit"
          variant="contained"
          style={{ background: "#3b5999", color: "#fff" }}
          className="w-full mx-auto mt-16"
          aria-label="LOG IN"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          value="legacy"
        >
          Log
        </Button>
        <i class="fa fa-facebook" aria-hidden="false"></i>
      </div> */}
      {/* <table className="w-full mt-32 text-center">
        <thead className="mb-4">
          <tr>
            <th>
              <Typography className="font-semibold text-11" color="textSecondary">
                Role
              </Typography>
            </th>
            <th>
              <Typography className="font-semibold text-11" color="textSecondary">
                Email
              </Typography>
            </th>
            <th>
              <Typography className="font-semibold text-11" color="textSecondary">
                Password
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Typography className="font-medium text-11" color="textSecondary">
                Admin
              </Typography>
            </td>
            <td>
              <Typography className="text-11">admin@fusetheme.com</Typography>
            </td>
            <td>
              <Typography className="text-11">admin</Typography>
            </td>
          </tr>
          <tr>
            <td>
              <Typography className="font-medium text-11" color="textSecondary">
                Staff
              </Typography>
            </td>
            <td>
              <Typography className="text-11">staff@fusetheme.com</Typography>
            </td>
            <td>
              <Typography className="text-11">staff</Typography>
            </td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
}

export default JWTLoginTab;
