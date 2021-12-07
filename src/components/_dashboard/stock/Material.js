import { useState } from "react";

import {
  Stack,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { name } from "faker/locale/de_AT";

export default function Material({ id_produit, libelle_produit }) {
  const [enable, setEnable] = useState(true);
  const [matieres, setMatieres] = useState([]);

  const RegisterSchema = Yup.object().shape({
    qte_produit: Yup.number(),
    id_produit: Yup.number(),
  });
  const handleChangeCheck = () => {
    console.log("true");
    setEnable(!enable);
  };

  const handleChangeTextField = () => {
    console.log("textfield");
  };

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{ width: "100%", display: "flex", alignItems: "center" }}
        spacing={1}
      >
        {" "}
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleChangeCheck}
              name={`id_` + id_produit}
              value={id_produit}
            />
          }
          label={libelle_produit}
        />
        <TextField
          fullWidth
          label="Quantite"
          onChange={handleChangeTextField}
          name={`qte_` + id_produit}
          disabled={enable}
          // error={Boolean(touched.quantite && errors.quantite)}
          // helperText={touched.quantite && errors.quantite}
        />
      </Stack>
    </>
  );
}
