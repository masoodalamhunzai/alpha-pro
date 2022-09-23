import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from 'app/services/state/State';
import { actions } from 'app/services/state/Reducer';

const useStyles = makeStyles({
  layoutRoot: {},
});

function HomeContent() {
  const classes = useStyles();
  const [{ news }, dispatch] = useStateValue();
  const [count, setCount] = useState(0);

  const setNews = async () => {
    dispatch({
      type: actions.SET_NEWS,
      payload: { header: 'new header text', des: 'new description text' },
    });
  };
  /* useEffect(() => {
    setCount(1);
  }, []);
  useEffect(() => {
    setNews();
  }, [count]); */

  return (
    <img
      src="assets/images/Home-1.png"
      alt="beach"
      style={{
        width: '100%',
      }}
      className="rounded-6"
    />
  );
}

export default HomeContent;
