import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Register", path: "/register" },
    { label: "Login", path: "/login" },
    { label: "Loan Categories", path: "/loan-request" },
  ];

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        {/* Logo */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            cursor: "pointer",
            fontWeight: 600,
            letterSpacing: "1px",
          }}
          onClick={() => navigate("/")}
        >
          Saylani Microfinance
        </Typography>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {menuItems.map((item, index) => (
            <Button
              key={index}
              color="inherit"
              onClick={() => navigate(item.path)}
              sx={{ marginLeft: "15px" }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  navigate(item.path);
                  handleMenuClose();
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;