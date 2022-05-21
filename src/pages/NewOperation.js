import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { styled } from "@material-ui/core/styles";
import { Navigate, useLocation, Link as RouterLink } from "react-router-dom";
import { Typography, Grid, Button } from "@material-ui/core";
import Page from "../components/Page";
import AddOperationForm from "src/components/_dashboard/stock/AddOperationForm";

const Box = styled("div")(() => ({
  width: "100%",
  textAlign: "center",
  position: "relative",
  left: "50%",
  transform: "translate(-50%,0)",
}));

const Div = styled("div")(() => ({
  border: "0.5px solid lightgrey",
  height: "auto",
  width: "85%",
  position: "relative",
  borderRadius: "15px",
  paddingTop: "30px",
  paddingBottom: "80px",
  left: "50%",
  transform: "translate(-50%,0)",
}));

export default function NewOperation() {
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));
  useEffect(() => {
    setIsAuth(isAuth);
  }, [isAuth]);
  return isAuth ? (
    <Page>
      <Div sx={{ px: `10px` }}>
        <Button
          variant="outlined"
          component={RouterLink}
          to="/dashboard/stock"
          startIcon={<Icon icon="bx:bx-arrow-back" />}
        >
          Retour
        </Button>
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Nouvelle opération</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={5}>
            <AddOperationForm />
          </Grid>
        </Grid>
      </Div>
    </Page>
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
}
