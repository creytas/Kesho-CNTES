import * as Yup from "yup";
import { useState } from "react";
import Axios from "axios";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
// material
import {
  Link,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import { fakeAuth } from "../../../fakeAuth";

export default function LoginForm() {
  const [loadingButton, setLoadingButton] = useState(false);
  const [errorWord, setErrorWord] = useState(false);
  Axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/dashboard/app" } };
  const [showPassword, setShowPassword] = useState(false);
  const useStyles = makeStyles(() => ({
    root: {
      position: "absolute",
      left: "73%",
      // transform: 'translate(-50%,0)'
    },
    labelRoot: {
      "&&": {
        color: "red",
      },
    },
  }));
  const classes = useStyles();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Votre mail doit être valide")
      .required("Email requis"),
    password: Yup.string()
      .min(1, "Le mot de passe doit contenir au moins 8 caractères")
      .required("Mot de passe requis"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: ({ email, password }) => {
      setErrorWord(false);
      setLoadingButton(true);
      Axios.request({
        method: "POST",
        url: "https://kesho-api.herokuapp.com/auth/login",
        data: {
          email,
          password,
        },
      })
        .then((response) => {
          const { token, name, isAdmin, id_user, id, status } = response.data;
          localStorage.setItem("token", token);
          console.log(token);
          localStorage.setItem("name", name);
          localStorage.setItem("isAdmin", isAdmin);
          localStorage.setItem("id_user", id_user);
          localStorage.setItem("id", id);
          localStorage.setItem("status", status);
          setLoadingButton(false);
          fakeAuth.login(() => {
            navigate(from);
            navigate("/dashboard/app", { replace: true });
          });
        })
        .catch((err) => {
          console.log(err);
          setErrorWord(true);
          setLoadingButton(false);
        });
    },
  });
  const { errors, touched, getFieldProps } = formik;
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Adresse mail"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Mot de passe"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <Link
            component={RouterLink}
            variant="subtitle2"
            to="renitialiser_psw"
          >
            mot de passe oublié?
          </Link>
        </Stack>

        {errorWord ? (
          <span className={classes.labelRoot}>
            Adresse mail ou mot de passe incorrecte
          </span>
        ) : (
          ""
        )}
        <br />
        <br />

        <LoadingButton
          loading={loadingButton}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Connexion
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
