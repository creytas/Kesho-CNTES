import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Stack, TextField, Button } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import Axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Div = styled('div')(() => ({
  // textAlign: 'center',
  width: '100%',
  // border: '1px solid black',
  position: 'relative',
  left: '50%',
  transform: 'translate(-50%,0)',
  paddingLeft: '60%'
}));
export default function FortgoPasswordForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [errorWord, setErrorWord] = useState(false);

  const LoginSchema = Yup.object().shape({
    myEmail: Yup.string().email('Votre mail doit être valide').required('Email requis')
    // firstName: Yup.string().required('Prénom requis'),
    // lastName: Yup.string().required('Nom requis')
  });
  const formik = useFormik({
    initialValues: {
      myEmail: ''
      // firstName: '',
      // lastName: ''
    },
    validationSchema: LoginSchema,
    onSubmit: ({ myEmail }) => {
      setLoading(true);
      setErrorWord(false);
      Axios.post(`https://kesho-congo-api.herokuapp.com/user/reset`, {
        // nom_user: lastName,
        // prenom_user: firstName,
        email: myEmail
      })
        .then((response) => {
          setLoading(false);
          setOpen(true);
          setUserEmail(response.data.email);
        })
        .catch(() => {
          setLoading(false);
          setErrorWord(true);
        });
    }
  });
  const { errors, touched, getFieldProps, values, handleSubmit, handleChange } = formik;
  const handleClose = () => {
    setOpen(false);
  };
  const useStyles = makeStyles(() => ({
    root: {
      position: 'absolute',
      left: '73%'
      // transform: 'translate(-50%,0)'
    },
    labelRoot: {
      '&&': {
        color: 'red'
      }
    },
    label: {
      fontWeight: 'bold'
    }
  }));
  const classes = useStyles();

  return (
    <>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="username"
              label="Adresse mail"
              value={values.myEmail}
              onChange={handleChange}
              {...getFieldProps('myEmail')}
              error={Boolean(touched.myEmail && errors.myEmail)}
              helperText={touched.myEmail && errors.myEmail}
            />
          </Stack>
          {errorWord ? (
            <>
              {/* <br /> */}
              <span className={classes.labelRoot}>Adresse mail incorrecte</span>
            </>
          ) : (
            ''
          )}

          <Div>
            <LoadingButton size="large" component={RouterLink} to="/" sx={{ marginTop: 5 }}>
              Annuler
            </LoadingButton>
            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              loading={loading}
              sx={{ marginTop: 5 }}
            >
              Réinitialiser
            </LoadingButton>
          </Div>
        </Form>
      </FormikProvider>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Réinitialisation du mot de passe</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Un mail vous a été envoyé avec votre nouveau mot de passe à{' '}
            <span className={classes.label}>{userEmail}</span>. Connectez-vous avec votre nouveau
            mot de passe
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" component={RouterLink} to="/">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
