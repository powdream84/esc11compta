import {
  UPDATE_VISIBILITY_ADD_SUBSCRIBER_MODAL,
  UPDATE_CURRENT_MODAL_SUBSCRIBERS,
  UPDATE_LIST_OF_SUBSCRIBERS,
  UPDATE_INPUT_VALUE_SUBSCRIBERS,
} from "../actions/actionsSubscribers";

export const initialState = {
  isAddModalOpened: false,
  isEditModalOpened: false,
  isDeleteModalOpened: false,
  listOfSubscribers: [],
  addModal: {
    id: "",
    firstName: "",
    name: "",
    sex: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    licenceNumber: "",
  },
  editModal: {},
  deleteModal: {},
};

const subscribersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_VISIBILITY_ADD_SUBSCRIBER_MODAL:
      return {
        ...state,
        isAddModalOpened: action.payload,
      };
    case UPDATE_CURRENT_MODAL_SUBSCRIBERS:
      if (action.payload.modalName === "editModal")
        return {
          ...state,
          isEditModalOpened: action.payload.isVisible,
          editModal: action.payload.subscriberData,
        };
      else if (action.payload.modalName === "deleteModal")
        return {
          ...state,
          isDeleteModalOpened: action.payload.isVisible,
          deleteModal: action.payload.subscriberData,
        };
      break;
    case UPDATE_LIST_OF_SUBSCRIBERS:
      return {
        ...state,
        listOfSubscribers: action.payload,
      };
    case UPDATE_INPUT_VALUE_SUBSCRIBERS:
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
    default:
      return state;
  }
};

export default subscribersReducer;
