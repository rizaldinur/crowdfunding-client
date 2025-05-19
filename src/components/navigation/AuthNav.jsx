import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import { accountMenuItems } from "../../data/staticData";
import { useState } from "react";
import { assignMenuPath } from "../../utils/utils";
import Cookies from "js-cookie";
function AuthNav({ accountMenu }) {
  const [anchorElUser, setAnchorElUser] = useState(null); // For authenticated menu anchor

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    Cookies.remove("jwt");
    navigate(0); // Refresh the page after logout
  };

  return (
    <Box
      sx={{
        py: 1,
        px: 2,
        borderBottom: "solid 1px",
        borderBottomColor: "divider",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          component={RouterLink}
          to="/"
          underline="none"
          sx={{ mx: "auto" }}
        >
          <Typography variant="h5" fontWeight={700} display="inline">
            RUANG MODAL
          </Typography>
        </Link>
        {accountMenu && (
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={accountMenu.avatar} />
            </IconButton>
          </Tooltip>
        )}
        {accountMenu && (
          <Menu
            id="menu-appbar"
            elevation={2}
            anchorEl={anchorElUser}
            keepMounted
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuList key="MenuListAccount">
              {accountMenuItems.map((item, index) => (
                <Box key={item.name + "-wrapper"}>
                  {item.name === "Keluar" && (
                    <Divider key={`divider-${index}`} />
                  )}
                  <MenuItem
                    key={item.name + "-menuItem"}
                    onClick={() => {
                      handleCloseUserMenu();
                      if (item.name === "Keluar") handleLogout();
                    }}
                    component={RouterLink}
                    to={"/" + assignMenuPath(item.path, accountMenu.slug || "")}
                    sx={{ py: 1 }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText>
                      <Typography
                        color={item.name === "Keluar" ? "error" : "inherit"}
                      >
                        {item.name}
                      </Typography>
                    </ListItemText>
                  </MenuItem>
                </Box>
              ))}
            </MenuList>
          </Menu>
        )}
      </Container>
    </Box>
  );
}

export default AuthNav;
