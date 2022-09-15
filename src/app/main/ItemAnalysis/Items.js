import { useState } from "react";
import FusePageSimple from "@fuse/core/FusePageSimple";
import Typography from "@mui/material/Typography";
import { makeStyles, ThemeProvider, useTheme } from "@material-ui/core/styles";
import { useStateValue } from "app/services/state/State";
import { actions } from "app/services/state/Reducer";
import { useLocation } from "react-router-dom";
import { searchItem,getItems } from 'app/services/api/ApiManager';
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router";
import Breadcrumb from "../../fuse-layouts/shared-components/Breadcrumbs";
import ItemsList from "./ItemsList";
import { Add as AddIcon } from "@material-ui/icons";

const useStyles = makeStyles({
  layoutRoot: {},
});

const Items = () => {
  const location = useLocation();
  const history = useHistory();
  const pageTitle = location.pathname
    .split("/")
    .filter((x) => x)[0]
    .split("-")
    .join(" ");
  const classes = useStyles();
  const [{ user, news }, dispatch] = useStateValue();
  const [count, setCount] = useState(0);
  const theme = useTheme();
  const [searchText, setSearchText] = useState("");
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(0);

  function handleSearch(event) {
    setSearchText(event.target.value);
  }

  function handleNameSearch(event) {
    setSearchName(event.target.value);
  }

    const searchItemByText = async (text) => {
console.log('')
//..below is search item call
      let res =null;
      if(text)
      {
       res = await searchItem(text,user);
      }else
      {
       res = await getItems(user);
      }
      console.log('searchItem are here: ', res);
      if (res && res.status == 200 && res.data) {
        dispatch({
          type: actions.SET_ITEMS,
          payload: res.data,  
        });
      }
    }

  

  const setNews = async () => {
    dispatch({
      type: actions.SET_NEWS,
      payload: { header: "new header text", des: "new description text" },
    });
  };
  const redirectTo = async (goTo) => {
    try {
      history.push(goTo);
    } catch (err) {
      // console.log(err);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 70 },
    { field: "contactperson", headerName: "Contact Person", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    {
      field: "phonenumber",
      headerName: "Phone Number",
      width: 90,
    },
    {
      field: "address",
      headerName: "Address",
      description: "",
      sortable: false,
      width: 160,
    },
  ];

  const rows = [
    {
      id: 1,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "123123",
      address: "test address",
    },
    {
      id: 2,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "123123",
      address: "test address",
    },
    {
      id: 3,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "123123",
      address: "test address",
    },
    {
      id: 4,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "123123",
      address: "test address",
    },
    {
      id: 5,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "123123",
      address: "test address",
    },
    {
      id: 6,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "123123",
      address: "test address",
    },
    {
      id: 7,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "123123",
      address: "test address",
    },
    {
      id: 8,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "123123",
      address: "test address",
    },
    {
      id: 9,
      name: "Snow",
      contactperson: "Jon",
      email: "35@gmail.com",
      phonenumber: "123123",
      address: "test address",
    },
  ];

  /* useEffect(() => {
    setCount(1);
  }, []);
  useEffect(() => {
    setNews();
  }, [count]); */

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
              {/*   <Paper className="flex items-center min-w-full sm:min-w-0 w-full max-w-512 px-12 py-4 mx-12 rounded-16 shdaow">
                  <Icon color="action">search</Icon>
                  <Input
                    placeholder="Search for Tag"
                    className="flex flex-1 px-8"
                    disableUnderline
                    fullWidth
                    value={searchText}
                    onChange={handleSearch}
                    inputProps={{
                      "aria-label": "Search",
                    }}
                  />
                </Paper> */}
              </ThemeProvider>
            </div>
            <div className="flex items-center justify-end -mx-4 mt-24 md:mt-0">
              <Button
                variant="contained"
                color="primary"
                aria-label="Send Message"
                onClick={()=>{searchItemByText(searchName)}}
              >
                Search
              </Button>
            </div>
          </div>

          {/* end */}

          <ItemsList page={page} setPage={setPage} />
        </div>
      }
    />
  );
};

export default Items;
