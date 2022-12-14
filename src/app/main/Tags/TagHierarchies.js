import { useState } from 'react';
// import DemoContent from "@fuse/core/DemoContent";
import FusePageSimple from '@fuse/core/FusePageSimple';
import Typography from '@mui/material/Typography';
// import { useStateValue } from "app/services/state/State";
// import { actions } from "app/services/state/Reducer";
import { useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme, makeStyles } from '@material-ui/core/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Add as AddIcon } from '@material-ui/icons';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router';
import Breadcrumb from '../../fuse-layouts/shared-components/Breadcrumbs';
import TagHierarchyList from './TagHierarchyList';

const useStyles = makeStyles({
  layoutRoot: {
    fontSize: '1.5rem',
    '& .MuiFormControlLabel-label': {
      fontSize: '1.2rem',
      margin: '1rem 0',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '1.6rem',
    },
    '& .MuiInputBase-input': {
      textAlign: 'start',
      borderRadius: '1.6rem',
      backgroundColor: '#fff',
    },
    '& .MuiInputLabel-root': {
      fontSize: '1.4rem',
      left: '-4px',
      top: '-5px',
    },
  },
  hederTitle: {
    color: '#000 !important',
    fontWeight: '700 !important',
    margin: '2rem 0 !important',
    textTransform: 'capitalize',
  },
  pageDesc: {
    fontSize: '13px !important',
    textTransform: 'capitalize',
    lineHeight: 1.5,
    marginLeft: '0.7rem !important',
    color: 'rgba(0, 0, 0, 0.6)',
    fontWeight: 500,
  },
  guideBtn: {
    width: '23%',
    marginTop: '1rem',
    textTransform: 'capitalize',
    backgroundColor: '#F4CD13',
  },
});

const TagHierarchies = () => {
  const location = useLocation();
  const history = useHistory();
  const pageTitle = location.pathname
    .split('/')
    .filter((x) => x)
    .pop()
    .split('-')
    .join(' ');

  // const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const theme = useTheme();
  const [page, setPage] = useState(0);

  const redirectTo = async (goTo) => {
    try {
      history.push(goTo);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <div className="p-24">
          <Breadcrumb />
          <div className="flex items-center justify-between">
            <div className="flex flex-col w-4/5">
              <Typography variant="h3" gutterBottom className={classes.hederTitle}>
                {pageTitle}
              </Typography>
              <Typography variant="paragraph" className={classes.pageDesc}>
                The Following lists the existing hierarchies which are used to drive progress
                reporting. Use the create button above to provision a new hierarchy. The reference
                is used when initialising the relevent Reports API report types. For further
                Information, see the Hierarchies section in our Aurthor Guide.
              </Typography>
              <Button variant="contained" className={classes.guideBtn}>
                <Icon color="action" style={{ color: '#000', margin: '0 0.8rem' }}>
                  infoicon
                </Icon>{' '}
                author guide
              </Button>
            </div>
            <Button
              variant="contained"
              style={{ float: 'right' }}
              color="secondary"
              startIcon={<AddIcon />}
              onClick={() => redirectTo('/create-tag-hierarchy')}
            >
              Create New
            </Button>
          </div>
        </div>
      }
      content={
        <div className="p-24">
          <div className="flex flex-wrap flex-1 items-center justify-between mb-10 p-8">
            <div className="flex flex-1 items-center w-full sm:w-auto sm:px-6 mx-4">
              <ThemeProvider theme={theme}>
                <Paper className="flex items-center min-w-full sm:min-w-0 w-full px-12 py-4 rounded-16 shadow">
                  <Icon color="action">search</Icon>
                  <Input
                    placeholder="Search..."
                    className="flex flex-1 px-8"
                    disableUnderline
                    fullWidth
                    inputProps={{
                      'aria-label': 'Search',
                    }}
                  />
                </Paper>
              </ThemeProvider>
            </div>
            <div className="flex w-1/6 mx-10 sm:min-w-0 justify-center rounded-16 bg-transparent">
              <FormControl sx={{ width: '100%', margin: '0px 5px' }} size="small">
                <InputLabel id="grade-status">Status</InputLabel>
                <Select labelId="grade-status" id="statusDropDown">
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">InActive</MenuItem>
                  <MenuItem value="idle">Idle</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="flex items-center justify-end -mx-4 md:mt-0">
              <Button variant="contained" color="secondary" aria-label="Send Message">
                Search
              </Button>
            </div>
          </div>
          <TagHierarchyList
            page={page}
            setPage={setPage}
            // loading={loading}
          />
        </div>
      }
    />
  );
};

export default TagHierarchies;
