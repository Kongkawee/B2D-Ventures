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
    field: 'investorName', 
    headerName: 'Investor Name', 
    flex: 1, 
    minWidth: 80 
  },
  { 
    field: 'investorEmail', 
    headerName: 'Investor Email', 
    headerAlign: 'right',
    align: 'right',
    flex: 1, 
    minWidth: 40 
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
    headerName: 'Share Amount (Unit)',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'investmentDate',
    headerName: 'Invest Date (UTC+7)',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 120,
  },
];