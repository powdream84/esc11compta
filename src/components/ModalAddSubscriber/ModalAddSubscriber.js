import { useDispatch, useSelector } from "react-redux";
import { actionUpdateInputValueSubscribers, actionUpdateVisibilityAddSubscriberModal } from "../../actions/actionsSubscribers";
import { addSubscriber } from "../../firebase";
import { Timestamp } from "firebase/firestore";

/* Components MUI */
import { Close } from "@mui/icons-material";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { Box, Button, Fab, MenuItem, Modal, Stack, TextField } from "@mui/material";

/* Style */
import { styleModal, styleCloseButton, styleSubmitButton } from "../../style";

/* Definition */
const ModalAddSubscriber = ({ listOfSubscribers, updateListOfSubscribers }) => {
  const dispatch = useDispatch();
  const isAddModalOpened = useSelector((state) => state.subscribers.isAddModalOpened);
  const firstName = useSelector((state) => state.subscribers.addModal.firstName);
  const name = useSelector((state) => state.subscribers.addModal.name);
  const sex = useSelector((state) => state.subscribers.addModal.sex);
  const dateOfBirth = useSelector((state) => state.subscribers.addModal.dateOfBirth);
  const phone = useSelector((state) => state.subscribers.addModal.phone);
  const email = useSelector((state) => state.subscribers.addModal.email);
  const licenceNumber = useSelector((state) => state.subscribers.addModal.licenceNumber);
  const handleCloseModal = () => dispatch(actionUpdateVisibilityAddSubscriberModal(false));
  const handleChangeFirstName = (e) => {
    dispatch(actionUpdateInputValueSubscribers("addModal", "firstName", e.target.value));
  };
  const handleChangeName = (e) => {
    dispatch(actionUpdateInputValueSubscribers("addModal", "name", e.target.value));
  };
  const handleChangeSex = (e) => {
    dispatch(actionUpdateInputValueSubscribers("addModal", "sex", e.target.value));
  };
  const handleChangeDateOfBirth = (newValue) => {
    dispatch(actionUpdateInputValueSubscribers("addModal", "dateOfBirth", newValue));
  };
  const handleChangePhone = (e) => {
    dispatch(actionUpdateInputValueSubscribers("addModal", "phone", e.target.value));
  };
  const handleChangeEmail = (e) => {
    dispatch(actionUpdateInputValueSubscribers("addModal", "email", e.target.value));
  };
  const handleChangeLicenceNumber = (e) => {
    dispatch(actionUpdateInputValueSubscribers("addModal", "licenceNumber", e.target.value));
  };
  const handleAddSubscriber = (e) => {
    e.preventDefault();
    let formattedDateOfBirth = dateOfBirth === null || dateOfBirth === "" ? null : Timestamp.fromDate(new Date(dateOfBirth));
    let newSubscriberData = {
      firstName: firstName,
      name: name,
      sex: sex,
      dateOfBirth: formattedDateOfBirth,
      phone: phone,
      email: email,
      licenceNumber: licenceNumber,
    };
    addSubscriber(newSubscriberData, listOfSubscribers, updateListOfSubscribers, handleCloseModal, clearForm);
  };
  const clearForm = (e) => {
    dispatch(actionUpdateInputValueSubscribers("addModal", "firstName", ""));
    dispatch(actionUpdateInputValueSubscribers("addModal", "name", ""));
    dispatch(actionUpdateInputValueSubscribers("addModal", "sex", ""));
    dispatch(actionUpdateInputValueSubscribers("addModal", "dateOfBirth", ""));
    dispatch(actionUpdateInputValueSubscribers("addModal", "phone", ""));
    dispatch(actionUpdateInputValueSubscribers("addModal", "email", ""));
    dispatch(actionUpdateInputValueSubscribers("addModal", "licenceNumber", ""));
  };
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Modal
        open={isAddModalOpened}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          overflow: "scroll",
          paper: {
            height: "400px",
          },
          box: {
            backgroundColor: "red",
          },
        }}
      >
        <Box
          sx={{
            ...styleModal,
            width: { xs: "100%", sm: 400 },
            textAlign: "right",
          }}
          component="form"
          autoComplete="off"
          onSubmit={handleAddSubscriber}
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
          <Stack
            spacing={5}
            sx={{
              textAlign: "left",
            }}
          >
            <TextField name="firstName" label="Prénom" variant="outlined" value={firstName} onChange={handleChangeFirstName} />
            <TextField name="name" label="Nom" variant="outlined" value={name} onChange={handleChangeName} />
            <TextField select name="sex" label="Sexe" value={sex} onChange={handleChangeSex} sx={{ color: "black" }}>
              {["M", "F"].map((option, index) => (
                <MenuItem key={`ModalAddSubscriber-Sex-Option-${index}`} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <DatePicker
              label="Date"
              value={dateOfBirth}
              inputFormat="DD/MM/YYYY"
              onChange={handleChangeDateOfBirth}
              renderInput={(params) => <TextField name="dateOfBirth" {...params} />}
            />
            <TextField name="phone" label="Tél." variant="outlined" value={phone} onChange={handleChangePhone} />
            <TextField name="email" label="Email" variant="outlined" value={email} onChange={handleChangeEmail} />
            <TextField name="licenceNumber" label="Numéro de licence" variant="outlined" value={licenceNumber} onChange={handleChangeLicenceNumber} />
            <Button
              type="submit"
              variant="outlined"
              fullWidth
              sx={{
                ...styleSubmitButton,
              }}
            >
              Créer
            </Button>
          </Stack>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};

export default ModalAddSubscriber;
