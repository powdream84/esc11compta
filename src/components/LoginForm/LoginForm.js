import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionUpdateConnectionStatus, actionUpdateInputValue } from "../../actions/actionsLogin";
import { auth, logInWithEmailAndPassword } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

/* Components MUI */
import { Button, Grid, TextField, Typography } from "@mui/material";

/* Components custom */

/* Style */
import { colors } from "../../style";
import { styleSubmitButton } from "../../style";

/* Definition */
const LoginForm = () => {
  const navigate = useNavigate();

  // Current state values
  const inputValueEmail = useSelector((state) => state.login.inputValueEmail);
  const inputValuePassword = useSelector((state) => state.login.inputValuePassword);
  const [user, loading, error] = useAuthState(auth);

  // Edit state values
  const dispatch = useDispatch();

  const handleChangeInputEmail = (e) => {
    dispatch(actionUpdateInputValue("Email", e.target.value));
  };
  const handleChangeInputPassword = (e) => {
    dispatch(actionUpdateInputValue("Password", e.target.value));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    logInWithEmailAndPassword(inputValueEmail, inputValuePassword);
  };
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      dispatch(actionUpdateConnectionStatus(true));
      dispatch(actionUpdateInputValue("Email", ""));
      dispatch(actionUpdateInputValue("Password", ""));
      navigate("/home");
    }
  }, [user, loading]);
  return (
    <Grid
      container
      sx={{
        margin: "3rem",
        minHeight: "80vh",
        alignItems: "center",
      }}
    >
      {/* TITLE COMPONENT ZONE */}
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: colors.mainRed,
          mb: "2rem",
          pl: "1rem",
          pr: "1rem",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" gutterBottom component="div" sx={{ color: "#FFF" }}>
          ESCXI badminton
        </Typography>
        <Typography variant="h5" gutterBottom component="div" sx={{ color: "#FFF" }}>
          Compta
        </Typography>
      </Grid>
      {/* END TITLE COMPONENT ZONE */}
      {/* FORM ZONE */}
      <Grid item xs={12} component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          type="email"
          fullWidth
          label="Email"
          variant="outlined"
          sx={{ mb: "1rem" }}
          value={inputValueEmail}
          onChange={handleChangeInputEmail}
        />
        <TextField
          type="password"
          fullWidth
          label="Mot de passe"
          variant="outlined"
          sx={{ mb: "1rem" }}
          value={inputValuePassword}
          onChange={handleChangeInputPassword}
        />
        <Button
          type="submit"
          variant="outlined"
          fullWidth
          sx={{
            ...styleSubmitButton,
          }}
        >
          Connexion
        </Button>
      </Grid>
      {/* END FORM ZONE */}
    </Grid>
  );
};

export default LoginForm;
