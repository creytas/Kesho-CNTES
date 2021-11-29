import { useState } from "react";
import password from "secure-random-password";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { styled } from "@material-ui/core/styles";
import { useFormik, Form, FormikProvider } from "formik";
import Axios from "axios";
// material
import Select from "@material-ui/core/Select";
import {
  Radio,
  Stack,
  TextField,
  // IconButton,
  FormLabel,
  RadioGroup,
  // InputAdornment,
  FormControlLabel,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import { fakeAuth } from "../../../fakeAuth";

const Box = styled("div")(() => ({
  width: "100%",
  textAlign: "center",
  position: "relative",
  left: "125%",
  transform: "translate(-50%,0)",
}));

export default function AddOperationForm() {
  const useStyles = makeStyles(() => ({
    labelRoot: {
      "&&": {
        color: "red",
      },
    },
  }));
  const classes = useStyles();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  const RegisterSchema = Yup.object().shape({
    dateOperation: Yup.date().required("Date requise"),
    matiere: Yup.string().required(),
    typeOperation: Yup.string().required("type d'operation requis"),
    quantite: Yup.number().required(),
    commentaire: Yup.string().required("Justifiez l'operation"),
  });

  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/dashboard/app" } };
  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      dateOperation: "",
      matiere: "",
      typeOperation: "",
      quantite: 0,
      commentaire: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: ({
      dateOperation,
      matiere,
      typeOperation,
      quantite,
      commentaire,
    }) => {
      setLoader(true);
      Axios.post(
        `https://kesho-congo-api.herokuapp.com/stock/operation`,
        {
          dateOperation: dateOperation,
          matiere: matiere,
          typeOperation: typeOperation,
          quantite: quantite,
          commentaire: commentaire,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((response) => {
          setLoader(false);
          const message = response.data;
          console.log("Yves", message);
          fakeAuth.login(() => {
            navigate(from);
            navigate("/dashboard/stock", { replace: true });
          });
        })
        .catch((err) => {
          setError(true);
          setLoader(false);
          console.log(err);
        });
    },
  });
  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    values,
    handleChange,
  } = formik;
  const handleChangeDateOperation = (event) => {
    const { value } = event.target;
    console.log(value);
    setFieldValue("dateOperation", value);
  };

  return (
    <FormikProvider value={formik}>
      <Box>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              sx={{ padding: "2px" }}
              type="date"
              // fullWidth
              label="Date operation"
              InputLabelProps={{
                shrink: true,
              }}
              value={values.dateOperation}
              onChange={handleChangeDateOperation}
              //  {...getFieldProps('dateOperation')}
              helperText={touched.dateOperation && errors.dateOperation}
              error={Boolean(touched.dateOperation && errors.dateOperation)}
            />
            <TextField
              fullWidth
              label="Nom"
              value={values.lastName}
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />

            <TextField
              fullWidth
              label="Post-nom"
              {...getFieldProps("middleName")}
              error={Boolean(touched.middleName && errors.middleName)}
              helperText={touched.middleName && errors.middleName}
            />
            <RadioGroup
              {...getFieldProps("sex")}
              error={Boolean(touched.sex && errors.sex)}
              value={values.sex}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{ display: "flex", alignItems: "center" }}
                spacing={1}
              >
                <FormLabel component="label">Sexe:</FormLabel>
                <FormControlLabel value="M" control={<Radio />} label="M" />
                <FormControlLabel value="F" control={<Radio />} label="F" />
              </Stack>
            </RadioGroup>
            <Select
              native
              value={values.status}
              {...getFieldProps("status")}
              error={Boolean(touched.status && errors.status)}
            >
              <option value="" selected disabled hidden>
                Statut
              </option>
              <option value="Médecin">Médecin</option>
              <option value="Infirmier">Infirmier</option>
              <option value="Nutritionniste">Nutritionniste</option>
            </Select>

            <TextField
              fullWidth
              autoComplete="Email"
              type="email"
              label="Email "
              {...getFieldProps("myEmail")}
              error={Boolean(touched.myEmail && errors.myEmail)}
              helperText={touched.myEmail && errors.myEmail}
            />
            <TextField
              fullWidth
              label="Mot de passe"
              value={values.myPassword}
              onChange={handleChange}
              {...getFieldProps("myPassword")}
              error={Boolean(touched.myPassword && errors.myPassword)}
              helperText={touched.myPassword && errors.myPassword}
            />
            <RadioGroup
              {...getFieldProps("isAdmin")}
              error={Boolean(touched.isAdmin && errors.isAdmin)}
              value={values.isAdmin}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{ display: "flex", alignItems: "center" }}
                spacing={1}
              >
                <FormLabel component="label">Admin:</FormLabel>
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Oui"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="Non"
                />
              </Stack>
            </RadioGroup>

            {error ? (
              <span className={classes.labelRoot}>
                Cet adresse mail existe, veuillez entrer un autre adresse mail
              </span>
            ) : (
              ""
            )}

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={loader}
            >
              Créer
            </LoadingButton>
          </Stack>
        </Form>
      </Box>
    </FormikProvider>
  );
}
