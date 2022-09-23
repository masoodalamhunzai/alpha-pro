import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TextField from '@mui/material/TextField';
import MenuIcon from '@mui/icons-material/Menu';
import { DeleteSweep as DeleteIcon } from '@material-ui/icons';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Switch from 'app/shared-components/Switch';
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
  userSelect: 'none',
  /* padding: grid * 2,
  margin: `0 0 ${grid}px 0`, */
  padding: grid * 1,
  margin: `0 0 ${0}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'white',
  padding: grid,
  width: '100%', // 250
});
const optionsList = [
  {
    value: 1,
    label: 'Correct',
  },
  {
    value: 2,
    label: 'Alternative',
  },
  {
    value: 3,
    label: 'None',
  },
];

function ClozeWithTextDraggableItem(props) {
  // constructor(props) {
  // super(props);
  /* this.state = {
      items: getItems(10)
    }; */
  // this.onDragEnd = this.onDragEnd.bind(this);
  // }

  const [itemCount, setItemCount] = useState(2);
  const [items, setItem] = useState(props.multipleChoices); //  useState(getItems(itemCount));
  const [answer, setAnswer] = useState(3);
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const item = reorder(props.multipleChoices, result.source.index, result.destination.index);
    props.setMultipleChoices(item);
    props.setMultipleChoices_Main(item);
    // setItem(item);
  };
  const handleTitleChange = (e, index) => {
    console.log('title is ', e.target.value);
    console.log('index is ', index);
    const tempState = [...props.multipleChoices];
    const tempElement = { ...tempState[index] };
    tempElement.title = e.target.value;
    tempState[index] = tempElement;
    props.setMultipleChoices([...tempState]);
    props.setMultipleChoices_Main([...tempState]);
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
    props.setMultipleChoices([...tempState]);
    props.setMultipleChoices_Main([...tempState]);
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
    props.setMultipleChoices_Main(tempState.filter((x) => x.id !== tempElement.id));
    // setItemCount(itemCount - 1);
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
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        <div className="space-y-32 flex">
                          <div
                            className="flex items-center align-center"
                            style={{ width: 'auto', margin: '0% 0% 0%' }}
                          >
                            <MenuIcon size="large" />
                          </div>
                          <div style={{ width: '100%', margin: '0% 2%' }}>
                            <TextField
                              className="mx-6"
                              style={{ width: '100%' }}
                              inputProps={{
                                style: {
                                  height: '5',
                                },
                              }}
                              size="large"
                              required
                              id="outlined-required"
                              label={`Choice ${index + 1}`}
                              placeholder="Option Title"
                              value={item.title}
                              onChange={(e) => {
                                handleTitleChange(e, index);
                              }}
                            />
                          </div>

                          <div
                            className="flex items-center align-center"
                            style={{ width: 'auto', margin: '0% 0% 0%' }}
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
      <div className="flex items-center justify-between">
        <Fab onClick={() => AddNewOption()} color="primary" aria-label="add">
          <AddIcon />
        </Fab>

        <div className="flex justify-between items-center">
          <label className="fs-14">Match All Possible Responses</label>
          <Switch
            checked={props.matchAllResponses}
            onChange={() => props.setMatchAllResponses(!props.matchAllResponses)}
          />
        </div>
      </div>
    </>
  );
}

export default ClozeWithTextDraggableItem;
