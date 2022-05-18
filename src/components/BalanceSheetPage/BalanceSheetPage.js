import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionUpdateBalanceSheetDebitRows,
  actionUpdateBalanceSheetCreditRows,
  actionUpdateCreditsTotal,
  actionUpdateDebitsTotal,
} from "../../actions/actionsTreasury";

/* Components MUI */
import { Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from "@mui/material";

/* Components custom */
import NavBar from "../NavBar/NavBar";

/* Style */
import { colors } from "../../style";

/* Definition */
const BalanceSheetPage = () => {
  // Current state values
  const creditRows = useSelector((state) => state.treasury.balanceSheetCreditRows);
  const debitRows = useSelector((state) => state.treasury.balanceSheetDebitRows);
  const creditsTotal = useSelector((state) => state.treasury.creditsTotal.toFixed(2));
  const debitsTotal = useSelector((state) => state.treasury.debitsTotal.toFixed(2));
  const listOfNatures = useSelector((state) => state.treasury.listOfNatures);
  const listOfEntries = useSelector((state) => state.treasury.listOfEntries);

  // Edit state values
  const dispatch = useDispatch();
  const updateBalanceSheetCreditRows = (balanceSheetCreditRows) => dispatch(actionUpdateBalanceSheetCreditRows(balanceSheetCreditRows));
  const updateBalanceSheetDebitRows = (balanceSheetDebitRows) => dispatch(actionUpdateBalanceSheetDebitRows(balanceSheetDebitRows));
  const updateCreditsTotal = (creditsTotal) => dispatch(actionUpdateCreditsTotal(creditsTotal));
  const updateDebitsTotal = (debitsTotal) => dispatch(actionUpdateDebitsTotal(debitsTotal));

  // Get all totals of all accounting entries grouped by natures for credit type.
  const getCreditRows = () => {
    let creditsNatures = listOfNatures.filter((obj) => {
      if (obj.type === "Crédit") return obj;
    });
    let arrCredits = [];
    creditsNatures.forEach((obj, index) => {
      let row = { key: `creditNature${index}`, nature: obj.name, count: 0, total: 0 };
      let total = 0;
      let count = 0;
      for (let i = 0; i < listOfEntries.length; i++) {
        if (listOfEntries[i].nature === obj.name) {
          count++;
          total += Number(listOfEntries[i].amount);
        }
      }
      row.count = count;
      row.total = total.toFixed(2);
      arrCredits.push(row);
    });
    updateBalanceSheetCreditRows(arrCredits);
  };

  // Get all totals of all accounting entries grouped by natures for credit type.
  const getDebitRows = () => {
    let debitsNatures = listOfNatures.filter((obj) => {
      if (obj.type === "Débit") return obj;
    });
    let arrDebits = [];
    debitsNatures.forEach((obj, index) => {
      let row = { key: `debitNature${index}`, nature: obj.name, count: 0, total: 0 };
      let total = 0;
      let count = 0;
      for (let i = 0; i < listOfEntries.length; i++) {
        if (listOfEntries[i].nature === obj.name) {
          count++;
          total += Number(listOfEntries[i].amount);
          row.total.toFixed(2);
        }
      }
      row.count = count;
      row.total = total.toFixed(2);
      arrDebits.push(row);
    });
    updateBalanceSheetDebitRows(arrDebits);
  };

  // Calculate the total of all credits categories.
  const getTotalCredits = () => {
    let superTotal = 0;
    for (let i = 0; i < listOfEntries.length; i++) {
      if (listOfEntries[i].type === "Crédit") {
        superTotal += Number(listOfEntries[i].amount);
      }
    }
    updateCreditsTotal(superTotal);
  };

  // Calculate the total of all debits categories.
  const getTotalDebits = () => {
    let superTotal = 0;
    for (let i = 0; i < listOfEntries.length; i++) {
      if (listOfEntries[i].type === "Débit") {
        superTotal += Number(listOfEntries[i].amount);
      }
    }
    updateDebitsTotal(superTotal);
  };

  useEffect(() => {
    getCreditRows();
    getDebitRows();
    getTotalCredits();
    getTotalDebits();
  }, []);

  return (
    <Grid container sx={{ justifyContent: "space-around" }}>
      <Grid item xs={12} sx={{ mb: "5rem" }}>
        <NavBar />
      </Grid>
      <Grid item xs={11} sm={7} sx={{ mb: "5rem" }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={3}
                  align="center"
                  sx={{ backgroundColor: colors.creditsGreen, color: "#FFF", fontSize: "1.5rem", fontWeight: "bold" }}
                >
                  Crédits
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" sx={{ width: "40%", fontWeight: "bold" }}>
                  Nature
                </TableCell>
                <TableCell align="right" sx={{ width: "30%", fontWeight: "bold" }}>
                  Nombre d'opérations
                </TableCell>
                <TableCell align="right" sx={{ width: "30%", fontWeight: "bold" }}>
                  Sous-total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {creditRows.map((row) => (
                <TableRow key={row.key} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.nature}
                  </TableCell>
                  <TableCell align="right">{row.count}</TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                </TableRow>
              ))}
              <TableRow key="creditsTotal" sx={{ backgroundColor: colors.lightGrey, "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row" align="right" sx={{ fontWeight: "bold" }}>
                  Total
                </TableCell>
                <TableCell colSpan={2} align="right">
                  {creditsTotal}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={11} sm={7} sx={{ mb: "5rem" }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow align="center">
                <TableCell colSpan={3} align="center" sx={{ backgroundColor: colors.mainRed, color: "#FFF", fontSize: "1.5rem", fontWeight: "bold" }}>
                  Débits
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" sx={{ width: "40%", fontWeight: "bold" }}>
                  Nature
                </TableCell>
                <TableCell align="right" sx={{ width: "30%", fontWeight: "bold" }}>
                  Nombre d'opérations
                </TableCell>
                <TableCell align="right" sx={{ width: "30%", fontWeight: "bold" }}>
                  Sous-total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {debitRows.map((row) => (
                <TableRow key={row.key} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.nature}
                  </TableCell>
                  <TableCell align="right">{row.count}</TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                </TableRow>
              ))}
              <TableRow key="debitsTotal" sx={{ backgroundColor: colors.lightGrey, "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row" align="right" sx={{ fontWeight: "bold" }}>
                  Total
                </TableCell>
                <TableCell colSpan={2} align="right">
                  {debitsTotal}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default BalanceSheetPage;
