import * as React from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Card, CardMedia, ListItemIcon } from '@mui/material';

const business = [
  {
    logo: 'This is logo',
    pic: 'picture path',
    title: 'Pressman Film',
    min_invest: '200.00',
  }
];

function Info() {
  return (
    <React.Fragment>
      {/* <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Header title
      </Typography>
      <Typography variant="h4" gutterBottom>
        Header
      </Typography> */}
      {business.map((business) => (
        <List disablePadding>
          <ListItem sx={{ py: 1, px: 0 }}>
            <Card sx={{py: 0, px:0 }}>
              <CardMedia 
                component="img"
                image="https://uploads.republic.com/p/offerings/slider_media_items/previews/default_2x/000/032/684/32684-1725487846-9103ddee4ba95095971afd721de151faa49ce7bb.png"
                alt='Business Pics'
              />
            </Card>
            </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <Typography variant="h4">
              {business.title}
            </Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={'Min Investment'}
            />
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              $ {business.min_invest}
            </Typography>
          </ListItem>
        </List>
      ))}
    </React.Fragment>
  );
}

export default Info;
