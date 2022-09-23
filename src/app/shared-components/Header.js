import Breadcrumb from "app/fuse-layouts/shared-components/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { useLocation, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Add as AddIcon } from "@material-ui/icons";

const Header = ({ redirectTo, buttonTitle }) => {
  const location = useLocation();
  const pageTitle = location.pathname
    .split("/")
    .filter((x) => x)
    .pop()
    .split("-")
    .join(" ");
  return (
    <div className="p-24 bg-white">
      <Breadcrumb />
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          color: "#000",
          fontWeight: 700,
          mt: 2,
          textTransform: "capitalize",
        }}
      >
        {pageTitle}
      </Typography>
      {buttonTitle !== undefined && buttonTitle !== "" && (
        <Link to={redirectTo}>
          <Button
            sx={{ textTransform: "capitalize" }}
            variant="contained"
            style={{ float: "right" }}
            color="secondary"
            startIcon={<AddIcon />}
          >
            {buttonTitle}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
