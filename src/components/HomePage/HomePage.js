/* Components MUI */
import { Grid } from "@mui/material";

/* Components custom */
import NavBar from "../NavBar/NavBar";

/* Definition */
const HomePage = () => {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ mb: "1rem" }}>
        <NavBar />
      </Grid>
    </Grid>
  );
};

export default HomePage;
