import * as React from 'react';
import Chip from '@mui/material/Chip';


function renderStatus(status) {
  const colors = {
    Complete: 'success',
    Incomplete: 'default',
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

export const columns = [
  { 
    field: 'businessTitle', 
    headerName: 'Business Title', 
    flex: 1, 
    minWidth: 80 
  },
  {
    field: 'amount',
    headerName: 'Invest Amount ($)',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'shares',
    headerName: 'Share Gained (Units)',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'goalPercentage',
    headerName: 'Goal Percentage (%)',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 120,
  },
];