export const LOAD_LIST_OF_NATURES = "LOAD_LIST_OF_NATURES";
export const LOAD_LIST_OF_PAYMENT_METHODS = "LOAD_LIST_OF_PAYMENT_METHODS";
export const LOAD_LIST_OF_SUBSCRIBERS = "LOAD_LIST_OF_SUBSCRIBERS";
export const RESET_FORM_ERRORS = "RESET_FORM_ERRORS";
export const UPDATE_BALANCE_SHEET_CREDIT_ROWS = "UPDATE_BALANCE_SHEET_CREDIT_ROWS";
export const UPDATE_BALANCE_SHEET_DEBIT_ROWS = "UPDATE_BALANCE_SHEET_DEBIT_ROWS";
export const UPDATE_CREDITS_TOTAL = "UPDATE_CREDITS_TOTAL";
export const UPDATE_CURRENT_ENTRY_ID = "UPDATE_CURRENT_ENTRY_ID";
export const UPDATE_CURRENT_MODAL_ENTRIES = "UPDATE_CURRENT_MODAL_ENTRIES";
export const UPDATE_DEBITS_TOTAL = "UPDATE_DEBITS_TOTAL";
export const UPDATE_FORM_ERROR = "UPDATE_FORM_ERROR";
export const UPDATE_INPUT_VALUE_ENTRIES = "UPDATE_INPUT_VALUE_ENTRIES";
export const UPDATE_LIST_OF_ENTRIES = "UPDATE_LIST_OF_ENTRIES";
export const UPDATE_POPOVER_SUBSCRIBERS = "UPDATE_POPOVER_SUBSCRIBERS";
export const UPDATE_POPOVER_MEMO = "UPDATE_POPOVER_MEMO";
export const UPDATE_VISIBILITY_ADD_ENTRY_MODAL = "UPDATE_VISIBILITY_ADD_ENTRY_MODAL";

/**
 * Load the list of natures.
 * @param {Array} listOfNatures
 * @returns {Action}
 */
export function actionLoadListOfNatures(listOfNatures) {
  //console.log("listOfNatures => ", listOfNatures);
  return {
    type: LOAD_LIST_OF_NATURES,
    payload: listOfNatures,
  };
}

/**
 * Load the list of payment methods.
 * @param {Array} listOfPaymentMethods The list of payment methods.
 * @returns {Action}
 */
export function actionLoadListOfPaymentMethods(listOfPaymentMethods) {
  //console.log("listOfPaymentMethods => ", listOfPaymentMethods);
  return {
    type: LOAD_LIST_OF_PAYMENT_METHODS,
    payload: listOfPaymentMethods,
  };
}

/**
 * Load the list of payment subscribers.
 * @param {Boolean} isVisible Current display status of the modal
 * @returns {Action}
 */
export function actionLoadListOfSubscribers(listOfSubscribers) {
  //console.log("listOfSubscribers => ", listOfSubscribers); */
  return {
    type: LOAD_LIST_OF_SUBSCRIBERS,
    payload: listOfSubscribers,
  };
}

/**
 * Reset form errors.
 * @returns {Action}
 */
export function actionResetFormErrors() {
  return {
    type: RESET_FORM_ERRORS,
  };
}

/**
 * Update the current entry id.
 * @param {Number} creditsTotal The total of all credits.
 * @returns {Action}
 */
export function actionUpdateCreditsTotal(creditsTotal) {
  //console.log("creditsTotal => ", creditsTotal);
  return {
    type: UPDATE_CREDITS_TOTAL,
    payload: creditsTotal,
  };
}

/**
 * Update the current entry id.
 * @param {String} entryId The id of the new current entry.
 * @returns {Action}
 */
export function actionUpdateCurrentEntryId(entryId) {
  //console.log("entryId => ", entryId);
  return {
    type: UPDATE_CURRENT_ENTRY_ID,
    payload: entryId,
  };
}

/**
 * Update the current modal element.
 * @param {String} modalName The concerned modal (add, edit, delete)
 * @param {String} isVisible Display status of the modal
 * @param {String} entryData The id of the entry
 * @returns {Action}
 */
