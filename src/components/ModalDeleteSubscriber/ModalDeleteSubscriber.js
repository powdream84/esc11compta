import { useDispatch, useSelector } from "react-redux";
import {
  actionUpdateCurrentModal,
  actionUpdateListOfSubscribers,
} from "../../actions/actionsSubscribers";
import { deleteSubscriber } from "../../firebase";

/* Components MUI */
import { Box, Button, Fab, Modal, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

/* Components Custom */

/* Style */
import { styleModal, styleCloseButton, styleSubmitButton } from "../../style";

function ModalDeleteSubscriber({ subscriberData }) {
  const dispatch = useDispatch();
  const isDeleteModalOpened = useSelector(
    (state) => state.subscribers.isDeleteModalOpened
  );
  const currentDeleteModal = useSelector(
    (state) => state.subscribers.deleteModal
  );
  const listOfSubscribers = useSelector(
    (state) => state.subscribers.listOfSubscribers
  );
  const updateListOfSubscribers = (subscribers) => {
    dispatch(actionUpdateListOfSubscribers(subscribers));
  };
  const handleCloseModal = () =>
    dispatch(actionUpdateCurrentModal("deleteModal", false, {}));
  const handleDeleteSubscriber = () => {
    handleCloseModal();
    deleteSubscriber(
      subscriberData.id,
      listOfSubscribers,
      updateListOfSubscribers,
      handleCloseModal
    );
  };
  //console.log("subscriberData => ", subscriberData);
  return (
    <Modal
      open={isDeleteModalOpened && currentDeleteModal.id === subscriberData.id}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
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
        <Typography
          variant="body1"
          component="p"
          sx={{ mb: "3rem", textAlign: "left" }}
        >
          Voulez-vous vraiment supprimer {subscriberData.firstName}{" "}
          {subscriberData.name} de la liste des inscrits ?
        </Typography>
        <Button
          fullWidth
          variant="contained"
          onClick={handleDeleteSubscriber}
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

export default ModalDeleteSubscriber;
