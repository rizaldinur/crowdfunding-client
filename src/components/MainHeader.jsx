import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import {
  Divider,
  Drawer,
  FormControl,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuList,
  OutlinedInput,
} from "@mui/material";
import { Route, Link as RouterLink, useNavigate } from "react-router";
import { DarkMode, LightMode, Search, Settings } from "@mui/icons-material";
import { ThemeContext } from "../routes/layouts/RootLayout";
import { useContext, useState } from "react";

const pages = ["Mulai Proyek", "Jelajahi", "Login"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function MainHeader() {
  const user = false;
  const navigate = useNavigate();
  const { currentTheme, handleThemeChange } = useContext(ThemeContext);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openNav, setOpenNav] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      elevation={1}
      position="static"
      sx={{ bgcolor: "background.default" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Drawer open={openNav} onClose={() => setOpenNav(false)}>
            <Box sx={{ width: 250 }}>
              <List>
                <ListItem>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      navigate("login");
                    }}
                  >
                    <FormControl id="search__form-control">
                      <OutlinedInput
                        fullWidth
                        id="search"
                        aria-describedby="my-helper-text"
                        name="search"
                        placeholder="Search"
                        color="inherit"
                        size="small"
                        startAdornment={
                          <IconButton type="submit" color="inherit">
                            <Search />
                          </IconButton>
                        }
                        sx={{
                          paddingLeft: 0,
                          borderRadius: 2,
                        }}
                      />
                    </FormControl>
                  </form>
                </ListItem>
                {pages.map((page) => (
                  <ListItem
                    key={page}
                    sx={{
                      display: page === "Login" && user && "none",
                    }}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <Settings />
                      </ListItemIcon>
                      <ListItemText primary={page} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              {user && <Divider />}
              {user && (
                <List>
                  {settings.map((setting) => (
                    <ListItem key={setting}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Settings />
                        </ListItemIcon>
                        <ListItemText primary={setting} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Drawer>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => setOpenNav(true)}
            color="inherit"
            sx={{ display: { xs: "inherit", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Link underline="none" color="inherit" component={RouterLink} to="#">
            <Typography variant="h5" fontWeight={700} color="primary">
              RUANG MODAL
            </Typography>
          </Link>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate("login");
            }}
          >
            <FormControl
              id="search__form-control"
              sx={{
                display: { xs: "none", md: "inherit" },
                width: { xs: 300, lg: 400 },
              }}
            >
              <OutlinedInput
                fullWidth
                id="search"
                aria-describedby="my-helper-text"
                name="search"
                placeholder="Search"
                color="inherit"
                size="small"
                startAdornment={
                  <IconButton type="submit" color="inherit">
                    <Search />
                  </IconButton>
                }
                sx={{
                  paddingLeft: 0,
                  borderRadius: 2,
                }}
              />
            </FormControl>
          </form>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            <IconButton
              color="inherit"
              type="button"
              onClick={() => {
                handleThemeChange();
              }}
            >
              {currentTheme === "light" ? <DarkMode /> : <LightMode />}
            </IconButton>
            {pages.map((page) => (
              <Button
                key={page}
                component={RouterLink}
                to="login"
                variant={page === "Mulai Proyek" ? "outlined" : "text"}
                color="inherit"
                sx={{ display: page === "Login" && user && "none" }}
              >
                {page}
              </Button>
            ))}
            {user && (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            )}
            <Menu
              id="menu-appbar"
              elevation={2}
              anchorEl={anchorElUser}
              keepMounted
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuList>
                {settings.map((setting) => (
                  <Box key={setting}>
                    {setting === "Logout" && (
                      <Divider key={`divider-${setting}`} />
                    )}
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <ListItemIcon>
                        <Settings
                          color={setting === "Logout" ? "error" : "inherit"}
                          fontSize="small"
                        />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography
                          color={setting === "Logout" ? "error" : "inherit"}
                        >
                          {setting}
                        </Typography>
                      </ListItemText>
                    </MenuItem>
                  </Box>
                ))}
              </MenuList>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MainHeader;
