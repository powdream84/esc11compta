import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionLoadListOfNatures,
  actionLoadListOfPaymentMethods,
  actionLoadListOfSubscribers,
  actionResetFormErrors,
  actionUpdateFormError,
  actionUpdateInputValueEntries,
  actionUpdateListOfEntries,
  actionUpdateVisibilityAddEntryModal,
} from "../../actions/actionsTreasury";
import { addEntry, fetchNatures, fetchPaymentMethods, fetchSubscribers } from "../../firebase";
import { Timestamp } from "firebase/firestore";
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
const ModalAddEntry = () => {
  // Current state values
  const isAddModalOpened = useSelector((state) => state.treasury.isAddModalOpened);
  const type = useSelector((state) => state.treasury.addModal.type);
  const paymentMethod = useSelector((state) => state.treasury.addModal.paymentMethod);
  const nature = useSelector((state) => state.treasury.addModal.nature);
  const amount = useSelector((state) => state.treasury.addModal.amount);
  const date = useSelector((state) => state.treasury.addModal.date);
  const subscribers = useSelector((state) => state.treasury.addModal.subscribers);
  const memo = useSelector((state) => state.treasury.addModal.memo);
  const listOfNatures = useSelector((state) => state.treasury.listOfNatures);
  let filteredListOfNatures = listOfNatures.filter((obj) => {
    if (obj.type === type) return obj;
  });
  const listOfPaymentMethods = useSelector((state) => state.treasury.listOfPaymentMethods);
  const listOfSubscribers = useSelector((state) => state.treasury.listOfSubscribers);
  const listOfEntries = useSelector((state) => state.treasury.listOfEntries);
  const formErrors = useSelector((state) => state.treasury.formErrors);

  // Edit state values
  const dispatch = useDispatch();
  const handleCloseModal = () => dispatch(actionUpdateVisibilityAddEntryModal(false));
  const handleChangeType = (e) => {
    dispatch(actionUpdateInputValueEntries("addModal", "type", e.target.value));
    dispatch(actionUpdateInputValueEntries("addModal", "nature", ""));
  };
  const handleChangePaymentMethod = (e) => dispatch(actionUpdateInputValueEntries("addModal", "paymentMethod", e.target.value));
  const handleChangeNature = (e) => {
    dispatch(actionUpdateInputValueEntries("addModal", "nature", e.target.value));
  };
  const handleChangeAmount = (e) => {
    let regex = new RegExp(/^\d+(\.\d{0,2})?$/);
    if (regex.test(e.target.value) || e.target.value === "") dispatch(actionUpdateInputValueEntries("addModal", "amount", e.target.value));
  };
  const handleChangeDate = (newValue) => {
    dispatch(actionUpdateInputValueEntries("addModal", "date", newValue));
    if (!validateDate(newValue)) dispatch(actionUpdateFormError("date", "Le format de la date est invalide !"));
    else dispatch(actionUpdateFormError("date", ""));
  };
  const handleChangeSubscribers = (e, values) => dispatch(actionUpdateInputValueEntries("addModal", "subscribers", values));
  const handleChangeMemo = (e) => dispatch(actionUpdateInputValueEntries("addModal", "memo", e.target.value));
  const updateListOfEntries = (entries) => dispatch(actionUpdateListOfEntries(entries));
  const loadListOfNatures = (listOfNatures) => dispatch(actionLoadListOfNatures(listOfNatures));
  const loadListOfPaymentMethods = (listOfPaymentMethods) => dispatch(actionLoadListOfPaymentMethods(listOfPaymentMethods));
  const loadListOfSubscribers = (subscribers) => dispatch(actionLoadListOfSubscribers(subscribers));

  // Add new entry
  const handleAddEntry = (e) => {
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
      validateDate(date)
    ) {
      let formattedDate = Timestamp.fromDate(new Date(date));
      let newEntryData = {
        type: type,
        paymentMethod: paymentMethod,
        nature: nature,
        amount: Number(amount).toFixed(2),
        date: formattedDate,
        subscribers: subscribers,
        memo: memo,
      };
      addEntry(newEntryData, listOfEntries, updateListOfEntries, handleCloseModal, clearForm);
    } else console.log("format pas bon");
  };
  //

  // Clear the form
  const clearForm = (e) => {
    dispatch(actionUpdateInputValueEntries("addModal", "nature", ""));
    dispatch(actionUpdateInputValueEntries("addModal", "type", ""));
    dispatch(actionUpdateInputValueEntries("addModal", "paymentMethod", ""));
    dispatch(actionUpdateInputValueEntries("addModal", "amount", 0));
    dispatch(actionUpdateInputValueEntries("addModal", "date", ""));
    dispatch(actionUpdateInputValueEntries("addModal", "subscribers", []));
    dispatch(actionUpdateInputValueEntries("addModal", "memo", ""));
    dispatch(actionResetFormErrors());
  };
  //

  useEffect(() => {
    fetchPaymentMethods(loadListOfPaymentMethods);
    fetchSubscribers(loadListOfSubscribers);
    fetchNatures(loadListOfNatures);
  }, []);

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
          onSubmit={handleAddEntry}
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
              value={date}
              inputFormat="DD/MM/YYYY"
              onChange={handleChangeDate}
              renderInput={(params) => <TextField required name="date" helperText={formErrors.date} {...params} />}
            />
            <Autocomplete
              multiple
              options={listOfSubscribers}
              getOptionLabel={(option) => `${option.firstName} ${option.name}`}
              renderInput={(params) => <TextField {...params} variant="outlined" label="Inscrits concernés" helperText={formErrors.subscribers} />}
              onChange={handleChangeSubscribers}
            />
            <TextField multiline={true} name="memo" label="Memo" variant="outlined" value={memo} onChange={handleChangeMemo} />
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

export default ModalAddEntry;
