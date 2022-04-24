/* Components MUI */
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

/* Components custom */

/* Definition */
const NavBarMenu = ({ children, label, onClick }) => {
  return (
    <ListItemButton onClick={onClick}>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export default NavBarMenu;
