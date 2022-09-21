import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { BorderColor as EditIcon } from "@material-ui/icons";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const useStyles = makeStyles({
  root: {
    fontSize: "1rem",
    "&.MuiContainer-root": {
      maxWidth: "100%",
    },
    "& .MuiButton-root": {
      fontWeight: "700",
      borderRadius: "1.6rem",
      margin: "1rem 0.5rem",
      padding: "0.5rem 2rem",
    },
  },
  EditGridWrapper: {
    display: "flex",
  },
  EditWrapper: {
    minHeight: "500px",
    padding: "30px 15px",
    width: "100%",
  },
  selectedTagWrapper: {
    border: "1px dashed black",
    background: "white",
    minHeight: "25%",
    marginTop: "20px",
  },
  availableTagWrapper: {
    padding: "10px",
    border: "1px dashed",
    background: "white",
    marginTop: "20px",
    height: "fit-content",
  },
  listItemSelected: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "18px",
    textTransform: "uppercase",
    background: "#f1efef",
    padding: "5px",
    margin: "0px",
    color: "grey",
  },
  icon: {
    color: "grey",
    cursor: "pointer",
  },
  saveBtn: {
    "&.MuiButton-root": {
      backgroundColor: "#3287FB",
      fontSize: "1.3rem",
      textTransform: "capitalize",
      padding: "5px 15px",
      width: "25%",
    },
  },
  deleteBtn: {
    "&.MuiButton-root": {
      backgroundColor: "red",
      fontSize: "1.3rem",
      textTransform: "capitalize",
      padding: "5px 15px",
      width: "20%",
    },
  },
  editButtonGrey: {
    "&.MuiButton-root": {
      backgroundColor: "grey",
      fontSize: "1.3rem",
      padding: "5px 15px",
      width: "20%",
      color: "#fff",
      "&:hover": { backgroundColor: "#3287fb" },
      textTransform: "capitalize",
    },
  },
});

const EditTagHierarchy = () => {
  const classes = useStyles();
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!result.destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
  };

  const availableListArr = [
    { id: 0, name: "Artifical" },
    { id: 1, name: "Boy" },
    { id: 2, name: "CSS Mathematic" },
    { id: 3, name: "Artifical" },
    { id: 4, name: "BIY" },
    { id: 5, name: "CSS Mathematic" },
  ];

  return (
    <Container
      classes={{
        root: classes.root,
      }}
      component="main"
      maxWidth="xs"
      className="shadow-sm rounded-md"
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid className={classes.EditGridWrapper}>
          <Droppable droppableId="selectedTags">
            {(provided) => (
              <Grid
                className={classes.EditWrapper}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Typography variant="h4">Selected Tag Types</Typography>
                <Box className={classes.selectedTagWrapper}></Box>
              </Grid>
            )}
          </Droppable>
          <Droppable droppableId="availableTags">
            {(provided) => (
              <Grid
                className={classes.EditWrapper}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Typography variant="h4">Available Tag Types</Typography>
                <Box className={classes.availableTagWrapper}>
                  <Stack
                    spacing={2}
                    direction="column"
                    alignItems="center"
                    display="flex"
                    className="w-full"
                    justifyContent="center"
                  >
                    {availableListArr?.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <Box
                            variant="contained"
                            className={classes.listItemSelected}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <div>
                              <FormatListBulletedIcon
                                style={{ margin: 5 }}
                                className={classes.icon}
                              />

                              {item.name}
                            </div>
                            <EditIcon
                              style={{ marginLeft: 5 }}
                              className={classes.icon}
                            />
                            {provided.placeholder}
                          </Box>
                        )}
                      </Draggable>
                    ))}
                  </Stack>
                </Box>
              </Grid>
            )}
          </Droppable>
        </Grid>
        <div className="mx-12">
          <Divider />
        </div>
        <Box sx={{ marginLeft: "20px", marginTop: "15px" }}>
          <Stack
            spacing={3}
            direction="row"
            alignItems="center"
            display="flex"
            justifyContent="space-around"
            width="40%"
          >
            <Button
              type="submit"
              variant="contained"
              className={classes.saveBtn}
            >
              Save Changes
            </Button>
            <Button variant="contained" className={classes.editButtonGrey}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              className={classes.deleteBtn}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </DragDropContext>
    </Container>
  );
};

export default EditTagHierarchy;
