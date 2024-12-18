import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';

const drawerWidth = 240;

const placeholderImage = "/static/images/avatar/placeholder.jpg";

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu({ userData }) {
  if (!userData) return null;

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Divider />
      <MenuContent />
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          sizes="small"
          alt=""
          src={userData?.profile_picture || placeholderImage}
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography id="investor-name" variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            {userData ? `${userData.first_name} ${userData.last_name}` : 'Loading...'}
          </Typography>
          <Typography id="investor-email" variant="caption" sx={{ color: 'text.secondary' }}>
            {userData ? userData.email : 'example@email.com'}
          </Typography>
        </Box>
        <OptionsMenu userData={userData}/>
      </Stack>
    </Drawer>
  );
}
