import React from "react";
import { useState } from "react";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { styled } from "@material-ui/core/styles";
import { useFormik, Form, FormikProvider } from "formik";
import Axios from "axios";
import Material from "./Material";
// material
import {
 Stack,
  TextField,
  Select,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
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
  const produits = [
    { id_produit: 1, nom_produit: "soja" },
    { id_produit: 2, nom_produit: "mais" },
    { id_produit: 3, nom_produit: "sorgho" },
    { id_produit: 4, nom_produit: "extrait foliaire" },
    { id_produit: 5, nom_produit: "sucre" },
    { id_produit: 6, nom_produit: "briquette energetique" },
    { id_produit: 7, nom_produit: "huiles" },
    { id_produit: 8, nom_produit: "savon" },
  ];
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
    matiere: Yup.array().required(),
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
          date_operation: dateOperation,
          matiere_id: matiere,
          type_operation: typeOperation,
          qte_operation: quantite,
          commentaire_operation: commentaire,
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
            />{" "}
            <Select
              native
              value={values.status}
              {...getFieldProps("status")}
              error={Boolean(touched.status && errors.status)}
            >
              <option value="" selected disabled hidden>
                Type operation
              </option>
              <option value="Entrée">Entrée</option>
              <option value="Sortie">Sortie</option>
            </Select>
            <TextField
              fullWidth
              label="Raison"
              {...getFieldProps("middleName")}
              error={Boolean(touched.middleName && errors.middleName)}
              helperText={touched.middleName && errors.middleName}
            />
            <Material produits={produits} />
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
