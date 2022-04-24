export const UPDATE_INPUT_VALUE_SUBSCRIBERS = "UPDATE_INPUT_VALUE_SUBSCRIBERS";
export const UPDATE_VISIBILITY_ADD_SUBSCRIBER_MODAL =
  "UPDATE_VISIBILITY_ADD_SUBSCRIBER_MODAL";
export const UPDATE_LIST_OF_SUBSCRIBERS = "UPDATE_LIST_OF_SUBSCRIBERS";
export const UPDATE_CURRENT_MODAL_SUBSCRIBERS =
  "UPDATE_CURRENT_MODAL_SUBSCRIBERS";

/**
 * Show/hide "add subscriber" modal.
 * @param {Boolean} isVisible Current display status of the modal
 * @returns {Action}
 */
export function actionUpdateVisibilityAddSubscriberModal(isVisible) {
  /* console.log("isVisible => ", isVisible); */
  return {
    type: UPDATE_VISIBILITY_ADD_SUBSCRIBER_MODAL,
    payload: isVisible,
  };
}

/**
 * Update the list of all subscribers
 * @param {Array} listOfSubscribers The list of subscribers
 * @returns {Action}
 */
export function actionUpdateListOfSubscribers(listOfSubscribers) {
  /* console.log("listOfSubscribers => ", listOfSubscribers); */
  return {
    type: UPDATE_LIST_OF_SUBSCRIBERS,
    payload: listOfSubscribers,
  };
}

/**
 * Update the value of a given input.
 * @param {String} modalName The concerned modal (add, edit)
 * @param {String} fieldName The field to update
 * @param {String} value The new value
 * @returns {Action}
 */
export function actionUpdateInputValueSubscribers(modalName, fieldName, value) {
  /* console.log("modalName => ", modalName);
  console.log("fieldName => ", fieldName);
  console.log("value => ", value); */
  return {
    type: UPDATE_INPUT_VALUE_SUBSCRIBERS,
    payload: { modalName, fieldName, value },
  };
}

/**
 * Update the current modal element.
 * @param {String} isVisible The concerned modal (add, edit, delete)
 * @param {String} isVisible Display status of the modal
 * @param {String} subscriberData The id of the subscriber
 * @returns {Action}
 */
export function actionUpdateCurrentModal(modalName, isVisible, subscriberData) {
  /* console.log("modalName => ", modalName);
  console.log("isVisible => ", isVisible);
  console.log("subscriberData => ", subscriberData); */
  return {
    type: UPDATE_CURRENT_MODAL_SUBSCRIBERS,
    payload: { modalName, isVisible, subscriberData },
  };
}
