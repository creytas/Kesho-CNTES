import * as Yup from "yup";
import propTypes from "prop-types";
import { useState, useEffect } from "react";
import { useFormik, Form, FormikProvider } from "formik";
// import { useNavigate } from 'react-router-dom';

// material
import {
  Stack,
  TextField,
  TextareaAutosize,
  // Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Grid,
  // InputLabel,
  Select,
  // styled
  // getCheckboxUtilityClass
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import style from "./patient.module.css";

// ----------------------------------------------------------------------
PatientForm.propTypes = {
  NextStep: propTypes.func,
  SetDataPatient: propTypes.func,
  patientFormData: propTypes.object,
};

export default function PatientForm({
  NextStep,
  SetDataPatient,
  patientFormData,
}) {
  // const [allaitement, setAllaitement] = useState(false);
  // const [oedeme, setOedeme] = useState(false);
  const [provenance, setProvenance] = useState(false);
  const [modeArriver, setModeArriver] = useState(false);
  // const [traitementNutri, setTraitementNutri] = useState(false);

  const [position] = useState(0);

  useEffect(() => {
    window.scroll(position, position);
  }, [position]);

  const date = new Date();
  const RegisterSchema = Yup.object().shape({
    dateAdmissionPatient: Yup.date().required("Date d'admission requis"),
    dateGuerisonPatient: Yup.date(),
    ExplicationAutre: Yup.string().trim().min(2, "Minimum 2 caractère"),
    NomPatient: Yup.string()
      .min(2, "Min 2 caractère")
      .max(100, "Max 100 caractère")
      .matches(/[A-Za-z]/, "Il ne doit contenir que de lettre")
      .trim()
      .required("requis"),
    fistNamePatient: Yup.string()
      .min(2, "Min 2 caractère")
      .max(25)
      .matches(/[A-Za-z]/, "Il ne doit contenir que de lettre")
      .trim(),
    postNomPatient: Yup.string()
      .min(2, "Minimum 2 caractère")
      .max(25, "Maximum 25 caractère")
      .matches(/[A-Za-z]/, "Il ne doit contenir que de lettre")
      .trim()
      .required("requis"),
    telephone: Yup.string().matches(
      /^(\+243|0)[0-9]{9}$/g,
      "+243813030011 ou 0813030011"
    ),
    sexePatient: Yup.string().trim().required("requis"),
    dataNaissancePatient: Yup.date("intervalle entre")
      .min(date.getFullYear() - 90, `Age minimum ${date.getFullYear()}` - 90)
      .required("requis"),
    provenancePatient: Yup.string().trim().min(2, "Min 2 caractère"),
    modeArriver: Yup.string().trim().min(2, "Min 2 caractère"),
    adressePatient: Yup.string().trim().min(2, "Min 2 caractère"),
    ExplicationProvenance: Yup.string().min(2, "Min 2 caractère").trim(),
  });
  const formik = useFormik({
    initialValues: {
      dateAdmissionPatient: patientFormData.dateAdmissionPatient
        ? patientFormData.dateAdmissionPatient
        : new Date(),
      dateGuerisonPatient: patientFormData.dateGuerisonPatient
        ? patientFormData.dateGuerisonPatient
        : new Date(),
      // firstPicture: patientFormData.firstPicture
      //   ? patientFormData.firstPicture
      //   : "",
      // lastPicture: patientFormData.lastPicture
      //   ? patientFormData.lastPicture
      //   : "",
      // commentaires: patientFormData.commentaires
      //   ? patientFormData.commentaires
      //   : "",
      // rationSeche: patientFormData.rationSeche
      //   ? patientFormData.rationSeche
      //   : "false",
      // typeOedeme: patientFormData.typeOedeme ? patientFormData.typeOedeme : "",
      // taille: patientFormData.taille ? patientFormData.taille : "",
      // poidsActuel: patientFormData.poidsActuel
      //   ? patientFormData.poidsActuel
      //   : "",
      // perimetreCranien: patientFormData.perimetreCranien
      //   ? patientFormData.perimetreCranien
      //   : "",
      fistNamePatient: patientFormData.prenomPatient
        ? patientFormData.prenomPatient
        : "",
      NomPatient: patientFormData.nomPatient ? patientFormData.nomPatient : "",
      postNomPatient: patientFormData.postNomPatient
        ? patientFormData.postNomPatient
        : "",
      telephone: patientFormData.telephone ? patientFormData.telephone : "",
      // diversificationAliment: patientFormData.diversificationAliment
      //   ? patientFormData.diversificationAliment
      //   : "",
      sexePatient: patientFormData.sexePatient
        ? patientFormData.sexePatient
        : "",
      dataNaissancePatient: patientFormData.dataNaissancePatient
        ? patientFormData.dataNaissancePatient
        : "",
      // constitutionAliment: patientFormData.constitutionAliment
      //   ? patientFormData.constitutionAliment
      //   : "",
      provenancePatient: patientFormData.provenancePatient
        ? patientFormData.provenancePatient
        : "",
      adressePatient: patientFormData.adressePatient
        ? patientFormData.adressePatient
        : "",
      modeArriver: patientFormData.modeArriverPatient
        ? patientFormData.modeArriverPatient
        : "",
      // ageFinAllaitement: patientFormData.ageFinAllaitement
      //   ? patientFormData.ageFinAllaitement
      //   : "",
      // traitementNutritionnelAutre: patientFormData.traitementNutritionnelAutre
      //   ? patientFormData.traitementNutritionnelAutre
      //   : "",
      // poidsNaissance: patientFormData.poidsNaissance
      //   ? patientFormData.poidsNaissance
      //   : "",
      // traitementNutritionnel: patientFormData.traitementNutritionnel
      //   ? patientFormData.traitementNutritionnel
      //   : "",
      // perimetreBrachail: patientFormData.perimetreBrachail
      //   ? patientFormData.perimetreBrachail
      //   : "",
      // typeMalnutrition: patientFormData.typeMalnutrition
      //   ? patientFormData.typeMalnutrition
      //   : "",
      ExplicationAutre: patientFormData.ExplicationAutre
        ? patientFormData.ExplicationAutre
        : "",
      ExplicationProvenance: patientFormData.ExplicationProvenance
        ? patientFormData.ExplicationProvenance
        : "",
      // allaitementExclusifSixMois: patientFormData.AllaitementExclisifSixMois
      //   ? patientFormData.AllaitementExclisifSixMois
      //   : "",
      // transfererUnt: patientFormData.transfererUnt
      //   ? patientFormData.transfererUnt
      //   : "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (indentity) => {
      // const { fistNamePatient, NomPatient } = indentity;  indentity.allaitementExclusifSixMois === false && indentity.ageFinAllaitement === ''
      try {
        if (
          indentity.provenancePatient === "Autres" &&
          indentity.ExplicationProvenance === ""
        ) {
          throw alert("Veuillez preciser la provenance du patient");
        }
        // if (
        //   indentity.allaitementExclusifSixMois === "false" &&
        //   indentity.ageFinAllaitement === ""
        // ) {
        //   throw alert(
        //     "Veuillez preciser le nombre l'age fin allaitment en (mois) "
        //   );
        // }
        if (
          indentity.modeArriver === "Autres" &&
          indentity.ExplicationAutre === ""
        ) {
          throw alert("Veuillez expliquer le mode d'arriver du patient ");
        }
        // if (
        //   indentity.traitementNutritionnel === "Autres" &&
        //   indentity.traitementNutritionnelAutre === ""
        // ) {
        //   throw alert("Veuillez preciser le traitement nutritionnel reçus");
        // }
        SetDataPatient((current) => ({ ...current, indentity }));
        NextStep();
      } catch (e) {
        console.log(e);
      }
    },
  });
  const { errors, setFieldValue, touched, values, handleSubmit } = formik;
  // console.log(errors);
  const handleChangeFistName = (event) => {
    const { value } = event.target;
    setFieldValue("fistNamePatient", value);
    patientFormData.setPrenomPatient(value);
  };
  // const handleChangeCommentaires = (event) => {
  //   const { value } = event.target;
  //   setFieldValue("commentaires", value);
  //   patientFormData.setCommentaires(value);
  // };

  // const handleAllaitementExclusifSixMoix = (event) => {
  //   const { value } = event.target;
  //   setFieldValue("allaitementExclusifSixMois", value);
  //   patientFormData.setAllaitementExclisifSixMois(value);
  //   if (value === "true") {
  //     setAllaitement(true);
  //   } else {
  //     setAllaitement(false);
  //   }
  // };
  const handleChangeProvenance = (event) => {
    const { value } = event.target;
    setFieldValue("provenancePatient", value);
    patientFormData.setProvenancePatient(value);
    if (value === "Hors Ville") {
      setProvenance(false);
    } else {
      setProvenance(true);
    }
  };
  const handleChangeModeArriver = (event) => {
    const { value } = event.target;
    setFieldValue("modeArriver", value);
    patientFormData.setModeArriverPatient(value);
    if (value === "Autres") {
      setModeArriver(false);
    } else {
      setModeArriver(true);
    }
  };
  // const handleChangeTraitementNutritionnel = (event) => {
  //   const { value } = event.target;
  //   setFieldValue("traitementNutritionnel", value);
  //   patientFormData.setTraitementNutritionnel(value);
  //   if (value === "Autres") {
  //     setTraitementNutri(false);
  //   } else {
  //     setTraitementNutri(true);
  //   }
  // };
  const handleChangeDateAdmission = (event) => {
    const { value } = event.target;
    setFieldValue("dateAdmissionPatient", value);
    patientFormData.setDateAdmissionPatient(value);
    console.log(value);
  };
  const handleChangeAdressePatient = (event) => {
    const { value } = event.target;
    setFieldValue("adressePatient", value);
    patientFormData.setadressePatient(value);
  };
  const handleChangeSexePatient = (event) => {
    const { value } = event.target;
    setFieldValue("sexePatient", value);
    patientFormData.setSexePatient(value);
  };
  // const handleChangeDiversificationAliment = (event) => {
  //   const { value } = event.target;
  //   setFieldValue("diversificationAliment", value);
  //   patientFormData.setDiversificationAliment(value);
  // };
  const handleChangePostNomPatient = (event) => {
    const { value } = event.target;
    setFieldValue("postNomPatient", value);
    patientFormData.setPostNomPatient(value);
  };
  // const handleChangePerimetreBrachail = (event) => {
  //   const { value } = event.target;
  //   setFieldValue("perimetreBrachail", value);
  //   patientFormData.setPerimetreBrachail(value);
  // };
  const handleChangeNom = (event) => {
    const { value } = event.target;
    setFieldValue("NomPatient", value);
    patientFormData.setNomPatient(value);
  };
  // const handleChangePerimetreCranien = (event) => {
  //   const { value } = event.target;
  //   setFieldValue("perimetreCranien", value);
  //   patientFormData.setPerimetreCranien(value);
  // };
  // const handleChangePoidsActuel = (event) => {
  //   const { value } = event.target;
  //   setFieldValue("poidsActuel", value);
  //   patientFormData.setPoidsActuel(value);
  // };
  // const handleChangeTaille = (event) => {
  //   const { value } = event.target;
  //   setFieldValue("taille", value);
  //   patientFormData.setTaille(value);
  // };
  // const handleChangeNutritionnelAutre = (event) => {
  //   const { value } = event.target;
  //   setFieldValue("traitementNutritionnelAutre", value);
  //   patientFormData.setTraitementNutritionnelAutre(value);
  // };
  // const handleChangeAgeFinAllaitement = (event) => {
  //   const { value } = event.target;
  //   setFieldValue("ageFinAllaitement", value);
  //   patientFormData.setAgeFinAllaitement(value);
  // };
  // const handleChangeConstitutionAliment = (event) => {
  //   const { value } = event.target;
  //   setFieldValue("constitutionAliment", value);
  //   patientFormData.setConstitutionAliment(value);
  // };
  // const handleChangePoidsnaissance = (event) => {
  //   const { value } = event.target;
  //   setFieldValue("poidsNaissance", value);
  //   patientFormData.setPoidsNaissance(value);
  // };
  const handleChangeDateNaissance = (event) => {
    const { value } = event.target;
    setFieldValue("dataNaissancePatient", value);
    patientFormData.setDataNaissancePatient(value);
  };
  // const handleChangeTypeMalnutrition = (event) => {
  //   const { value } = event.target;
  //   setFieldValue("typeMalnutrition", value);
  //   patientFormData.setTypeMalnutrition(value);
  // };
  const handleChangeExplicationAutre = (event) => {
    const { value } = event.target;
    setFieldValue("ExplicationAutre", value);
    patientFormData.setExplicationAutre(value);
  };
  const handleChangeTelephone = (event) => {
    const { value } = event.target;
    setFieldValue("telephone", value);
    patientFormData.setTelephone(value);
  };
  const handleChangeExplicationProvenance = (event) => {
    const { value } = event.target;
    setFieldValue("ExplicationProvenance", value);
    patientFormData.setExplicationProvenance(value);
  };
  // const handleChangeTypeOedeme = (event) => {
  //   const { value } = event.target;
  //   setFieldValue("typeOedeme", value);
  //   patientFormData.setTypeOedeme(value);
  // };
  // const handleChangeTransfererUnt = (event) => {
  //   const { value } = event.target;
  //   setFieldValue("transfererUnt", value);
  //   patientFormData.setTransfererUnt(value);
  // };
  // const handleChangeRationPatient = (event) => {
  //   const { value } = event.target;
  //   setFieldValue("rationSeche", value);
  //   patientFormData.setRationSeche(value);
  //   if (value === "true") {
  //     setOedeme(true);
  //   } else {
  //     setOedeme(false);
  //   }
  // };
  // const handleAllaitementExclusifSixMoix = (event) => {
  //   const { value } = event.target;
  //   setFieldValue("allaitementExclusifSixMois", value);
  //   patientFormData.setAllaitementExclisifSixMois(value);
  //   if (value === "true") {
  //     setAllaitement(true);
  //   } else {
  //     setAllaitement(false);
  //   }
  // };
  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid
              item
              xs={11}
              sm={11}
              md={11}
              sx={{ marginTop: "5%", border: "0px solid red" }}
            >
              <Stack spacing={3}>
                <TextField
                  sx={{ padding: "2px" }}
                  type="date"
                  // fullWidth
                  label="Date d'admission"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={patientFormData.dateAdmissionPatient}
                  onChange={handleChangeDateAdmission}
                  // {...getFieldProps('dataNaissancePatient')}
                  helperText={
                    touched.dateAdmissionPatient && errors.dateAdmissionPatient
                  }
                  error={Boolean(
                    touched.dateAdmissionPatient && errors.dateAdmissionPatient
                  )}
                />
                <TextField
                  sx={{ padding: "2px" }}
                  type="date"
                  // fullWidth
                  label="Date de naissance"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={patientFormData.dataNaissancePatient}
                  onChange={handleChangeDateNaissance}
                  // {...getFieldProps('dataNaissancePatient')}
                  helperText={
                    touched.dataNaissancePatient && errors.dataNaissancePatient
                  }
                  error={Boolean(
                    touched.dataNaissancePatient && errors.dataNaissancePatient
                  )}
                />

                <TextField
                  sx={{ padding: "2px" }}
                  // fullWidth
                  autoFocus
                  label="Prénom ex: Kevin"
                  value={patientFormData.prenomPatient}
                  onChange={handleChangeFistName}
                  // {...getFieldProps('fistNamePatient')}
                  error={Boolean(
                    touched.fistNamePatient && errors.fistNamePatient
                  )}
                  helperText={touched.fistNamePatient && errors.fistNamePatient}
                />
                <TextField
                  sx={{ padding: "2px" }}
                  autoComplete="name"
                  // fullWidth
                  label="Nom ex: Bayekula"
                  value={patientFormData.nomPatient}
                  // {...getFieldProps('NomPatient')}
                  onChange={handleChangeNom}
                  error={Boolean(touched.NomPatient && errors.NomPatient)}
                  helperText={touched.NomPatient && errors.NomPatient}
                />
                <TextField
                  sx={{ padding: "2px" }}
                  // fullWidth
                  autoComplete="lastname"
                  type="text"
                  label="Postnom ex: Kashala"
                  defaultValue={patientFormData.postNomPatient}
                  // {...getFieldProps('postNomPatient')}
                  onChange={handleChangePostNomPatient}
                  error={Boolean(
                    touched.postNomPatient && errors.postNomPatient
                  )}
                  helperText={touched.postNomPatient && errors.postNomPatient}
                />
                <RadioGroup
                  // {...getFieldProps('sexePatient')}
                  onChange={handleChangeSexePatient}
                  error={Boolean(touched.sexePatient && errors.sexePatient)}
                  helperText={touched.sexePatient && errors.sexePatient}
                  // setValues={  DataPatient.Sexe}
                >
                  <Stack
                    direction={{ xs: "column", md: "column", sm: "row" }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "10px",
                      border: `${
                        Boolean(touched.sexePatient && errors.sexePatient) &&
                        "1px solid red"
                      }`,
                      borderRadius: `${
                        Boolean(touched.sexePatient && errors.sexePatient) &&
                        "10px"
                      }`,
                    }}
                    spacing={1}
                  >
                    <FormLabel
                      component="label"
                      // style={{ color: `${errors.sexePatient && 'red'}` }}
                    >
                      Sexe:
                    </FormLabel>
                    <Stack direction={{ xs: "row", sm: "row" }}>
                      <FormControlLabel
                        value="M"
                        control={
                          <Radio
                            checked={patientFormData.sexePatient === "M"}
                          />
                        }
                        label="M"
                      />
                      <FormControlLabel
                        value="F"
                        control={
                          <Radio
                            checked={patientFormData.sexePatient === "F"}
                          />
                        }
                        label="F"
                      />
                    </Stack>
                  </Stack>
                </RadioGroup>
                <TextField
                  sx={{ padding: "2px" }}
                  // fullWidth
                  autoComplete="tel"
                  type="tel"
                  label="Téléphone ex: +243850157817"
                  value={patientFormData.telephone}
                  onChange={handleChangeTelephone}
                  // {...getFieldProps('telephone')}
                  error={Boolean(touched.telephone && errors.telephone)}
                  helperText={touched.telephone && errors.telephone}
                />

                <Select
                  sx={{ padding: "2px" }}
                  native
                  // {...getFieldProps('modeArriver')}
                  selected={patientFormData.provenancePatient}
                  onChange={handleChangeProvenance}
                  error={Boolean(touched.provenance && errors.provenance)}
                  helperText={touched.provenance && errors.provenance}
                >
                  <option value="" selected disabled hidden>
                    {`${
                      patientFormData.provenancePatient
                        ? patientFormData.provenancePatient
                        : "Provenance"
                    }`}
                  </option>
                  <option value="kadutu">Kadutu</option>
                  <option value="Bagira">Bagira</option>
                  <option value="Ibanda">Ibanda</option>
                  <option value="Hors Ville">Hors Ville</option>
                </Select>
                <TextField
                  sx={{ padding: "2px" }}
                  // fullWidth
                  label="Si la provenance est autre veuillez préciser"
                  // {...getFieldProps('ExplicationAutre')}
                  value={patientFormData.ExplicationProvenance}
                  onChange={handleChangeExplicationProvenance}
                  disabled={provenance}
                  helperText={
                    touched.ExplicationProvenance &&
                    errors.ExplicationProvenance
                  }
                  error={
                    Boolean(
                      touched.ExplicationProvenance &&
                        errors.ExplicationProvenance
                    ) ||
                    Boolean(
                      values.provenancePatient === "Hors Ville" &&
                        values.ExplicationProvenance === ""
                    )
                  }
                />
                <TextField
                  sx={{ padding: "2px" }}
                  // fullWidth
                  label="Adresse ex: 15 Avenue Kandende Q/Lukunga"
                  value={patientFormData.adressePatient}
                  // defaultValue={DataPatient.adressePatient}
                  onChange={handleChangeAdressePatient}
                  // {...getFieldProps('adressePatient')}
                  helperText={touched.adressePatient && errors.adressePatient}
                  error={Boolean(
                    touched.adressePatient && errors.adressePatient
                  )}
                />
                <Select
                  sx={{ padding: "2px" }}
                  native
                  // {...getFieldProps('modeArriver')}
                  selected={patientFormData.modeArriverPatient}
                  onChange={handleChangeModeArriver}
                  error={Boolean(touched.modeArriver && errors.modeArriver)}
                  helperText={touched.modeArriver && errors.modeArriver}
                >
                  <option value="" selected disabled hidden>
                    {`${
                      patientFormData.modeArriverPatient
                        ? patientFormData.modeArriverPatient
                        : "Mode d'arrivé"
                    }`}
                  </option>
                  <option value="De la maison">De la maison</option>
                  <option value="UNT">UNT</option>
                  <option value="Autres">Autres</option>
                </Select>
                <TextField
                  sx={{ padding: "2px" }}
                  // fullWidth
                  label="Si le mode d'arrivé est autre veuillez préciser"
                  // {...getFieldProps('ExplicationAutre')}
                  value={patientFormData.ExplicationAutre}
                  onChange={handleChangeExplicationAutre}
                  disabled={modeArriver}
                  helperText={
                    touched.ExplicationAutre && errors.ExplicationAutre
                  }
                  error={
                    Boolean(
                      touched.ExplicationAutre && errors.ExplicationAutre
                    ) ||
                    Boolean(
                      values.modeArriver === "Autres" &&
                        values.ExplicationAutre === ""
                    )
                  }
                />

                {/* <TextareaAutosize
                  minRows={8}
                  maxRows={8}
                  value={patientFormData.commentaires}
                  onChange={handleChangeCommentaires}
                  placeholder="Observations sur le patient"
                  className={style.textarea}
                  helperText={touched.commentaires && errors.commentaires}
                  error={Boolean(touched.commentaires && errors.commentaires)}
                /> */}
              </Stack>
            </Grid>
            <Grid item xs={11} sm={6} md={6}>
              <Stack spacing={3}></Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "190%",
                }}
              >
                <LoadingButton
                  type="submit"
                  variant="contained"
                  size="large"
                  // loading={isSubmitting}
                  sx={{
                    justifyContent: "center",
                    width: 200,
                    margin: "auto",
                    marginTop: "40px",
                    display: "flex",
                  }}
                >
                  Suivant
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}
