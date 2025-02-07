"use client";

import { useState } from "react";
import { handleSignIn, handleSignOut } from "@/lib/serverActions";
import SignUp from "./SignUp";
import OrganizationSwitch from "./OrganizationSwitch";
import InviteUser from "./InviteUser";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";

export default function Home({ session }) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container className="home" maxWidth="sm">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Asgardeo x Next.js B2B Sample App
          </Typography>
          {session && (
            <div>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar alt={session.user.email} src="/static/images/avatar/1.jpg" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <AccountCircle fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleSignOut}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Sign Out
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {!session ? (
        <Box mt={3} textAlign="center">
          <form action={handleSignIn}>
            <Button variant="contained" color="primary" type="submit">
              Sign in
            </Button>
          </form>

          <Box mt={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setShowSignUp(!showSignUp)}
            >
              {showSignUp ? "Close Sign Up" : "Sign Up"}
            </Button>
          </Box>

          {showSignUp && <SignUp />}
        </Box>
      ) : (
        <Box mt={3} textAlign="center">
          <Typography variant="body1">Hello {session?.user?.email}</Typography>
          <Typography variant="body1">
            You are now signed in to Team: {session?.orgName}
          </Typography>
          <OrganizationSwitch />
          <InviteUser />
        </Box>
      )}
    </Container>
  );
}
