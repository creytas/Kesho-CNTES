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
  Avatar,
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
  // const [allaitement, setAllaitement] = useState(false);
  const [oedeme, setOedeme] = useState(false);
  const [traitementNutri, setTraitementNutri] = useState(false);
  const [url, setUrl] = useState("");

  const [position] = useState(0);

  useEffect(() => {
    window.scroll(position, position);
  }, [position]);

  const date = new Date();
  const RegisterSchema = Yup.object().shape({
    // dateAdmissionPatient: Yup.date().required("Date d'admission requis"),
    // dateGuerisonPatient: Yup.date(),
    firstPicture: Yup.string(),
    //lastPicture: Yup.string(),
    commentaires: Yup.string(),
    rationSeche: Yup.boolean(),
    typeOedeme: Yup.string(),
    taille: Yup.number("Un chiffre requis")
      .positive("La valeur doit être positive")
      .min(1, "Taille minimum 1 Cm")
      .max(400, "Taille maximum 400 Cm")
      .required("Taille requis"),
    // ExplicationAutre: Yup.string().trim().min(2, "Minimum 2 caractère"),
    // allaitementExclusifSixMois: Yup.string()
    //   .trim()
    //   .min(2, "Min 2 caractère")
    //   .required("Champs requis"),
    // NomPatient: Yup.string()
    //   .min(2, "Min 2 caractère")
    //   .max(100, "Max 100 caractère")
    //   .matches(/[A-Za-z]/, "Il ne doit contenir que de lettre")
    //   .trim()
    //   .required("requis"),
    poidsActuel: Yup.number("Il ne doit contenir que de chiffre")
      .min(2, "Minimun 2 Kg")
      .positive("Le nombre doit être positive")
      .required("Poids requis"),
    perimetreCranien: Yup.number("un chiffre requis").max(
      10000,
      "Maximum 10000 Cm"
    ),
    // transfererUnt: Yup.string().trim().min(2, "Min 2 caractère"),
    // fistNamePatient: Yup.string()
    //   .min(2, "Min 2 caractère")
    //   .max(25)
    //   .matches(/[A-Za-z]/, "Il ne doit contenir que de lettre")
    //   .trim(),
    perimetreBrachail: Yup.number("un chiffre requis")
      .positive()
      .min(5, "Minimum 5")
      .max(100)
      .required("Perimetre brachial requis"),
    // postNomPatient: Yup.string()
    //   .min(2, "Minimum 2 caractère")
    //   .max(25, "Maximum 25 caractère")
    //   .matches(/[A-Za-z]/, "Il ne doit contenir que de lettre")
    //   .trim()
    //   .required("requis"),
    // telephone: Yup.string().matches(
    //   /^(\+243|0)[0-9]{9}$/g,
    //   "+243813030011 ou 0813030011"
    // ),
    // diversificationAliment: Yup.number("un nombre")
    //   .positive("nombre positif")
    //   .min(2, "Minimum 2"),
    // sexePatient: Yup.string().trim().required("requis"),
    // dataNaissancePatient: Yup.date("intervalle entre")
    //   .min(date.getFullYear() - 90, `Age minimum ${date.getFullYear()}` - 90)
    //   .required("requis"),
    // constitutionAliment: Yup.string().trim().min(2, "Min 2 caractère"),
    // provenancePatient: Yup.string().trim().min(2, "Min 2 caractère"),
    // modeArriver: Yup.string().trim().min(2, "Min 2 caractère"),
    typeMalnutrition: Yup.string()
      .trim()
      .min(2, "Minimum 2 caractère")
      .required("requis"),
    // poidsNaissance: Yup.number()
    //   .positive()
    //   .min(900, "Minimum 900 gr")
    //   .required("requis"),
    traitementNutritionnel: Yup.string().trim().min(2, "Minimum 2 caractère"),
    traitementNutritionnelAutre: Yup.string().min(5).trim(),
    // adressePatient: Yup.string().trim().min(2, "Min 2 caractère"),
    // ExplicationProvenance: Yup.string().min(2, "Min 2 caractère").trim(),
    // ageFinAllaitement: Yup.number()
    //   .min(1, "Minimum 1 mois")
    //   .positive("champs doit être positive"),
  });
  const formik = useFormik({
    initialValues: {
      firstPicture: patientClinicForm.firstPicture
        ? patientClinicForm.firstPicture
        : "",
      //   lastPicture: patientClinicForm.lastPicture
      //     ? patientClinicForm.lastPicture
      //     : "",
      commentaires: patientClinicForm.commentaires
        ? patientClinicForm.commentaires
        : "",
      rationSeche: patientClinicForm.rationSeche
        ? patientClinicForm.rationSeche
        : "false",
      typeOedeme: patientClinicForm.typeOedeme
        ? patientClinicForm.typeOedeme
        : "",
      taille: patientClinicForm.taille ? patientClinicForm.taille : "",
      poidsActuel: patientClinicForm.poidsActuel
        ? patientClinicForm.poidsActuel
        : "",
      perimetreCranien: patientClinicForm.perimetreCranien
        ? patientClinicForm.perimetreCranien
        : "",
      //   fistNamePatient: patientClinicForm.prenomPatient
      //     ? patientClinicForm.prenomPatient
      //     : "",
      //   NomPatient: patientClinicForm.nomPatient ? patientClinicForm.nomPatient : "",
      //   postNomPatient: patientClinicForm.postNomPatient
      //     ? patientClinicForm.postNomPatient
      //     : "",
      //   telephone: patientClinicForm.telephone ? patientClinicForm.telephone : "",
      // diversificationAliment: patientClinicForm.diversificationAliment
      //   ? patientClinicForm.diversificationAliment
      //   : "",
      //   sexePatient: patientClinicForm.sexePatient
      //     ? patientClinicForm.sexePatient
      //     : "",
      //   dataNaissancePatient: patientClinicForm.dataNaissancePatient
      //     ? patientClinicForm.dataNaissancePatient
      //     : "",
      // constitutionAliment: patientClinicForm.constitutionAliment
      //   ? patientClinicForm.constitutionAliment
      //   : "",
      //   provenancePatient: patientClinicForm.provenancePatient
      //     ? patientClinicForm.provenancePatient
      //     : "",
      //   adressePatient: patientClinicForm.adressePatient
      //     ? patientClinicForm.adressePatient
      //     : "",
      //   modeArriver: patientClinicForm.modeArriverPatient
      //     ? patientClinicForm.modeArriverPatient
      //     : "",
      // ageFinAllaitement: patientClinicForm.ageFinAllaitement
      //   ? patientClinicForm.ageFinAllaitement
      //   : "",
      traitementNutritionnelAutre: patientClinicForm.traitementNutritionnelAutre
        ? patientClinicForm.traitementNutritionnelAutre
        : "",
      // poidsNaissance: patientClinicForm.poidsNaissance
      //   ? patientClinicForm.poidsNaissance
      //   : "",
      traitementNutritionnel: patientClinicForm.traitementNutritionnel
        ? patientClinicForm.traitementNutritionnel
        : "",
      perimetreBrachail: patientClinicForm.perimetreBrachail
        ? patientClinicForm.perimetreBrachail
        : "",
      typeMalnutrition: patientClinicForm.typeMalnutrition
        ? patientClinicForm.typeMalnutrition
        : "",
      //   ExplicationAutre: patientClinicForm.ExplicationAutre
      //     ? patientClinicForm.ExplicationAutre
      //     : "",
      //   ExplicationProvenance: patientClinicForm.ExplicationProvenance
      //     ? patientClinicForm.ExplicationProvenance
      //     : "",
      // allaitementExclusifSixMois: patientClinicForm.AllaitementExclisifSixMois
      //   ? patientClinicForm.AllaitementExclisifSixMois
      //   : "",
      //   transfererUnt: patientClinicForm.transfererUnt
      //     ? patientClinicForm.transfererUnt
      //     : "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (clinic) => {
      // const { fistNamePatient, NomPatient } = clinic;  clinic.allaitementExclusifSixMois === false && clinic.ageFinAllaitement === ''

      try {
        clinic.pictureUploaded = url;
        // setFieldValue("firstPicture", url);
        // patientClinicForm.setFirstPicture(url);
        // const cloudinaryPhoto = async () => {
        //   await
        // };

        // if (
        //   clinic.provenancePatient === "Autres" &&
        //   clinic.ExplicationProvenance === ""
        // ) {
        //   throw alert("Veuillez preciser la provenance du patient");
        // }
        // if (
        //   clinic.allaitementExclusifSixMois === "false" &&
        //   clinic.ageFinAllaitement === ""
        // ) {
        //   throw alert(
        //     "Veuillez preciser le nombre l'age fin allaitment en (mois) "
        //   );
        // }
        // if (
        //   clinic.modeArriver === "Autres" &&
        //   clinic.ExplicationAutre === ""
        // ) {
        //   throw alert("Veuillez expliquer le mode d'arriver du patient ");
        // }
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
  // console.log(errors);
  //   const handleChangeFistName = (event) => {
  //     const { value } = event.target;
  //     setFieldValue("fistNamePatient", value);
  //     patientClinicForm.setPrenomPatient(value);
  //   };
  const handleChangeCommentaires = (event) => {
    const { value } = event.target;
    setFieldValue("commentaires", value);
    patientClinicForm.setCommentaires(value);
  };

  // const handleAllaitementExclusifSixMoix = (event) => {
  //   const { value } = event.target;
  //   setFieldValue("allaitementExclusifSixMois", value);
  //   patientClinicForm.setAllaitementExclisifSixMois(value);
  //   if (value === "true") {
  //     setAllaitement(true);
  //   } else {
  //     setAllaitement(false);
  //   }
  // };
  //   const handleChangeProvenance = (event) => {
  //     const { value } = event.target;
  //     setFieldValue("provenancePatient", value);
  //     patientClinicForm.setProvenancePatient(value);
  //     if (value === "Hors Ville") {
  //       setProvenance(false);
  //     } else {
  //       setProvenance(true);
  //     }
  //   };
  //   const handleChangeModeArriver = (event) => {
  //     const { value } = event.target;
  //     setFieldValue("modeArriver", value);
  //     patientClinicForm.setModeArriverPatient(value);
  //     if (value === "Autres") {
  //       setModeArriver(false);
  //     } else {
  //       setModeArriver(true);
  //     }
  //   };
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
  //   const handleChangeDateAdmission = (event) => {
  //     const { value } = event.target;
  //     setFieldValue("dateAdmissionPatient", value);
  //     patientClinicForm.setDateAdmissionPatient(value);
  //     console.log(value);
  //   };
  //   const handleChangeAdressePatient = (event) => {
  //     const { value } = event.target;
  //     setFieldValue("adressePatient", value);
  //     patientClinicForm.setadressePatient(value);
  //   };
  //   const handleChangeSexePatient = (event) => {
  //     const { value } = event.target;
  //     setFieldValue("sexePatient", value);
  //     patientClinicForm.setSexePatient(value);
  //   };
  // const handleChangeDiversificationAliment = (event) => {
  //   const { value } = event.target;
  //   setFieldValue("diversificationAliment", value);
  //   patientClinicForm.setDiversificationAliment(value);
  // };
  //   const handleChangePostNomPatient = (event) => {
  //     const { value } = event.target;
  //     setFieldValue("postNomPatient", value);
  //     patientClinicForm.setPostNomPatient(value);
  //   };
  const handleChangePerimetreBrachail = (event) => {
    const { value } = event.target;
    setFieldValue("perimetreBrachail", value);
    patientClinicForm.setPerimetreBrachail(value);
  };
  //   const handleChangeNom = (event) => {
  //     const { value } = event.target;
  //     setFieldValue("NomPatient", value);
  //     patientClinicForm.setNomPatient(value);
  //   };
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
  // const handleChangeAgeFinAllaitement = (event) => {
  //   const { value } = event.target;
  //   setFieldValue("ageFinAllaitement", value);
  //   patientClinicForm.setAgeFinAllaitement(value);
  // };
  // const handleChangeConstitutionAliment = (event) => {
  //   const { value } = event.target;
  //   setFieldValue("constitutionAliment", value);
  //   patientClinicForm.setConstitutionAliment(value);
  // };
  // const handleChangePoidsnaissance = (event) => {
  //   const { value } = event.target;
  //   setFieldValue("poidsNaissance", value);
  //   patientClinicForm.setPoidsNaissance(value);
  // };
  //   const handleChangeDateNaissance = (event) => {
  //     const { value } = event.target;
  //     setFieldValue("dataNaissancePatient", value);
  //     patientClinicForm.setDataNaissancePatient(value);
  //   };

  //   const handleChangeExplicationAutre = (event) => {
  //     const { value } = event.target;
  //     setFieldValue("ExplicationAutre", value);
  //     patientClinicForm.setExplicationAutre(value);
  //   };
  //   const handleChangeTelephone = (event) => {
  //     const { value } = event.target;
  //     setFieldValue("telephone", value);
  //     patientClinicForm.setTelephone(value);
  //   };
  //   const handleChangeExplicationProvenance = (event) => {
  //     const { value } = event.target;
  //     setFieldValue("ExplicationProvenance", value);
  //     patientClinicForm.setExplicationProvenance(value);
  //   };
  const handleChangeTypeOedeme = (event) => {
    const { value } = event.target;
    setFieldValue("typeOedeme", value);
    patientClinicForm.setTypeOedeme(value);
  };
  //   const handleChangeTransfererUnt = (event) => {
  //     const { value } = event.target;
  //     setFieldValue("transfererUnt", value);
  //     patientClinicForm.setTransfererUnt(value);
  //   };
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
      // patientClinicForm.setFirstPicture(url);
    }
    console.log(url);
    // if (!file) {
    //   return;
    // }
    // setUrl(URL.createObjectURL(file));
    // setFieldValue("firstPicture", file);
    // patientClinicForm.setFirstPicture(file);
    // console.log(file);
  };

  const handleChangeTypeMalnutrition = (event) => {
    const { value } = event.target;
    setFieldValue("typeMalnutrition", value);
    patientClinicForm.setTypeMalnutrition(value);
  };
  // const handleAllaitementExclusifSixMoix = (event) => {
  //   const { value } = event.target;
  //   setFieldValue("allaitementExclusifSixMois", value);
  //   patientClinicForm.setAllaitementExclisifSixMois(value);
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
                  // fullWidth
                  sx={{ padding: "2px" }}
                  //  defaultValue={DataPatient.poidsActuel}
                  value={patientClinicForm.poidsActuel}
                  onChange={handleChangePoidsActuel}
                  label="Poids actuel (kg) ex:20"
                  // {...getFieldProps('poidsActuel')}
                  helperText={touched.poidsActuel && errors.poidsActuel}
                  error={Boolean(touched.poidsActuel && errors.poidsActuel)}
                />

                <TextField
                  sx={{ padding: "2px" }}
                  // fullWidth
                  label="Périmètre crânien (Cm) ex:40"
                  value={patientClinicForm.perimetreCranien}
                  onChange={handleChangePerimetreCranien}
                  // {...getFieldProps('perimetreCranien')}
                  // defaultValue={DataPatient.perimetreCranien}
                  helperText={
                    touched.perimetreCranien && errors.perimetreCranien
                  }
                  error={Boolean(
                    touched.perimetreCranien && errors.perimetreCranien
                  )}
                />
                <TextField
                  sx={{ padding: "2px" }}
                  // required
                  // fullWidth
                  label="Périmètre brachial (Cm) ex:40"
                  value={patientClinicForm.perimetreBrachail}
                  onChange={handleChangePerimetreBrachail}
                  // defaultValue={DataPatient.perimetreBrachail}
                  // {...getFieldProps('perimetreBrachail')}
                  helperText={
                    touched.perimetreBrachail && errors.perimetreBrachail
                  }
                  error={Boolean(
                    touched.perimetreBrachail && errors.perimetreBrachail
                  )}
                />
                <TextField
                  sx={{ padding: "2px" }}
                  // required
                  // fullWidth
                  label="Taille en (Cm) ex: 100"
                  value={patientClinicForm.taille}
                  onChange={handleChangeTaille}
                  // defaultValue={DataPatient.taille}
                  // {...getFieldProps('taille')}
                  error={Boolean(touched.taille && errors.taille)}
                  helperText={touched.taille && errors.taille}
                />
                {/* <TextField
                  sx={{ padding: "2px" }}
                  // required
                  // fullWidth
                  label="Diversification alimentaire à quel âge (en mois) ex:20"
                  value={patientClinicForm.diversificationAliment}
                  onChange={handleChangeDiversificationAliment}
                  // {...getFieldProps('diversificationAliment')}
                  // defaultValue={DataPatient.diversificationAliment}
                  helperText={
                    touched.diversificationAliment &&
                    errors.diversificationAliment
                  }
                  error={Boolean(
                    touched.diversificationAliment &&
                      errors.diversificationAliment
                  )}
                /> */}
                {/* <TextField
                  sx={{ padding: "2px" }}
                  label="Constitution/type d’aliment"
                  value={patientClinicForm.constitutionAliment}
                  onChange={handleChangeConstitutionAliment}
                  // {...getFieldProps('constitutionAliment')}
                  // defaultValue={DataPatient.constitutionAliment}
                  helperText={
                    touched.constitutionAliment && errors.constitutionAliment
                  }
                  error={Boolean(
                    touched.constitutionAliment && errors.constitutionAliment
                  )}
                /> */}
                {/* <RadioGroup
                  onChange={handleChangeRationPatient}
                  error={Boolean(touched.rationSeche && errors.rationSeche)}
                  helperText={touched.rationSeche && errors.rationSeche}
                  // setValues={  DataPatient.Sexe}
                >
                  <Stack
                    direction={{ xs: "column", md: "column", sm: "row" }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "10px",
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
                </RadioGroup> */}
                <RadioGroup
                  // {...getFieldProps('allaitementExclusifSixMois')}
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
                  // {...getFieldProps('modeArriver')}
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
                {/* <RadioGroup
                  // {...getFieldProps('transfererUnt')}
                  onChange={handleChangeTransfererUnt}
                  helperText={touched.transfererUnt && errors.transfererUnt}
                  error={Boolean(touched.transfererUnt && errors.transfererUnt)}
                  // onChange={handleAllaitementExclusifSixMoix}
                >
                  <Stack
                    direction={{ xs: "column", sm: "column", md: "row" }}
                    sx={{
                      display: "flex",
                      padding: "10px",
                      alignItems: "center",
                      border: `${
                        Boolean(
                          touched.transfererUnt && errors.transfererUnt
                        ) && "1px solid red"
                      }`,
                      borderRadius: `${
                        Boolean(
                          touched.transfererUnt && errors.transfererUnt
                        ) && "10px"
                      }`,
                    }}
                    spacing={1}
                  >
                    <FormLabel
                      component="label"
                      // style={{ color: `${errors.allaitementExclusifSixMois && 'red'}` }}
                    >
                      Transfer UNT:
                    </FormLabel>
                    <Stack direction={{ xs: "row", sm: "row" }}>
                      <FormControlLabel
                        value="true"
                        control={
                          <Radio
                            checked={patientClinicForm.transfererUnt === "true"}
                          />
                        }
                        label="Oui"
                      />
                      <FormControlLabel
                        value="false"
                        control={
                          <Radio
                            checked={patientClinicForm.transfererUnt === "false"}
                          />
                        }
                        label="Non"
                      />
                    </Stack>
                  </Stack>
                </RadioGroup> */}
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
                      href="https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/body-mass-index-for-age/cht-bfa-boys-z-0-5.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      IMC
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
                      href="https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/body-mass-index-for-age/cht-bfa-girls-z-0-5.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      IMC
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
                  // {...getFieldProps('typeMalnutrition')}
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
                  // {...getFieldProps('traitementNutritionnel')}
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
                  // fullWidth
                  label="Si le traitement nutritionnel est autre veuillez préciser"
                  // defaultValue={DataPatient.traitementNutritionnelAutre}
                  onChange={handleChangeNutritionnelAutre}
                  value={patientClinicForm.traitementNutritionnelAutre}
                  disabled={traitementNutri}
                  helperText={
                    touched.traitementNutritionnelAutre &&
                    errors.traitementNutritionnelAutre
                  }
                  // {...getFieldProps('traitementNutritionnelAutre')}
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
              {/* <LoadingButton
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
              </LoadingButton> */}

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
