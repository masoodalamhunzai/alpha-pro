import Icon from '@material-ui/core/Icon';

const Active = ({ isActive }) => {
  return (
    <>
      {isActive ? (
        <span
          className="flex justify-center items-center"
          style={{
            color: 'white',
            background: '#0bbf0b',
            borderRadius: ' 50%',
            height: '30px',
            width: '30px',
            margin: ' 0 10px',
          }}
        >
          <Icon>done</Icon>
        </span>
      ) : (
        <span
          className="flex justify-center items-center"
          style={{
            color: 'white',
            background: 'red',
            borderRadius: ' 50%',
            height: '30px',
            width: '30px',
            margin: ' 0 10px',
          }}
        >
          <Icon>close</Icon>
        </span>
      )}
    </>
  );
};

export default Active;
