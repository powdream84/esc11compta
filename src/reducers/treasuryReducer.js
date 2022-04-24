import {
  LOAD_LIST_OF_NATURES,
  LOAD_LIST_OF_PAYMENT_METHODS,
  LOAD_LIST_OF_SUBSCRIBERS,
  RESET_FORM_ERRORS,
  UPDATE_BALANCE_SHEET_CREDIT_ROWS,
  UPDATE_BALANCE_SHEET_DEBIT_ROWS,
  UPDATE_CREDITS_TOTAL,
  UPDATE_CURRENT_ENTRY_ID,
  UPDATE_CURRENT_MODAL_ENTRIES,
  UPDATE_DEBITS_TOTAL,
  UPDATE_FORM_ERROR,
  UPDATE_INPUT_VALUE_ENTRIES,
  UPDATE_LIST_OF_ENTRIES,
  UPDATE_POPOVER_MEMO,
  UPDATE_POPOVER_SUBSCRIBERS,
  UPDATE_VISIBILITY_ADD_ENTRY_MODAL,
} from "../actions/actionsTreasury";

export const initialState = {
  balanceSheetCreditRows: [],
  balanceSheetDebitRows: [],
  creditsTotal: 0,
  currentEntryId: "",
  debitsTotal: 0,
  hoverMemo: "",
  hoverSubscribers: [],
  isAddModalOpened: false,
  isEditModalOpened: false,
  isDeleteModalOpened: false,
  listOfEntries: [],
  listOfNatures: [],
  listOfPaymentMethods: [],
  listOfSubscribers: [],
  formErrors: { type: "", paymentMethod: "", nature: "", amount: "", date: "", subscribers: "", memo: "" },
  addModal: {
    id: "",
    type: "",
    paymentMethod: "",
    nature: "",
    amount: 0,
    date: null,
    subscribers: [],
    memo: "",
  },
  editModal: {},
  deleteModal: {},
};

const treasuryReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_LIST_OF_NATURES:
      return {
        ...state,
        listOfNatures: action.payload,
      };

    case LOAD_LIST_OF_PAYMENT_METHODS:
      return {
        ...state,
        listOfPaymentMethods: action.payload,
      };

    case LOAD_LIST_OF_SUBSCRIBERS:
      return {
        ...state,
        listOfSubscribers: action.payload,
      };

    case RESET_FORM_ERRORS:
      return {
        ...state,
        formErrors: { type: "", paymentMethod: "", nature: "", amount: "", date: "", subscribers: "", memo: "" },
      };

    case UPDATE_BALANCE_SHEET_CREDIT_ROWS:
      return {
        ...state,
        balanceSheetCreditRows: action.payload,
      };

    case UPDATE_BALANCE_SHEET_DEBIT_ROWS:
      return {
        ...state,
        balanceSheetDebitRows: action.payload,
      };

    case UPDATE_CREDITS_TOTAL:
      return {
        ...state,
        creditsTotal: action.payload,
      };

    case UPDATE_CURRENT_ENTRY_ID:
      return {
        ...state,
        currentEntryId: action.payload,
      };

    case UPDATE_CURRENT_MODAL_ENTRIES:
      if (action.payload.modalName === "editModal")
        return {
          ...state,
          isEditModalOpened: action.payload.isVisible,
          editModal: action.payload.entryData,
        };
      else if (action.payload.modalName === "deleteModal")
        return {
          ...state,
          isDeleteModalOpened: action.payload.isVisible,
          deleteModal: action.payload.entryData,
        };
      break;

    case UPDATE_DEBITS_TOTAL:
      return {
        ...state,
        debitsTotal: action.payload,
      };

    case UPDATE_FORM_ERROR:
      return {
        ...state,
        formErrors: {
          ...state.formErrors,
          [action.payload.fieldName]: action.payload.message,
        },
      };

    case UPDATE_INPUT_VALUE_ENTRIES:
      if (action.payload.modalName === "addModal") {
        return {
          ...state,
          [action.payload.modalName]: {
            ...state.addModal,
            [action.payload.fieldName]: action.payload.value,
          },
        };
      } else if (action.payload.modalName === "editModal") {
        return {
          ...state,
          [action.payload.modalName]: {
            ...state.editModal,
            [action.payload.fieldName]: action.payload.value,
          },
        };
      }
      break;

    case UPDATE_LIST_OF_ENTRIES:
      return {
        ...state,
        listOfEntries: action.payload,
      };

    case UPDATE_POPOVER_MEMO:
      return {
        ...state,
        hoverMemo: action.payload,
      };

    case UPDATE_POPOVER_SUBSCRIBERS:
      return {
        ...state,
        hoverSubscribers: action.payload,
      };

    case UPDATE_VISIBILITY_ADD_ENTRY_MODAL:
      return {
        ...state,
        isAddModalOpened: action.payload,
      };

    default:
      return state;
  }
};

export default treasuryReducer;
