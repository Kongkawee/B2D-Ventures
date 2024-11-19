import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Divider, { dividerClasses } from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MuiMenuItem from "@mui/material/MenuItem";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import MenuButton from "./MenuButton";
import ProfileDialog from "./ProfileDialog"; 
import { useNavigate } from "react-router-dom";
import api from "../../../api";

const MenuItem = styled(MuiMenuItem)({
  margin: "2px 0",
});

export default function OptionsMenu({ userData }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  const openProfileDialog = () => {
    setProfileDialogOpen(true);
    handleClose();
  };

  const closeProfileDialog = () => {
    setProfileDialogOpen(false);
  };

  const handleSaveProfile = async (updatedProfile) => {
    try {
      const formData = new FormData();
      formData.append("first_name", updatedProfile.firstName);
      formData.append("last_name", updatedProfile.lastName);
      formData.append("phone_number", updatedProfile.phoneNumber);
      
      if (updatedProfile.profilePicture) {
        formData.append("profile_picture", updatedProfile.profilePicture);
      }
  
      const response = await api.patch("/api/investor/update/", formData);

      closeProfileDialog();
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response) {
        alert(error.response.data.detail || "Profile update failed. Please try again.");
      } else {
        alert("Profile update failed. Please check your network connection.");
      }
    }
  };

  return (
    <React.Fragment>
      <MenuButton
        aria-label="Open menu"
        onClick={handleClick}
        sx={{ borderColor: "transparent" }}
      >
        <MoreVertRoundedIcon />
      </MenuButton>
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          [`& .${dividerClasses.root}`]: {
            margin: "4px -4px",
          },
        }}
      >
        <MenuItem onClick={openProfileDialog}>Profile</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          Logout
          <LogoutRoundedIcon fontSize="small" style={{ marginLeft: "auto" }} />
        </MenuItem>
      </Menu>

      <ProfileDialog
        open={profileDialogOpen}
        onClose={closeProfileDialog}
        userData={userData}
        onSaveProfile={handleSaveProfile}
      />
    </React.Fragment>
  );
}
