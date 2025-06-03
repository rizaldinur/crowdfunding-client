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
import {
  Collapse,
  Divider,
  Drawer,
  FormControl,
  InputLabel,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuList,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Form, Link as RouterLink, useNavigate } from "react-router";
import { DarkMode, LightMode, Search } from "@mui/icons-material";
import { Fragment, useState } from "react";
import { navItems, accountMenuItems } from "../../data/staticData";
import useThemeContext from "../../hooks/useThemeContext";
import Cookies from "js-cookie";
import { assignMenuPath } from "../../utils/utils";

function MainHeader({ user, slug, avatar, authenticated }) {
  const navigate = useNavigate();
  const { currentTheme, setCurrentTheme, handleThemeChange } =
    useThemeContext();

  const [anchorElUser, setAnchorElUser] = useState(null); // For authenticated menu anchor
  const [openNav, setOpenNav] = useState(false); // Drawer toggle state
  const [openSearchBar, setOpenSearchBar] = useState(false); // Search bar visibility toggle

  const handleSelectThemeChange = (event) => {
    localStorage.setItem("theme", event.target.value);
    setCurrentTheme(event.target.value);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseNav = () => {
    setOpenNav(false);
  };

  const handleLogout = () => {
    Cookies.remove("jwt");
    navigate(0); // Refresh the page after logout
  };

  return (
    <AppBar
      elevation={0}
      position="static"
      sx={{
        bgcolor: "background.default",
        borderBottom: "solid 1px",
        borderBottomColor: "divider",
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* Header Toolbar */}
          <Toolbar
            disableGutters
            sx={{ justifyContent: "space-between", gap: { xs: "none", sm: 2 } }}
          >
            {/* Navigation Drawer for mobile */}
            <Drawer
              open={openNav}
              onClose={() => setOpenNav(false)}
              anchor="right"
            >
              <Box sx={{ width: 250 }}>
                <List>
                  {/* Theme switcher dropdown inside drawer */}
                  <ListItem key="Tema-drawerItem">
                    <FormControl fullWidth size="small" key="Tema-select">
                      <InputLabel id="theme-select-label">Tema</InputLabel>
                      <Select
                        labelId="theme-select-label"
                        id="theme-select"
                        value={currentTheme}
                        label="Tema"
                        onChange={handleSelectThemeChange}
                      >
                        <MenuItem value="dark">Dark</MenuItem>
                        <MenuItem value="light">Light</MenuItem>
                      </Select>
                    </FormControl>
                  </ListItem>
                  {/* Drawer nav items */}
                  {navItems
                    .filter((item) => !(item.name === "Login" && authenticated))
                    .map((item) => (
                      <ListItem key={item.name + "-drawerItem"}>
                        {item.name === "Mulai Proyek" ? (
                          <Button
                            key={item.name + "-drawerButton"}
                            sx={{ width: 1 }}
                            variant="outlined"
                            color="inherit"
                            component={RouterLink}
                            to={item.path}
                          >
                            {item.name}
                          </Button>
                        ) : (
                          <ListItemButton
                            key={item.name + "-drawerButton"}
                            component={RouterLink}
                            to={item.path}
                            onClick={handleCloseNav}
                          >
                            <ListItemText primary={item.name} />
                          </ListItemButton>
                        )}
                      </ListItem>
                    ))}
                </List>
                {authenticated && <Divider />}
                {authenticated && (
                  <List>
                    {accountMenuItems.map((item) => (
                      <Fragment key={item.name + "-fragment"}>
                        {item.name === "Keluar" && (
                          <Divider key={"dividerDrawer-" + item.name} />
                        )}
                        <ListItem key={item.name + "-drawerItem"}>
                          <ListItemButton
                            key={item.name + "-drawerButton"}
                            sx={{ gap: 2 }}
                            onClick={() => {
                              handleCloseNav();
                              if (item.name === "Keluar") {
                                handleLogout();
                              }
                            }}
                            component={RouterLink}
                            to={assignMenuPath(item.path, slug || user)}
                          >
                            {item.icon}
                            <ListItemText
                              primary={item.name}
                              sx={{
                                color:
                                  item.name === "Keluar"
                                    ? "error.main"
                                    : "inherit",
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      </Fragment>
                    ))}
                  </List>
                )}
              </Box>
            </Drawer>

            {/* Logo and title */}
            <Link
              underline="none"
              color="inherit"
              component={RouterLink}
              to="/"
            >
              <Typography variant="h5" fontWeight={700} color="primary">
                RUANG MODAL
              </Typography>
            </Link>

            {/* Search form (hidden on xs) */}
            <Box
              sx={{ flexGrow: 1, maxWidth: { xs: 1, md: 500 } }}
              component={Form}
              action="/discover"
            >
              <FormControl
                id="search__form-control"
                sx={{ display: { xs: "none", sm: "inherit" } }}
              >
                <OutlinedInput
                  fullWidth
                  id="search"
                  aria-describedby="my-helper-text"
                  name="search"
                  placeholder="Cari nama proyek, kreator, atau kategori..."
                  color="inherit"
                  size="small"
                  startAdornment={
                    <IconButton type="submit" color="inherit">
                      <Search />
                    </IconButton>
                  }
                  sx={{ paddingLeft: 0, borderRadius: 2 }}
                />
              </FormControl>
            </Box>

            {/* Right side actions: theme, nav, avatar */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              <IconButton color="inherit" onClick={handleThemeChange}>
                {currentTheme === "light" ? <DarkMode /> : <LightMode />}
              </IconButton>
              {navItems
                .filter((item) => !(item.name === "Login" && authenticated))
                .map((item) => (
                  <Button
                    key={item.name + "-normalNav"}
                    component={RouterLink}
                    to={item.path}
                    variant={item.name === "Mulai Proyek" ? "outlined" : "text"}
                    color="inherit"
                  >
                    {item.name}
                  </Button>
                ))}
              {/* Avatar for logged-in authenticated */}
              {authenticated && (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={avatar} />
                  </IconButton>
                </Tooltip>
              )}
              {/* authenticated account menu */}
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
                        to={assignMenuPath(item.path, slug || user)}
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
            </Box>

            {/* Mobile search button */}
            <IconButton
              size="large"
              aria-label="show search bar"
              onClick={() => setOpenSearchBar((prevState) => !prevState)}
              color="inherit"
              sx={{ display: { xs: "inherit", sm: "none" } }}
            >
              <Search />
            </IconButton>

            {/* Mobile menu icon */}
            <IconButton
              size="large"
              aria-label="account of current authenticated"
              onClick={() => setOpenNav(true)}
              color="inherit"
              sx={{ display: { xs: "inherit", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>

          {/* Collapsible search form for mobile */}
          <Collapse in={openSearchBar}>
            <Box sx={{ mb: 2 }} component={Form} action="/discover">
              <FormControl id="search__form-control-mobile" sx={{ width: 1 }}>
                <OutlinedInput
                  fullWidth
                  id="search__mobile-view"
                  name="search"
                  placeholder="Cari nama proyek, kreator, atau kategori..."
                  color="inherit"
                  size="small"
                  startAdornment={
                    <IconButton type="submit" color="inherit">
                      <Search />
                    </IconButton>
                  }
                  sx={{ paddingLeft: 0, borderRadius: 2 }}
                />
              </FormControl>
            </Box>
          </Collapse>
        </Box>
      </Container>
    </AppBar>
  );
}

export default MainHeader;
