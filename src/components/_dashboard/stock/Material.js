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

export default function Material({ id, libelle_matiere, handleChange }) {
  const [enable, setEnable] = useState(true);
  const [matieres, setMatieres] = useState([]);

  const RegisterSchema = Yup.object().shape({
    qte_operation: Yup.number(),
    id: Yup.number(),
  });
  const handleChangeCheck = () => {
    setEnable(!enable);
  };

  // const handleChangeTextField = () => {
  //   console.log("textfield");
  //   const matiere = {
  //     id: id.value,
  //     qte_operation: TextField.value,
  //   };

  //   setMatieres(matiere);
  // };

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
            <Checkbox onChange={handleChangeCheck} name="id" value={id} />
          }
          label={libelle_matiere}
        />
        <TextField
          fullWidth
          label="Quantité"
          name="qte_operation"
          disabled={enable}
          onBlur={handleChange}
          // error={Boolean(touched.quantite && errors.quantite)}
          // helperText={touched.quantite && errors.quantite}
        />
      </Stack>
    </>
  );
}
