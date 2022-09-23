import React from 'react';
// import {
//   GridToolbarContainer,
//   GridToolbarExport,
// } from '@material-ui/data-grid';

import {
  // DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';

function CustomToolbar() {
  return (
    <GridToolbarContainer
      style={{
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <GridToolbarExport color="secondary" variant="contained" />
    </GridToolbarContainer>
  );
}

export default CustomToolbar;
