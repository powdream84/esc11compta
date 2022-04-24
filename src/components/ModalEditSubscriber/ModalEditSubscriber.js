import { useDispatch, useSelector } from "react-redux";
import {
  actionUpdateInputValueSubscribers,
  actionUpdateCurrentModal,
  actionUpdateListOfSubscribers,
} from "../../actions/actionsSubscribers";
import {
  editSubscriber,
  formatToFirebaseTimestamp,
  formatToDate,
} from "../../firebase";
import { Timestamp } from "firebase/firestore";
import dayjs from "dayjs";

/* Components MUI */
import { Close } from "@mui/icons-material";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import {
  Box,
  Button,
  Fab,
  MenuItem,
  Modal,
  Stack,
  TextField,
} from "@mui/material";

/* Style */
import { styleModal, styleCloseButton, styleSubmitButton } from "../../style";

/* Definition */
const ModalEditSubscriber = ({ subscriberData }) => {
  const dispatch = useDispatch();
  const isEditModalOpened = useSelector(
    (state) => state.subscribers.isEditModalOpened
  );
  const currentEditModal = useSelector((state) => state.subscribers.editModal);
  const listOfSubscribers = useSelector(
    (state) => state.subscribers.listOfSubscribers
  );
  const updateListOfSubscribers = (subscribers) => {
    dispatch(actionUpdateListOfSubscribers(subscribers));
  };
  const firstName = useSelector(
    (state) => state.subscribers.editModal.firstName
  );
  const name = useSelector((state) => state.subscribers.editModal.name);
  const sex = useSelector((state) => state.subscribers.editModal.sex);
  const dateOfBirth = useSelector(
    (state) => state.subscribers.editModal.dateOfBirth
  );
  const dateOfBirthFirebaseTimestampFormat =
    formatToFirebaseTimestamp(dateOfBirth);
  const dateOfBirthDateFormat = formatToDate(dateOfBirth);
  const phone = useSelector((state) => state.subscribers.editModal.phone);
  const email = useSelector((state) => state.subscribers.editModal.email);
  const licenceNumber = useSelector(
    (state) => state.subscribers.editModal.licenceNumber
  );
  const handleCloseModal = () =>
    dispatch(actionUpdateCurrentModal("editModal", false, {}));
  const handleChangeFirstName = (e) => {
    dispatch(
      actionUpdateInputValueSubscribers(
        "editModal",
        "firstName",
        e.target.value
      )
    );
  };
  const handleChangeName = (e) => {
    dispatch(
      actionUpdateInputValueSubscribers("editModal", "name", e.target.value)
    );
  };
  const handleChangeSex = (e) => {
    dispatch(
      actionUpdateInputValueSubscribers("editModal", "sex", e.target.value)
    );
  };
  const handleChangeDateOfBirth = (newValue) => {
    dispatch(
      actionUpdateInputValueSubscribers("editModal", "dateOfBirth", newValue)
    );
  };
  const handleChangePhone = (e) => {
    dispatch(
      actionUpdateInputValueSubscribers("editModal", "phone", e.target.value)
    );
  };
  const handleChangeEmail = (e) => {
    dispatch(
      actionUpdateInputValueSubscribers("editModal", "email", e.target.value)
    );
  };
  const handleChangeLicenceNumber = (e) => {
    dispatch(
      actionUpdateInputValueSubscribers(
        "editModal",
        "licenceNumber",
        e.target.value
      )
    );
  };
  const handleEditSubscriber = (e) => {
    e.preventDefault();
    let updatedSubscriberData = {
      id: subscriberData.id,
      firstName: firstName,
      name: name,
      sex: sex,
      dateOfBirth: dateOfBirthFirebaseTimestampFormat,
      phone: phone,
      email: email,
      licenceNumber: licenceNumber,
    };
    editSubscriber(
      updatedSubscriberData,
      listOfSubscribers,
      updateListOfSubscribers,
      handleCloseModal,
      clearForm
    );
  };
  const clearForm = (e) => {
    dispatch(actionUpdateInputValueSubscribers("editModal", "firstName", ""));
    dispatch(actionUpdateInputValueSubscribers("editModal", "name", ""));
    dispatch(actionUpdateInputValueSubscribers("editModal", "sex", ""));
    dispatch(actionUpdateInputValueSubscribers("editModal", "dateOfBirth", ""));
    dispatch(actionUpdateInputValueSubscribers("editModal", "phone", ""));
    dispatch(actionUpdateInputValueSubscribers("editModal", "email", ""));
    dispatch(
      actionUpdateInputValueSubscribers("editModal", "licenceNumber", "")
    );
  };
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Modal
        open={isEditModalOpened && currentEditModal.id === subscriberData.id}
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
          onSubmit={handleEditSubscriber}
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
            <TextField
              name="firstName"
              label="Prénom"
              variant="outlined"
              value={firstName}
              onChange={handleChangeFirstName}
            />
            <TextField
              name="name"
              label="Nom"
              variant="outlined"
              value={name}
              onChange={handleChangeName}
            />
            <TextField
              select
              name="sex"
              label="Sexe"
              value={sex}
              onChange={handleChangeSex}
              sx={{ color: "black" }}
            >
              {["M", "F"].map((option, index) => (
                <MenuItem
                  key={`ModalAddSubscriber-Sex-Option-${index}`}
                  value={option}
                >
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <DatePicker
              label="Date"
              value={dateOfBirthDateFormat}
              inputFormat="DD/MM/YYYY"
              onChange={handleChangeDateOfBirth}
              renderInput={(params) => (
                <TextField name="dateOfBirth" {...params} />
              )}
            />
            <TextField
              name="phone"
              label="Tél."
              variant="outlined"
              value={phone}
              onChange={handleChangePhone}
            />
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleChangeEmail}
            />
            <TextField
              name="licenceNumber"
              label="Numéro de licence"
              variant="outlined"
              value={licenceNumber}
              onChange={handleChangeLicenceNumber}
            />
            <Button
              type="submit"
              variant="outlined"
              fullWidth
              sx={{
                ...styleSubmitButton,
              }}
            >
              Modifier
            </Button>
          </Stack>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};

export default ModalEditSubscriber;
