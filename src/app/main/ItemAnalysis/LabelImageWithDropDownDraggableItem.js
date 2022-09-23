import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { DeleteSweep as DeleteIcon } from '@material-ui/icons';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { primaryBlueColor } from 'app/services/Settings';

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
  background: isDragging ? primaryBlueColor : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? '#ebebeb' : 'white',
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

function LabelImageWithDropDownDraggableItem(props) {
  const currentIndex = props.objectIndex;
  const [itemCount, setItemCount] = useState(2);
  const [items, setItem] = useState(props.multipleChoices);
  const [answer, setAnswer] = useState(3);
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const item = reorder(props.object.responses, result.source.index, result.destination.index);
    console.log('item result', item);
    const tempState = [...props.multipleChoices];
    tempState[currentIndex].responses = item;

    props.setMultipleChoices(tempState);
    // setItem(item);
  };
  const handleTitleChange = (e, index) => {
    console.log(`index is ${index} current Index = ${currentIndex}`);
    const tempState = [...props.multipleChoices];
    const tempObject = [...tempState[currentIndex].responses];
    const tempElement = { ...tempObject[index] };
    tempElement.title = e.target.value;
    tempObject[index] = tempElement;
    tempState[currentIndex].responses = tempObject;
    props.setMultipleChoices(tempState);
  };

  const handleChange = (event, index) => {
    setAnswer(event.target.value);

    const tempState = [...props.multipleChoices];
    const tempObject = [...tempState[currentIndex].responses];
    const tempElement = { ...tempObject[index] };
    /*  if (event.target.value === 1) {
      tempElement.isCorrect = true;
      tempElement.isAlternate = false;
    } else if (event.target.value === 2) {
      tempElement.isCorrect = false;
      tempElement.isAlternate = true;
    } else {
      tempElement.isCorrect = false;
      tempElement.isAlternate = false;
    }
 */
    tempElement.choice = event.target.value;
    tempObject[index] = tempElement;
    tempState[currentIndex].responses = tempObject;
    console.log('element', tempElement);
    console.log('object', tempObject);
    console.log('state', tempState);

    props.setMultipleChoices(tempState);
  };
  const AddNewOption = () => {
    setItemCount(itemCount + 1);
    setItem(getItems(itemCount + 1));

    const option = {
      id: `item-${itemCount + 1}`,
      position: itemCount,
      choice: '',
      title: '',
      isCorrect: false,
      isAlternate: false,
    };
    let choices = [];

    choices = props.multipleChoices.slice();
    choices[currentIndex].responses.push(option);
    console.log('dragable objects: ', choices);
    props.setMultipleChoices(choices);
  };

  const RemoveOption = (index) => {
    const tempState = [...props.multipleChoices];
    const tempObject = [...tempState[currentIndex].responses];
    const tempElement = { ...tempObject[index] };
    const temp = tempObject.filter((x) => x.id !== tempElement.id);

    tempState[currentIndex].responses = temp;

    console.log(tempState);

    console.log(props.multipleChoices);
    // props.setMultipleChoices( );
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
              {console.log('maping object is here: ', props.object.responses)}
              {props.object.responses.map((item, index) => (
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
                            style={{
                              width: '100%',
                              backgroundColor: 'white',
                            }}
                            inputProps={{
                              style: {
                                height: '5',
                              },
                            }}
                            size="large"
                            required
                            id="outlined-required"
                            label={`Choice ${index + 1}`}
                            value={item.title}
                            onChange={(e) => {
                              handleTitleChange(e, index);
                            }}
                          />
                        </div>

                        <div className="" style={{ width: '25%', margin: '0%' }}>
                          <TextField
                            style={{ width: '95%', backgroundColor: 'white' }}
                            id="outlined-select-currency"
                            select
                            label="Correct Ans"
                            // value={answer}
                            value={item.choice}
                            onChange={(e) => {
                              handleChange(e, index);
                            }}
                            // helperText="Correct Ans"
                          >
                            {optionsList.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
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
      <Fab onClick={() => AddNewOption()} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </>
  );
}

export default LabelImageWithDropDownDraggableItem;
