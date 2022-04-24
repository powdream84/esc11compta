import { useState } from "react";
import { useDispatch } from "react-redux";
import { actionUpdateCurrentModal } from "../../actions/actionsSubscribers";

/* Components MUI */
import RowMenuIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Fade, MenuItem, Menu, Typography } from "@mui/material";

/* Style */
import { colors } from "../../style";

/* Definition */
function DatagridSubscribersRowMenu({ subscriberData }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenEditModal = () => {
    dispatch(actionUpdateCurrentModal("editModal", true, subscriberData));
  };
  const handleOpenDeleteModal = () => {
    dispatch(actionUpdateCurrentModal("deleteModal", true, subscriberData));
  };
  return (
    <>
      <IconButton
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <RowMenuIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            handleOpenEditModal();
          }}
        >
          <EditIcon sx={{ color: colors.mainBlue }} />
          <Typography variant="body2" sx={{ ml: ".5rem" }}>
            Modifier
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleOpenDeleteModal();
          }}
        >
          <DeleteIcon sx={{ color: colors.mainBlue }} />
          <Typography variant="body2" sx={{ ml: ".5rem" }}>
            Supprimer
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default DatagridSubscribersRowMenu;
