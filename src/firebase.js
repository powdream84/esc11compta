import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, deleteDoc, Timestamp, where } from "firebase/firestore";
import dayjs from "dayjs";

const firebaseConfig = {
  apiKey: "AIzaSyAxyWqi0rCe6x20of7fuecwu4GOngWAnUA",
  authDomain: "escxi-compta.firebaseapp.com",
  projectId: "escxi-compta",
  storageBucket: "escxi-compta.appspot.com",
  messagingSenderId: "637324334056",
  appId: "1:637324334056:web:58be5db8b98dc0bfbe4a5d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Log in.
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Log out.
const logout = () => {
  signOut(auth);
};

// Get the data of a given entry.
const fetchEntry = async (entryId, loadEntryData) => {
  //console.log("entryId => ", entryId);
  //console.log("loadEntryData => ", loadEntryData);
  if (!entryId) return;
  const snapshot = await getDoc(doc(db, "accounting_entries", entryId));
  let entryData = snapshot.data();
  loadEntryData(entryData);
};

// Get the data of all subscribers.
const fetchEntries = async (updateListOfEntries) => {
  let arrEntries = [];
  const querySnapshot = await getDocs(collection(db, "accounting_entries"));
  querySnapshot.forEach((doc) => {
    let obj = { ...doc.data(), id: doc.id };
    arrEntries.push(obj);
  });
  updateListOfEntries(arrEntries);
};

// Get the all the natures of accounting entries.
const fetchNatures = async (updateListOfNatures) => {
  let arrNatures = [];
  let querySnapshot = await getDocs(collection(db, "accounting_entries_natures/credits/natures"));
  querySnapshot.forEach((doc) => {
    let obj = { name: doc.data().name, type: "Crédit" };
    arrNatures.push(obj);
  });
  querySnapshot = await getDocs(collection(db, "accounting_entries_natures/debits/natures"));
  querySnapshot.forEach((doc) => {
    let obj = { name: doc.data().name, type: "Débit" };
    arrNatures.push(obj);
  });
  updateListOfNatures(arrNatures);
  return arrNatures;
};

// Get the list of all payment methods.
const fetchPaymentMethods = async (updateListOfPaymentMethods) => {
  let arrPaymentMethods = [];
  const querySnapshot = await getDocs(collection(db, "payment_methods"));
  querySnapshot.forEach((doc) => {
    let obj = { ...doc.data(), id: doc.id };
    arrPaymentMethods.push(obj);
  });
  updateListOfPaymentMethods(arrPaymentMethods);
};

// Get the list of all subscribers.
const fetchSubscribers = async (updateListOfSubscribers) => {
  let arrSubscribers = [];
  const querySnapshot = await getDocs(collection(db, "subscribers"));
  querySnapshot.forEach((doc) => {
    let obj = { ...doc.data(), id: doc.id };
    arrSubscribers.push(obj);
  });
  updateListOfSubscribers(arrSubscribers);
};

// Add a new subscriber.
const addSubscriber = async (newSubscriberData, listOfSubscribers, updateListOfSubscribers, handleCloseModal, clearForm) => {
  let nextId = calcNextId(listOfSubscribers, "subscriber");
  await setDoc(doc(db, "subscribers", nextId), {
    firstName: newSubscriberData.firstName,
    name: newSubscriberData.name,
    sex: newSubscriberData.sex,
    dateOfBirth: newSubscriberData.dateOfBirth,
    phone: newSubscriberData.phone,
    email: newSubscriberData.email,
    licenceNumber: newSubscriberData.licenceNumber,
  });
  // Then clear form fields, close modal and refresh subscribers list.
  clearForm();
  handleCloseModal();
  updateListOfSubscribers([...listOfSubscribers, { ...newSubscriberData, id: nextId }]);
};

// Add a new entry.
const addEntry = async (newEntryData, listOfEntries, updateListOfEntries, handleCloseModal, clearForm) => {
  let nextId = calcNextId(listOfEntries, "entry");
  await setDoc(doc(db, "accounting_entries", nextId), {
    type: newEntryData.type,
    paymentMethod: newEntryData.paymentMethod,
    nature: newEntryData.nature,
    amount: newEntryData.amount,
    date: newEntryData.date,
    subscribers: newEntryData.subscribers,
    memo: newEntryData.memo,
  });
  // Then clear form fields, close modal and refresh subscribers list.
  clearForm();
  handleCloseModal();
  updateListOfEntries([...listOfEntries, { ...newEntryData, id: nextId }]);
};

// Edit the informations of a given entry.
const editEntry = async (updatedEntryData, listOfEntries, updateListOfEntries, handleCloseModal) => {
  //console.log("updatedEntryData => ", updatedEntryData);
  await updateDoc(doc(db, "accounting_entries", updatedEntryData.id), {
    type: updatedEntryData.type,
    paymentMethod: updatedEntryData.paymentMethod,
    nature: updatedEntryData.nature,
    amount: updatedEntryData.amount,
    date: updatedEntryData.date,
    subscribers: updatedEntryData.subscribers,
    memo: updatedEntryData.memo,
  });
  let updatedListOfEntries = listOfEntries.map((obj) => {
    if (obj.id === updatedEntryData.id) return updatedEntryData;
    else return obj;
  });
  // Then close modal with clearing edit form state and refresh entries list.
  handleCloseModal();
  updateListOfEntries(updatedListOfEntries);
};

// Edit the informations of a given subscriber.
const editSubscriber = async (updatedSubscriberData, listOfSubscribers, updateListOfSubscribers, handleCloseModal, clearForm) => {
  await updateDoc(doc(db, "subscribers", updatedSubscriberData.id), {
    firstName: updatedSubscriberData.firstName,
    name: updatedSubscriberData.name,
    sex: updatedSubscriberData.sex,
    dateOfBirth: updatedSubscriberData.dateOfBirth,
    phone: updatedSubscriberData.phone,
    email: updatedSubscriberData.email,
    licenceNumber: updatedSubscriberData.licenceNumber,
  });
  let updatedListOfSubscribers = listOfSubscribers.map((obj) => {
    if (obj.id === updatedSubscriberData.id) return updatedSubscriberData;
    else return obj;
  });
  // Then clear form fields, close modal and refresh subscribers list.
  clearForm();
  handleCloseModal();
  updateListOfSubscribers(updatedListOfSubscribers);
};

// Delete a subscriber.
const deleteSubscriber = async (subscriberId, listOfSubscribers, updateListOfSubscribers, handleCloseModal) => {
  await deleteDoc(doc(db, "subscribers", subscriberId));
  let newListOfSubscribers = listOfSubscribers.filter((obj) => {
    if (obj.id !== subscriberId) return obj;
  });
  updateListOfSubscribers(newListOfSubscribers);
  handleCloseModal();
};

// Delete an entry.
const deleteEntry = async (entryId, listOfEntries, updateListOfEntries, handleCloseModal) => {
  await deleteDoc(doc(db, "accounting_entries", entryId));
  let newListOfEntries = listOfEntries.filter((obj) => {
    if (obj.id !== entryId) return obj;
  });
  updateListOfEntries(newListOfEntries);
  handleCloseModal();
};

// Calculate the id of the next subscriber.
const calcNextId = (listOf, prefix) => {
  return (
    prefix +
    (
      Math.max.apply(
        Math,
        listOf.map((obj) => Number(obj.id.replace(prefix, "")))
      ) + 1
    ).toString()
  );
};

const formatToDate = (dateExpr) => {
  let dateDateFormat = dateExpr == null || dateExpr === "" ? "" : dateExpr.toDate();
  return dateDateFormat;
};

const formatToFirebaseTimestamp = (dateExpr) => {
  let dateTimestampFormat;
  if (dateExpr == null || dateExpr === "") dateTimestampFormat = "";
  else if (dayjs(dateExpr).isValid()) dateTimestampFormat = Timestamp.fromDate(new Date(dateExpr));
  else if (!dayjs(dateExpr).isValid()) dateTimestampFormat = dateExpr;
  return dateTimestampFormat;
};

export {
  auth,
  db,
  addEntry,
  addSubscriber,
  editEntry,
  editSubscriber,
  deleteEntry,
  deleteSubscriber,
  fetchEntry,
  fetchEntries,
  fetchNatures,
  fetchPaymentMethods,
  fetchSubscribers,
  formatToFirebaseTimestamp,
  formatToDate,
  logInWithEmailAndPassword,
  logout,
};
