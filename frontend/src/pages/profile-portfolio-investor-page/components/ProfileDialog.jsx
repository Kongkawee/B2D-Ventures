import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, TextField, IconButton, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function ProfileDialog({
  open,
  onClose,
  userData,
  onSaveProfile,
}) {
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: userData?.first_name || "",
    lastName: userData?.last_name || "",
    phoneNumber: userData?.phone_number || "",
    email: userData?.email || "",
  });
 
  const [profilePicture, setProfilePicture] = useState({
    profilePicUrl: userData?.profile_picture || null,
    profilePicFile: null,
  });

  const placeholderImage = "/static/images/avatar/placeholder.jpg";

  useEffect(() => {
    if (userData) {
      setProfileData({
        firstName: userData.first_name || "",
        lastName: userData.last_name || "",
        phoneNumber: userData.phone_number || "",
        email: userData.email || "",
      });
      setProfilePicture({
        profilePicUrl: userData.profile_picture || placeholderImage,
        profilePicFile: null,
      });
    }
  }, [userData]);

  const handleEditToggle = () => {
    setEditing((prev) => !prev);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture({
        profilePicUrl: URL.createObjectURL(file),
        profilePicFile: file,
      });
    }
  };

  const handleSave = () => {
    const updatedProfile = {
      ...profileData,
      profilePicture: profilePicture.profilePicFile, 
    };
    onSaveProfile(updatedProfile);
    setEditing(false);
  };

  const handleClose = () => {
    if (editing) {
      setProfileData({
        firstName: userData.first_name || "",
        lastName: userData.last_name || "",
        email: userData.email || "",
      });
      setEditing(false);
    }
    setProfilePicture({
      profilePicUrl: userData?.profile_picture || null,
      profilePicFile: null,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>User Profile</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: 100,
              height: 100,
            }}
          >
            <Avatar
              alt={profileData.firstName}
              src={profilePicture.profilePicUrl || placeholderImage}
              sx={{ width: 100, height: 100 }}
            />
            {editing && (
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: -8,
                  right: -8,
                  backgroundColor: "background.paper",
                  boxShadow: 2,
                }}
                component="label"
              >
                <EditIcon fontSize="small" />
                <input
                  type="file"
                  id="profile_picture"
                  name="profile_picture"
                  accept="image/*"
                  hidden
                  onChange={handleProfilePictureChange}
                />
              </IconButton>
            )}
          </Box>
          {editing ? (
            <Box sx={{ width: "100%", gap: 2 }}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={profileData.firstName}
                onChange={handleProfileChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth label="Last Name"
                name="lastName"
                value={profileData.lastName}
                onChange={handleProfileChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={profileData.phoneNumber}
                onChange={handleProfileChange}
                sx={{ mb: 2 }}
              />
            </Box>
          ) : (
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Profile Information
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body1">
                  <strong>First Name:</strong> {profileData.firstName || "N/A"}
                </Typography>
                <Typography variant="body1">
                  <strong>Last Name:</strong> {profileData.lastName || "N/A"}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone Number:</strong> {profileData.phoneNumber || "N/A"}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {profileData.email || "N/A"}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        {editing ? (
          <React.Fragment>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
            <Button onClick={handleEditToggle} color="secondary">
              Cancel
            </Button>
          </React.Fragment>
        ) : (
          <Button onClick={handleEditToggle} color="primary">
            Edit Profile
          </Button>
        )}
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}