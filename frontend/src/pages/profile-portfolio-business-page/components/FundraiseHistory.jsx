import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from '../internals/data/gridData';

export default function FundraiseHistory({userInvestment}) {

  return (
    <DataGrid
      id="fundraise-history-table"
      autoHeight
      rows={userInvestment}
      columns={columns}
      getRowId={(row) => row.id}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
      componentsProps={{
        row: {
          'data-testid': 'fundraise-row',
        },
      }}
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small',
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small',
              },
            },
          },
        },
      }}
    />
  );
}
