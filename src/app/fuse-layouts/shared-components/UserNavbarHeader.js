import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { useStateValue } from "app/services/state/State";

const useStyles = makeStyles((theme) => ({
  root: {
    "&.user": {
      "& .username, & .email": {
        transition: theme.transitions.create("opacity", {
          duration: theme.transitions.duration.shortest,
          easing: theme.transitions.easing.easeInOut,
        }),
      },
    },
  },
  avatar: {
    background: theme.palette.background.default,
    transition: theme.transitions.create("all", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
    bottom: 0,
    "& > img": {
      borderRadius: "50%",
    },
  },
}));

function UserNavbarHeader(props) {
  const users = useSelector(({ auth }) => auth.user);
  const [{ user }, dispatch] = useStateValue();
  const classes = useStyles();

  return (
    <AppBar
      position="static"
      // color="default"
      classes={{ root: classes.root }}
      className="user relative flex flex-col items-center justify-center pt-24 pb-20 z-0 shadow-0 bg-white text-black"
    >
      {/* <div className="flex items-center justify-center">
        <Avatar
          className={clsx(classes.avatar, 'avatar w-72 h-72 p-1 box-content')}
          alt="user photo"
          src={
            users.data.photoURL && users.data.photoURL !== ''
              ? users.data.photoURL
              : 'assets/images/avatars/profile.jpg'
          }
        />
      </div> */}
      <Typography
        className="username text-16 whitespace-nowrap font-semibold mt-4"
        color="inherit"
      >
        {user && user.user && user.user.firstName && user.user.lastName ? (
          <>
            {user.user.firstName} {user.user.lastName}
          </>
        ) : (
          <>John Doe</>
        )}
      </Typography>
      <Typography
        className="email text-13 opacity-50 whitespace-nowrap font-medium"
        color="inherit"
      >
        {user && user.user && user.user.email ? (
          <>{user.user.email}</>
        ) : (
          <>johndoe@withinpixels.com</>
        )}
      </Typography>
    </AppBar>
  );
}

export default UserNavbarHeader;
