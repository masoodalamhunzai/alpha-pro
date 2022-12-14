import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { getUserInfo } from "app/services/api/ApiManager";
import { getUserRole } from "app/services/utils/utils";
import { logoutUser } from "app/auth/store/userSlice";
import { updateUserInfo } from "app/store/alpha/userReducer";

function UserMenu() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const user = useSelector((state) => state.alpha.user);
  const user = useSelector(({ alpha }) => alpha.user);
  const role = getUserRole(user);
  const [userMenu, setUserMenu] = useState(null);

  useEffect(() => {
    const { user: _user = {} } = user || {};

    if (!_user) {
      getUserInfo()
        .then((res) => {
          dispatch(updateUserInfo(res));
        })
        .catch((err) => {
          console.error("error", err);
        });
    }
  }, [dispatch, user]);

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={userMenuClick}
      >
        <div className="hidden md:flex flex-col mx-4 items-end">
          <Typography component="span" className="font-semibold flex">
            {/* {{users.data.displayName}} */}
            {user &&
            user &&
            user.user &&
            user.user.firstName &&
            user.user.lastName ? (
              <>
                {user.user.firstName} {user.user.lastName}
              </>
            ) : (
              <>John Doe</>
            )}
          </Typography>
          <Typography
            className="text-11 font-medium capitalize"
            color="textSecondary"
          >
            {role}
            {(!role || (Array.isArray(role) && user.length === 0)) && "Guest"}
          </Typography>
        </div>

        {user?.data?.photoURL ? (
          <Avatar
            className="md:mx-4"
            alt="user photo"
            src={user.data.photoURL}
          />
        ) : (
          <Avatar className="md:mx-4">{user?.data?.displayName[0]}</Avatar>
        )}
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{
          paper: "py-8",
        }}
      >
        {!role || role.length < 0 ? (
          <>
            <MenuItem component={Link} to="/login" role="button">
              <ListItemIcon className="min-w-40">
                <Icon>lock</Icon>
              </ListItemIcon>
              <ListItemText primary="Login" />
            </MenuItem>
            <MenuItem component={Link} to="/register" role="button">
              <ListItemIcon className="min-w-40">
                <Icon>person_add</Icon>
              </ListItemIcon>
              <ListItemText primary="Register" />
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              component={Link}
              to="/my-account"
              onClick={userMenuClose}
              role="button"
            >
              <ListItemIcon className="min-w-40">
                <Icon>account_circle</Icon>
              </ListItemIcon>
              <ListItemText primary="My Account" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/settings"
              onClick={userMenuClose}
              role="button"
            >
              <ListItemIcon className="min-w-40">
                <Icon>mail</Icon>
              </ListItemIcon>
              <ListItemText primary="Setting" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(logoutUser());
                userMenuClose();
                localStorage.removeItem("token");
                history.push("/logout");
                window.location.reload(true);
              }}
            >
              <ListItemIcon className="min-w-40">
                <Icon>exit_to_app</Icon>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  );
}

export default UserMenu;