export function actionUpdateCurrentModal(modalName, isVisible, entryData) {
  /*console.log("modalName => ", modalName);
  console.log("isVisible => ", isVisible);
  console.log("entryData => ", entryData); */
  return {
    type: UPDATE_CURRENT_MODAL_ENTRIES,
    payload: { modalName, isVisible, entryData },
  };
}

/**
 * Update the current entry id.
 * @param {Number} debitsTotal The total of all debits.
 * @returns {Action}
 */
export function actionUpdateDebitsTotal(debitsTotal) {
  //console.log("debitsTotal => ", debitsTotal);
  return {
    type: UPDATE_DEBITS_TOTAL,
    payload: debitsTotal,
  };
}

/**
 * Update the error message just under a given field.
 * @param {String} field The concerned field.
 * @param {String} message The message to display.
 * @returns {Action}
 */
export function actionUpdateFormError(fieldName, message) {
  return {
    type: UPDATE_FORM_ERROR,
    payload: { fieldName, message },
  };
}

/**
 * Update the value of a given input.
 * @param {String} modalName The concerned modal (add, edit)
 * @param {String} fieldName The field to update
 * @param {String} value The new value
 * @returns {Action}
 */
export function actionUpdateInputValueEntries(modalName, fieldName, value) {
  /* console.log("modalName => ", modalName);
  console.log("fieldName => ", fieldName);
  console.log("value => ", value); */
  return {
    type: UPDATE_INPUT_VALUE_ENTRIES,
    payload: { modalName, fieldName, value },
  };
}

/**
 * Update the list of all entries
 * @param {Array} listOfEntries The list of entries
 * @returns {Action}
 */
export function actionUpdateListOfEntries(listOfEntries) {
  /* console.log("listOfEntries => ", listOfEntries); */
  return {
    type: UPDATE_LIST_OF_ENTRIES,
    payload: listOfEntries,
  };
}

/**
 * Update the current popover element.
 * @param {Array} entrySubscribers The list of concerned subscribers
 * @returns {Action}
 */
export function actionUpdatePopoverSubscribers(entrySubscribers) {
  //console.log("entrySubscribers => ", entrySubscribers);
  return {
    type: UPDATE_POPOVER_SUBSCRIBERS,
    payload: entrySubscribers,
  };
}

/**
 * Update the current popover element.
 * @param {String} entryMemo Memo string.
 * @returns {Action}
 */
export function actionUpdatePopoverMemo(entryMemo) {
  //console.log("entryMemo => ", entryMemo);
  return {
    type: UPDATE_POPOVER_MEMO,
    payload: entryMemo,
  };
}

/**
 * Show/hide "add subscriber" modal.
 * @param {Boolean} isVisible Current display status of the modal
 * @returns {Action}
 */
export function actionUpdateVisibilityAddEntryModal(isVisible) {
  /* console.log("isVisible => ", isVisible); */
  return {
    type: UPDATE_VISIBILITY_ADD_ENTRY_MODAL,
    payload: isVisible,
  };
}

/**
 * Update all total rows of the debits part in the balance sheet section.
 * @param {Array} balanceSheetCreditRows The array of credit rows.
 * @returns {Action}
 */
export function actionUpdateBalanceSheetCreditRows(balanceSheetCreditRows) {
  /* console.log("balanceSheetCreditRows => ", balanceSheetCreditRows); */
  return {
    type: UPDATE_BALANCE_SHEET_CREDIT_ROWS,
    payload: balanceSheetCreditRows,
  };
}

/**
 * Update all total rows of the credits part in the balance sheet section.
 * @param {Array} balanceSheetDebitRows The array of debit rows.
 * @returns {Action}
 */
export function actionUpdateBalanceSheetDebitRows(balanceSheetDebitRows) {
  //console.log("balanceSheetDebitRows => ", balanceSheetDebitRows);
  return {
    type: UPDATE_BALANCE_SHEET_DEBIT_ROWS,
    payload: balanceSheetDebitRows,
  };
}
