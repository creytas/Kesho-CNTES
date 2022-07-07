import * as Yup from "yup";
import propTypes from "prop-types";
import { useState, useEffect } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import {
  Stack,
  TextField,
  TextareaAutosize,
  Avatar,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Grid,
  Select,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import style from "./patient.module.css";

// ----------------------------------------------------------------------
CliniqueForm.propTypes = {
  NextStep: propTypes.func,
  PrevStep: propTypes.func,
  DataPatient: propTypes.object,
  SetDataPatient: propTypes.func,
  patientClinicForm: propTypes.any,
};

export default function CliniqueForm({
  NextStep,
  PrevStep,
  DataPatient,
  SetDataPatient,
  patientClinicForm,
}) {
  const [oedeme, setOedeme] = useState(false);
  const [traitementNutri, setTraitementNutri] = useState(false);
  const [url, setUrl] = useState("");

  const [position] = useState(0);

  useEffect(() => {
    window.scroll(position, position);
  }, [position]);

  const date = new Date();
  const RegisterSchema = Yup.object().shape({
    firstPicture: Yup.string(),
    commentaires: Yup.string(),
    rationSeche: Yup.boolean(),
    typeOedeme: Yup.string(),
    hemoglobine: Yup.number(),
    hematocrite: Yup.number(),
    taille: Yup.number("Un chiffre requis")
      .positive("La valeur doit être positive")
      .min(1, "Taille minimum 1 Cm")
      .max(400, "Taille maximum 400 Cm")
      .required("Taille requis"),
    poidsActuel: Yup.number("Il ne doit contenir que de chiffre")
      .min(2, "Minimun 2 Kg")
      .positive("Le nombre doit être positive")
      .required("Poids requis"),
    perimetreCranien: Yup.number("un chiffre requis").max(
      10000,
      "Maximum 10000 Cm"
    ),
    perimetreBrachail: Yup.number("un chiffre requis")
      .positive()
      .min(5, "Minimum 5")
      .max(100)
      .required("Perimetre brachial requis"),
    typeMalnutrition: Yup.string()
      .trim()
      .min(2, "Minimum 2 caractère")
      .required("requis"),
    traitementNutritionnel: Yup.string().trim().min(2, "Minimum 2 caractère"),
    traitementNutritionnelAutre: Yup.string().min(5).trim(),
  });
  const formik = useFormik({
    initialValues: {
      firstPicture: patientClinicForm.firstPicture
        ? patientClinicForm.firstPicture
        : "",
      commentaires: patientClinicForm.commentaires
        ? patientClinicForm.commentaires
        : "",
      rationSeche: patientClinicForm.rationSeche
        ? patientClinicForm.rationSeche
        : "false",
      typeOedeme: patientClinicForm.typeOedeme
        ? patientClinicForm.typeOedeme
        : "",
      hemoglobine: patientClinicForm.hemoglobine
        ? patientClinicForm.hemoglobine
        : "",
      hematocrite: patientClinicForm.hematocrite
        ? patientClinicForm.hematocrite
        : "",
      taille: patientClinicForm.taille ? patientClinicForm.taille : "",
      poidsActuel: patientClinicForm.poidsActuel
        ? patientClinicForm.poidsActuel
        : "",
      perimetreCranien: patientClinicForm.perimetreCranien
        ? patientClinicForm.perimetreCranien
        : "",
      traitementNutritionnelAutre: patientClinicForm.traitementNutritionnelAutre
        ? patientClinicForm.traitementNutritionnelAutre
        : "",
      traitementNutritionnel: patientClinicForm.traitementNutritionnel
        ? patientClinicForm.traitementNutritionnel
        : "",
      perimetreBrachail: patientClinicForm.perimetreBrachail
        ? patientClinicForm.perimetreBrachail
        : "",
      typeMalnutrition: patientClinicForm.typeMalnutrition
        ? patientClinicForm.typeMalnutrition
        : "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (clinic) => {
      // const { fistNamePatient, NomPatient } = clinic;  clinic.allaitementExclusifSixMois === false && clinic.ageFinAllaitement === ''

      try {
        clinic.pictureUploaded = url;
        if (
          clinic.traitementNutritionnel === "Autres" &&
          clinic.traitementNutritionnelAutre === ""
        ) {
          throw alert("Veuillez preciser le traitement nutritionnel reçus");
        }
        SetDataPatient((current) => ({ ...current, clinic }));
        NextStep();
      } catch (e) {
        console.log(e);
      }
    },
  });
  const { errors, setFieldValue, touched, values, handleSubmit, isSubmitting } =
    formik;
  const handleChangeCommentaires = (event) => {
    const { value } = event.target;
    setFieldValue("commentaires", value);
    patientClinicForm.setCommentaires(value);
  };

  const handleChangeTraitementNutritionnel = (event) => {
    const { value } = event.target;
    setFieldValue("traitementNutritionnel", value);
    patientClinicForm.setTraitementNutritionnel(value);
    if (value === "Autres") {
      setTraitementNutri(false);
    } else {
      setTraitementNutri(true);
    }
  };
  const handleChangePerimetreBrachail = (event) => {
    const { value } = event.target;
    setFieldValue("perimetreBrachail", value);
    patientClinicForm.setPerimetreBrachail(value);
  };
  const handleChangePerimetreCranien = (event) => {
    const { value } = event.target;
    setFieldValue("perimetreCranien", value);
    patientClinicForm.setPerimetreCranien(value);
  };
  const handleChangePoidsActuel = (event) => {
    const { value } = event.target;
    setFieldValue("poidsActuel", value);
    patientClinicForm.setPoidsActuel(value);
  };
  const handleChangeTaille = (event) => {
    const { value } = event.target;
    setFieldValue("taille", value);
    patientClinicForm.setTaille(value);
  };
  const handleChangeNutritionnelAutre = (event) => {
    const { value } = event.target;
    setFieldValue("traitementNutritionnelAutre", value);
    patientClinicForm.setTraitementNutritionnelAutre(value);
  };
  const handleChangeTypeOedeme = (event) => {
    const { value } = event.target;
    setFieldValue("typeOedeme", value);
    patientClinicForm.setTypeOedeme(value);
  };
  const handleChangeHb = (event) => {
    const { value } = event.target;
    setFieldValue("hemoglobine");
    patientClinicForm.setHemoglobine(value);
  };
  const handleChangeHt = (event) => {
    const { value } = event.target;
    setFieldValue("hematocrite");
    patientClinicForm.setHematocrite(value);
  };
  const handleChangeRationPatient = (event) => {
    const { value } = event.target;
    setFieldValue("rationSeche", value);
    patientClinicForm.setRationSeche(value);
    if (value === "true") {
      setOedeme(true);
    } else {
      setOedeme(false);
    }
  };

  const handleChangeFirstPicture = (event) => {
    const file = event.target.files[0];
    setFieldValue("firstPicture", file);
    if (!(touched.firstPicture && errors.firstPicture)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setUrl(reader.result);
      };
    }
    console.log(url);
  };
  const handleChangeTypeMalnutrition = (event) => {
    const { value } = event.target;
    setFieldValue("typeMalnutrition", value);
    patientClinicForm.setTypeMalnutrition(value);
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3} sx={{ marginTop: "0.5%" }}>
            <Grid item xs={11} sm={6} md={6}>
              <Stack
                style={{
                  border: "0px solid green",
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleChangeFirstPicture}
                  name="firstPicture"
                  id="firstPicture"
                  style={{ display: "none" }}
                />
                <label
                  for="firstPicture"
                  style={{
                    width: "415px",
                    height: "415px",
                    margin: "auto",
                  }}
                >
                  <Avatar
                    alt="Child first picture"
                    src={url}
                    variant="rounded"
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "2.5px solid #000",
                    }}
                  />
                </label>
              </Stack>
            </Grid>
            <Grid item xs={11} sm={6} md={6}>
              <Stack spacing={3}>
                <TextField
                  sx={{ padding: "2px" }}
                  value={patientClinicForm.poidsActuel}
                  onChange={handleChangePoidsActuel}
                  label="Poids actuel (kg) ex:20"
                  helperText={touched.poidsActuel && errors.poidsActuel}
                  error={Boolean(touched.poidsActuel && errors.poidsActuel)}
                />

                <TextField
                  sx={{ padding: "2px" }}
                  label="Périmètre crânien (Cm) ex:40"
                  value={patientClinicForm.perimetreCranien}
                  onChange={handleChangePerimetreCranien}
                  helperText={
                    touched.perimetreCranien && errors.perimetreCranien
                  }
                  error={Boolean(
                    touched.perimetreCranien && errors.perimetreCranien
                  )}
                />
                <TextField
                  sx={{ padding: "2px" }}
                  label="Périmètre brachial (Cm) ex:40"
                  value={patientClinicForm.perimetreBrachail}
                  onChange={handleChangePerimetreBrachail}
                  helperText={
                    touched.perimetreBrachail && errors.perimetreBrachail
                  }
                  error={Boolean(
                    touched.perimetreBrachail && errors.perimetreBrachail
                  )}
                />
                <TextField
                  sx={{ padding: "2px" }}
                  label="Taille en (Cm) ex: 100"
                  value={patientClinicForm.taille}
                  onChange={handleChangeTaille}
                  error={Boolean(touched.taille && errors.taille)}
                  helperText={touched.taille && errors.taille}
                />
                <TextField
                  sx={{ padding: "2px" }}
                  label="Taux d'hemoglobine en (gr/dl) ex: 6.1"
                  value={patientClinicForm.hemoglobine}
                  onChange={handleChangeHb}
                  error={Boolean(touched.hemoglobine && errors.hemoglobine)}
                  helperText={touched.hemoglobine && errors.hemoglobine}
                />
                <TextField
                  sx={{ padding: "2px" }}
                  label="Taux d'hematocrite en (%) ex: 18"
                  value={patientClinicForm.hematocrite}
                  onChange={handleChangeHt}
                  error={Boolean(touched.hematocrite && errors.hematocrite)}
                  helperText={touched.hematocrite && errors.hematocrite}
                />
                <RadioGroup
                  helperText={touched.rationSeche && errors.rationSeche}
                  error={Boolean(touched.rationSeche && errors.rationSeche)}
                  onChange={handleChangeRationPatient}
                >
                  <Stack
                    direction={{ xs: "column", sm: "column", md: "row" }}
                    sx={{
                      display: "flex",
                      paddingLeft: "10px",
                      alignItems: "center",
                      border: `${
                        Boolean(touched.rationSeche && errors.rationSeche) &&
                        "1px solid red"
                      }`,
                      borderRadius: `${
                        Boolean(touched.rationSeche && errors.rationSeche) &&
                        "10px"
                      }`,
                    }}
                    spacing={1}
                  >
                    <FormLabel component="label">Oedème:</FormLabel>
                    <Stack direction={{ xs: "row", sm: "row" }}>
                      <FormControlLabel
                        value="true"
                        control={
                          <Radio
                            checked={patientClinicForm.rationSeche === "true"}
                          />
                        }
                        label="Oui"
                      />
                      <FormControlLabel
                        value="false"
                        control={
                          <Radio
                            checked={patientClinicForm.rationSeche === "false"}
                          />
                        }
                        label="Non"
                      />
                    </Stack>
                  </Stack>
                </RadioGroup>
                <Select
                  sx={{ padding: "2px" }}
                  native
                  selected={patientClinicForm.typeOedeme}
                  onChange={handleChangeTypeOedeme}
                  disabled={!oedeme}
                  error={
                    Boolean(touched.typeOedeme && errors.typeOedeme) ||
                    Boolean(
                      values.rationSeche === "true" && values.typeOedeme === ""
                    )
                  }
                  helperText={touched.typeOedeme && errors.typeOedeme}
                >
                  <option value="" selected disabled hidden>
                    {`${
                      patientClinicForm.typeOedeme
                        ? patientClinicForm.typeOedeme
                        : "Type d'Oedème"
                    }`}
                  </option>
                  <option value="+">+</option>
                  <option value="+ +">+ +</option>
                  <option value="+ + +">+ + +</option>
                </Select>
                {DataPatient.indentity.sexePatient === "M" ? (
                  <div className="buttonCard">
                    <a
                      href="https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/length-height-for-age/cht-lhfa-boys-z-0-5.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      rapport taille - âge
                    </a>
                    <a
                      href="https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/weight-for-age/cht-wfa-boys-z-0-5.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      rapport poids - âge
                    </a>
                    <a
                      href="https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/weight-for-length-height/cht-wflh-boys-z-0-5.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      rapport poids - taille
                    </a>
                    <a
                      href="https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/head-circumference-for-age/cht_hcfa_boys_z_0_5.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      rapport p. cranien - age
                    </a>
                    <a
                      href="http://www.bamisagora.org/documents_pdf/07bb-La_Malnutrition-Tables_et_courbes_de_suivi.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Table Poids Cible
                    </a>
                  </div>
                ) : (
                  <div className="buttonCard">
                    <a
                      href="https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/length-height-for-age/cht-lhfa-girls-z-0-5.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      rapport taille - âge
                    </a>
                    <a
                      href="https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/weight-for-age/cht-wfa-girls-z-0-5.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      rapport poids - âge
                    </a>
                    <a
                      href="https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/weight-for-length-height/cht-wflh-girls-z-0-5.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      rapport poids - taille
                    </a>
                    <a
                      href="https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/head-circumference-for-age/cht_hcfa_girls_z_0_5.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      rapport p. cranien - age
                    </a>
                    <a
                      href="http://www.bamisagora.org/documents_pdf/07bb-La_Malnutrition-Tables_et_courbes_de_suivi.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Table Poids Cible
                    </a>
                  </div>
                )}

                <Select
                  native
                  sx={{ padding: "2px" }}
                  onChange={handleChangeTypeMalnutrition}
                  helperText={
                    touched.typeMalnutrition && errors.typeMalnutrition
                  }
                  error={Boolean(
                    touched.typeMalnutrition && errors.typeMalnutrition
                  )}
                >
                  <option value="" selected disabled hidden>
                    {patientClinicForm.typeMalnutrition
                      ? patientClinicForm.typeMalnutrition
                      : "Forme de malnutrition"}
                  </option>
                  <option value="MAM">Malnutrition Aigue Modérée</option>
                  <option value="MAM / FMC">
                    Malnutrition Aigue Modérée / Fond de Malnutrition Chronique
                  </option>
                  <option value="MAS-K">
                    Malnutrition Aigue Sévère Kwashiorkor
                  </option>
                  <option value="MAS-K / FMC">
                    Malnutrition Aigue Sévère Kwashiorkor / Fond de Malnutrition
                    Chronique
                  </option>
                  <option value="MAS-M">
                    Malnutrition Aigue Sévère Marasme
                  </option>
                  <option value="MAS-M / FMC">
                    Malnutrition Aigue Sévère Marasme / Fond de Malnutrition
                    Chronique
                  </option>
                  <option value="MC">Malnutrition Chronique</option>
                </Select>
                <Select
                  sx={{ padding: "2px" }}
                  native
                  onChange={handleChangeTraitementNutritionnel}
                  helperText={
                    touched.traitementNutritionnel &&
                    errors.traitementNutritionnel
                  }
                  error={Boolean(
                    touched.traitementNutritionnel &&
                      errors.traitementNutritionnel
                  )}
                >
                  <option value="" selected disabled hidden>
                    Traitement nutritionnel
                  </option>
                  <option value="ATPE">ATPE</option>
                  <option value="Plumpy-nut">Plumpy-nut</option>
                  <option value="MaSoSo">MaSoSo</option>
                  <option value="Autres">Autres</option>
                </Select>
                <TextField
                  sx={{ padding: "2px" }}
                  label="Si le traitement nutritionnel est autre veuillez préciser"
                  onChange={handleChangeNutritionnelAutre}
                  value={patientClinicForm.traitementNutritionnelAutre}
                  disabled={traitementNutri}
                  helperText={
                    touched.traitementNutritionnelAutre &&
                    errors.traitementNutritionnelAutre
                  }
                  error={
                    Boolean(
                      touched.traitementNutritionnelAutre &&
                        errors.traitementNutritionnelAutre
                    ) ||
                    Boolean(
                      values.traitementNutritionnel === "Autres" &&
                        values.traitementNutritionnelAutre === ""
                    )
                  }
                />
                <TextareaAutosize
                  minRows={8}
                  maxRows={8}
                  value={patientClinicForm.commentaires}
                  onChange={handleChangeCommentaires}
                  placeholder="Observations sur le patient"
                  className={style.textarea}
                  helperText={touched.commentaires && errors.commentaires}
                  error={Boolean(touched.commentaires && errors.commentaires)}
                />
              </Stack>
            </Grid>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              sx={{ display: "flex", justifyContent: "center", margin: "auto" }}
            >
              <LoadingButton
                size="large"
                type="button"
                variant="contained"
                onClick={() => {
                  PrevStep();
                }}
                sx={{ width: 200, marginLeft: "20px", marginTop: "20px" }}
              >
                Précédant
              </LoadingButton>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                size="large"
                sx={{ width: 200, marginLeft: "20px", marginTop: "20px" }}
              >
                Suivant
              </LoadingButton>
            </Stack>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
