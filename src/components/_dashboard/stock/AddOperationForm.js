import React from "react";
import { useState, useEffect } from "react";
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
  FormControlLabel,
  Checkbox,
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
  ///matiere/CNTES/all
  // const produits = [
  //   { id_produit: 1, libelle_produit: "soja" },
  //   { id_produit: 2, libelle_produit: "maïs" },
  //   { id_produit: 3, libelle_produit: "sorgho" },
  //   { id_produit: 4, libelle_produit: "extrait foliaire" },
  //   { id_produit: 5, libelle_produit: "sucre" },
  //   { id_produit: 6, libelle_produit: "briquette energetique" },
  //   { id_produit: 7, libelle_produit: "huiles" },
  //   { id_produit: 8, libelle_produit: "savon" },
  // ];

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

  const [matieres, setMatieres] = useState([]);
  const [operation, setOperation] = useState([]);

  const getMatieres = `https://kesho-api.herokuapp.com/matiere/CNTES/all`;

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    fetch(getMatieres, options)
      .then((response) => response.json())
      .then((data) => {
        setMatieres(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [loader, setLoader] = useState(false);

  const RegisterSchema = Yup.object().shape({
    dateOperation: Yup.date().required("Date requise"),
    operations: Yup.array().required(),
    typeOperation: Yup.string().required("type d'operation requis"),
    commentaire: Yup.string().required("Justifiez l'operation"),
  });

  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/dashboard/app" } };
  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      dateOperation: "",
      operations: [],
      typeOperation: "",
      commentaire: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (
      { dateOperation, operations, typeOperation, commentaire },
      event
    ) => {
      setLoader(true);
      Axios.post(
        `https://kesho-api.herokuapp.com/operation`,
        {
          date_operation: dateOperation,
          matieres: operations,
          type_operation: typeOperation,
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
          console.log(message);
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
  } = formik;
  const handleChangeDateOperation = (event) => {
    const { value } = event.target;
    setFieldValue("dateOperation", value);
  };

  //console.log(operation);
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
              value={values.typeOperation}
              {...getFieldProps("typeOperation")}
              error={Boolean(touched.typeOperation && errors.typeOperation)}
            >
              <option value="" selected disabled hidden>
                Type operation {console.log(values.typeOperation)}
              </option>
              <option value="entrée">Entrée</option>
              <option value="sortie">Sortie</option>
            </Select>
            {matieres.map((matiere) => (
              <Material
                id={matiere.id}
                libelle_matiere={matiere.libelle_matiere}
                handleChange={(event) => {
                  const { value } = event.target;
                  const mat = {
                    id: matiere.id,
                    qte_operation: value,
                  };
                  setOperation([...operation, mat]);
                  setFieldValue("operations", operation);
                  console.log(operation);
                }}
              />
            ))}
            <TextField
              fullWidth
              label="Raison"
              {...getFieldProps("commentaire")}
              error={Boolean(touched.commentaire && errors.commentaire)}
              helperText={touched.commentaire && errors.commentaire}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Confirmez-vous cette operation"
            />
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
