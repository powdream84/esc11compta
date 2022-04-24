export const validateType = (inputValueType) => ["Crédit", "Débit"].indexOf(inputValueType) > -1;
export const validatePaymentMethod = (listOfPaymentMethods, inputValuePaymentMethod) => {
  let isValid = false;
  listOfPaymentMethods.forEach((obj, key) => {
    if (obj.name === inputValuePaymentMethod) {
      isValid = true;
    }
  });
  return isValid;
};
export const validateNature = (listOfNatures, inputValueNature) => {
  let isValid = false;
  listOfNatures.forEach((obj, key) => {
    if (obj.name === inputValueNature) {
      isValid = true;
    }
  });
  return isValid;
};
export const validateAmount = (inputAmount) => !isNaN(inputAmount);
export const validateDate = (inputDate) => {
  var date = new Date(inputDate);
  if (date instanceof Date && !isNaN(date)) return true;
  else return false;
};
export const validateMemo = (memo) => typeof memo === "string";
