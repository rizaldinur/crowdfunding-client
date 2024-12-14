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
  const user = true;
  const navigate = useNavigate();
  const { currentTheme, handleThemeChange } = useContext(ThemeContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            sx={{ display: { xs: "initial", md: "none" } }}
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
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <OutlinedInput
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
                sx={{ paddingLeft: 0, borderRadius: 2, width: 400 }}
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
                variant={page === "Mulai Proyek" ? "outlined" : "text"}
                color="inherit"
                sx={{ display: page === "Login" && user ? "none" : "initial" }}
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
          {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MainHeader;
