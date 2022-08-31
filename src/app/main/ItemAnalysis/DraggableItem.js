import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { DeleteSweep as DeleteIcon } from '@material-ui/icons';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

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
const currencies = [
  {
    value: '1',
    label: 'Yes',
  },
  {
    value: '2',
    label: 'No',
  },
  {
    value: '3',
    label: 'Alternative',
  },
  {
    value: '4',
    label: 'None',
  },
];

function DraggableItem(props) {
  // constructor(props) {
  // super(props);
  /* this.state = {
      items: getItems(10)
    }; */
  // this.onDragEnd = this.onDragEnd.bind(this);
  // }

  const [itemCount, setItemCount] = useState(1);
  const [items, setItem] = useState(getItems(itemCount));
  const [answer, setAnswer] = useState('1');

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const item = reorder(items, result.source.index, result.destination.index);

    setItem(item);
  };

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };
  const AddNewOption = () => {
    setItemCount(itemCount + 1);
    setItem(getItems(itemCount + 1));
  };
  const RemoveOption = () => {
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
              {items.map((item, index) => (
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
                          style={{ width: 'auto', margin: '0% 0% 1%' }}
                        >
                          <MenuIcon size="large" />
                        </div>
                        <div style={{ width: '100%', margin: '0% 2%' }}>
                          <TextField
                            className="mx-6"
                            style={{ width: '100%' }}
                            size="large"
                            required
                            id="outlined-required"
                            label={`Choice ${index + 1}`}
                            defaultValue="Option Text"
                          />
                        </div>

                        <div className="" style={{ width: '25%', margin: '0%' }}>
                          <TextField
                            style={{ width: '90%' }}
                            id="outlined-select-currency"
                            select
                            label="Correct Ans"
                            value={answer}
                            onChange={handleChange}
                            helperText="Correct Ans"
                          >
                            {currencies.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                        <div
                          className="flex items-center align-center"
                          style={{ width: 'auto', margin: '0% 0% 1%' }}
                        >
                          <DeleteIcon
                            //  className={classes.icon}

                            onClick={() => RemoveOption()}
                          />
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
      <Fab color="primary" aria-label="add">
        <AddIcon onClick={() => AddNewOption()} />
      </Fab>
    </>
  );
}

export default DraggableItem;
