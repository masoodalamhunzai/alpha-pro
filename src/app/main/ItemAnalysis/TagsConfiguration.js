import { useState,useEffect } from 'react';

import Typography from '@mui/material/Typography';

import { LocalOffer, DeleteSweep } from '@material-ui/icons';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import { Autocomplete, TextField } from '@mui/material';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { setTagsList } from 'app/store/alpha/itemReducer';
import {getTagsList,getTagsByTagList} from 'app/services/api/ApiManager';

function TagsConfiguration(props) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [searchingText, setSearchingText] = useState('');

  const tagsList = useSelector(({ alpha }) => alpha.item.tagsList);
  console.log('tagsList ',tagsList);
  console.log('props.tagList ',props.tagsList);

  const getTags = async () => {
    getTagsByTagList(4)
      .then((res) => {
        console.log('tags list res in tagconfig ',res);
        if (res && res.data && res.data.data && Array.isArray(res.data.data)) {
          console.log('res.data.data in tagconfig ',res.data.data);
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
    getTags();
  }, []);

 /*   [
    { id: 1, name: 'Liam' },
    { id: 2, name: 'Noah' },
    { id: 3, name: 'Oliver' },
    { id: 4, name: 'Elijah' },
    { id: 5, name: 'William' },
    { id: 6, name: 'James' },
    { id: 7, name: 'Benjamin' },
    { id: 8, name: 'Lucas' },
    { id: 9, name: 'Henry' },
    { id: 10, name: 'Alexander' },
    { id: 11, name: 'Mason' },
    { id: 12, name: 'Michael' },
    { id: 13, name: 'Ethan' },
    { id: 14, name: 'Daniel' },
    { id: 15, name: 'Peteir' },
  ]; */

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const removeTag = (tagId, tagName) => {
    swal({
      title: 'Are you sure?',
      text: `Do you want to remove ${tagName} !`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const temp = [];
        props.tagsList.map((tag) => {
          if (tag.id !== tagId) {
            temp.push(tag);
          }
        });
        props.setTagsList(temp);
      }
    });
  };

  return (
    <>
      <div style={{ width: '100%' }}>
        <div className="px-4 py-4">
          <Typography className="mx-10" sx={{ width: '100%', flexShrink: 0 }}>
            Attach tags to this item
          </Typography>
          <Paper className="flex items-center min-w-full sm:min-w-0 w-full px-12 py-4 my-3 rounded-16 shdaow">
            <Icon color="action">search</Icon>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              getOptionLabel={(o) => o.title || ''}
              onChange={(event, newValue) => {
                console.log('Here is event', event);
                if (newValue.id && newValue.title) {
                  if (props.tagsList.filter((item) => item.id == newValue.id) == '') {
                    event.target.textContent = '';
                    const temp = props.tagsList.slice();
                    temp.push({ id: newValue.id, title: newValue.title });
                    props.setTagsList(temp);
                    setSearchingText('');
                  }
                }
              }}
              options={searchingText == '' ? [] : (tagsList!=null?tagsList:[])}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={searchingText}
                  placeholder="Search by Reference"
                  className="search-p-0"
                  disableUnderline
                  onChange={(e) => {
                    console.log('hello');
                    setSearchingText(e.target.value);
                  }}
                  size="small"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
              fullWidth
              className="flex flex-1 search-bar"
              disableUnderline
            />
            {/* <Input
              placeholder="Search by Reference"
              className="flex flex-1 px-8"
              disableUnderline
              fullWidth
              inputProps={{
                "aria-label": "Search",
              }}
            /> */}
          </Paper>
        </div>
        <div className="p-4">
          {props.tagsList &&
            props.tagsList.map((tag) => {
              return (
                <div className="badge badge-gray flex justify-between">
                  <span>
                    <LocalOffer className="icon-gray" />
                    <b className="color-white px-8">{tag.title}</b>
                  </span>
                  <span>
                    <DeleteSweep
                      onClick={() => {
                        removeTag(tag.id, tag.title);
                      }}
                      className="icon-btn-gray"
                    />
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default TagsConfiguration;
