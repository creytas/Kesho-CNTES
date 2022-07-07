/* eslint no-nested-ternary: "error" */
import { Link as RouterLink, Navigate, useLocation } from "react-router-dom";
import { Stack, Button } from "@material-ui/core";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import Page from "../../components/Page";
import {
  FamilleForm,
  CauseForm,
  //  CliniqueForm,
  ShowDAtaPatient,
  PatientForm,
} from "../../components/_dashboard/patient";
import CliniqueForm from "src/components/_dashboard/patient/PatientCliniqueForm";
import "./styledNewPatient.css";

export default function NewPatient() {
  const [Step, SetStep] = useState(1);
  const [DataPatient, SetDataPatient] = useState({});
  // ___________ formIdentité__________________________
  const [taille, setTaille] = useState("");
  const [poidsActuel, setPoidsActuel] = useState("");
  const [rationSeche, setRationSeche] = useState("");
  const [typeOedeme, setTypeOedeme] = useState("");
  const [dateAdmissionPatient, setDateAdmissionPatient] = useState("");
  const [dateGuerisonPatient, setDateGuerisonPatient] = useState("");
  const [firstPicture, setFirstPicture] = useState("");
  const [lastPicture, setLastPicture] = useState("");
  const [commentaires, setCommentaires] = useState("");
  const [perimetreCranien, setPerimetreCranien] = useState("");
  const [hemoglobine, setHemoglobine] = useState("");
  const [hematocrite, setHematocrite] = useState("");
  const [prenomPatient, setPrenomPatient] = useState("");
  const [nomPatient, setNomPatient] = useState("");
  const [postNomPatient, setPostNomPatient] = useState("");
  const [telephone, setTelephone] = useState("");
  const [diversificationAliment, setDiversificationAliment] = useState("");
  const [sexePatient, setSexePatient] = useState("");
  const [dataNaissancePatient, setDataNaissancePatient] = useState("");
  const [constitutionAliment, setConstitutionAliment] = useState("");
  const [provenancePatient, setProvenancePatient] = useState("");
  const [adressePatient, setadressePatient] = useState("");
  const [modeArriverPatient, setModeArriverPatient] = useState("");
  const [ageFinAllaitement, setAgeFinAllaitement] = useState("");
  const [traitementNutritionnelAutre, setTraitementNutritionnelAutre] =
    useState("");
  const [poidsNaissance, setPoidsNaissance] = useState("");
  const [traitementNutritionnel, setTraitementNutritionnel] = useState("");
  const [perimetreBrachail, setPerimetreBrachail] = useState("");
  const [typeMalnutrition, setTypeMalnutrition] = useState("");
  const [ExplicationAutre, setExplicationAutre] = useState("");
  const [ExplicationProvenance, setExplicationProvenance] = useState("");
  const [AllaitementExclisifSixMois, setAllaitementExclisifSixMois] =
    useState(false);
  const [transfererUnt, setTransfererUnt] = useState("");

  // _______________Form famille_________________
  const [vivreAvecParents, setVivreAvecParents] = useState("");
  const [typeContraceptionModerne, setTypeContraceptionModerne] = useState("");
  const [contraceptionMere, setContraceptionMere] = useState("");
  const [professionMere, setProfessionMere] = useState("");
  const [tuteur, setTuteur] = useState("");
  const [dateNaissanceMere, setDateNaissanceMere] = useState("");
  const [etatMere, setEtatMere] = useState("");
  const [possederTeleRadio, setPossederTeleRadio] = useState("");
  const [proffessionChefMenage, setProffessionChefMenage] = useState("");
  const [scolariteMere, setScolariteMere] = useState("");
  const [pereMariage, setPereMariage] = useState("");
  const [mereEnVie, setMereEnVie] = useState("");
  const [consommationPoisson, setConsommationPoisson] = useState("");
  const [typeContraceptionNaturel, setTypeContraceptionNaturel] = useState("");
  const [niveauSocioEconomique, setNiveauSocioEconomique] = useState("");
  const [statutMarital, setStatutMarital] = useState("");
  const [tribut, setTribut] = useState("");
  const [dateNaissanceChefMenage, setDateNaissanceChefMenage] = useState("");
  const [religion, setReligion] = useState("");
  const [nbrRepasJour, setNbrRepasJour] = useState("");
  const [pereEnvie, setPereEnvie] = useState("");
  const [nbrFemme, setNbrFemme] = useState("");
  const [tailleMenage, setTailleMenage] = useState("");
  const [contraceptionType, setContraceptionType] = useState("");
  const [listAtb, setListAtb] = useState("");
  const [atb, setAtb] = useState("");
  // ________form PatientCauseMalnutri_______
  const [rangFratrie, setRangFratrie] = useState("");
  const [lieuAccouchement, setLieuAccouchement] = useState("");
  const [sejourNeo, setSejourNeo] = useState("");
  const [cocktailAtbDuree, setCocktailAtbDuree] = useState("");
  const [cocktailAtb, setCocktailAtb] = useState("");
  const [atcdMas, setAtcdMas] = useState("");
  const [atcdRougeole, setAtcdRougeole] = useState("");
  const [tbcChezParent, setTbcChezParent] = useState("");
  const [tbcLequel, setTbcLequel] = useState("");
  const [tbcTraiter, setTbcTraiter] = useState("");
  const [dureeTraitementTbc, setDureeTraitementTbc] = useState("");
  const [tbcGuerie, setTbcGuerie] = useState("");
  const [termeGrossesse, setTermeGrossesse] = useState("");
  const [calendrierVaccin, setCalendrierVaccin] = useState("");
  const [preciserCalendrierVaccinNonjour, setPreciserCalendrierVaccinNonjour] =
    useState("");
  const [asphyxiePrerinatale, setAsphyxiePrerinatale] = useState("");
  const [tailleFratrie, setTailleFratrie] = useState("");
  const [masFratrie, setMasFratrie] = useState("");
  const [terrainVih, setTerrainVih] = useState("");
  const [nombreChute, setNombreChute] = useState("");
  const [vaccinationRougeole, setVaccinationRougeole] = useState("");
  const [eig, setEig] = useState("");
  const [dpm, setDpm] = useState("");
  const [tbc, setTbc] = useState("");
  const [produitPlante, setProduitPlante] = useState("");
  const [hospitalisationRecente, sethospitalisationRecente] = useState("");
  const [diagnostiqueHospitalisation, setDiagnostiqueHospitalisation] =
    useState("");
  const [atcdDuTbcDansFratrie, setAtcdDuTbcDansFratrie] = useState("");
  const [dpmAnormalPrecision, setDpmAnormalPrecision] = useState("");
  const [dureeTraitementProduitPlante, setDureeTraitementProduitPlante] =
    useState("");

  const location = useLocation();
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setIsAuth(isAuth);
  }, [isAuth]);
  const NextStep = () => {
    SetStep((CurrentState) => CurrentState + 1);
  };
  const PrevStep = () => {
    SetStep((CurrentState) => CurrentState - 1);
  };
  const FormPatientInfo = (key) => {
    const patientFormData = {
      setadressePatient,
      setSexePatient,
      setPostNomPatient,
      setPrenomPatient,
      setNomPatient,
      setDateAdmissionPatient,
      setDateGuerisonPatient,
      setProvenancePatient,
      setDataNaissancePatient,
      setExplicationAutre,
      setTelephone,
      setExplicationProvenance,
      dateAdmissionPatient,
      dateGuerisonPatient,
      prenomPatient,
      nomPatient,
      postNomPatient,
      telephone,
      sexePatient,
      dataNaissancePatient,
      provenancePatient,
      ExplicationProvenance,
      adressePatient,
      modeArriverPatient,
      ExplicationAutre,
      setModeArriverPatient,
    };

    const patientFormCause = {
      rangFratrie,
      setRangFratrie,
      poidsNaissance,
      setPoidsNaissance,
      AllaitementExclisifSixMois,
      setAllaitementExclisifSixMois,
      ageFinAllaitement,
      setAgeFinAllaitement,
      diversificationAliment,
      setDiversificationAliment,
      constitutionAliment,
      setConstitutionAliment,
      lieuAccouchement,
      setLieuAccouchement,
      sejourNeo,
      setSejourNeo,
      cocktailAtbDuree,
      setCocktailAtbDuree,
      cocktailAtb,
      setCocktailAtb,
      listAtb,
      setListAtb,
      atb,
      setAtb,
      atcdMas,
      setAtcdMas,
      atcdRougeole,
      setAtcdRougeole,
      tbcChezParent,
      setTbcChezParent,
      tbcLequel,
      setTbcLequel,
      tbcTraiter,
      setTbcTraiter,
      dureeTraitementTbc,
      setDureeTraitementTbc,
      tbcGuerie,
      setTbcGuerie,
      termeGrossesse,
      setTermeGrossesse,
      calendrierVaccin,
      setCalendrierVaccin,
      preciserCalendrierVaccinNonjour,
      setPreciserCalendrierVaccinNonjour,
      asphyxiePrerinatale,
      setAsphyxiePrerinatale,
      tailleFratrie,
      setTailleFratrie,
      masFratrie,
      setMasFratrie,
      consommationPoisson,
      setConsommationPoisson,
      terrainVih,
      setTerrainVih,
      nombreChute,
      setNombreChute,
      transfererUnt,
      setTransfererUnt,
      vaccinationRougeole,
      setVaccinationRougeole,
      eig,
      setEig,
      dpm,
      setDpm,
      tbc,
      setTbc,
      produitPlante,
      setProduitPlante,
      hospitalisationRecente,
      sethospitalisationRecente,
      diagnostiqueHospitalisation,
      setDiagnostiqueHospitalisation,
      atcdDuTbcDansFratrie,
      setAtcdDuTbcDansFratrie,
      dpmAnormalPrecision,
      setDpmAnormalPrecision,
      dureeTraitementProduitPlante,
      setDureeTraitementProduitPlante,
    };

    const patientFormFamille = {
      vivreAvecParents,
      setVivreAvecParents,
      typeContraceptionModerne,
      setTypeContraceptionModerne,
      contraceptionMere,
      setContraceptionMere,
      professionMere,
      setProfessionMere,
      tuteur,
      setTuteur,
      dateNaissanceMere,
      setDateNaissanceMere,
      etatMere,
      setEtatMere,
      possederTeleRadio,
      setPossederTeleRadio,
      proffessionChefMenage,
      setProffessionChefMenage,
      scolariteMere,
      setScolariteMere,
      pereMariage,
      setPereMariage,
      mereEnVie,
      setMereEnVie,
      typeContraceptionNaturel,
      setTypeContraceptionNaturel,
      niveauSocioEconomique,
      setNiveauSocioEconomique,
      statutMarital,
      setStatutMarital,
      tribut,
      setTribut,
      dateNaissanceChefMenage,
      setDateNaissanceChefMenage,
      religion,
      setReligion,
      nbrRepasJour,
      setNbrRepasJour,
      pereEnvie,
      setPereEnvie,
      nbrFemme,
      setNbrFemme,
      tailleMenage,
      setTailleMenage,
      contraceptionType,
      setContraceptionType,
    };
    const patientClinicForm = {
      firstPicture,
      lastPicture,
      taille,
      poidsActuel,
      perimetreBrachail,
      perimetreCranien,
      rationSeche,
      typeOedeme,
      hemoglobine,
      hematocrite,
      typeMalnutrition,
      traitementNutritionnel,
      traitementNutritionnelAutre,
      commentaires,
      setFirstPicture,
      setLastPicture,
      setTaille,
      setPoidsActuel,
      setPerimetreBrachail,
      setPerimetreCranien,
      setRationSeche,
      setTypeOedeme,
      setHemoglobine,
      setHematocrite,
      setTypeMalnutrition,
      setTraitementNutritionnel,
      setTraitementNutritionnelAutre,
      setCommentaires,
    };

    switch (key) {
      case 1:
        return (
          <PatientForm
            patientFormData={patientFormData}
            NextStep={NextStep}
            setadressePatient={setadressePatient}
            setSexePatient={setSexePatient}
            setDiversificationAliment={setDiversificationAliment}
            setPostNomPatient={setPostNomPatient}
            setPerimetreBrachail={setPerimetreBrachail}
            SetDataPatient={SetDataPatient}
            setPrenomPatient={setPrenomPatient}
            setNomPatient={setNomPatient}
            setTaille={setTaille}
            setPerimetreCranien={setPerimetreCranien}
            setRationSeche={setRationSeche}
            setDateAdmissionPatient={setDateAdmissionPatient}
            setDateGuerisonPatient={setDateGuerisonPatient}
            setFirstPicture={setFirstPicture}
            setLastPicture={setLastPicture}
            setCommentaires={setCommentaires}
            setModeArriverPatient={setModeArriverPatient}
            setPoidsActuel={setPoidsActuel}
            setTraitementNutritionnelAutre={setTraitementNutritionnelAutre}
            setAgeFinAllaitement={setAgeFinAllaitement}
            setProvenancePatient={setProvenancePatient}
            setConstitutionAliment={setConstitutionAliment}
            setTraitementNutritionnel={setTraitementNutritionnel}
            setDataNaissancePatient={setDataNaissancePatient}
            setTypeMalnutrition={setTypeMalnutrition}
            setExplicationAutre={setExplicationAutre}
            setTelephone={setTelephone}
            setExplicationProvenance={setExplicationProvenance}
            setAllaitementExclisifSixMois={setAllaitementExclisifSixMois}
          />
        );
      case 2:
        return (
          <CauseForm
            PrevStep={PrevStep}
            NextStep={NextStep}
            DataPatient={DataPatient}
            SetDataPatient={SetDataPatient}
            patientFormCause={patientFormCause}
          />
        );
      case 3:
        return (
          <FamilleForm
            PrevStep={PrevStep}
            NextStep={NextStep}
            SetDataPatient={SetDataPatient}
            patientFormFamille={patientFormFamille}
          />
        );
      case 4:
        return (
          <CliniqueForm
            PrevStep={PrevStep}
            NextStep={NextStep}
            DataPatient={DataPatient}
            SetDataPatient={SetDataPatient}
            patientClinicForm={patientClinicForm}
          />
        );
      case 5:
        return (
          <ShowDAtaPatient PrevStep={PrevStep} DataPatient={DataPatient} />
        );
      default:
        return null;
    }
  };
  return isAuth ? (
    <Page>
      <div className="progress-bar-total">
        <Button
          variant="outlined"
          component={RouterLink}
          to="/dashboard/patient"
          // onClick={(e) => exportToCSV(allData, exportedFileName)}
          startIcon={<Icon icon="bx:bx-arrow-back" />}
        >
          Retour
        </Button>
        <div
          className={`progress-step  ${Step === 1 && "progress-step-active"}`}
          data-title="Identité"
        />
        <div
          className={`progress-step  ${Step === 2 && "progress-step-active"}`}
          data-title="ATCDs physiologiques & médicaux"
        />
        <div
          className={`progress-step  ${Step === 3 && "progress-step-active"}`}
          data-title="ATCDs familiaux & collatéraux"
        />
        <div
          className={`progress-step  ${Step === 4 && "progress-step-active"}`}
          data-title="Consulter"
        />
        <div
          className={`progress-step  ${Step === 5 && "progress-step-active"}`}
          data-title="Valider"
        />
      </div>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{ justifyContent: "center" }}
      >
        {FormPatientInfo(Step)}
      </Stack>
    </Page>
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
}
