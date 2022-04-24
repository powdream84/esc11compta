export const TOGGLE_DRAWER_VISIBILITY = "TOGGLE_DRAWER_VISIBILITY";
export const UPDATE_CONNECTION_STATUS = "UPDATE_CONNECTION_STATUS";
export const UPDATE_INPUT_VALUE = "UPDATE_INPUT_VALUE";

/**
 * Show/hide drawer on the left hand side of the window.
 * @param {Boolean} isDrawerOpened Current display status of the drawer
 * @returns {Action}
 */
export function actionToggleDrawerVisibility(isDrawerOpened) {
  return { type: TOGGLE_DRAWER_VISIBILITY, payload: !isDrawerOpened };
}

/**
 * Update the connection status.
 * @param {Boolean} isConnected
 * @returns {Action}
 */
export function actionUpdateConnectionStatus(isConnected) {
  return { type: UPDATE_CONNECTION_STATUS, payload: isConnected };
}

/**
 * Update the value of a given input.
 * @param {String} fieldName The field to update
 * @param {String} value The new value
 * @returns {Action}
 */
export function actionUpdateInputValue(fieldName, value) {
  let inputState = `inputValue${fieldName}`;
  return { type: UPDATE_INPUT_VALUE, payload: { inputState, value } };
}
