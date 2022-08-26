/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
import { memo, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TablePagination,
  Tooltip,
  Avatar,
  Button,
  Typography,
} from '@material-ui/core';
import {
  DeleteSweep as DeleteIcon,
  BorderColor as EditIcon,
  RefreshOutlined as RestoreIcon,
  VisibilityRounded as VisibilityRoundedIcon,
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
//import { DataGrid } from '@material-ui/data-grid';
import { useStateValue } from 'app/services/state/State';
import { dataGridPageSizes, settings as s, states } from 'app/services/Settings';

import FuseLoading from '@fuse/core/FuseLoading';
import { actions } from 'app/services/state/Reducer';
import { useSnackbar } from 'notistack';
import swal from 'sweetalert';
import moment from 'moment';
import {CustomToolbar} from '../../components'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: 20,
  },
  icon: {
    color: 'grey',
    cursor: 'pointer',
  },
  row: {
    display: 'flex',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  types: {
    zIndex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    border: `1px solid ${theme.palette.background.default}`,
  },
  cardRow: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  rowLabel: {
    width: '40%',
    fontWeight: 500,
    fontSize: 16,
  },
  rowValue: {
    color: '#01619b',
    width: '60%',
    fontWeight: 'bold',
    fontSize: 16,
  },
}));

function UsersList({ page, setPage, loading, setLoading,fetchUsers }) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const anchorRef = useRef(null);
  const [userId, setUserId] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [{ user, patients, defaultPageSize }, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  //const { payload: patientsList, pagination } = patients;
  const [usersList, setUsersList] = useState([]);
  const [pagination, setPagination] = useState([]);


  async function onArchiveUser(Id) {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to archive this User?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        handleArchiveUser(Id);
      }
    });
  }

  async function handleArchiveUser(Id) {
  }

  async function onRestoreUser(Id) {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to restore this User?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        handleRestoreUser(Id);
      }
    });
  }

  async function handleRestoreUser(Id) {
  }

  const showUserDetail = (id) => {
 
  };

  async function handleEditUser(Id) {

  }

  const handleChangePage = async (event, newPage) => {
   
  };

  function handleChangeRowsPerPage(event) {

  }


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'contactperson', headerName: 'Contact Person', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phonenumber', headerName: 'Phone Number', width: 150 },
    { field: 'address', headerName: 'Address', width: 150 },
    {
      field: 'action',
      headerName: 'Action',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      renderCell: (params) => (
        
            <>
              <Tooltip title="View">
                <VisibilityRoundedIcon
                  className={classes.icon}
                  onClick={() => showUserDetail(params.id)}
                />
              </Tooltip>
              <Tooltip title="Edit">
                <EditIcon
                  style={{ marginLeft: 5 }}
                  className={classes.icon}
                  onClick={() => handleEditUser(params.id)}
                />
              </Tooltip>
             
                <Tooltip title="Archive">
                  <DeleteIcon
                    className={classes.icon}
                    style={{ marginLeft: 5 }}
                    onClick={() => onArchiveUser(params.id)}
                  />
                </Tooltip>
             
            </>
            
      ),
    },
  ];

    const rows = [
    {id:1, name: 'Snow', contactperson: 'Jon', email: '35@gmail.com',phonenumber:'123123',address:'test address' },
    {id:2, name: 'Snow', contactperson: 'Jon', email: '35@gmail.com',phonenumber:'143123',address:'test address' },
    {id:3, name: 'Snow', contactperson: 'Jon', email: '35@gmail.com',phonenumber:'153123',address:'test address' },
    {id:4, name: 'Snow', contactperson: 'Jon', email: '35@gmail.com',phonenumber:'163123',address:'test address' },
    {id:5, name: 'Snow', contactperson: 'Jon', email: '35@gmail.com',phonenumber:'173123',address:'test address' },
    {id:6, name: 'Snow', contactperson: 'Jon', email: '35@gmail.com',phonenumber:'183123',address:'test address' },
    {id:7, name: 'Snow', contactperson: 'Jon', email: '35@gmail.com',phonenumber:'193123',address:'test address' },
    {id:8, name: 'Snow', contactperson: 'Jon', email: '35@gmail.com',phonenumber:'103123',address:'test address' },
    {id:8, name: 'Snow', contactperson: 'Jon', email: '35@gmail.com',phonenumber:'153123',address:'test address' },
  ];

  return (
    <>
      <div className={classes.root}>
        {rows && (
          <DataGrid
            rows={rows}
            page={page}
            hideFooter
            columns={columns}
            components={{
              Toolbar: () => <CustomToolbar />
            }}
            hideFooterRowCount
            hideFooterPagination
            style={{ height: '70vh' }}
            pageSize={defaultPageSize}
            hideFooterSelectedRowCount
            rowCount={10 /* pagination.totalItemsCount */}
            rowsPerPageOptions={dataGridPageSizes}
          />
        )}
        <TablePagination
          page={page}
          component="div"
          rowsPerPage={defaultPageSize}
          onPageChange={handleChangePage}
          count={100 /* pagination.totalItemsCount */}
          className="flex-shrink-0 border-t-1"
          rowsPerPageOptions={dataGridPageSizes}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ 'aria-label': 'Next Page' }}
          backIconButtonProps={{ 'aria-label': 'Previous Page' }}
        />
        {loading && (
          <div className={classes.progress} align="center">
            <FuseLoading />
          </div>
        )}
      </div>
    
    </>
  );
}

export default memo(UsersList);
