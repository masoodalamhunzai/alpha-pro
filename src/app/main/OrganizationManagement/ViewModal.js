import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ClearIcon from "@mui/icons-material/Clear";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  styles: {
    position: "absolute",
    top: "50%",
    left: "50%",
    overflowY: "auto",
    transform: "translate(-50%, -50%)",
    minWidth: "30%",
    bgcolor: "background.paper",
    borderRadius: "1rem",
    height: "fit-content",
    border: 0,
    outline: 0,
    boxShadow: 24,
  },
  header: {
    backgroundColor: "#00cee8",
    height: "60px",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2.2rem",
    boxSizing: "border-box",
  },
  closeIcon: {
    opacity: "0.7",
    fontSize: "2.8rem !important",
    cursor: "pointer",
  },
}));
const ViewModal = ({
  handleClose,
  open,
  organization: { name, contactperson, email, phonenumber,city,state,country,website,created_at },
}) => {
  const classes = useStyles();
  console.log('created_at',created_at);
  console.log('created_at parsing',(created_at != '' || created_at != null ? new Date(created_at).toLocaleString("en-US") : ''));
  const organizationData = [
    { name: "Name:", value: name },
    { name: "Contact Person:", value: contactperson },
    { name: "Email:", value: email },
    { name: "Phone Number:", value: phonenumber },
    { name: "City:", value: city },
    { name: "State:", value: state },
    { name: "Country:", value: country },
    { name: "Website:", value: website },
    { name: "Registered On:", value: (created_at != '' ? new Date(created_at).toLocaleString("lookup") : '') },
  ];
  console.log(name, contactperson, email, phonenumber, "org");
  return (
    <Modal
      classes={
        ({
          root: classes.root,
        },
        classes.styles)
      }
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      onBackdropClick="false"
    >
      <Box className={classes.styles}>
        <Box className={classes.header}>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontSize: "2rem", fontWeight: "700" }}
          >
            Organization Details
          </Typography>
          <ClearIcon className={classes.closeIcon} onClick={handleClose} />
        </Box>
        <List sx={{ width: "100%", bgcolor: "background.paper", pt: 2 }}>
          {organizationData?.map((org) => (
            <>
              <ListItem
                alignItems="flex-start"
                sx={{
                  display: "flex",
                  px: 4,
                  py: 2,
                }}
              >
                <Typography
                  variant="body2"
                  display="block"
                  color="primary"
                  sx={{
                    fontSize: "1.2rem",
                    minWidth: 200,
                    textTransform: "uppercase",
                  }}
                >
                  {org?.name}
                </Typography>
                <Typography
                  variant="body2"
                  display="block"
                  sx={{ fontSize: "1.2rem" }}
                  gutterBottom
                >
                  {org?.value}
                </Typography>
              </ListItem>
              <Divider component="li" />
            </>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default ViewModal;
