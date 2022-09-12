import { useDrag } from 'react-dnd';

const style = {
  padding: '0.5rem 1rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
  width: '50%',
};

function DraggableBox(props) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    item: { name: props.title,component:props.component },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        // props.handleComponentDragDrop(props.component);
        //  alert(`You dropped ${item.name} into ${dropResult.name} comp ${props.component}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const opacity = isDragging ? 0.4 : 1;

  return (
    <>
      <div ref={drag} style={{ ...style, opacity }} data-testid="box">
        <div style={{ padding: '1% 2%' }}>
          <div className="flex flex-col items-center">
            <img src="assets/images/uicapture/StandardIcon.png" alt="Image1" />
            <text className="my-4">{props && props.title}</text>
          </div>
        </div>
      </div>
    </>
  );
}

export default DraggableBox;
