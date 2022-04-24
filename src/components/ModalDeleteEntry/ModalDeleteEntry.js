import { useDispatch, useSelector } from "react-redux";
import { actionUpdateCurrentModal, actionUpdateListOfEntries } from "../../actions/actionsTreasury";
import { deleteEntry } from "../../firebase";

/* Components MUI */
import { Box, Button, Fab, Modal, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

/* Components Custom */

/* Style */
import { styleModal, styleCloseButton, styleSubmitButton } from "../../style";

function ModalDeleteEntry({}) {
  const dispatch = useDispatch();
  const isDeleteModalOpened = useSelector((state) => state.treasury.isDeleteModalOpened);
  const entryId = useSelector((state) => state.treasury.currentEntryId);
  const listOfEntries = useSelector((state) => state.treasury.listOfEntries);
  const updateListOfEntries = (entries) => {
    dispatch(actionUpdateListOfEntries(entries));
  };
  const handleCloseModal = () => dispatch(actionUpdateCurrentModal("deleteModal", false, {}));
  const handleDeleteEntry = () => {
    handleCloseModal();
    deleteEntry(entryId, listOfEntries, updateListOfEntries, handleCloseModal);
  };
  //console.log("entryData => ", entryData);
  return (
    <Modal open={isDeleteModalOpened} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box
        sx={{
          ...styleModal,
          width: { xs: "100%", sm: 400 },
          textAlign: "right",
        }}
        autoComplete="off"
      >
        <Fab
          aria-label="close"
          size="small"
          sx={{
            ml: "auto",
            mb: "4rem",
            transition: ".5s",
            "&:hover": {
              ...styleCloseButton,
            },
          }}
          onClick={handleCloseModal}
        >
          <Close />
        </Fab>
        <Typography variant="body1" component="p" sx={{ mb: "3rem", textAlign: "left" }}>
          Voulez-vous vraiment supprimer cet élément de la liste des lignes comptables ?
        </Typography>
        <Button
          fullWidth
          variant="contained"
          onClick={handleDeleteEntry}
          sx={{
            ...styleSubmitButton,
          }}
        >
          Supprimer
        </Button>
      </Box>
    </Modal>
  );
}

export default ModalDeleteEntry;
