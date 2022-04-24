import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionLoadListOfNatures,
  actionLoadListOfPaymentMethods,
  actionLoadListOfSubscribers,
  actionResetFormErrors,
  actionUpdateInputValueEntries,
  actionUpdateCurrentEntryId,
  actionUpdateCurrentModal,
  actionUpdateFormError,
  actionUpdateListOfEntries,
} from "../../actions/actionsTreasury";
import { editEntry, fetchEntry, fetchNatures, fetchPaymentMethods, fetchSubscribers, formatToFirebaseTimestamp, formatToDate } from "../../firebase";
import { validateAmount, validateDate, validateNature, validatePaymentMethod, validateType } from "../../validation/entry";

/* Components MUI */
import { Close } from "@mui/icons-material";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { Autocomplete, Box, Button, Fab, MenuItem, Modal, Stack, TextField } from "@mui/material";

/* Style */
import { styleModal, styleCloseButton, styleSubmitButton } from "../../style";

/* Definition */
const ModalEditEntry = () => {
  const dispatch = useDispatch();
  const entryId = useSelector((state) => state.treasury.currentEntryId);
  const isEditModalOpened = useSelector((state) => state.treasury.isEditModalOpened);
  const listOfEntries = useSelector((state) => state.treasury.listOfEntries);
  const type = useSelector((state) => state.treasury.editModal.type);
  const paymentMethod = useSelector((state) => state.treasury.editModal.paymentMethod);
  const nature = useSelector((state) => state.treasury.editModal.nature);
  const amount = useSelector((state) => state.treasury.editModal.amount);
  const date = useSelector((state) => state.treasury.editModal.date);
  const dateFirebaseTimestampFormat = formatToFirebaseTimestamp(date);
  const dateDateFormat = formatToDate(date);
  const subscribers = useSelector((state) => state.treasury.editModal.subscribers);
  const memo = useSelector((state) => state.treasury.editModal.memo);
  const listOfNatures = useSelector((state) => state.treasury.listOfNatures);
  let filteredListOfNatures = listOfNatures.filter((obj) => {
    if (obj.type === type) return obj;
  });
  const listOfPaymentMethods = useSelector((state) => state.treasury.listOfPaymentMethods);
  const listOfSubscribers = useSelector((state) => state.treasury.listOfSubscribers);
  const formErrors = useSelector((state) => state.treasury.formErrors);

  const handleCloseModal = () => {
    dispatch(actionUpdateCurrentModal("editModal", false, {}));
    dispatch(actionUpdateCurrentEntryId(""));
    dispatch(actionResetFormErrors());
  };
  const handleChangeType = (e) => dispatch(actionUpdateInputValueEntries("editModal", "type", e.target.value));
  const handleChangePaymentMethod = (e) => dispatch(actionUpdateInputValueEntries("editModal", "paymentMethod", e.target.value));
  const handleChangeNature = (e) => dispatch(actionUpdateInputValueEntries("editModal", "nature", e.target.value));
  const handleChangeAmount = (e) => {
    let regex = new RegExp(/^\d+(\.\d{0,2})?$/);
    if (regex.test(e.target.value) || e.target.value === "") dispatch(actionUpdateInputValueEntries("editModal", "amount", e.target.value));
  };
  const handleChangeDate = (newValue) => {
    dispatch(actionUpdateInputValueEntries("editModal", "date", newValue));
    if (!validateDate(newValue)) dispatch(actionUpdateFormError("date", "Le format de la date est invalide !"));
    else dispatch(actionUpdateFormError("date", ""));
  };
  const handleChangeSubscribers = (e, values) => dispatch(actionUpdateInputValueEntries("editModal", "subscribers", values));
  const handleChangeMemo = (e) => dispatch(actionUpdateInputValueEntries("editModal", "memo", e.target.value));
  const updateListOfEntries = (entries) => dispatch(actionUpdateListOfEntries(entries));
  const loadListOfNatures = (listOfNatures) => dispatch(actionLoadListOfNatures(listOfNatures));
  const loadListOfPaymentMethods = (listOfPaymentMethods) => dispatch(actionLoadListOfPaymentMethods(listOfPaymentMethods));
  const loadListOfSubscribers = (subscribers) => dispatch(actionLoadListOfSubscribers(subscribers));

  const handleEditEntry = (e) => {
    e.preventDefault();
    /* console.log(validateType(type));
    console.log(validatePaymentMethod(listOfPaymentMethods, paymentMethod));
    console.log(validateNature(listOfNatures, nature));
    console.log(validateAmount(amount));
    console.log(validateDate(date)); */
    if (
      validateType(type) &&
      validatePaymentMethod(listOfPaymentMethods, paymentMethod) &&
      validateNature(listOfNatures, nature) &&
      validateAmount(amount) &&
      validateDate(dateDateFormat)
    ) {
      let updatedEntryData = {
        id: entryId,
        type: type,
        paymentMethod: paymentMethod,
        nature: nature,
        amount: Number(amount).toFixed(2),
        date: dateFirebaseTimestampFormat,
        subscribers: subscribers,
        memo: memo,
      };
      editEntry(updatedEntryData, listOfEntries, updateListOfEntries, handleCloseModal);
    } else console.log("format pas bon");
  };

  const loadEntryData = (data) => {
    dispatch(actionUpdateCurrentModal("editModal", isEditModalOpened, data));
  };

  useEffect(() => {
    fetchEntry(entryId, loadEntryData);
    fetchPaymentMethods(loadListOfPaymentMethods);
    fetchSubscribers(loadListOfSubscribers);
    fetchNatures(loadListOfNatures);
  }, [entryId]);
  /* console.log("date => ", date);
  console.log("dateDateFormat => ", dateDateFormat);
  console.log("dateFirebaseTimestampFormat => ", dateFirebaseTimestampFormat); */
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Modal
        open={isEditModalOpened}
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
          onSubmit={handleEditEntry}
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
              select
              required
              name="type"
              label="Type"
              helperText={formErrors.type}
              variant="outlined"
              value={type}
              onChange={handleChangeType}
            >
              <MenuItem value="Crédit">Crédit</MenuItem>
              <MenuItem value="Débit">Débit</MenuItem>
            </TextField>
            <TextField
              select
              required
              name="paymentMethod"
              label="Moyen de paiement"
              helperText={formErrors.paymentMethod}
              variant="outlined"
              value={paymentMethod}
              onChange={handleChangePaymentMethod}
            >
              {listOfPaymentMethods.map((option, index) => (
                <MenuItem key={`ModalAddEntry-Option-PaymentMethod--${index}`} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              required
              name="nature"
              label="Nature"
              helperText={formErrors.nature}
              value={nature}
              onChange={handleChangeNature}
              sx={{ color: "black" }}
            >
              {filteredListOfNatures.map((option, index) => (
                <MenuItem key={`ModalAddEntry-Nature-Option-${index}`} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              name="amount"
              label="Montant"
              helperText={formErrors.amount}
              variant="outlined"
              value={amount}
              onChange={handleChangeAmount}
            />
            <DatePicker
              label="Date"
              value={dateDateFormat}
              inputFormat="DD/MM/YYYY"
              onChange={handleChangeDate}
              renderInput={(params) => <TextField required name="date" helperText={formErrors.date} {...params} />}
            />
            <Autocomplete
              multiple
              value={subscribers || []}
              options={listOfSubscribers}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => `${option.firstName} ${option.name}`}
              renderInput={(params) => <TextField {...params} variant="outlined" label="Inscrits concernés" />}
              onChange={handleChangeSubscribers}
            />
            <TextField multiline={true} name="memo" label="Mémo" variant="outlined" value={memo} onChange={handleChangeMemo} />
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

export default ModalEditEntry;
