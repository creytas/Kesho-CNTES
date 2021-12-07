import { useEffect, useState } from 'react';
import { Icon } from "@iconify/react";
import { styled } from '@material-ui/core/styles';
import { Navigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { Typography, Grid, Button } from '@material-ui/core';
import Page from '../components/Page';
import { PersonnelAddForm } from '../components/_dashboard/personnel';

const Box = styled('div')(() => ({
  width: '100%',
  textAlign: 'center',
  position: 'relative',
  left: '50%',
  transform: 'translate(-50%,0)'
}));

const Div = styled('div')(() => ({
  border: '0.5px solid lightgrey',
  height: 'auto',
  width: '85%',
  position: 'relative',
  borderRadius: '15px',
  paddingTop: '30px',
  paddingBottom: '80px',
  left: '50%',
  transform: 'translate(-50%,0)'
}));

export default function NewPatient() {
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(localStorage.getItem('token'));
  useEffect(() => {
    setIsAuth(isAuth);
  }, [isAuth]);
  return isAuth ? (
    <Page>
      <Div sx={{ px: `10px` }}>
      <Button
          variant="outlined"
          component={RouterLink}
          to="/dashboard/personnel"
          startIcon={<Icon icon="bx:bx-arrow-back" />}
        >
          Retour
        </Button>
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Créer Utilisateur</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={5}>
            <PersonnelAddForm />
          </Grid>
        </Grid>
      </Div>
    </Page>
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
}
