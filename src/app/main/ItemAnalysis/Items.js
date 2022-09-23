
import { useEffect, useState } from 'react';
import FusePageSimple from "@fuse/core/FusePageSimple";
import Typography from "@mui/material/Typography";
import { makeStyles, ThemeProvider, useTheme } from "@material-ui/core/styles";
import { useStateValue } from "app/services/state/State";
import { useLocation } from "react-router-dom";
import { searchItem, getItems,getAllGrades,getTagsList,getTagsByTagList } from "app/services/api/ApiManager";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router";
import { Add as AddIcon } from "@material-ui/icons";
import { useDispatch,useSelector } from "react-redux";
import { setItems,setGradesList,setTagsList } from "app/store/alpha/itemReducer";
import Breadcrumb from "../../fuse-layouts/shared-components/Breadcrumbs";
import ItemsList from "./ItemsList";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const useStyles = makeStyles({
  layoutRoot: {},
  refreshButton: {
    backgroundColor: "#0d870d",
    color: "white",
    padding: "0.5rem 4rem",
    display: "flex",
    justifyContent: "center",
    marginLeft: "1rem",
  },
});

const Items = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const pageTitle = location.pathname
    .split("/")
    .filter((x) => x)[0]
    .split("-")
    .join(" ");
  const classes = useStyles();
  const [{ user, news }] = useStateValue();
  const [count, setCount] = useState(0);
  const theme = useTheme();
  const [searchText, setSearchText] = useState("");
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const gradesList = useSelector(({ alpha }) => alpha.item.gradesList);
  const tagsList = useSelector(({ alpha }) => alpha.item.tagsList);
  const [scoringType, setScoringType] = useState('');
  const [grades, setGrades] = useState('');
  const [tags,setTags]=useState('');

  const refreshItems = async () => {
    const res = await getItems(1, pageSize);
    if (res && res.status === 200 && res.data) {
      dispatch(setItems(res.data));
    }
  };

  function handleSearch(event) {
    setSearchText(event.target.value);
  }

  function handleNameSearch(event) {
    setSearchName(event.target.value);
  }

  const searchItemByText = async (text) => {

    // ..below is search item call
    let res = null;
    if (text!='' || grades!='' || tags!='' ) {
      res = await searchItem(text,grades,tags);
    } else {
      res = await getItems();
    }
    if (res && res.status === 200 && res.data) {
      dispatch(setItems(res.data));
    }
  };

  const redirectTo = async (goTo) => {
    try {
      history.push(goTo);
    } catch (err) {}
  };
  const getGrades = async () => {
    getAllGrades()
      .then((res) => {
        if (res && res.data && Array.isArray(res.data)) {
          const gList = res.data.map((g) => {
            return {
              id: g.id,
              title: g.title,
            };
          });
          dispatch(setGradesList(gList));
        }
      })
      .catch((err) => console.error('error', err));
  };
  const getTags = async () => {
    getTagsByTagList(4)
      .then((res) => {
        if (res && res.data && res.data.data && Array.isArray(res.data.data)) {
          const tagList = res.data.data.map((g) => {
            return {
              id: g.id,
              title: g.title,
            };
          });
          dispatch(setTagsList(tagList));
        }
      })
      .catch((err) => console.error('error', err));
  };
  useEffect(() => {
    getGrades();
    getTags();
  }, []);

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <div className="p-24">
          <Breadcrumb />
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              color: "#000",
              fontWeight: 700,
              mt: 2,
              textTransform: "capitalize",
            }}
          >
            All Questions
            {/* {pageTitle} */}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ float: "right" }}
            aria-label="Send Message"
            onClick={() => redirectTo("/create-new-question")}
            startIcon={<AddIcon />}
          >
            Create Question
          </Button>
        </div>
      }
      content={
        <div className="p-6">
          {/* start */}

          <div className="flex flex-wrap flex-1 items-center justify-end p-12 md:p-24">
            <div className="flex flex-col w-full sm:w-auto" />

            <div className="flex items-end justify-end w-full sm:w-auto sm:px-12">
              <ThemeProvider theme={theme}>
                <Paper className="flex items-center min-w-full sm:min-w-0 w-full max-w-512 px-12 py-4 mx-12 rounded-16 shdaow">
                  <Icon color="action">search</Icon>
                  <Input
                    placeholder="Search by Name"
                    className="flex flex-1 px-8"
                    disableUnderline
                    fullWidth
                    value={searchName}
                    onChange={handleNameSearch}
                    inputProps={{
                      "aria-label": "Search",
                    }}
                  />
                </Paper>
                   <Paper className="flex items-center min-w-full sm:min-w-0 w-full max-w-512 px-12 py-4 mx-12 rounded-16 shdaow">
                 {/*  <Icon color="action">search</Icon>    */}              
                     <TextField
            style={{ backgroundColor: 'white', width: '100%', marginTop: '3%' }}
            id="outlined-select-currency"
            size="small"
            inputProps={{
              style: {
                backgroundColor: 'white',
                fontSize: '13px',
              },
            }}
            select
            label="Grade"
            value={grades}
            onChange={(e) => {
              setGrades(e.target.value);
            }}
            
          >
            <MenuItem key={0} value={''}>
                {"Select Grade"}
              </MenuItem>
            {gradesList && Array.isArray(gradesList) && gradesList.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.title}
              </MenuItem>
            ))}
          </TextField> 
                </Paper>  

                <Paper className="flex items-center min-w-full sm:min-w-0 w-full max-w-512 px-12 py-4 mx-12 rounded-16 shdaow">
                 {/*  <Icon color="action">search</Icon>      */}            
                     <TextField
            style={{ backgroundColor: 'white', width: '100%', marginTop: '3%' }}
            id="outlined-select-currency"
            size="small"
            inputProps={{
              style: {
                backgroundColor: 'white',
                fontSize: '13px',
              },
            }}
            select
            label="Tags"
            value={tags}
            onChange={(e) => {
              setTags(e.target.value);
            }}
            
          >
             <MenuItem key={0} value={''}>
                {"Select Tags"}
              </MenuItem>
            {tagsList && Array.isArray(tagsList) && tagsList.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.title}
              </MenuItem>
            ))}
          </TextField> 
                </Paper> 

              </ThemeProvider>
            </div>
            <div className="flex items-center justify-end -mx-4 mt-24 md:mt-0">
              <Button
                variant="contained"
                color="primary"
                aria-label="Send Message"
                onClick={() => {
                  searchItemByText(searchName);
                }}
              >
                Search
              </Button>

              <Button
                variant="contained"
                className={classes.refreshButton}
                onClick={() => {
                  setPage(0);
                  refreshItems();
                }}
              >
                <Icon
                  color="white"
                  style={{
                    marginRight: "0.6rem",
                    fontSize: "1.6rem",
                  }}
                >
                  refresh
                </Icon>{" "}
                Refresh
              </Button>
            </div>
          </div>

          {/* end */}

          <ItemsList
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>
      }
    />
  );
};

export default Items;
