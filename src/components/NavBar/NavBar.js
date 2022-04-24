import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../firebase";
import { actionToggleDrawerVisibility } from "../../actions/actionsNavBar";

/* Components MUI */
import { AppBar, Divider, Drawer, IconButton, List, Toolbar } from "@mui/material";
import { Balance, Euro, ExitToApp, Home, MenuRounded, People } from "@mui/icons-material";

/* Components custom */
import NavBarMenu from "../NavBarMenu/NavBarMenu";

/* Style */
import { colors } from "../../style";

/* Definition */
const MenuAppBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDrawerOpened = useSelector((state) => state.navbar.isDrawerOpened);
  const handleClickMenuIcon = () => {
    dispatch(actionToggleDrawerVisibility(isDrawerOpened));
  };
  const handleCloseDrawer = () => {
    dispatch(actionToggleDrawerVisibility(isDrawerOpened));
  };
  const handleClickHome = () => {
    dispatch(actionToggleDrawerVisibility(isDrawerOpened));
    navigate("/home");
  };
  const handleClickSubscribers = () => {
    dispatch(actionToggleDrawerVisibility(isDrawerOpened));
    navigate("/subscribers");
  };
  const handleClickTreasury = () => {
    dispatch(actionToggleDrawerVisibility(isDrawerOpened));
    navigate("/treasury");
  };
  const handleClickBalanceSheet = () => {
    dispatch(actionToggleDrawerVisibility(isDrawerOpened));
    navigate("/balance_sheet");
  };
  const handleLogOff = () => {
    logout();
    dispatch(actionToggleDrawerVisibility(isDrawerOpened));
    navigate("/");
  };
  return (
    <AppBar position="sticky" sx={{ backgroundColor: colors.mainBlue }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleClickMenuIcon}>
          <MenuRounded />
        </IconButton>
        <Drawer
          open={isDrawerOpened}
          onClose={handleCloseDrawer}
          PaperProps={{
            sx: {
              minWidth: "200px",
              width: { xs: "50%", sm: "300px" },
            },
          }}
        >
          <List>
            <NavBarMenu label="Accueil" onClick={handleClickHome}>
              <Home />
            </NavBarMenu>
            <NavBarMenu label="Inscrits" onClick={handleClickSubscribers}>
              <People />
            </NavBarMenu>
            <NavBarMenu label="Opérations" onClick={handleClickTreasury}>
              <Euro />
            </NavBarMenu>
            <NavBarMenu label="Bilan" onClick={handleClickBalanceSheet}>
              <Balance />
            </NavBarMenu>
            <Divider />
            <NavBarMenu label="Déconnexion" onClick={handleLogOff}>
              <ExitToApp />
            </NavBarMenu>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default MenuAppBar;
