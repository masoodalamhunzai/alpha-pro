/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
import { memo, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Folder } from '@material-ui/icons';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router-dom';
// import { DataGrid } from '@material-ui/data-grid';
import { useStateValue } from 'app/services/state/State';
import { useSnackbar } from 'notistack';
import { useDrop } from 'react-dnd';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: 20,
    border: '1px dashed gray',
    minHeight: '150px',
  },
  container: {
    height: '100%',
  },
  textCenter: {
    textAlign: 'center',
  },
}));

function DropAndAdd(props) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const anchorRef = useRef(null);
  const [{ user, items, defaultPageSize }, dispatch] = useStateValue();

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'box',
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  console.log('drop ',drop);
  console.log('canDrop ',canDrop);
  console.log('isOver ',isOver);
  const isActive = canDrop && isOver;
  let backgroundColor = '#fff';
  let textColor = 'gray';
  if (isActive) {
    backgroundColor = '#1976d2';
    textColor = 'white';
  } else if (canDrop) {
    backgroundColor = '#8baccd';
    textColor = 'white';
  }

  useEffect(() => {
    if (isActive) {
      console.log('isActive= ', isActive);
      console.log('this is called again');
      props.handleQuestionDragDrop(props.SectionName, props.TabName);
    }
  }, [isActive]);

  return (
    <>
      <div ref={drop} /* style={{ ...style, backgroundColor }} */ data-testid="dustbin">
        <div className={classes.root} style={{ backgroundColor }}>
          <div className={`${'mt-32' + ' '}${classes.textCenter}`}>
            <span className="p-12">
              <Fab color="primary" aria-label="add">
                <AddIcon />
              </Fab>
            </span>

            <span className="p-12" />

            <span className="p-12">
              <Fab style={{ backgroundColor: 'lightgray' }} aria-label="folder">
                <Folder style={{ color: 'white' }} />
              </Fab>
            </span>
          </div>

          <div className={classes.textCenter}>
            <h5
              style={{
                color: textColor,
                padding: '2%',
              }}
            >
              {isActive ? 'Release to drop' : ' Drag widget here'}
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(DropAndAdd);
