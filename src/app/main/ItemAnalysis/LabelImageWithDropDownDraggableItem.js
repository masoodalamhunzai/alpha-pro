import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { DeleteSweep as DeleteIcon } from "@material-ui/icons";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

// fake data generator
const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  /* padding: grid * 2,
  margin: `0 0 ${grid}px 0`, */
  padding: grid * 1,
  margin: `0 0 ${0}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "white",
  padding: grid,
  width: "100%", // 250
});
const optionsList = [
  {
    value: 1,
    label: "Correct",
  },
  {
    value: 2,
    label: "Alternative",
  },
  {
    value: 3,
    label: "None",
  },
];

function LabelImageWithDropDownDraggableItem(props) {
  const [itemCount, setItemCount] = useState(0);
  const [items, setItem] = useState(props.multipleChoices);
  const [answer, setAnswer] = useState(3);
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const item = reorder(
      props.multipleChoices,
      result.source.index,
      result.destination.index
    );
    props.setMultipleChoices(item);
    // setItem(item);
  };
  const handleTitleChange = (e, index) => {
    console.log("title is ", e.target.value);
    console.log("index is ", index);
    const tempState = [...props.multipleChoices];
    const tempElement = { ...tempState[index] };
    tempElement.title = e.target.value;
    tempState[index] = tempElement;
    props.setMultipleChoices(tempState);
  };

  const handleChange = (event, index) => {
    setAnswer(event.target.value);

    const tempState = [...props.multipleChoices];
    const tempElement = { ...tempState[index] };
    if (event.target.value === 1) {
      tempElement.isCorrect = true;
      tempElement.isAlternate = false;
    } else if (event.target.value === 2) {
      tempElement.isCorrect = false;
      tempElement.isAlternate = true;
    } else {
      tempElement.isCorrect = false;
      tempElement.isAlternate = false;
    }

    tempState[index] = tempElement;
    props.setMultipleChoices(tempState);
  };
  const AddNewOption = () => {
    setItemCount(itemCount + 1);
    setItem(getItems(itemCount + 1));
    props.onNewOptionAdded(itemCount);
  };
  const RemoveOption = (index) => {
    const tempState = [...props.multipleChoices];
    const tempElement = { ...tempState[index] };
    props.setMultipleChoices(tempState.filter((x) => x.id !== tempElement.id));
    setItemCount(itemCount - 1);
    setItem(getItems(itemCount - 1));
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {props.multipleChoices &&
                props.multipleChoices.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <div className="space-y-32 flex">
                          <div
                            className="flex items-center align-center"
                            style={{ width: "auto", margin: "0% 0% 0%" }}
                          >
                            <MenuIcon size="large" />
                          </div>
                          <div style={{ width: "100%", margin: "0% 2%" }}>
                            <TextField
                              className="mx-6"
                              style={{ width: "100%" }}
                              inputProps={{
                                style: {
                                  height: "5",
                                },
                              }}
                              size="large"
                              required
                              id="outlined-required"
                              label={`Choice ${index + 1}`}
                              placeholder="Option Title"
                              onChange={(e) => {
                                handleTitleChange(e, index);
                              }}
                            />
                          </div>

                          <div
                            className=""
                            style={{ width: "25%", margin: "0%" }}
                          >
                            <TextField
                              style={{ width: "95%" }}
                              id="outlined-select-currency"
                              select
                              label="Correct Ans"
                              // value={answer}
                              value={
                                item.isCorrect == true
                                  ? 1
                                  : item.isAlternate == true
                                  ? 2
                                  : 3
                              }
                              onChange={(e) => {
                                handleChange(e, index);
                              }}
                              // helperText="Correct Ans"
                            >
                              {optionsList.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </div>
                          <div
                            className="flex items-center align-center"
                            style={{ width: "auto", margin: "0% 0% 0%" }}
                            onClick={() => RemoveOption(index)}
                          >
                            <DeleteIcon />
                            {/*  <MenuIcon size="large" /> */}
                          </div>
                        </div>

                        {/*  {item.content} */}
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Fab onClick={() => AddNewOption()} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </>
  );
}

export default LabelImageWithDropDownDraggableItem;
