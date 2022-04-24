import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionUpdateCurrentModal } from "../../actions/actionsTreasury";

/* Components MUI */
import RowMenuIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Fade, MenuItem, Menu, Typography } from "@mui/material";

/* Style */
import { colors } from "../../style";

/* Definition */
function DatagridTreasuryRowMenu({ entryId, onClickRowMenu }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const opened = Boolean(anchorEl);
  const entryData = useSelector((state) => state.treasury.editModal);

  const handleClick = (e) => {
    onClickRowMenu(entryId);
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenEditModal = () => {
    dispatch(actionUpdateCurrentModal("editModal", true, entryData));
  };

  const handleOpenDeleteModal = () => {
    dispatch(actionUpdateCurrentModal("deleteModal", true, entryId));
  };

  return (
    <>
      <IconButton
        id="fade-button"
        aria-controls={opened ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={opened ? "true" : undefined}
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
        open={opened}
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

export default DatagridTreasuryRowMenu;
