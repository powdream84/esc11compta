import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntries, fetchNatures } from "../../firebase";
import { actionLoadListOfNatures, actionUpdateListOfEntries } from "../../actions/actionsTreasury";

/* Components MUI */
import { Grid } from "@mui/material";

/* Components custom */

import LoginForm from "../LoginForm/LoginForm";
import HomePage from "../HomePage/HomePage";
import SubscribersPage from "../SubscribersPage/SubscribersPage";
import TreasuryPage from "../TreasuryPage/TreasuryPage";
import BalanceSheetPage from "../BalanceSheetPage/BalanceSheetPage";

/* Definition */
const App = () => {
  // Current state values
  const isConnected = useSelector((state) => state.login.isConnected);

  // Edit state values
  const dispatch = useDispatch();
  const loadListOfNatures = (listOfNatures) => dispatch(actionLoadListOfNatures(listOfNatures));
  const updateListOfEntries = (entries) => dispatch(actionUpdateListOfEntries(entries));

  useEffect(() => {
    if (isConnected) {
      fetchNatures(loadListOfNatures);
      fetchEntries(updateListOfEntries);
    }
  }, [isConnected]);

  return (
    <Grid container>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/subscribers" element={<SubscribersPage />} />
        <Route path="/treasury" element={<TreasuryPage />} />
        <Route path="/balance_sheet" element={<BalanceSheetPage />} />
      </Routes>
    </Grid>
  );
};

export default App;
