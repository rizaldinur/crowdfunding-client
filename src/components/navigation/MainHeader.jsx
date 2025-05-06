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
import { Link as RouterLink, useNavigate } from "react-router";
import { DarkMode, LightMode, Search } from "@mui/icons-material";
import { useState } from "react";
import { navItems, accountMenuItems } from "../../data/staticData";
import useThemeContext from "../../hooks/useThemeContext";
import Cookies from "js-cookie";

function MainHeader({ user }) {
  const navigate = useNavigate();
  const { currentTheme, setCurrentTheme, handleThemeChange } =
    useThemeContext();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openNav, setOpenNav] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);

  const handleSelectThemeChange = (event) => {
    setCurrentTheme(event.target.value);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    Cookies.remove("jwt");
    navigate(0);
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
          <Toolbar
            disableGutters
            sx={{ justifyContent: "space-between", gap: { xs: "none", sm: 2 } }}
          >
            <Drawer
              open={openNav}
              onClose={() => setOpenNav(false)}
              anchor="right"
            >
              <Box sx={{ width: 250 }}>
                <List>
                  <ListItem key="Tema-drawerItem">
                    <FormControl fullWidth size="small" key={"Tema-select"}>
                      <InputLabel id="theme-select-label">Tema</InputLabel>
                      <Select
                        labelId="theme-select-label"
                        id="theme-select"
                        value={currentTheme}
                        label="Tema"
                        onChange={handleSelectThemeChange}
                      >
                        <MenuItem value={"dark"}>Dark</MenuItem>
                        <MenuItem value={"light"}>Light</MenuItem>
                      </Select>
                    </FormControl>
                  </ListItem>
                  {navItems
                    .filter((item) => !(item.name === "Login" && user)) // Exclude "Login" if a user exists
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
                          >
                            <ListItemText primary={item.name} />
                          </ListItemButton>
                        )}
                      </ListItem>
                    ))}
                </List>
                {user && <Divider />}
                {user && (
                  <List>
                    {accountMenuItems.map((item) => (
                      <>
                        {item.name === "Keluar" && (
                          <Divider key={"dividerDrawer-" + item.name} />
                        )}
                        <ListItem key={item.name + "-drawerItem"}>
                          {item.name === "Keluar" ? (
                            <ListItemButton
                              key={item.name + "-drawerButton"}
                              sx={{ gap: 2 }}
                              onClick={() => {
                                handleCloseUserMenu();
                                handleLogout();
                              }}
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
                          ) : (
                            <ListItemButton
                              key={item.name + "-drawerButton"}
                              sx={{ gap: 2 }}
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
                          )}
                        </ListItem>
                      </>
                    ))}
                  </List>
                )}
              </Box>
            </Drawer>

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

            <Box
              sx={{
                flexGrow: 1,
                maxWidth: { xs: 1, md: 500 },
              }}
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                navigate("login");
              }}
            >
              <FormControl
                id="search__form-control"
                sx={{
                  display: { xs: "none", sm: "inherit" },
                  // width: 1,
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
            </Box>

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
              {navItems
                .filter((item) => !(item.name === "Login" && user))
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
              {user && (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
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
                <MenuList key={"MenuListAccount"}>
                  {accountMenuItems.map((item, index) => (
                    <Box key={item.name + "-wrapper"}>
                      {item.name === "Keluar" && (
                        <Divider key={`divider-${index}`} />
                      )}
                      {item.name === "Keluar" ? (
                        <MenuItem
                          key={item.name + "-menuItem"}
                          onClick={() => {
                            handleCloseUserMenu();
                            handleLogout();
                          }}
                          component={RouterLink}
                          to={item.path}
                          sx={{ py: 1 }}
                        >
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText>
                            <Typography
                              color={
                                item.name === "Keluar" ? "error" : "inherit"
                              }
                            >
                              {item.name}
                            </Typography>
                          </ListItemText>
                        </MenuItem>
                      ) : (
                        <MenuItem
                          key={item.name + "-menuItem"}
                          onClick={handleCloseUserMenu}
                          component={RouterLink}
                          to={item.path}
                          sx={{ py: 1 }}
                        >
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText>
                            <Typography
                              color={
                                item.name === "Keluar" ? "error" : "inherit"
                              }
                            >
                              {item.name}
                            </Typography>
                          </ListItemText>
                        </MenuItem>
                      )}
                    </Box>
                  ))}
                </MenuList>
              </Menu>
            </Box>
            <IconButton
              size="large"
              aria-label="show search bar"
              aria-controls="search-bar"
              aria-haspopup="true"
              onClick={() => setOpenSearchBar((prevState) => !prevState)}
              color="inherit"
              sx={{ display: { xs: "inherit", sm: "none" } }}
            >
              <Search />
            </IconButton>
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
          </Toolbar>
          <Collapse in={openSearchBar}>
            <Box
              sx={{ mb: 2 }}
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                navigate("login");
              }}
            >
              <FormControl
                id="search__form-control"
                sx={{
                  width: 1,
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
            </Box>
          </Collapse>
        </Box>
      </Container>
    </AppBar>
  );
}
export default MainHeader;
