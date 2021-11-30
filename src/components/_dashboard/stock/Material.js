import { useState } from "react";

import {
  Radio,
  Stack,
  TextField,
  Select,
  FormLabel,
  RadioGroup,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { name } from "faker/locale/de_AT";

export default function Material({ produits }) {
  console.log(produits);
  const { produit, setProduit } = useState([]);

  const RegisterSchema = Yup.object().shape({
    quantite: Yup.number(),
  });
  const handleChangeCheck = () => {
    console.log("true");
  };

  const handleChangeTextField = () => {
    console.log("textfield");
  };

  return (
    <>
      {produits.map((produit) => {
        return (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{ display: "flex", alignItems: "center" }}
            spacing={1}
          >
            {" "}
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleChangeCheck}
                  name={`id_` + produit.id_produit}
                  value={produit.id_produit}
                />
              }
              label={produit.nom_produit}
            />
            <TextField
              fullWidth
              label="Quantite"
              onChange={handleChangeTextField}
              name={`qte_` + produit.id_produit}
              // error={Boolean(touched.quantite && errors.quantite)}
              // helperText={touched.quantite && errors.quantite}
            />
          </Stack>
        );
      })}
    </>
  );
}
