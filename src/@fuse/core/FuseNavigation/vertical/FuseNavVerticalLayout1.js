import List from '@material-ui/core/List';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import FuseNavItem from '../FuseNavItem';

const useStyles = makeStyles((theme) => ({
  navigation: {
    '& .fuse-list-item': {
      '&:hover': {
        backgroundColor:
          theme.palette.type === 'dark' ? 'rgba(0,0,0,.1) !important' : 'rgba(0,0,0,.04)',
      },
      '&:focus:not(.active)': {
        backgroundColor:
          theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0,0,0,.05)',
      },
      color: 'rgba(0,0,0,.5) !important',
      '& .fuse-list-item-icon': {
        color: 'rgba(0,0,0,.9) !important',
        fontWeight: 900,
      },
    },
    '& .active.fuse-list-item': {
      backgroundColor: '#f2f2f2 !important',
    },
    '&.active-square-list': {
      '& .fuse-list-item, & .active.fuse-list-item': {
        width: '100%',
        borderRadius: '0',
      },
    },
    '&.dense': {
      '& .fuse-list-item': {
        paddingTop: 0,
        paddingBottom: 0,
        height: 32,
      },
    },
  },
}));

function FuseNavVerticalLayout1(props) {
  const classes = useStyles(props);
  const { navigation, layout, active, dense, className, onItemClick } = props;
  const dispatch = useDispatch();

  function handleItemClick(item) {
    onItemClick?.(item);
  }

  console.log('navigation', navigation);

  return (
    <List
      className={clsx(
        'navigation whitespace-nowrap px-12',
        classes.navigation,
        `active-${active}-list`,
        dense && 'dense',
        className
      )}
    >
      {navigation.map((_item) => (
        <FuseNavItem
          key={_item.id}
          type={`vertical-${_item.type}`}
          item={_item}
          nestedLevel={0}
          onItemClick={handleItemClick}
        />
      ))}
    </List>
  );
}

export default FuseNavVerticalLayout1;
