import * as Yup from "yup";
import propTypes from "prop-types";
import { useState, useEffect } from "react";
import { useFormik, Form, FormikProvider } from "formik";
// import { useNavigate } from 'react-router-dom';

// material
import {
  // Box,
  // MenuItem,
  Stack,
  TextField,
  // Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Grid,
  // InputLabel,
  Select,
  // styled
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";

// ----------------------------------------------------------------------
CauseForm.propTypes = {
  NextStep: propTypes.func,
  PrevStep: propTypes.func,
  SetDataPatient: propTypes.func,
  patientFormCause: propTypes.any,
};

export default function CauseForm({
  NextStep,
  SetDataPatient,
  PrevStep,
  patientFormCause,
}) {
  const [tbcDesabled, setTbcDesabled] = useState(true);
  const [hospitalisationDesabled, setHospitalisationDesabled] = useState(true);
  const [priseProduitBasePlanteDesabled, setpriseProduitBasePlanteDesabled] =
    useState(true);
  const [calendrierVaccinDesabled, setCalendrierVaccinDesabled] =
    useState(true);
  const [cocktailAtbDesabled, setcocktailAtbDesabled] = useState(true);
  const [listAtbDisable, setListAtbDisable] = useState(true);
  const [dpmDesabled, setdpmDesabled] = useState(true);
  const [
    tbcGueriEtDuréTraitementDesabled,
    setTbcGueriEtDuréTraitementDesabled,
  ] = useState(true);
  const [allaitement, setAllaitement] = useState(false);
  const [masDesabled, setMasDesabled] = useState(true);
  const [position] = useState(0);
  useEffect(() => {
    window.scroll(position, position);
  }, [position]);

  const RegisterSchema = Yup.object().shape({
    lieuAccouchement: Yup.string(),
    tailleFratrie: Yup.number().min(1).max(99),
    sejourNeo: Yup.string(),
    masFratrie: Yup.string().trim().min(4).max(6),
    atcdMas: Yup.string(),
    atcdRougeole: Yup.string().trim(),
    tbcChezParent: Yup.string().trim(),
    tbcLequel: Yup.string().trim(),
    tbcTraiter: Yup.string().trim(),
    tbc: Yup.boolean(),
    hospitalisationRecente: Yup.string(),
    diagnostiqueHospitalisation: Yup.string().min(5).trim(),
    transfererUnt: Yup.string().trim().min(2, "Min 2 caractère"),
    dureeTraitementTbc: Yup.string().min(3).trim(),
    termeGrossesse: Yup.string().trim(),
    calendrierVaccin: Yup.string(),
    atcdDuTbcDansFratrie: Yup.string().trim(),
    preciserCalendrierVaccinNonjour: Yup.string(),
    asphyxiePrerinatale: Yup.string().trim(),
    rangFratrie: Yup.string(),
    produitPlante: Yup.string(),
    terrainVih: Yup.string().trim(),
    nombreChute: Yup.number().min(0),
    vaccinationRougeole: Yup.string().trim(),
    eig: Yup.number(),
    TbcGuerie: Yup.string().trim(),
    dpm: Yup.string(),
    cocktailAtb: Yup.string(),
    cocktailAtbDuree: Yup.string().trim().min(3),
    listAtb: Yup.string().min(4),
    atb: Yup.boolean(),
    dureeTraitementProduitPlante: Yup.string().min(3),
    dpmAnormalPrecision: Yup.string().trim().min(10),
    poidsNaissance: Yup.number()
      .positive()
      .min(900, "Minimum 900 gr")
      .required("requis"),
    allaitementExclusifSixMois: Yup.string()
      .trim()
      .min(2, "Min 2 caractère")
      .required("Champs requis"),
    ageFinAllaitement: Yup.number()
      .min(1, "Minimum 1 mois")
      .positive("champs doit être positive"),
    diversificationAliment: Yup.number("un nombre")
      .positive("nombre positif")
      .min(1, "Minimum 1 mois"),
    constitutionAliment: Yup.string().trim().min(2, "Min 2 caractère"),
    consommationPoisson: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      rangFratrie: patientFormCause.rangFratrie
        ? patientFormCause.rangFratrie
        : "",
      lieuAccouchement: patientFormCause.lieuAccouchement
        ? patientFormCause.lieuAccouchement
        : "",
      sejourNeo: patientFormCause.sejourNeo ? patientFormCause.sejourNeo : "",
      cocktailAtbDuree: patientFormCause.cocktailAtbDuree
        ? patientFormCause.cocktailAtbDuree
        : "",
      cocktailAtb: patientFormCause.cocktailAtb
        ? patientFormCause.cocktailAtb
        : "",
      listAtb: patientFormCause.listAtb ? patientFormCause.listAtb : "",
      atb: patientFormCause.atb ? patientFormCause.atb : "false",
      atcdMas: patientFormCause.atcdMas ? patientFormCause.atcdMas : "",
      atcdRougeole: patientFormCause.atcdRougeole
        ? patientFormCause.atcdRougeole
        : "",
      tbcChezParent: patientFormCause.tbcChezParent
        ? patientFormCause.tbcChezParent
        : "",
      tbcLequel: patientFormCause.tbcLequel ? patientFormCause.tbcLequel : "",
      tbcTraiter: patientFormCause.tbcTraiter
        ? patientFormCause.tbcTraiter
        : "",
      dureeTraitementTbc: patientFormCause.dureeTraitementTbc
        ? patientFormCause.dureeTraitementTbc
        : "",
      TbcGuerie: patientFormCause.TbcGuerie ? patientFormCause.TbcGuerie : "",
      termeGrossesse: patientFormCause.termeGrossesse
        ? patientFormCause.termeGrossesse
        : "",
      calendrierVaccin: patientFormCause.calendrierVaccin
        ? patientFormCause.calendrierVaccin
        : "",
      preciserCalendrierVaccinNonjour:
        patientFormCause.preciserCalendrierVaccinNonjour
          ? patientFormCause.preciserCalendrierVaccinNonjour
          : "",
      asphyxiePrerinatale: patientFormCause.asphyxiePrerinatale
        ? patientFormCause.asphyxiePrerinatale
        : "",
      tailleFratrie: patientFormCause.tailleFratrie
        ? patientFormCause.tailleFratrie
        : "",
      masFratrie: patientFormCause.masFratrie
        ? patientFormCause.masFratrie
        : "",
      terrainVih: patientFormCause.terrainVih
        ? patientFormCause.terrainVih
        : "",
      nombreChute: patientFormCause.nombreChute
        ? patientFormCause.nombreChute
        : "",
      vaccinationRougeole: patientFormCause.vaccinationRougeole
        ? patientFormCause.vaccinationRougeole
        : "",
      eig: patientFormCause.eig ? patientFormCause.eig : "",
      dpm: patientFormCause.dpm ? patientFormCause.dpm : "",
      tbc: patientFormCause.tbc ? patientFormCause.tbc : "false",
      produitPlante: patientFormCause.produitPlante
        ? patientFormCause.produitPlante
        : "",
      hospitalisationRecente: patientFormCause.hospitalisationRecente
        ? patientFormCause.hospitalisationRecente
        : "",
      diagnostiqueHospitalisation: patientFormCause.diagnostiqueHospitalisation
        ? patientFormCause.diagnostiqueHospitalisation
        : "",
      atcdDuTbcDansFratrie: patientFormCause.atcdDuTbcDansFratrie
        ? patientFormCause.atcdDuTbcDansFratrie
        : "",
      dpmAnormalPrecision: patientFormCause.dpmAnormalPrecision
        ? patientFormCause.dpmAnormalPrecision
        : "",
      dureeTraitementProduitPlante:
        patientFormCause.dureeTraitementProduitPlante
          ? patientFormCause.dureeTraitementProduitPlante
          : "",
      poidsNaissance: patientFormCause.poidsNaissance
        ? patientFormCause.poidsNaissance
        : "",
      allaitementExclusifSixMois: patientFormCause.AllaitementExclisifSixMois
        ? patientFormCause.AllaitementExclisifSixMois
        : "",
      ageFinAllaitement: patientFormCause.ageFinAllaitement
        ? patientFormCause.ageFinAllaitement
        : "",
      diversificationAliment: patientFormCause.diversificationAliment
        ? patientFormCause.diversificationAliment
        : "",
      constitutionAliment: patientFormCause.constitutionAliment
        ? patientFormCause.constitutionAliment
        : "",
      consommationPoisson: patientFormCause.consommationPoisson
        ? patientFormCause.consommationPoisson
        : "",
      transfererUnt: patientFormCause.transfererUnt
        ? patientFormCause.transfererUnt
        : "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (CauseMalnutrition) => {
      if (
        CauseMalnutrition.tbcChezParent === "true" &&
        CauseMalnutrition.tbcLequel === ""
      ) {
        throw alert("Veuillez preciser TBC chez parent");
      }
      if (
        CauseMalnutrition.tbcTraiter === "" &&
        CauseMalnutrition.tbcLequel !== ""
      ) {
        throw alert("Veuillez preciser la  TBC chez parent si traiter ");
      }
      if (
        CauseMalnutrition.tbcTraiter === "true" &&
        CauseMalnutrition.dureeTraitementTbc === "" &&
        CauseMalnutrition.TbcGuerie === ""
      ) {
        throw alert(
          "Veuillez preciser la durée du traitement de tbc et si elle a été gueri "
        );
      }
      if (
        CauseMalnutrition.hospitalisationRecente === "true" &&
        CauseMalnutrition.diagnostiqueHospitalisation === ""
      ) {
        throw alert("Veuillez preciser le diagnostique de l'hoptal");
      }
      if (
        CauseMalnutrition.produitPlante === "true" &&
        CauseMalnutrition.dureeTraitementProduitPlante === ""
      ) {
        throw alert(
          "Veuillez preciser la durée de Prise des produits à base des plantes"
        );
      }
      if (
        CauseMalnutrition.calendrierVaccin ===
          "Calendrier vaccinal non à jour" &&
        CauseMalnutrition.preciserCalendrierVaccinNonjour === ""
      ) {
        throw alert("Veuillez preciser le vaccin non à jour");
      }
      if (
        CauseMalnutrition.dpm === "Anormal" &&
        CauseMalnutrition.dpmAnormalPrecision === ""
      ) {
        throw alert("Veuillez expliquer pour quoi le DPM est anormal");
      }
      if (
        CauseMalnutrition.cocktailAtb === "true" &&
        CauseMalnutrition.cocktailAtbDuree === ""
      ) {
        throw alert("Veuillez préciser la durée du cocktail Atb");
      }
      if (
        CauseMalnutrition.atb === "true" &&
        CauseMalnutrition.listAtb === ""
      ) {
        throw alert("Veuillez preciser la liste de ATB");
      }
      if (
        CauseMalnutrition.allaitementExclusifSixMois === "false" &&
        CauseMalnutrition.ageFinAllaitement === ""
      ) {
        throw alert(
          "Veuillez preciser le nombre l'age fin allaitment en (mois) "
        );
      }
      SetDataPatient((current) => ({ ...current, CauseMalnutrition }));
      NextStep();
    },
  });

  const { errors, touched, setFieldValue, handleSubmit, values } = formik;
  // console.log(values.tbcTraiter === 'true' && values.TbcGuerie === '');

  const handleDesablebComponent = (event) => {
    const { value } = event.target;
    setFieldValue("tbcChezParent", value);
    patientFormCause.setTbcChezParent(value);
    if (value === "true") {
      setTbcDesabled(false);
    } else {
      setTbcDesabled(true);
    }
  };
  const handleChangeHospitalisation = (event) => {
    const { value } = event.target;
    setFieldValue("hospitalisationRecente", value);
    patientFormCause.sethospitalisationRecente(value);
    if (value === "true") setHospitalisationDesabled(false);
    else setHospitalisationDesabled(true);
  };
  const handleChangePriseProduitBasePlante = (event) => {
    const { value } = event.target;
    setFieldValue("produitPlante", value);
    patientFormCause.setProduitPlante(value);

    if (value === "true") setpriseProduitBasePlanteDesabled(false);
    else setpriseProduitBasePlanteDesabled(true);
  };
  const handleCalendrierVaccin = (event) => {
    const { value } = event.target;
    setFieldValue("calendrierVaccin", value);
    patientFormCause.setCalendrierVaccin(value);
    if (value === "Calendrier vaccinal à jour") {
      setCalendrierVaccinDesabled(true);
    } else {
      setCalendrierVaccinDesabled(false);
    }
  };
  const handlecocktailAtb = (event) => {
    const { value } = event.target;
    setFieldValue("cocktailAtb", value);
    patientFormCause.setCocktailAtb(value);
    if (value === "true") {
      setcocktailAtbDesabled(false);
    } else {
      setcocktailAtbDesabled(true);
    }
  };
  const handleAtb = (event) => {
    const { value } = event.target;
    setFieldValue("atb", value);
    patientFormCause.setAtb(value);
    if (value === "true") setListAtbDisable(false);
    else setListAtbDisable(true);
  };
  const handleListAtb = (event) => {
    const { value } = event.target;
    setFieldValue("listAtb", value);
    patientFormCause.setListAtb(value);
  };

  const handleChangeTransfererUnt = (event) => {
    const { value } = event.target;
    setFieldValue("transfererUnt", value);
    patientFormCause.setTransfererUnt(value);
  };
  const handleDpm = (event) => {
    const { value } = event.target;
    setFieldValue("dpm", value);
    patientFormCause.setDpm(value);
    if (value === "Normal") {
      setdpmDesabled(true);
    } else {
      setdpmDesabled(false);
    }
  };
  const handleLieuAccouchement = (event) => {
    const { value } = event.target;
    setFieldValue("lieuAccouchement", value);
    patientFormCause.setLieuAccouchement(value);
  };
  const handleSejourNeo = (event) => {
    const { value } = event.target;
    setFieldValue("sejourNeo", value);
    patientFormCause.setSejourNeo(value);
  };

  const handleRangFratrie = (event) => {
    const { value } = event.target;
    setFieldValue("rangFratrie", value);
    patientFormCause.setRangFratrie(value);
  };

  const handleTailleFratrie = (event) => {
    const { value } = event.target;
    setFieldValue("tailleFratrie", value);
    patientFormCause.setTailleFratrie(value);
  };

  const handleMasFratrie = (event) => {
    const { value } = event.target;
    setFieldValue("masFratrie", value);
    patientFormCause.setMasFratrie(value);
  };

  const handleEig = (event) => {
    const { value } = event.target;
    setFieldValue("eig", value);
    patientFormCause.setEig(value);
  };

  const handleTbc = (event) => {
    const { value } = event.target;
    setFieldValue("tbc", value);
    patientFormCause.setTbc(value);
  };

  const handleTbcLequel = (event) => {
    const { value } = event.target;
    setFieldValue("tbcLequel", value);
    patientFormCause.setTbcLequel(value);
  };

  const handleTbcTraiter = (event) => {
    const { value } = event.target;
    setFieldValue("tbcTraiter", value);
    patientFormCause.setTbcTraiter(value);
    if (value === "true") {
      setTbcGueriEtDuréTraitementDesabled(false);
    } else if (value === "false") setTbcGueriEtDuréTraitementDesabled(true);
  };

  const handleTbcGuerie = (event) => {
    const { value } = event.target;
    setFieldValue("TbcGuerie", value);
    patientFormCause.setTbcGuerie(value);
  };

  const handleDureeTraitementTbc = (event) => {
    const { value } = event.target;
    setFieldValue("dureeTraitementTbc", value);
    patientFormCause.setDureeTraitementTbc(value);
  };

  const handleDiagnostiqueHospitalisation = (event) => {
    const { value } = event.target;
    setFieldValue("diagnostiqueHospitalisation", value);
    patientFormCause.setDiagnostiqueHospitalisation(value);
  };
  const handleDureeTraitementProduitPlante = (event) => {
    const { value } = event.target;
    setFieldValue("dureeTraitementProduitPlante", value);
    patientFormCause.setDureeTraitementProduitPlante(value);
  };
  const handleDureeTermeGrossesse = (event) => {
    const { value } = event.target;
    setFieldValue("termeGrossesse", value);
    patientFormCause.setTermeGrossesse(value);
  };
  const handlePreciserCalendrierVaccinNonjour = (event) => {
    const { value } = event.target;
    setFieldValue("preciserCalendrierVaccinNonjour", value);
    patientFormCause.setPreciserCalendrierVaccinNonjour(value);
  };
  const handleAtcdMas = (event) => {
    const { value } = event.target;
    setFieldValue("atcdMas", value);
    patientFormCause.setAtcdMas(value);
    if (value === "true") {
      setMasDesabled(true);
    } else {
      setMasDesabled(false);
    }
  };
  const handleDpmAnormalPrecision = (event) => {
    const { value } = event.target;
    setFieldValue("dpmAnormalPrecision", value);
    patientFormCause.setDpmAnormalPrecision(value);
  };
  const handleAtcdRougeole = (event) => {
    const { value } = event.target;
    setFieldValue("atcdRougeole", value);
    patientFormCause.setAtcdRougeole(value);
  };
  const handleTerrainVih = (event) => {
    const { value } = event.target;
    setFieldValue("terrainVih", value);
    patientFormCause.setTerrainVih(value);
  };
  const handleNombreChute = (event) => {
    const { value } = event.target;
    setFieldValue("nombreChute", value);
    patientFormCause.setNombreChute(value);
  };
  const handleVaccinationRougeole = (event) => {
    const { value } = event.target;
    setFieldValue("vaccinationRougeole", value);
    patientFormCause.setVaccinationRougeole(value);
  };
  const handleAsphyxiePrerinatale = (event) => {
    const { value } = event.target;
    setFieldValue("asphyxiePrerinatale", value);
    patientFormCause.setAsphyxiePrerinatale(value);
  };
  const handleCocktailAtbDuree = (event) => {
    const { value } = event.target;
    setFieldValue("cocktailAtbDuree", value);
    patientFormCause.setCocktailAtbDuree(value);
  };
  const handleAtcdDuTbcDansFratrie = (event) => {
    const { value } = event.target;
    setFieldValue("atcdDuTbcDansFratrie", value);
    patientFormCause.setAtcdDuTbcDansFratrie(value);
  };
  const handleChangePoidsnaissance = (event) => {
    const { value } = event.target;
    setFieldValue("poidsNaissance", value);
    patientFormCause.setPoidsNaissance(value);
  };
  const handleAllaitementExclusifSixMoix = (event) => {
    const { value } = event.target;
    setFieldValue("allaitementExclusifSixMois", value);
    patientFormCause.setAllaitementExclisifSixMois(value);
    if (value === "true") {
      setAllaitement(true);
    } else {
      setAllaitement(false);
    }
  };
  const handleChangeAgeFinAllaitement = (event) => {
    const { value } = event.target;
    setFieldValue("ageFinAllaitement", value);
    patientFormCause.setAgeFinAllaitement(value);
  };
  const handleChangeDiversificationAliment = (event) => {
    const { value } = event.target;
    setFieldValue("diversificationAliment", value);
    patientFormCause.setDiversificationAliment(value);
  };
  const handleChangeConstitutionAliment = (event) => {
    const { value } = event.target;
    setFieldValue("constitutionAliment", value);
    patientFormCause.setConstitutionAliment(value);
  };
  const handleConsommationPoisson = (event) => {
    const { value } = event.target;
    setFieldValue("consommationPoisson", value);
    patientFormCause.setConsommationPoisson(value);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={10} sm={6} md={6}>
            {/* <Stack spacing={0}> */}
            <TextField
              fullWidth
              sx={{ padding: "2px", marginTop: "24px" }}
              value={patientFormCause.eig}
              label="EIG moyen (mois)"
              // {...getFieldProps('eig')}
              onChange={handleEig}
              error={Boolean(touched.eig && errors.eig)}
              helperText={touched.eig && errors.eig}
            />
            <Select
              native
              fullWidth
              // {...getFieldProps('termeGrossesse')}
              sx={{ marginTop: "24px" }}
              onChange={handleDureeTermeGrossesse}
              error={Boolean(touched.termeGrossesse && errors.termeGrossesse)}
              helperText={touched.termeGrossesse && errors.termeGrossesse}
            >
              <option value="" selected disabled hidden>
                {`${
                  patientFormCause.termeGrossesse
                    ? patientFormCause.termeGrossesse
                    : "Terme de la grossesse"
                }`}
              </option>
              <option value="Prématuré ">Prématuré</option>
              <option value="A terme">A terme</option>
            </Select>
            <Select
              native
              fullWidth
              autoFocus
              sx={{ padding: "2px", marginTop: "24px" }}
              // value={}
              error={Boolean(
                touched.lieuAccouchement && errors.lieuAccouchement
              )}
              onChange={handleLieuAccouchement}
              // {...getFieldProps('lieuAccouchement')}
            >
              <option value="" selected disabled hidden>
                {`${
                  patientFormCause.lieuAccouchement
                    ? patientFormCause.lieuAccouchement
                    : "Lieu d'accouchement"
                }`}
              </option>
              <option value="Voiture">Voiture</option>
              <option value="domicile">domicile</option>
              <option value="Structure sanitaire oui">
                Structure sanitaire
              </option>
            </Select>
            <Select
              native
              fullWidth
              sx={{ marginTop: "24px" }}
              onChange={handleAsphyxiePrerinatale}
              helperText={
                touched.asphyxiePrerinatale && errors.asphyxiePrerinatale
              }
              // {...getFieldProps('asphyxiePrerinatale')}
              error={Boolean(
                touched.asphyxiePrerinatale && errors.asphyxiePrerinatale
              )}
            >
              <option value="" selected disabled hidden>
                {`${
                  patientFormCause.asphyxiePrerinatale
                    ? patientFormCause.asphyxiePrerinatale
                    : "Asphyxie périnatale"
                }`}
              </option>
              <option value="pas de cri">pas de cri</option>
              <option value="a crié spontanément oui">
                a crié spontanément
              </option>
              <option value="cri après réanimation">
                cri après réanimation
              </option>
            </Select>
            <RadioGroup
              // fullWidth
              sx={{ marginTop: "24px" }}
              error={Boolean(touched.sejourNeo && errors.sejourNeo)}
              // helperText={touched.sejourNeo && errors.sejourNeo}
              // {...getFieldProps('sejourNeo')}
              onChange={handleSejourNeo}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  paddingLeft: "10px",
                  border: `${
                    Boolean(touched.sejourNeo && errors.sejourNeo) &&
                    "1px solid red"
                  }`,
                  borderRadius: `${
                    Boolean(touched.sejourNeo && errors.sejourNeo) && "10px"
                  }`,
                }}
                spacing={1}
              >
                <FormLabel component="label">Séjour en néonat:</FormLabel>
                <Stack direction={{ xs: "row", sm: "row" }}>
                  <FormControlLabel
                    value="true"
                    control={
                      <Radio checked={patientFormCause.sejourNeo === "true"} />
                    }
                    label="Oui"
                  />
                  <FormControlLabel
                    value="false"
                    control={
                      <Radio checked={patientFormCause.sejourNeo === "false"} />
                    }
                    label="Non"
                  />
                </Stack>
              </Stack>
            </RadioGroup>
            <Select
              native
              fullWidth
              sx={{ marginTop: "24px" }}
              // {...getFieldProps('dpm')}
              onChange={handleDpm}
              helperText={touched.dpm && errors.dpm}
              error={Boolean(touched.dpm && errors.dpm)}
            >
              <option value="" selected disabled hidden>
                {`${patientFormCause.dpm ? patientFormCause.dpm : "DPM"}`}
              </option>
              <option value="Normal">Normal</option>
              <option value="Anormal">Anormal</option>
            </Select>
            <TextField
              sx={{ padding: "2px", marginTop: "24px" }}
              fullWidth
              disabled={dpmDesabled}
              value={patientFormCause.dpmAnormalPrecision}
              label="Si DPM est anormal veuillez préciser"
              onChange={handleDpmAnormalPrecision}
              // {...getFieldProps('dpmAnormalPrecision')}
              helperText={
                touched.dpmAnormalPrecision && errors.dpmAnormalPrecision
              }
              error={
                Boolean(
                  touched.dpmAnormalPrecision && errors.dpmAnormalPrecision
                ) ||
                Boolean(
                  values.dpm === "Anormal" && values.dpmAnormalPrecision === ""
                )
              }
            />
            <TextField
              sx={{ padding: "2px", marginTop: "24px" }}
              fullWidth
              label="Poids naissance (gr) ex:1500"
              value={patientFormCause.poidsNaissance}
              onChange={handleChangePoidsnaissance}
              // {...getFieldProps('poidsNaissance')}
              helperText={touched.poidsNaissance && errors.poidsNaissance}
              error={Boolean(touched.poidsNaissance && errors.poidsNaissance)}
            />
            <RadioGroup
              // {...getFieldProps('allaitementExclusifSixMois')}
              sx={{ marginTop: "24px" }}
              helperText={
                touched.allaitementExclusifSixMois &&
                errors.allaitementExclusifSixMois
              }
              error={Boolean(
                touched.allaitementExclusifSixMois &&
                  errors.allaitementExclusifSixMois
              )}
              onChange={handleAllaitementExclusifSixMoix}
            >
              <Stack
                direction={{ xs: "column", sm: "column", md: "row" }}
                sx={{
                  display: "flex",
                  paddingLeft: "10px",
                  alignItems: "center",
                  border: `${
                    Boolean(
                      touched.allaitementExclusifSixMois &&
                        errors.allaitementExclusifSixMois
                    ) && "1px solid red"
                  }`,
                  borderRadius: `${
                    Boolean(
                      touched.allaitementExclusifSixMois &&
                        errors.allaitementExclusifSixMois
                    ) && "10px"
                  }`,
                }}
                spacing={1}
              >
                <FormLabel component="label">
                  Allaitement exclusif 6 mois:
                </FormLabel>
                <Stack direction={{ xs: "row", sm: "row" }}>
                  <FormControlLabel
                    value="true"
                    control={
                      <Radio
                        checked={
                          patientFormCause.AllaitementExclisifSixMois === "true"
                        }
                      />
                    }
                    label="Oui"
                  />
                  <FormControlLabel
                    value="false"
                    control={
                      <Radio
                        checked={
                          patientFormCause.AllaitementExclisifSixMois ===
                          "false"
                        }
                      />
                    }
                    label="Non"
                  />
                </Stack>
              </Stack>
            </RadioGroup>
            <TextField
              sx={{ padding: "2px", marginTop: "24px" }}
              fullWidth
              disabled={allaitement}
              // disabled={patientFormData.AllaitementExclisifSixMois}
              label="Si non à quel âge fin allaitement (mois) ex:14"
              onChange={handleChangeAgeFinAllaitement}
              value={patientFormCause.ageFinAllaitement}
              // {...getFieldProps('ageFinAllaitement')}
              //  defaultValue={DataPatient.ageFinAllaitement}
              helperText={touched.ageFinAllaitement && errors.ageFinAllaitement}
              error={
                Boolean(
                  touched.ageFinAllaitement && errors.ageFinAllaitement
                ) ||
                Boolean(
                  values.allaitementExclusifSixMois === "false" &&
                    values.ageFinAllaitement === ""
                )
              }
            />
            <TextField
              sx={{ padding: "2px", marginTop: "24px" }}
              // required
              fullWidth
              label="Diversification alimentaire à quel âge (en mois) ex:20"
              value={patientFormCause.diversificationAliment}
              onChange={handleChangeDiversificationAliment}
              // {...getFieldProps('diversificationAliment')}
              // defaultValue={DataPatient.diversificationAliment}
              helperText={
                touched.diversificationAliment && errors.diversificationAliment
              }
              error={Boolean(
                touched.diversificationAliment && errors.diversificationAliment
              )}
            />
            <TextField
              sx={{ padding: "2px", marginTop: "24px" }}
              fullWidth
              label="Constitution / type d’aliment"
              value={patientFormCause.constitutionAliment}
              onChange={handleChangeConstitutionAliment}
              // {...getFieldProps('constitutionAliment')}
              // defaultValue={DataPatient.constitutionAliment}
              helperText={
                touched.constitutionAliment && errors.constitutionAliment
              }
              error={Boolean(
                touched.constitutionAliment && errors.constitutionAliment
              )}
            />
            <RadioGroup
              sx={{ marginTop: "24px" }}
              // {...getFieldProps('consommationPoisson')}
              onChange={handleConsommationPoisson}
              // required
              helperText={
                touched.consommationPoisson && errors.consommationPoisson
              }
              error={Boolean(
                touched.consommationPoisson && errors.consommationPoisson
              )}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "10px",
                  border: `${
                    Boolean(
                      touched.consommationPoisson && errors.consommationPoisson
                    ) && "1px solid red"
                  }`,
                  borderRadius: `${
                    Boolean(
                      touched.consommationPoisson && errors.consommationPoisson
                    ) && "10px"
                  }`,
                }}
                spacing={1}
              >
                <FormLabel component="label">
                  Consommation de poisson:
                </FormLabel>
                <FormControlLabel
                  value="true"
                  control={
                    <Radio
                      checked={patientFormCause.consommationPoisson === "true"}
                    />
                  }
                  label="Oui"
                />
                <FormControlLabel
                  value="false"
                  control={
                    <Radio
                      checked={patientFormCause.consommationPoisson === "false"}
                    />
                  }
                  label="Non"
                />
              </Stack>
            </RadioGroup>

            <Select
              native
              fullWidth
              sx={{ marginTop: "24px" }}
              // {...getFieldProps('calendrierVaccin')}
              // required
              onChange={handleCalendrierVaccin}
              error={Boolean(
                touched.calendrierVaccin && errors.calendrierVaccin
              )}
              helperText={touched.calendrierVaccin && errors.calendrierVaccin}
            >
              <option value="" selected disabled hidden>
                {`${
                  patientFormCause.calendrierVaccin
                    ? patientFormCause.calendrierVaccin
                    : "Calendrier vaccinal"
                }`}
              </option>
              <option value="Calendrier vaccinal à jour">
                Calendrier vaccinal à jour
              </option>
              <option value="Calendrier vaccinal non à jour">
                Calendrier vaccinal non à jour
              </option>
            </Select>
            <TextField
              sx={{ padding: "2px", marginTop: "24px" }}
              fullWidth
              value={patientFormCause.preciserCalendrierVaccinNonjour}
              label="Si calendrier vaccinal non à jour veuillez préciser le vaccin non recu ..."
              disabled={calendrierVaccinDesabled}
              onChange={handlePreciserCalendrierVaccinNonjour}
              // {...getFieldProps('preciserCalendrierVaccinNonjour')}
              error={
                Boolean(
                  touched.preciserCalendrierVaccinNonjour &&
                    errors.preciserCalendrierVaccinNonjour
                ) ||
                Boolean(
                  values.calendrierVaccin ===
                    "Calendrier vaccinal non à jour" &&
                    values.preciserCalendrierVaccinNonjour === ""
                )
              }
              helperText={
                touched.preciserCalendrierVaccinNonjour &&
                errors.preciserCalendrierVaccinNonjour
              }
            />
            <RadioGroup
              onChange={handleChangeHospitalisation}
              sx={{ marginTop: "24px" }}
              // {...getFieldProps('hospitalisationRecente')}
              // helperText={touched.hospitalisationRecente && errors.hospitalisationRecente}
              // error={Boolean(touched.hospitalisationRecente && errors.hospitalisationRecente)}
            >
              <Stack
                direction={{ xs: "column", md: "row", sm: "row" }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "10px",
                  border: `${
                    Boolean(
                      touched.hospitalisationRecente &&
                        errors.hospitalisationRecente
                    ) && "1px solid red"
                  }`,
                  borderRadius: `${
                    Boolean(
                      touched.hospitalisationRecente &&
                        errors.hospitalisationRecente
                    ) && "10px"
                  }`,
                }}
                spacing={1}
              >
                <FormLabel component="label">
                  Hospitalisation récente:
                </FormLabel>
                <Stack direction={{ xs: "row", sm: "row" }}>
                  <FormControlLabel
                    value="true"
                    control={
                      <Radio
                        checked={
                          patientFormCause.hospitalisationRecente === "true"
                        }
                      />
                    }
                    label="Oui"
                  />
                  <FormControlLabel
                    value="false"
                    control={
                      <Radio
                        checked={
                          patientFormCause.hospitalisationRecente === "false"
                        }
                      />
                    }
                    label="Non"
                  />
                </Stack>
              </Stack>
            </RadioGroup>
            <TextField
              sx={{ padding: "2px", marginTop: "24px" }}
              fullWidth
              label="Diagnostic hopital"
              value={patientFormCause.diagnostiqueHospitalisation}
              disabled={hospitalisationDesabled}
              onChange={handleDiagnostiqueHospitalisation}
              // {...getFieldProps('diagnostiqueHospitalisation')}
              error={
                Boolean(
                  touched.diagnostiqueHospitalisation &&
                    errors.diagnostiqueHospitalisation
                ) ||
                Boolean(
                  values.hospitalisationRecente === "true" &&
                    values.diagnostiqueHospitalisation === ""
                )
              }
              helperText={
                touched.diagnostiqueHospitalisation &&
                errors.diagnostiqueHospitalisation
              }
            />
            <RadioGroup
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
                    Boolean(touched.transfererUnt && errors.transfererUnt) &&
                    "1px solid red"
                  }`,
                  borderRadius: `${
                    Boolean(touched.transfererUnt && errors.transfererUnt) &&
                    "10px"
                  }`,
                }}
                spacing={1}
              >
                <FormLabel
                  component="label"
                  // style={{ color: `${errors.allaitementExclusifSixMois && 'red'}` }}
                >
                  ATCD hospitalisation en UNTI:
                </FormLabel>
                <Stack direction={{ xs: "row", sm: "row" }}>
                  <FormControlLabel
                    value="true"
                    control={
                      <Radio
                        checked={patientFormCause.transfererUnt === "true"}
                      />
                    }
                    label="Oui"
                  />
                  <FormControlLabel
                    value="false"
                    control={
                      <Radio
                        checked={patientFormCause.transfererUnt === "false"}
                      />
                    }
                    label="Non"
                  />
                </Stack>
              </Stack>
            </RadioGroup>
            {/* </Stack> */}
          </Grid>
          <Grid item xs={10} sm={6} md={6}>
            {/* <Stack> */}

            <TextField
              sx={{ padding: "2px", marginTop: "24px" }}
              label="Rang dans la fratrie"
              fullWidth
              value={patientFormCause.rangFratrie}
              // {...getFieldProps('rangFratrie')}
              onChange={handleRangFratrie}
              error={Boolean(touched.rangFratrie && errors.rangFratrie)}
              helperText={touched.rangFratrie && errors.rangFratrie}
            />
            <TextField
              sx={{ padding: "2px", marginTop: "24px" }}
              fullWidth
              value={patientFormCause.tailleFratrie}
              label="Taille de la fratrie"
              helperText={touched.tailleFratrie && errors.tailleFratrie}
              // {...getFieldProps('tailleFratrie')}
              onChange={handleTailleFratrie}
              error={Boolean(touched.tailleFratrie && errors.tailleFratrie)}
            />

            <RadioGroup
              // fullWidth
              onChange={handleMasFratrie}
              sx={{ marginTop: "24px" }}
              // {...getFieldProps('masFratrie')}
              error={Boolean(touched.masFratrie && errors.masFratrie)}
              // helperText={touched.masFratrie && errors.masFratrie}
            >
              <Stack
                direction={{ xs: "column", sm: "row", md: "row" }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "10px",
                  border: `${
                    Boolean(touched.masFratrie && errors.masFratrie) &&
                    "1px solid red"
                  }`,
                  borderRadius: `${
                    Boolean(touched.masFratrie && errors.masFratrie) && "10px"
                  }`,
                }}
                spacing={1}
              >
                <FormLabel component="label">MAS dans la fratrie:</FormLabel>
                <Stack direction={{ xs: "row", sm: "row" }}>
                  <FormControlLabel
                    value="true"
                    control={
                      <Radio checked={patientFormCause.masFratrie === "true"} />
                    }
                    label="Oui"
                  />
                  <FormControlLabel
                    value="false"
                    control={
                      <Radio
                        checked={patientFormCause.masFratrie === "false"}
                      />
                    }
                    label="Non"
                  />
                </Stack>
              </Stack>
            </RadioGroup>
            <RadioGroup
              required
              // {...getFieldProps('atcdMas')}
              sx={{ marginTop: "24px" }}
              onChange={handleAtcdMas}
              error={Boolean(touched.atcdMas && errors.atcdMas)}
              // helperText={touched.atcdMas && errors.atcdMas}
            >
              <Stack
                direction={{ xs: "column", md: "column", sm: "row" }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "10px",
                  border: `${
                    Boolean(touched.atcdMas && errors.atcdMas) &&
                    "1px solid red"
                  }`,
                  borderRadius: `${
                    Boolean(touched.atcdMas && errors.atcdMas) && "10px"
                  }`,
                }}
                spacing={1}
              >
                <FormLabel component="label">ATCD de MAS:</FormLabel>
                <Stack direction={{ xs: "row", sm: "row" }}>
                  <FormControlLabel
                    value="true"
                    control={
                      <Radio checked={patientFormCause.atcdMas === "true"} />
                    }
                    label="Oui"
                  />
                  <FormControlLabel
                    value="false"
                    control={
                      <Radio checked={patientFormCause.atcdMas === "false"} />
                    }
                    label="Non"
                  />
                </Stack>
              </Stack>
            </RadioGroup>
            <TextField
              sx={{ padding: "2px", marginTop: "24px" }}
              autoComplete="nbr"
              fullWidth
              disabled={!masDesabled}
              type="text"
              value={patientFormCause.nombreChute}
              label="Nombre de rechute"
              onChange={handleNombreChute}
              // {...getFieldProps('nombreChute')}
              helperText={touched.nombreChute && errors.nombreChute}
              error={
                Boolean(touched.nombreChute && errors.nombreChute) ||
                Boolean(values.atcdMas === "true" && values.nombreChute === "")
              }
            />
            <RadioGroup
              sx={{ padding: "2px", marginTop: "24px" }}
              // fullWidth
              onChange={handleVaccinationRougeole}
              helperText={
                touched.vaccinationRougeole && errors.vaccinationRougeole
              }
              // {...getFieldProps('vaccinationRougeole')}
              error={Boolean(
                touched.vaccinationRougeole && errors.vaccinationRougeole
              )}
            >
              <Stack
                direction={{ xs: "column", md: "row", sm: "row" }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "10px",
                  border: `${
                    Boolean(
                      touched.vaccinationRougeole && errors.vaccinationRougeole
                    ) && "1px solid red"
                  }`,
                  borderRadius: `${
                    Boolean(
                      touched.vaccinationRougeole && errors.vaccinationRougeole
                    ) && "10px"
                  }`,
                }}
                spacing={1}
              >
                <FormLabel component="label">Vaccination rougeole:</FormLabel>
                <Stack direction={{ xs: "row", sm: "row" }}>
                  <FormControlLabel
                    value="true"
                    control={
                      <Radio
                        checked={
                          patientFormCause.vaccinationRougeole === "true"
                        }
                      />
                    }
                    label="Oui"
                  />
                  <FormControlLabel
                    value="false"
                    control={
                      <Radio
                        checked={
                          patientFormCause.vaccinationRougeole === "false"
                        }
                      />
                    }
                    label="Non"
                  />
                </Stack>
              </Stack>
            </RadioGroup>
            <RadioGroup
              sx={{ padding: "2px", marginTop: "24px" }}
              // {...getFieldProps('atcdRougeole')}
              onChange={handleAtcdRougeole}
              helperText={touched.atcdRougeole && errors.atcdRougeole}
              error={Boolean(touched.atcdRougeole && errors.atcdRougeole)}
            >
              <Stack
                direction={{ xs: "column", sm: "column" }}
                sx={{
                  display: "flex",
                  // alignItems: 'center',
                  paddingLeft: "10px",
                  border: `${
                    Boolean(touched.atcdRougeole && errors.atcdRougeole) &&
                    "1px solid red"
                  }`,
                  borderRadius: `${
                    Boolean(touched.atcdRougeole && errors.atcdRougeole) &&
                    "10px"
                  }`,
                }}
                spacing={1}
              >
                <FormLabel component="label">
                  ATCD de Rougeole dans la fratrie:
                </FormLabel>
                <Stack direction={{ xs: "row", sm: "row" }}>
                  <FormControlLabel
                    value="true"
                    control={
                      <Radio
                        checked={patientFormCause.atcdRougeole === "true"}
                      />
                    }
                    label="Oui"
                  />
                  <FormControlLabel
                    value="false"
                    control={
                      <Radio
                        checked={patientFormCause.atcdRougeole === "false"}
                      />
                    }
                    label="Non"
                  />
                </Stack>
              </Stack>
            </RadioGroup>

            <RadioGroup
              sx={{ padding: "2px", marginTop: "24px" }}
              onChange={handleTerrainVih}
              // {...getFieldProps('terrainVih')}
              helperText={touched.terrainVih && errors.terrainVih}
              error={Boolean(touched.terrainVih && errors.terrainVih)}
            >
              <Stack
                direction={{ xs: "column", md: "row", sm: "row" }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "10px",
                  border: `${
                    Boolean(touched.terrainVih && errors.terrainVih) &&
                    "1px solid red"
                  }`,
                  borderRadius: `${
                    Boolean(touched.terrainVih && errors.terrainVih) && "10px"
                  }`,
                }}
                spacing={1}
              >
                <FormLabel component="label">Terrain VIH connu:</FormLabel>
                <Stack direction={{ xs: "row", sm: "row" }}>
                  <FormControlLabel
                    value="true"
                    control={
                      <Radio checked={patientFormCause.terrainVih === "true"} />
                    }
                    label="Oui"
                  />
                  <FormControlLabel
                    value="false"
                    control={
                      <Radio
                        checked={patientFormCause.terrainVih === "false"}
                      />
                    }
                    label="Non"
                  />
                </Stack>
              </Stack>
            </RadioGroup>

            <RadioGroup
              // fullWidth
              // {...getFieldProps('tbc')}
              sx={{ marginTop: "24px" }}
              onChange={handleTbc}
              helperText={touched.tbc && errors.tbc}
              error={Boolean(touched.tbc && errors.tbc)}
            >
              <Stack
                direction={{ xs: "column", md: "column", sm: "row" }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "10px",
                  border: `${
                    Boolean(touched.tbc && errors.tbc) && "1px solid red"
                  }`,
                  borderRadius: `${
                    Boolean(touched.tbc && errors.tbc) && "10px"
                  }`,
                }}
                spacing={1}
              >
                <FormLabel component="label">TBC:</FormLabel>
                <Stack direction={{ xs: "row", sm: "row" }}>
                  <FormControlLabel
                    value="true"
                    control={
                      <Radio checked={patientFormCause.tbc === "true"} />
                    }
                    label="Oui"
                  />
                  <FormControlLabel
                    value="false"
                    control={
                      <Radio checked={patientFormCause.tbc === "false"} />
                    }
                    label="Non"
                  />
                </Stack>
              </Stack>
            </RadioGroup>
            <RadioGroup
              onChange={handleAtcdDuTbcDansFratrie}
              sx={{ marginTop: "24px" }}
              // {...getFieldProps('atcdDuTbcDansFratrie')}
              // helperText={touched.atcdDuTbcDansFratrie && errors.atcdDuTbcDansFratrie}
              // error={Boolean(touched.atcdDuTbcDansFratrie && errors.atcdDuTbcDansFratrie)}
            >
              <Stack
                direction={{ xs: "column", md: "column", sm: "column" }}
                sx={{
                  display: "flex",
                  // alignItems: 'center',
                  paddingLeft: "10px",
                  border: `${
                    Boolean(
                      touched.atcdDuTbcDansFratrie &&
                        errors.atcdDuTbcDansFratrie
                    ) && "1px solid red"
                  }`,
                  borderRadius: `${
                    Boolean(
                      touched.atcdDuTbcDansFratrie &&
                        errors.atcdDuTbcDansFratrie
                    ) && "10px"
                  }`,
                }}
                spacing={1}
              >
                <FormLabel component="label">
                  ATCD de TBC dans la fratrie :
                </FormLabel>
                <Stack direction={{ xs: "row", sm: "row" }}>
                  <FormControlLabel
                    value="true"
                    control={
                      <Radio
                        checked={
                          patientFormCause.atcdDuTbcDansFratrie === "true"
                        }
                      />
                    }
                    label="Oui"
                  />
                  <FormControlLabel
                    value="false"
                    control={
                      <Radio
                        checked={
                          patientFormCause.atcdDuTbcDansFratrie === "false"
                        }
                      />
                    }
                    label="Non"
                  />
                </Stack>
              </Stack>
            </RadioGroup>

            <RadioGroup
              // fullWidth
              onChange={handleDesablebComponent}
              sx={{ marginTop: "24px" }}
              // {...getFieldProps('tbcChezParent')}
              error={Boolean(touched.tbcChezParent && errors.tbcChezParent)}
              // helperText={touched.tbcChezParent && errors.tbcChezParent}
            >
              <Stack
                direction={{ xs: "column", sm: "row", md: "row" }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "10px",
                  border: `${
                    Boolean(touched.tbcChezParent && errors.tbcChezParent) &&
                    "1px solid red"
                  }`,
                  borderRadius: `${
                    Boolean(touched.tbcChezParent && errors.tbcChezParent) &&
                    "10px"
                  }`,
                }}
                spacing={1}
              >
                <FormLabel component="label"> TBC chez les parents:</FormLabel>
                <Stack
                  direction={{ xs: "row", sm: "row" }}
                  helperText={touched.tbcChezParent && errors.tbcChezParent}
                >
                  <FormControlLabel
                    value="true"
                    // disabled={tbcDesabled}
                    control={
                      <Radio
                        checked={patientFormCause.tbcChezParent === "true"}
                      />
                    }
                    label="Oui"
                  />
                  <FormControlLabel
                    value="false"
                    // disabled={tbcDesabled}
                    control={
                      <Radio
                        checked={patientFormCause.tbcChezParent === "false"}
                      />
                    }
                    label="Non"
                  />
                </Stack>
              </Stack>
            </RadioGroup>
            <Select
              native
              fullWidth
              // {...getFieldProps('tbcLequel')}
              sx={{ marginTop: "24px" }}
              onChange={handleTbcLequel}
              error={
                Boolean(touched.tbcLequel && errors.tbcLequel) ||
                Boolean(
                  values.tbcChezParent === "true" && values.tbcLequel === ""
                )
              }
              disabled={tbcDesabled}
            >
              <option value="" selected disabled hidden>
                {`${
                  patientFormCause.tbcLequel
                    ? patientFormCause.tbcLequel
                    : "Si TBC chez les parents lequel"
                }`}
              </option>
              <option value="Père">Père</option>
              <option value="Mère">Mère</option>
              <option value="Les deux">Les deux</option>
            </Select>
            <RadioGroup
              // fullWidth
              // {...getFieldProps('tbcTraiter')}
              sx={{ marginTop: "24px" }}
              onChange={handleTbcTraiter}
              error={Boolean(touched.tbcTraiter && errors.tbcTraiter)}
            >
              <Stack
                direction={{ xs: "column", md: "column", sm: "row" }}
                // sx={{ display: 'flex', alignItems: 'center' }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "10px",
                  border: `${
                    (Boolean(
                      values.tbcChezParent === "true" && values.tbcLequel === ""
                    ) ||
                      Boolean(touched.tbcTraiter && errors.tbcTraiter)) &&
                    "1px solid red"
                  }`,
                  borderRadius: `${
                    (Boolean(
                      values.tbcChezParent === "true" && values.tbcLequel === ""
                    ) ||
                      Boolean(touched.tbcTraiter && errors.tbcTraiter)) &&
                    "10px"
                  }`,
                }}
                spacing={1}
              >
                <FormLabel component="label">TBC traitée :</FormLabel>
                <Stack direction={{ xs: "row", sm: "row" }}>
                  <FormControlLabel
                    value="true"
                    disabled={tbcDesabled}
                    control={
                      <Radio checked={patientFormCause.tbcTraiter === "true"} />
                    }
                    label="Oui"
                  />
                  <FormControlLabel
                    value="false"
                    disabled={tbcDesabled}
                    control={
                      <Radio
                        checked={patientFormCause.tbcTraiter === "false"}
                      />
                    }
                    label="Non"
                  />
                </Stack>
              </Stack>
            </RadioGroup>
            <RadioGroup
              // fullWidth
              // {...getFieldProps('TbcGuerie')}
              sx={{ marginTop: "24px" }}
              onChange={handleTbcGuerie}
              // error={
              //   Boolean(touched.TbcGuerie && errors.TbcGuerie) ||
              //   Boolean(values.tbcTraiter === 'true' && values.TbcGuerie === '')
              // }
            >
              <Stack
                direction={{ xs: "column", sm: "row", md: "row" }}
                // sx={{ display: 'flex', alignItems: 'center' }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "10px",
                  border: `${
                    Boolean(touched.TbcGuerie && errors.TbcGuerie) ||
                    (Boolean(
                      values.tbcTraiter === "true" && values.TbcGuerie === ""
                    ) &&
                      "1px solid red")
                  }`,
                  borderRadius: `${
                    Boolean(touched.TbcGuerie && errors.TbcGuerie) ||
                    (Boolean(
                      values.tbcTraiter === "true" && values.TbcGuerie === ""
                    ) &&
                      "10px")
                  }`,
                }}
                spacing={1}
              >
                <FormLabel component="label">TBC déclarée guérie:</FormLabel>
                <Stack direction={{ xs: "row", sm: "row" }}>
                  <FormControlLabel
                    value="true"
                    disabled={tbcDesabled || tbcGueriEtDuréTraitementDesabled}
                    control={
                      <Radio checked={patientFormCause.tbcGuerie === "true"} />
                    }
                    label="Oui"
                  />
                  <FormControlLabel
                    value="false"
                    disabled={tbcDesabled || tbcGueriEtDuréTraitementDesabled}
                    control={
                      <Radio checked={patientFormCause.tbcGuerie === "false"} />
                    }
                    label="Non"
                  />
                </Stack>
              </Stack>
            </RadioGroup>
            <TextField
              sx={{ padding: "2px", marginTop: "24px" }}
              fullWidth
              value={patientFormCause.dureeTraitementTbc}
              label="Durée de traitement TBC ex:6 mois"
              disabled={tbcDesabled || tbcGueriEtDuréTraitementDesabled}
              onChange={handleDureeTraitementTbc}
              // {...getFieldProps('dureeTraitementTbc')}
              error={
                Boolean(
                  touched.dureeTraitementTbc && errors.dureeTraitementTbc
                ) ||
                Boolean(
                  values.tbcTraiter === "true" &&
                    values.dureeTraitementTbc === ""
                )
              }
            />
            <RadioGroup
              // {...getFieldProps('mereEnVie')}
              sx={{ marginTop: "24px" }}
              onChange={handleAtb}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "10px",
                  border: `${
                    Boolean(touched.atb && errors.atb) && "1px solid red"
                  }`,
                  borderRadius: `${
                    Boolean(touched.atb && errors.atb) && "10px"
                  }`,
                }}
                spacing={1}
              >
                <FormLabel component="label">Prise récente d'ATB:</FormLabel>
                <FormControlLabel
                  value="true"
                  fullWidth
                  control={<Radio checked={patientFormCause.atb === "true"} />}
                  label="Oui"
                />
                <FormControlLabel
                  value="false"
                  fullWidth
                  control={<Radio checked={patientFormCause.atb === "false"} />}
                  label="Non"
                />
              </Stack>
            </RadioGroup>
            <TextField
              fullWidth
              value={patientFormCause.listAtb}
              sx={{ padding: "2px", marginTop: "24px" }} //sx={{ marginTop: "24px" }}
              disabled={listAtbDisable}
              label="Liste ATB pris"
              helperText={touched.listAtb && errors.listAtb}
              onChange={handleListAtb}
              error={
                Boolean(touched.listAtb && errors.listAtb) ||
                Boolean(values.atb === "true" && values.listAtb === "")
              }
            />

            <RadioGroup
              sx={{ padding: "2px", marginTop: "24px" }}
              // fullWidth
              // {...getFieldProps('cocktailAtb')}
              onChange={handlecocktailAtb}
              error={Boolean(touched.cocktailAtb && errors.cocktailAtb)}
              helperText={touched.cocktailAtb && errors.cocktailAtb}
            >
              <Stack
                direction={{ xs: "column", md: "row", sm: "row" }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "10px",
                  border: `${
                    Boolean(touched.cocktailAtb && errors.cocktailAtb) &&
                    "1px solid red"
                  }`,
                  borderRadius: `${
                    Boolean(touched.cocktailAtb && errors.cocktailAtb) && "10px"
                  }`,
                }}
                spacing={1}
              >
                <FormLabel component="label">
                  Prise de cocktail d’ATB "Machangé" :{" "}
                </FormLabel>
                <Stack direction={{ xs: "row", sm: "row" }}>
                  <FormControlLabel
                    value="true"
                    control={
                      <Radio
                        checked={patientFormCause.cocktailAtb === "true"}
                      />
                    }
                    label="Oui"
                  />
                  <FormControlLabel
                    value="false"
                    control={
                      <Radio
                        checked={patientFormCause.cocktailAtb === "false"}
                      />
                    }
                    label="Non"
                  />
                </Stack>
              </Stack>
            </RadioGroup>
            <TextField
              sx={{ padding: "2px", marginTop: "24px" }}
              fullWidth
              type="text"
              value={patientFormCause.cocktailAtbDuree}
              disabled={cocktailAtbDesabled}
              label="Si notion de prise de cocktail est Oui, veuillez préciser la durée"
              onChange={handleCocktailAtbDuree}
              // {...getFieldProps('cocktailAtbDuree')}
              helperText={touched.cocktailAtbDuree && errors.cocktailAtbDuree}
              error={
                Boolean(touched.cocktailAtbDuree && errors.cocktailAtbDuree) ||
                Boolean(
                  values.cocktailAtb === "true" &&
                    values.cocktailAtbDuree === ""
                )
              }
            />

            <RadioGroup
              sx={{ marginTop: "24px" }}
              onChange={handleChangePriseProduitBasePlante}
              error={Boolean(touched.produitPlante && errors.produitPlante)}
              helperText={touched.produitPlante && errors.produitPlante}
            >
              <Stack
                direction={{ xs: "column", md: "column", sm: "column" }}
                sx={{
                  display: "flex",
                  // alignItems: 'center',
                  paddingLeft: "10px",
                  border: `${
                    Boolean(touched.produitPlante && errors.produitPlante) &&
                    "1px solid red"
                  }`,
                  borderRadius: `${
                    Boolean(touched.produitPlante && errors.produitPlante) &&
                    "10px"
                  }`,
                }}
                spacing={1}
              >
                <FormLabel component="label">
                  Prise des produits à base des plantes:
                </FormLabel>
                <Stack direction={{ xs: "row", sm: "row" }}>
                  <FormControlLabel
                    value="true"
                    control={
                      <Radio
                        checked={patientFormCause.produitPlante === "true"}
                      />
                    }
                    label="Oui"
                  />
                  <FormControlLabel
                    value="false"
                    control={
                      <Radio
                        checked={patientFormCause.produitPlante === "false"}
                      />
                    }
                    label="Non"
                  />
                </Stack>
              </Stack>
            </RadioGroup>
            <TextField
              sx={{ padding: "2px", marginTop: "24px" }}
              fullWidth
              label="Si Oui veuillez précisez la durée ex: 3mois"
              value={patientFormCause.dureeTraitementProduitPlante}
              disabled={priseProduitBasePlanteDesabled}
              onChange={handleDureeTraitementProduitPlante}
              // {...getFieldProps('dureeTraitementProduitPlante')}
              error={Boolean(
                (touched.dureeTraitementProduitPlante &&
                  errors.dureeTraitementProduitPlante) ||
                  Boolean(
                    values.produitPlante === "true" &&
                      values.dureeTraitementProduitPlante === ""
                  )
              )}
              helperText={
                touched.dureeTraitementProduitPlante &&
                errors.dureeTraitementProduitPlante
              }
            />

            {/* </Stack> */}
          </Grid>
        </Grid>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          sx={{ display: "flex", justifyContent: "center" }}
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
            size="large"
            variant="contained"
            // loading={isSubmitting}
            sx={{ width: 200, marginLeft: "20px", marginTop: "20px" }}
          >
            Suivant
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
