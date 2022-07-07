import { useState, useEffect } from "react";
import {
  InputLabel,
  Stack,
  Avatar,
  Grid,
  Card,
  Button,
  Container,
  Typography,
  TextField,
  Select,
  Radio,
  RadioGroup,
  CircularProgress,
  Toolbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { styled } from "@material-ui/core/styles";
import {
  Link as RouterLink,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Axios from "axios";
import moment from "moment";
import { LoadingButton } from "@material-ui/lab";
import { Icon } from "@iconify/react";
import { Delete, Edit } from "@material-ui/icons";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import style from "./Details.css";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    // top: "50%",
    marginTop: "20%",
    border: "0px solid red",
  },
  loading: {
    minWidth: 800,
    minHeight: "200px",
    display: "flex",
    position: "relative",
    justifyContent: "center",
    margin: "auto",
    top: "50%",
    border: "1px solid red",
  },
  labelRoot: {
    "&&": {
      color: "red",
    },
  },
  button: {
    textAlign: "center",
    position: "absolute",
    left: "30%",
  },
  patientRow: {
    cursor: "pointer",
    textDecoration: "none",
  },
}));
const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

export default function Update() {
  const [loader, setLoader] = useState(true);
  const classes = useStyles();
  const location = useLocation();
  const myId = location.pathname.split("/")[4];
  const [onePatient, setOnePatient] = useState("");
  const [patientIdentification, setPatientIdentification] = useState("");
  const [patientFamily, setPatientFamily] = useState("");
  const [patientHealth, setPatientHealth] = useState("");
  const [identityEnabled, setIdentityEnabled] = useState(false);
  const [malnutritionEnabled, setMalnutritionEnabled] = useState(false);
  const [mereEnabled, setMereEnabled] = useState(false);
  const [pereEnabled, setPereEnabled] = useState(false);
  const [menageEnabled, setMenageEnabled] = useState(false);
  const [firstPicture, setFirstPicture] = useState("");
  const [lastPicture, setLastPicture] = useState("");
  const [urlBefore, setUrlBefore] = useState("");
  const [urlAfter, setUrlAfter] = useState("");
  const [nomPatient, setNomPatient] = useState("");
  const [prenomPatient, setPrenomPatient] = useState("");
  const [postnomPatient, setPostnomPatient] = useState("");
  const [sexePatient, setSexePatient] = useState("");
  const [dateNaissancePatient, setDateNaissancePatient] = useState("");
  const [provenancePatient, setProvenancePatient] = useState("");
  const [modeArriver, setModeArriver] = useState("");
  const [adressePatient, setAdressePatient] = useState("");
  const [vivreAvecParents, setVivreAvecParents] = useState("");
  const [tuteur, setTuteur] = useState("");
  const [tailleFratrie, setTailleFratrie] = useState("");
  const [rangFratrie, setRangFratrie] = useState("");
  const [termeGrossesse, setTermeGrossesse] = useState("");
  const [eig, setEig] = useState("");
  const [lieuAccouchement, setLieuAccouchement] = useState("");
  const [asphyxiePerinatale, setAsphyxiePerinatale] = useState("");
  const [poidsNaissance, setPoidsNaissance] = useState("");
  const [dpm, setDpm] = useState("");
  const [sejourNeo, setSejourNeo] = useState("");
  const [allaitementExclusifSixMois, setAllaitementExclusifSixMois] =
    useState("");
  const [diversificationAliment, setDiversificationAliment] = useState("");
  const [constitutionAliment, setConstitutionAliment] = useState("");
  const [consommationPoisson, setConsommationPoisson] = useState("");
  const [calendrierVaccin, setCalendrierVaccin] = useState("");
  const [atcdMas, setAtcdMas] = useState("");
  const [vaccinationRougeole, setVaccinationRougeole] = useState("");
  const [atcdRougeole, setAtcdRougeole] = useState("");
  const [tbc, setTbc] = useState("");
  const [transfererUnt, setTransfererUnt] = useState("");
  const [hospitalisationRecente, setHospitalisationRecente] = useState("");
  const [diagnostiqueHospitalisation, setDiagnostiqueHospitalisation] =
    useState("");
  const [mereEnVie, setMereEnVie] = useState("");
  const [dateNaissanceMere, setDateNaissanceMere] = useState("");
  const [statutMarital, setStatutMarital] = useState("");
  const [etatMere, setEtatMere] = useState("");
  const [contraceptionMere, setContraceptionMere] = useState("");
  const [contraceptionType, setContraceptionType] = useState("");
  const [methodeContraceptive, setMethodeContraceptive] = useState("");
  const [scolariteMere, setScolariteMere] = useState("");
  const [professionMere, setProfessionMere] = useState("");
  const [pereEnvie, setPereEnvie] = useState("");
  const [telephone, setTelephone] = useState("");
  const [professionChefMenage, setProfessionChefMenage] = useState("");
  const [regimeMatrimonial, setRegimeMatrimonial] = useState("");
  const [nbrFemme, setNbrFemme] = useState("");
  const [tailleMenage, setTailleMenage] = useState("");
  const [tribu, setTribu] = useState("");
  const [religion, setReligion] = useState("");
  const [niveauSocioEconomique, setNiveauSocioEconomique] = useState("");
  const [nbrRepasJour, setNbrRepasJour] = useState("");
  const [possederTeleRadio, setPossederTeleRadio] = useState("");
  const [terrainVih, setTerrainVih] = useState("");
  const [tbcChezParent, setTbcChezParent] = useState("");
  const [atcdTbcFratrie, setAtcdTbcFratrie] = useState("");
  const [patientId, setPatientId] = useState(0);
  const [familyId, setFamilyId] = useState(0);

  useEffect(async () => {
    await Axios.get(
      `https://kesho-api.herokuapp.com/patient?id_patient=${myId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      }
    ).then((response) => {
      setOnePatient(response.data);
      setPatientId(response.data.Patient.id);
      setFamilyId(response.data.Famille.id);
      setFirstPicture(response.data.Anthropometrique[0].first_picture);
      setUrlBefore(response.data.Anthropometrique[0].first_picture);
      setLastPicture(response.data.Anthropometrique[0].last_picture);
      setUrlAfter(response.data.Anthropometrique[0].last_picture);
      setPrenomPatient(response.data.Patient.prenom_patient);
      setNomPatient(response.data.Patient.nom_patient);
      setPostnomPatient(response.data.Patient.postnom_patient);
      setSexePatient(response.data.Patient.sexe_patient);
      setDateNaissancePatient(response.data.Patient.date_naissance_patient);
      setProvenancePatient(response.data.Patient.provenance_patient);
      setModeArriver(response.data.Patient.mode_arrive);
      setAdressePatient(response.data.Patient.adresse_patient);
      setTransfererUnt(response.data.Patient.transferer_unt);
      setTelephone(response.data.Patient.telephone);
      setVivreAvecParents(response.data.Famille.vivre_deux_parents);
      setTuteur(response.data.Famille.tuteur);
      setTailleFratrie(response.data.CauseMalnutrition.taille_fratrie);
      setRangFratrie(response.data.CauseMalnutrition.rang_fratrie);
      setMereEnVie(response.data.Famille.mere_en_vie);
      setDateNaissanceMere(response.data.Famille.age_mere);
      setStatutMarital(response.data.Famille.statut_marital);
      setEtatMere(response.data.Famille.etat_mere);
      setContraceptionMere(response.data.Famille.contraception_mere);
      setContraceptionType(
        response.data.Famille.contraception_mere === false
          ? "pas de contraception"
          : response.data.Famille.contraception_type
      );
      setMethodeContraceptive(
        response.data.Famille.contraception_mere === false
          ? "Aucune"
          : response.data.Famille.contraception_type === "Naturel"
          ? response.data.Famille.contraception_naturelle
          : response.data.Famille.contraception_moderne
      );
      setScolariteMere(response.data.Famille.scolarite_mere);
      setProfessionMere(response.data.Famille.profession_mere);
      setPereEnvie(response.data.Famille.pere_en_vie);
      setTelephone(response.data.Patient.telephone);
      setProfessionChefMenage(response.data.Famille.profession_chef_menage);
      setRegimeMatrimonial(response.data.Famille.type_statut_marital);
      setNbrFemme(response.data.Famille.nbre_femme_pere);
      setTailleMenage(response.data.Famille.taille_menage);
      setTribu(response.data.Famille.tribu);
      setReligion(response.data.Famille.religion);
      setNiveauSocioEconomique(response.data.Famille.niveau_socioeconomique);
      setNbrRepasJour(response.data.Famille.nbre_repas);
      setPossederTeleRadio(response.data.Famille.posseder_radio_tele);
      setTerrainVih(response.data.CauseMalnutrition.terrain_vih);
      setTbcChezParent(response.data.Famille.tbc_parents);
      setAtcdTbcFratrie(
        response.data.CauseMalnutrition.atcd_du_tbc_dans_fratrie
      );
      setAtcdRougeole(response.data.CauseMalnutrition.atcd_rougeole_fratrie);
      setTermeGrossesse(response.data.CauseMalnutrition.terme_grossesse);
      setEig(response.data.CauseMalnutrition.eig);
      setLieuAccouchement(response.data.CauseMalnutrition.lieu_accouchement);
      setAsphyxiePerinatale(response.data.CauseMalnutrition.asphyxie_perinatal);
      setPoidsNaissance(response.data.Patient.poids_naissance);
      setDpm(
        response.data.CauseMalnutrition.dpm === "Normal"
          ? "Normal"
          : response.data.CauseMalnutrition.cause_dpm
      );
      setSejourNeo(response.data.CauseMalnutrition.sejour_neonat);
      setAllaitementExclusifSixMois(
        response.data.CauseMalnutrition.allaitement_6mois === true
          ? "6"
          : response.data.CauseMalnutrition.age_fin_allaitement
      );
      setDiversificationAliment(
        response.data.CauseMalnutrition.diversification_aliment
      );
      setConstitutionAliment(
        response.data.CauseMalnutrition.constitution_aliment
      );
      setConsommationPoisson(response.data.Famille.consommation_poisson);
      setCalendrierVaccin(response.data.CauseMalnutrition.calendrier_vaccinal);
      setVaccinationRougeole(
        response.data.CauseMalnutrition.vaccination_rougeole
      );
      setAtcdMas(response.data.CauseMalnutrition.atcd_mas);
      setTbc(response.data.CauseMalnutrition.tbc);
      setHospitalisationRecente(
        response.data.CauseMalnutrition.hospitalisation_recente
      );
      setDiagnostiqueHospitalisation(
        response.data.CauseMalnutrition.diagnostique_hospitalisation
      );

      setLoader(false);
    });
  }, []);

  const handleChangeFirstPicture = (event) => {
    const fileBefore = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(fileBefore);
    reader.onload = () => {
      setUrlBefore(reader.result);
      setFirstPicture(reader.result);
    };
  };
  const handleChangeLastPicture = (event) => {
    const fileAfter = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(fileAfter);
    reader.onload = () => {
      setUrlAfter(reader.result);
      setLastPicture(reader.result);
    };
  };
  const handleChangePrenom = (event) => {
    const { value } = event.target;
    setPrenomPatient(value);
  };
  const handleChangeNom = (event) => {
    const { value } = event.target;
    setNomPatient(value);
  };
  const handleChangePostnom = (event) => {
    const { value } = event.target;
    setPostnomPatient(value);
  };
  const handleChangeSexe = (event) => {
    const { value } = event.target;
    setSexePatient(value);
  };
  const handleChangeDateNaissance = (event) => {
    const { value } = event.target;
    setDateNaissancePatient(value);
  };
  const handleChangeProvenance = (event) => {
    const { value } = event.target;
    setProvenancePatient(value);
  };
  const handleChangeModeArriver = (event) => {
    const { value } = event.target;
    setModeArriver(value);
  };
  const handleChangeAdressePatient = (event) => {
    const { value } = event.target;
    setAdressePatient(value);
  };
  const handleChangeTelephone = (event) => {
    const { value } = event.target;
    setTelephone(value);
  };
  const handleChangeVitAvecParents = (event) => {
    const { value } = event.target;
    setVivreAvecParents(value);
  };
  const handleChangeTuteur = (event) => {
    const { value } = event.target;
    setTuteur(value);
  };
  const handleChangeRangFratrie = (event) => {
    const { value } = event.target;
    setRangFratrie(value);
  };
  const handleChangetailleFratrie = (event) => {
    const { value } = event.target;
    setTailleFratrie(value);
  };
  const handleClickUpdateIdentity = () => {
    const patientIdentity = {
      patientId: patientId,
      firstPicture: firstPicture,
      lastPicture: lastPicture,
      prenom: prenomPatient,
      nom: nomPatient,
      postnom: postnomPatient,
      sexe: sexePatient,
      dateNaissance: dateNaissancePatient,
      provenance: provenancePatient,
      modeArriver: modeArriver,
      adresse: adressePatient,
      familyId: familyId,
      vivreAvecParents: vivreAvecParents,
      tuteur: tuteur,
      rangFratrie: rangFratrie,
      tailleFratrie: tailleFratrie,
    };
    console.log(patientIdentity);
    Axios.request({
      method: "PUT",
      url: `https://kesho-api.herokuapp.com/patient/update-identity/${patientId}`,
      data: patientIdentity,
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        console.log(`the update of patient identity is made successfully`);
        setIdentityEnabled(!identityEnabled);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };
  const handleChangeTermeGrossesse = (event) => {
    const { value } = event.target;
    setTermeGrossesse(value);
  };
  const handleChangeEig = (event) => {
    const { value } = event.target;
    setEig(value);
  };
  const handleChangeLieuAccouchement = (event) => {
    const { value } = event.target;
    setLieuAccouchement(value);
  };
  const handleChangeAsphyxiePerinatale = (event) => {
    const { value } = event.target;
    setAsphyxiePerinatale(value);
  };
  const handleChangeDpm = (event) => {
    const { value } = event.target;
    setDpm(value);
  };
  const handleChangeSejourNeo = (event) => {
    const { value } = event.target;
    setSejourNeo(value);
  };
  const handleChangePoidsNaissance = (event) => {
    const { value } = event.target;
    setPoidsNaissance(value);
  };

  const handleChangeAllaitementExclusifSixMois = (event) => {
    const { value } = event.target;
    setAllaitementExclusifSixMois(value);
  };
  const handleChangeDiversificationAliment = (event) => {
    const { value } = event.target;
    setDiversificationAliment(value);
  };
  const handleChangeConstitutionAliment = (event) => {
    const { value } = event.target;
    setConstitutionAliment(value);
  };
  const handleChangeConsommationPoisson = (event) => {
    const { value } = event.target;
    setConsommationPoisson(value);
  };
  const handleChangeCalendrierVaccin = (event) => {
    const { value } = event.target;
    setCalendrierVaccin(value);
  };
  const handleChangeVaccinationRougeole = (event) => {
    const { value } = event.target;
    setVaccinationRougeole(value);
  };
  const handleChangeAtcdMas = (event) => {
    const { value } = event.target;
    setAtcdMas(value);
  };
  const handleChangeTbc = (event) => {
    const { value } = event.target;
    setTbc(value);
  };
  const handleChangeTransfererUnt = (event) => {
    const { value } = event.target;
    setTransfererUnt(value);
  };
  const handleChangeHospitalisationRecente = (event) => {
    const { value } = event.target;
    setHospitalisationRecente(value);
  };
  const handleChangeDiagnostiqueHospitalisation = (event) => {
    const { value } = event.target;
    setDiagnostiqueHospitalisation(value);
  };
  const handleClickUpdateMalnutrition = () => {
    const patientMalnutrition = {
      patientId: patientId,
      familyId: familyId,
      termeGrossesse: termeGrossesse,
      eig: eig,
      lieuAccouchement: lieuAccouchement,
      asphyxiePerinatale: asphyxiePerinatale,
      dpm: dpm,
      sejourNeo: sejourNeo,
      poidsNaissance: poidsNaissance,
      allaitementExclusifSixMois: allaitementExclusifSixMois,
      diversificationAliment: diversificationAliment,
      constitutionAliment: constitutionAliment,
      consommationPoisson: consommationPoisson,
      calendrierVaccin: calendrierVaccin,
      vaccinationRougeole: vaccinationRougeole,
      atcdMas: atcdMas,
      tbc: tbc,
      transfererUnt: transfererUnt,
      hospitalisationRecente: hospitalisationRecente,
      diagnostiqueHospitalisation: diagnostiqueHospitalisation,
    };
    Axios.request({
      method: "PUT",
      url: `https://kesho-api.herokuapp.com/patient/update-cause/${patientId}`,
      data: patientMalnutrition,
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        console.log(`the update of patient malnutrition is made successfully`);
        setMalnutritionEnabled(!malnutritionEnabled);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };
  const handleChangeMereVivante = (event) => {
    const { value } = event.target;
    setMereEnVie(value);
  };
  const handleChangeAgeMere = (event) => {
    const { value } = event.target;
    setDateNaissanceMere(value);
  };
  const handleChangeStatutMarital = (event) => {
    const { value } = event.target;
    setStatutMarital(value);
  };
  const handleChangeEtatMere = (event) => {
    const { value } = event.target;
    setEtatMere(value);
  };
  const handleChangeContraception = (event) => {
    const { value } = event.target;
    setContraceptionMere(value);
  };
  const handleChangeTypeContraception = (event) => {
    const { value } = event.target;
    setContraceptionType(value);
  };
  const handleChangeMethodeContraceptive = (event) => {
    const { value } = event.target;
    setMethodeContraceptive(value);
  };
  const handleChangeScolariteMere = (event) => {
    const { value } = event.target;
    setScolariteMere(value);
  };
  const handleChangeProfessionMere = (event) => {
    const { value } = event.target;
    setProfessionMere(value);
  };
  const handleClickUpdateMere = () => {
    const mere = {
      familyId: familyId,
      mereEnVie: mereEnVie,
      dateNaissanceMere: dateNaissanceMere,
      statutMarital: statutMarital,
      etatMere: etatMere,
      contraceptionMere: contraceptionMere,
      contraceptionType:
        contraceptionType === undefined || contraceptionMere === false
          ? "pas de contraception"
          : contraceptionType,
      methodeContraceptive: methodeContraceptive,
      scolariteMere: scolariteMere,
      professionMere: professionMere,
    };
    Axios.request({
      method: "PUT",
      url: `https://kesho-api.herokuapp.com/patient/update-mere/${patientId}`,
      data: mere,
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        console.log(`the update of mother is made successfully`);
        setMereEnabled(!mereEnabled);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };
  const handleChangePereVivant = (event) => {
    const { value } = event.target;
    setPereEnvie(value);
  };
  const handleChangeProfessionChefMenage = (event) => {
    const { value } = event.target;
    setProfessionChefMenage(value);
  };
  const handleChangeRegimeMatrimonial = (event) => {
    const { value } = event.target;
    if (value === "Monogame") {
      setNbrFemme(1);
    }
    setRegimeMatrimonial(value);
  };
  const handleChangeNbreFemme = (event) => {
    const { value } = event.target;
    setNbrFemme(value);
  };
  const handleClickUpdatePere = () => {
    const pere = {
      familyId: familyId,
      pereEnVie: pereEnvie,
      professionChefMenage: professionChefMenage,
      regimeMatrimonial: regimeMatrimonial,
      nbrFemme: regimeMatrimonial === "Monogame" ? 1 : nbrFemme,
      telephone: telephone,
    };
    Axios.request({
      method: "PUT",
      url: `https://kesho-api.herokuapp.com/patient/update-pere/${patientId}`,
      data: pere,
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        console.log(`the update of father is made successfully`);
        setPereEnabled(!pereEnabled);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };
  const handleChangeTailleMenage = (event) => {
    const { value } = event.target;
    setTailleMenage(value);
  };
  const handleChangeTribu = (event) => {
    const { value } = event.target;
    setTribu(value);
  };
  const handleChangeReligion = (event) => {
    const { value } = event.target;
    setReligion(value);
  };
  const handleChangeNiveauSocioEco = (event) => {
    const { value } = event.target;
    setNiveauSocioEconomique(value);
  };
  const handleChangeNbreRepas = (event) => {
    const { value } = event.target;
    setNbrRepasJour(value);
  };
  const handleChangePossessionTv = (event) => {
    const { value } = event.target;
    setPossederTeleRadio(value);
  };
  const handleChangeTerrainVih = (event) => {
    const { value } = event.target;
    setTerrainVih(value);
  };
  const handleChangeTbcParents = (event) => {
    const { value } = event.target;
    setTbcChezParent(value);
  };
  const handleChangeTbcFratrie = (event) => {
    const { value } = event.target;
    setAtcdTbcFratrie(value);
  };
  const handleChangeRougeoleFratrie = (event) => {
    const { value } = event.target;
    setAtcdRougeole(value);
  };
  const handleClickUpdateFamille = () => {
    const famille = {
      familyId: familyId,
      tailleMenage: tailleMenage,
      tribu: tribu,
      religion: religion,
      niveauSocioEconomique: niveauSocioEconomique,
      nbrRepasJour: nbrRepasJour,
      possederTeleRadio: possederTeleRadio,
      terrainVih: terrainVih,
      tbcChezParent: tbcChezParent,
      atcdTbcFratrie: atcdTbcFratrie,
      atcdRougeole: atcdRougeole,
    };
    Axios.request({
      method: "PUT",
      url: `https://kesho-api.herokuapp.com/patient/update-menage/${patientId}`,
      data: famille,
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        console.log(`the update of family is made successfully`);
        setMenageEnabled(!menageEnabled);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };

  const date = new Date();

  return (
    <div>
      {loader ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Button
            variant="outlined"
            component={RouterLink}
            to="/dashboard/patient"
            // onClick={(e) => exportToCSV(allData, exportedFileName)}
            startIcon={<Icon icon="bx:bx-arrow-back" />}
          >
            Retour
          </Button>
          <Button
            variant="outlined"
            component={RouterLink}
            to={`/dashboard/patient/detail_patient/${myId}`}
            sx={{ marginLeft: "1rem" }}
            startIcon={<Icon icon="uil:stethoscope" />}
          >
            Consulter
          </Button>
          <Grid container spacing={2}>
            <Grid item xs={11} sm={5} md={5} sx={{ border: `0px solid green` }}>
              <Card
                sx={{
                  margin: 1,
                  padding: 2,
                  height: "100%",
                }}
              >
                <Typography
                  sx={{
                    width: `100%`,
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "900",
                    fontSize: "larger",
                    marginBottom: "2%",
                  }}
                >
                  Identité
                  <Button
                    sx={{ border: `0px solid red` }}
                    onClick={(e) => {
                      setIdentityEnabled(!identityEnabled);
                    }}
                  >
                    <Edit />
                  </Button>
                </Typography>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "nowrap",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      border: `1px solid black`,
                      width: `50%`,
                      height: `200px`,
                    }}
                  >
                    <label
                      for="beforePicture"
                      style={{
                        width: "100%",
                        height: "100%",
                        margin: "2%, auto",
                      }}
                    >
                      <Avatar
                        alt="avant"
                        src={urlBefore ? urlBefore : ""}
                        variant="square"
                        sx={{ width: `100%`, height: `100%` }}
                      />
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      name="firstPicture"
                      onChange={handleChangeFirstPicture}
                      id="beforePicture"
                      disabled={!identityEnabled}
                      style={{ display: "none" }}
                    />
                    <span
                      style={{
                        width: `100%`,
                        padding: `10% auto`,
                        border: `0px red solid`,
                        color: `red`,
                        fontWeight: `700`,
                      }}
                    >
                      AVANT
                    </span>
                  </div>
                  <div
                    style={{
                      border: `1px solid black`,
                      width: `50%`,
                      height: `200px`,
                    }}
                  >
                    <label
                      for="lastPicture"
                      style={{
                        width: "100%",
                        height: "100%",
                        margin: "auto",
                      }}
                    >
                      <Avatar
                        alt="apres"
                        src={urlAfter ? urlAfter : ""}
                        variant="square"
                        sx={{ width: `100%`, height: `100%` }}
                      />
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      name="lastPicture"
                      onChange={handleChangeLastPicture}
                      id="lastPicture"
                      disabled={!identityEnabled}
                      style={{ display: "none" }}
                    />
                    <span
                      style={{
                        width: `100%`,
                        padding: `10% auto`,
                        border: `0px red solid`,
                        color: `green`,
                        fontWeight: `700`,
                      }}
                    >
                      APRES
                    </span>
                  </div>
                </Stack>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `10%`,
                  }}
                >
                  Prenom :{" "}
                  <input
                    type="text"
                    name="fistNamePatient"
                    value={prenomPatient}
                    disabled={!identityEnabled}
                    className="inputDisabled"
                    onChange={handleChangePrenom}
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Nom :{" "}
                  <input
                    type="text"
                    name="NomPatient"
                    value={nomPatient}
                    disabled={!identityEnabled}
                    className="inputDisabled"
                    onChange={handleChangeNom}
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Postnom :{" "}
                  <input
                    type="text"
                    name="postNomPatient"
                    value={postnomPatient}
                    disabled={!identityEnabled}
                    className="inputDisabled"
                    onChange={handleChangePostnom}
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Sexe :{" "}
                  {/* <input type="text" name="gender" className="inputDisabled" /> */}
                  <select
                    className="selectDisabled"
                    disabled={!identityEnabled}
                    value={sexePatient}
                    name="sexePatient"
                    onChange={handleChangeSexe}
                  >
                    <option value="M">M</option>
                    <option value="F">F</option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Date de naissance :{" "}
                  <input
                    type="date"
                    name="dateNaissancePatient"
                    value={moment(dateNaissancePatient).format("YYYY-MM-DD")}
                    disabled={!identityEnabled}
                    className="inputDisabled"
                    onChange={handleChangeDateNaissance}
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Provenance :{" "}
                  <input
                    type="text"
                    name="provenancePatient"
                    value={provenancePatient}
                    disabled={!identityEnabled}
                    className="inputDisabled"
                    onChange={handleChangeProvenance}
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Mode d'arrivé :{" "}
                  <input
                    type="text"
                    name="modeArriver"
                    value={modeArriver}
                    disabled={!identityEnabled}
                    className="inputDisabled"
                    onChange={handleChangeModeArriver}
                  />
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Adresse :{" "}
                  <input
                    type="text"
                    name="adressePatient"
                    value={adressePatient}
                    disabled={!identityEnabled}
                    className="inputDisabled"
                    onChange={handleChangeAdressePatient}
                  />
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Vit avec ses parents :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!identityEnabled}
                    name="vivreAvecParents"
                    value={vivreAvecParents}
                    onChange={handleChangeVitAvecParents}
                  >
                    <option value={true}>Oui</option>
                    <option value={false}>Non</option>
                  </select>
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Tuteur :{" "}
                  <input
                    type="text"
                    name="tuteur"
                    value={tuteur}
                    disabled={!identityEnabled}
                    className="inputDisabled"
                    onChange={handleChangeTuteur}
                  />
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Rang fratrie :{" "}
                  <input
                    type="text"
                    name="rangFratrie"
                    value={rangFratrie}
                    disabled={!identityEnabled}
                    className="inputDisabled"
                    onChange={handleChangeRangFratrie}
                  />
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Taille Fratrie :{" "}
                  <input
                    type="text"
                    name="tailleFratrie"
                    value={tailleFratrie}
                    disabled={!identityEnabled}
                    className="inputDisabled"
                    onChange={handleChangetailleFratrie}
                  />
                </InputLabel>{" "}
                {!identityEnabled === true ? (
                  <></>
                ) : (
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={loader}
                    onClick={handleClickUpdateIdentity}
                    size="large"
                    sx={{ width: 200, marginLeft: "20px", marginTop: "20px" }}
                  >
                    Mettre à jour
                  </LoadingButton>
                )}
              </Card>
            </Grid>
            <Grid
              item
              xs={11}
              sm={5}
              md={5}
              sx={{ display: `flex`, border: `0px solid green` }}
            >
              <Card
                sx={{
                  margin: 1,
                  padding: 2,
                  border: `0px solid red`,
                }}
              >
                <Typography
                  sx={{
                    width: `100%`,
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "900",
                    fontSize: "larger",
                    marginBottom: "0.5%",
                  }}
                >
                  ATCDs physiologiques & médicaux
                  <Button
                    sx={{ border: `0px solid red` }}
                    onClick={(e) => {
                      setMalnutritionEnabled(!malnutritionEnabled);
                    }}
                  >
                    <Edit />
                  </Button>
                </Typography>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0%`,
                  }}
                >
                  Terme grossesse :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!malnutritionEnabled}
                    name="termeGrossesse"
                    value={termeGrossesse}
                    onChange={handleChangeTermeGrossesse}
                  >
                    <option value="A terme">A terme</option>
                    <option value="Prématuré">Prématuré</option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  EIG :{" "}
                  <input
                    type="text"
                    name="eig"
                    value={eig}
                    disabled={!malnutritionEnabled}
                    className="inputDisabled"
                    onChange={handleChangeEig}
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Lieu d'accouchement :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!malnutritionEnabled}
                    name="lieuAccouchement"
                    value={lieuAccouchement}
                    onChange={handleChangeLieuAccouchement}
                  >
                    <option value="Voiture">Voiture</option>
                    <option value="Docmicile">Docmicile</option>
                    <option value="Structure sanitaire oui">
                      Structure sanitaire
                    </option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Asphyxie périnatale :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!malnutritionEnabled}
                    name="asphyxiePerinatale"
                    value={asphyxiePerinatale}
                    onChange={handleChangeAsphyxiePerinatale}
                  >
                    <option value="Pas de cri">Pas de cri</option>
                    <option value="a crié spontanément oui">
                      A crié spontanément
                    </option>
                    <option value="cri après réanimation">
                      Cri après réanimation
                    </option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  DPM :{" "}
                  <input
                    type="text"
                    name="dpm"
                    value={dpm}
                    disabled={!malnutritionEnabled}
                    className="inputDisabled"
                    onChange={handleChangeDpm}
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Séjour en Neonat :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!malnutritionEnabled}
                    name="sejourNeo"
                    value={sejourNeo}
                    onChange={handleChangeSejourNeo}
                  >
                    <option value={true}>Oui</option>
                    <option value={false}>Non</option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Poids à la naissance :{" "}
                  <input
                    type="text"
                    name="poidsNaissance"
                    value={poidsNaissance}
                    disabled={!malnutritionEnabled}
                    className="inputDisabled"
                    onChange={handleChangePoidsNaissance}
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Allaitement Exclusif :{" "}
                  <input
                    type="text"
                    name="allaitementExclusifSixMois"
                    value={allaitementExclusifSixMois}
                    disabled={!malnutritionEnabled}
                    className="inputDisabled"
                    onChange={handleChangeAllaitementExclusifSixMois}
                  />
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Age diversification aliment :{" "}
                  <input
                    type="text"
                    name="diversificationAliment"
                    value={diversificationAliment}
                    className="inputDisabled"
                    disabled={!malnutritionEnabled}
                    onChange={handleChangeDiversificationAliment}
                  />
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Constitution aliment :{" "}
                  <input
                    type="text"
                    name="constitutionAliment"
                    value={constitutionAliment}
                    disabled={!malnutritionEnabled}
                    className="inputDisabled"
                    onChange={handleChangeConstitutionAliment}
                  />
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Consommation poisson :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!malnutritionEnabled}
                    name="consommationPoisson"
                    value={consommationPoisson}
                    onChange={handleChangeConsommationPoisson}
                  >
                    <option value={true}>Oui</option>
                    <option value={false}>Non</option>
                  </select>
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Calendrier vaccinal :{" "}
                  <input
                    type="text"
                    name="calendrierVaccin"
                    value={calendrierVaccin}
                    disabled={!malnutritionEnabled}
                    className="inputDisabled"
                    onChange={handleChangeCalendrierVaccin}
                  />
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Vaccination Rougeole :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!malnutritionEnabled}
                    name="vaccinationRougeole"
                    value={vaccinationRougeole}
                    onChange={handleChangeVaccinationRougeole}
                  >
                    <option value={true}>Oui</option>
                    <option value={false}>Non</option>
                  </select>
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  ATCD MAS :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!malnutritionEnabled}
                    name="atcdMas"
                    value={atcdMas}
                    onChange={handleChangeAtcdMas}
                  >
                    <option value={true}>Oui</option>
                    <option value={false}>Non</option>
                  </select>
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  ATCD TBC :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!malnutritionEnabled}
                    name="tbc"
                    value={tbc}
                    onChange={handleChangeTbc}
                  >
                    <option value={true}>Oui</option>
                    <option value={false}>Non</option>
                  </select>
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  ATCD hospitalisation en UNTI :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!malnutritionEnabled}
                    name="transfererUnt"
                    value={transfererUnt}
                    onChange={handleChangeTransfererUnt}
                  >
                    <option value={true}>Oui</option>
                    <option value={false}>Non</option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Hospitalisation recente :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!malnutritionEnabled}
                    name="hospitalisationRecente"
                    value={hospitalisationRecente}
                    onChange={handleChangeHospitalisationRecente}
                  >
                    <option value={true}>Oui</option>
                    <option value={false}>Non</option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Diagnostique Hospitalisation :{" "}
                  <input
                    type="text"
                    name="diagnostiqueHospitalisation"
                    value={diagnostiqueHospitalisation}
                    className="inputDisabled"
                    disabled={!malnutritionEnabled}
                    onChange={handleChangeDiagnostiqueHospitalisation}
                  />
                </InputLabel>
                {!malnutritionEnabled === true ? (
                  <></>
                ) : (
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={loader}
                    size="large"
                    sx={{ width: 200, marginLeft: "20px", marginTop: "20px" }}
                    onClick={handleClickUpdateMalnutrition}
                  >
                    Mettre à jour
                  </LoadingButton>
                )}
              </Card>
            </Grid>{" "}
            <Grid
              item
              xs={11}
              sm={5}
              md={5}
              sx={{ display: `flex`, border: `0px solid green` }}
            >
              <Card
                sx={{
                  margin: 1,
                  padding: 2,
                  border: `0px solid red`,
                }}
              >
                <Typography
                  sx={{
                    width: `100%`,
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "900",
                    fontSize: "larger",
                    marginBottom: "0.5%",
                  }}
                >
                  ATCDs familiaux & collatéraux
                </Typography>
                <Typography
                  sx={{
                    width: `100%`,
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5%",
                  }}
                >
                  Mère
                  <Button
                    sx={{ border: `0px solid red` }}
                    onClick={(e) => {
                      setMereEnabled(!mereEnabled);
                    }}
                  >
                    <Edit />
                  </Button>
                </Typography>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0%`,
                  }}
                >
                  Mère en vie :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!mereEnabled}
                    name="mereEnVie"
                    value={mereEnVie}
                    onChange={handleChangeMereVivante}
                  >
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Age de la mère :{" "}
                  <input
                    type="text"
                    name="dateNaissanceMere"
                    value={dateNaissanceMere}
                    disabled={!mereEnabled}
                    className="inputDisabled"
                    onChange={handleChangeAgeMere}
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Statut marital :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!mereEnabled}
                    name="statutMarital"
                    value={statutMarital}
                    onChange={handleChangeStatutMarital}
                  >
                    <option value="Non mariée">Non mariée</option>
                    <option value="Mariée">Mariée</option>
                    <option value="Divorcée">Divorcée</option>
                    <option value="Veuve">Veuve</option>
                  </select>
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Etat de la mère :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!mereEnabled}
                    name="etatMere"
                    value={etatMere}
                    onChange={handleChangeEtatMere}
                  >
                    <option value="Aucun">Aucun</option>
                    <option value="Enceinte">Enceinte</option>
                    <option value="Allaitante">Allaitante</option>
                    <option value="Enceinte et Allaitante">
                      Enceinte et Allaitante
                    </option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Contraception :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!mereEnabled}
                    name="contraceptionMere"
                    value={contraceptionMere}
                    onChange={handleChangeContraception}
                  >
                    <option value={true}>Oui</option>
                    <option value={false}>Non</option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Type contraception :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!mereEnabled}
                    name="contraceptionType"
                    value={contraceptionType}
                    onChange={handleChangeTypeContraception}
                  >
                    <option value="pas de contraception">Aucune</option>
                    <option value="Naturel">Naturel</option>
                    <option value="Moderne">Moderne</option>
                    <option value="Naturel et Moderne">
                      Naturel et Moderne
                    </option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Methode contraceptive :{" "}
                  <input
                    type="text"
                    name="methodeContraceptive"
                    value={methodeContraceptive}
                    disabled={!mereEnabled}
                    className="inputDisabled"
                    onChange={handleChangeMethodeContraceptive}
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Scolarité mère :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!mereEnabled}
                    value={scolariteMere}
                    name="scolariteMere"
                    onChange={handleChangeScolariteMere}
                  >
                    <option value="Analphabète">Analphabète</option>
                    <option value="Primaire">Primaire</option>
                    <option value="Secondaire">Secondaire</option>
                    <option value="Universitaire">Universitaire</option>
                  </select>
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Profession :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!mereEnabled}
                    name="professionMere"
                    value={professionMere}
                    onChange={handleChangeProfessionMere}
                  >
                    <option value="Ménagère">Ménagère</option>
                    <option value="Salariée formelle,infirmière,Ong,enseignante">
                      Salariée formelle (infirmière, enseignante, ONG.)
                    </option>
                    <option value="Travail à temps partiel (maçonne, menuisière)">
                      Travail à temps partiel (maçonne, menuisière)
                    </option>
                    <option value="Business (exploitante minier, petit commerce, etc.) ">
                      Business (exploitante minier, petit commerce, etc.)
                    </option>
                    <option value="Militaire/Policière">
                      Militaire/Policière
                    </option>
                    <option value="Sans profession (sans emploi)">
                      Sans profession (sans emploi)
                    </option>
                    <option value="Cultivatrice">Cultivatrice</option>
                    <option value="Autre">Autre</option>
                  </select>
                </InputLabel>{" "}
                {!mereEnabled === true ? (
                  <></>
                ) : (
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={loader}
                    size="large"
                    sx={{
                      width: 140,
                      marginLeft: "20px",
                      marginBottom: "25px",
                      marginTop: "25px",
                      fontSize: "15px",
                    }}
                    onClick={handleClickUpdateMere}
                  >
                    Mettre à jour
                  </LoadingButton>
                )}
                <Typography
                  sx={{
                    width: `100%`,
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "5%",
                  }}
                >
                  Père
                  <Button
                    sx={{ border: `0px solid red` }}
                    onClick={(e) => {
                      setPereEnabled(!pereEnabled);
                    }}
                  >
                    <Edit />
                  </Button>
                </Typography>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0%`,
                  }}
                >
                  Père en vie :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!pereEnabled}
                    name="pereEnvie"
                    value={pereEnvie}
                    onChange={handleChangePereVivant}
                  >
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Téléphone :{" "}
                  <input
                    type="text"
                    name="telephone"
                    value={telephone}
                    disabled={!pereEnabled}
                    className="inputDisabled"
                    onChange={handleChangeTelephone}
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Profession :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!pereEnabled}
                    name="ProfessionChefMenage"
                    value={professionChefMenage}
                    onChange={handleChangeProfessionChefMenage}
                  >
                    <option value="Salarié formel,infirmier,Ong,enseignant">
                      Salarié formel (infirmier, enseignant, ONG.)
                    </option>
                    <option value="Travail à temps partiel (maçon, menuisier)">
                      Travail à temps partiel (maçon, menuisier)
                    </option>
                    <option value="Business (exploitant minier, petit commerce, etc.) ">
                      Business (exploitant minier, petit commerce, etc.)
                    </option>
                    <option value="Militaire/Policier">
                      Militaire/Policier
                    </option>
                    <option value="Sans profession (sans emploi)">
                      Sans profession (sans emploi)
                    </option>
                    <option value="Cultivateur">Cultivateur</option>
                    <option value="Autre">Autre</option>
                  </select>
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Régime matrimonial :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!pereEnabled}
                    name="regimeMatrimonial"
                    value={regimeMatrimonial}
                    onChange={handleChangeRegimeMatrimonial}
                  >
                    <option value="Polygame">Polygame</option>
                    <option value="Monogame">Monogame</option>
                  </select>
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Nombre de femme :{" "}
                  <input
                    type="text"
                    name="nbrFemme"
                    value={nbrFemme}
                    className="inputDisabled"
                    disabled={!pereEnabled}
                    onChange={handleChangeNbreFemme}
                  />
                </InputLabel>
                {!pereEnabled === true ? (
                  <></>
                ) : (
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={loader}
                    size="large"
                    sx={{
                      width: 140,
                      marginLeft: "20px",
                      marginBottom: "25px",
                      marginTop: "25px",
                      fontSize: "15px",
                    }}
                    onClick={handleClickUpdatePere}
                  >
                    Mettre à jour
                  </LoadingButton>
                )}
                <Typography
                  sx={{
                    width: `100%`,
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "5%",
                  }}
                >
                  Ménage
                  <Button
                    sx={{ border: `0px solid red` }}
                    onClick={(e) => {
                      setMenageEnabled(!menageEnabled);
                    }}
                  >
                    <Edit />
                  </Button>
                </Typography>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0%`,
                  }}
                >
                  Taille ménage :{" "}
                  <input
                    type="text"
                    name="tailleMenage"
                    value={tailleMenage}
                    onChange={handleChangeTailleMenage}
                    disabled={!menageEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Tribu :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!menageEnabled}
                    value={tribu}
                    onChange={handleChangeTribu}
                    name="tribu"
                  >
                    <option value="Havu">Havu</option>
                    <option value="Shi">Shi</option>
                    <option value="Rega">Rega</option>
                    <option value="Autre ethnie du sud-kivu">
                      Autre ethnie du sud-kivu
                    </option>
                    <option value="Autre ethnie du pays et autres">
                      Autre ethnie du pays et autres
                    </option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Réligion :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!menageEnabled}
                    name="religion"
                    value={religion}
                    onChange={handleChangeReligion}
                  >
                    <option value="Catholique">Catholique</option>
                    <option value="Protestant">Protestant</option>
                    <option value="Musulman">Musulman</option>
                    <option value="Autres">Autres</option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Niveau socio-eco :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!menageEnabled}
                    name="niveauSocioEconomique"
                    value={niveauSocioEconomique}
                    onChange={handleChangeNiveauSocioEco}
                  >
                    <option value="Bas">Bas (Inferieur à 1$)</option>
                    <option value="Moyen">Moyen (5$)</option>
                    <option value="Bon">Bon (Supérieur à 5$)</option>
                  </select>
                </InputLabel>{" "}
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Nombre repas journalier :{" "}
                  <input
                    type="text"
                    name="nbrRepasJour"
                    value={nbrRepasJour}
                    onChange={handleChangeNbreRepas}
                    disabled={!menageEnabled}
                    className="inputDisabled"
                  />
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Possession Tele/Radio :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!menageEnabled}
                    name="possederTeleRadio"
                    value={possederTeleRadio}
                    onChange={handleChangePossessionTv}
                  >
                    <option value={true}>Oui</option>
                    <option value={false}>Non</option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  Terrain VIH :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!menageEnabled}
                    name="terrainVih"
                    value={terrainVih}
                    onChange={handleChangeTerrainVih}
                  >
                    <option value={true}>Oui</option>
                    <option value={false}>Non</option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  TBC Chez Parents :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!menageEnabled}
                    name="tbcChezParent"
                    value={tbcChezParent}
                    onChange={handleChangeTbcParents}
                  >
                    <option value={true}>Oui</option>
                    <option value={false}>Non</option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                  }}
                >
                  ATCD de TBC dans la fratrie :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!menageEnabled}
                    name="atcdTbcFratrie"
                    value={atcdTbcFratrie}
                    onChange={handleChangeTbcFratrie}
                  >
                    <option value={true}>Oui</option>
                    <option value={false}>Non</option>
                  </select>
                </InputLabel>
                <InputLabel
                  sx={{
                    width: `100%`,
                    display: `flex`,
                    alignItems: `center`,
                    marginTop: `0.5%`,
                    marginBottom: "25px",
                  }}
                >
                  ATCD de Rougeole dans la fratrie :{" "}
                  <select
                    className="selectDisabled"
                    disabled={!menageEnabled}
                    name="atcdRougeole"
                    value={atcdRougeole}
                    onChange={handleChangeRougeoleFratrie}
                  >
                    <option value={true}>Oui</option>
                    <option value={false}>Non</option>
                  </select>
                </InputLabel>
                {!menageEnabled === true ? (
                  <></>
                ) : (
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={loader}
                    size="large"
                    sx={{
                      width: 140,
                      marginLeft: "20px",
                      marginBottom: "25px",
                      fontSize: "15px",
                    }}
                    onClick={handleClickUpdateFamille}
                  >
                    Mettre à jour
                  </LoadingButton>
                )}
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}
