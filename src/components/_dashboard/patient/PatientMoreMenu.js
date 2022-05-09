import { Icon } from "@iconify/react";
import propTypes from "prop-types";
import { useRef, useState } from "react";
import Axios from "axios";
import eyeFill from "@iconify/icons-eva/eye-fill";
import deleteFill from "@iconify/icons-ic/baseline-delete";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
// import { makeStyles } from '@material-ui/styles';
// import red from '@material-ui/core/colors/red';
// -------------------MODAL
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Delete, Edit } from "@material-ui/icons";
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
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
} from "@material-ui/core";

// import Button from '@material-ui/core/Button';
import { LoadingButton } from "@material-ui/lab";

import { fakeAuth } from "../../../fakeAuth";

PatientMoreMenu.propTypes = {
  id_patient: propTypes.string,
  value: propTypes.string,
  //nom_patient,postnom_patient,prenom_patient,date_naissance,sexe_patient,transferer_unt,
};

export default function PatientMoreMenu({ value, id_patient, id }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/dashboard/app" } };
  // ---------------------------------LOgic state-------------------------------------
  const handleDeleteClick = () => {
    setLoader(true);
    Axios.delete(
      `https://kesho-congo-api.herokuapp.com/patient?id_patient=${value}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        const message = response.data;
        console.log("Yves", message);
        fakeAuth.login(() => {
          navigate(from);
          navigate("/dashboard/patient", { replace: true });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // ---------------------------------LOgic state------------------------------------
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [identityEnabled, setIdentityEnabled] = useState(false);
  const [malnutritionEnabled, setMalnutritionEnabled] = useState(false);
  const [mereEnabled, setMereEnabled] = useState(false);
  const [pereEnabled, setPereEnabled] = useState(false);
  const [menageEnabled, setMenageEnabled] = useState(false);
  const [firstPicture, setFirstPicture] = useState("");
  const [lastPicture, setLastPicture] = useState("");
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
  const [asphyxiePrerinatale, setAsphyxiePrerinatale] = useState("");
  const [dpm, setDpm] = useState("");
  const [sejourNeo, setSejourNeo] = useState("");
  const [poidsNaissance, setPoidsNaissance] = useState("");
  const [allaitementExclusifSixMois, setAllaitementExclusifSixMois] =
    useState("");
  const [diversificationAliment, setDiversificationAliment] = useState("");
  const [constitutionAliment, setConstitutionAliment] = useState("");
  const [consommationPoisson, setConsommationPoisson] = useState("");
  const [calendrierVaccin, setCalendrierVaccin] = useState("");
  const [atcdMas, setAtcdMas] = useState("");
  const [vaccinationRougeole, setVaccinationRougeole] = useState("");
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
  const [dateNaissanceChefMenage, setDateNaissanceChefMenage] = useState("");
  const [telephone, setTelephone] = useState("");
  const [professionChefMenage, setProfessionChefMenage] = useState("");
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
  const [atcdRougeole, setAtcdRougeole] = useState("");
  const [openModalChangeStatus, setopenModalChangeStatus] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenStatus = () => {
    setopenModalChangeStatus(true);
  };
  const handleCloseModaleChangeStatus = () => {
    setopenModalChangeStatus(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        vissee
        PaperProps={{
          sx: { width: 189, maxWidth: "100%", py: 3 },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          component={RouterLink}
          to={`update_patient/${id_patient}`}
          sx={{ color: "text.secondary" }}
        >
          <ListItemIcon>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                paddingLeft: "8px",
              }}
            >
              <Icon icon={eyeFill} width={40} height={25} />
              <Typography variant="h6" sx={{ fontWeight: "400" }}>
                Voir plus
              </Typography>
            </div>
          </ListItemIcon>
        </MenuItem>

        {/* <MenuItem sx={{ color: "text.secondary" }}>
          <ListItemIcon onClick={handleClickOpenStatus}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                paddingLeft: "8px",
              }}
            >
              <Icon icon={eyeFill} width={40} height={25} />
              <Typography variant="h6" sx={{ fontWeight: "400" }}>
                Voir plus
              </Typography>
            </div>
          </ListItemIcon>
           <Dialog
            open={openModalChangeStatus}
            onClose={handleCloseModaleChangeStatus}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="lg"
            sx={{ border: `0px solid blue` }}
          >
            <DialogTitle
              id="alert-dialog-title"
              sx={{ border: `0px solid green` }}
            >
              Informations du patient
            </DialogTitle>
            <DialogContent sx={{ border: `0px solid green` }}>
              <DialogContentText
                id="alert-dialog-description"
                // sx={{
                //   border: `1px solid red`,
                //   display: `flex`,
                //   flexDirection: `column`,
                //   justifyContent: `center`,
                // }}
              >
                <Button
                  variant="outlined"
                  onClick={handleCloseModaleChangeStatus}
                  startIcon={<Icon icon="bx:bx-arrow-back" />}
                  sx={{ margin: `1%` }}
                >
                  Retour
                </Button>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    width: `100%`,
                    border: `0px solid blue`,
                    margin: `0 auto`,
                    display: `flex`,
                    justifyContent: `space-between`,
                  }}
                >
                  <Grid
                    item
                    xs={11}
                    sm={6}
                    md={6}
                    sx={{ border: `0px solid green` }}
                  >
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
                            for="firstPicture"
                            style={{
                              width: "100%",
                              height: "100%",
                              margin: "2%, auto",
                            }}
                          >
                            <Avatar
                              alt="avant"
                              src={``}
                              variant="square"
                              sx={{ width: `100%`, height: `100%` }}
                            />
                          </label>
                          <input
                            type="file"
                            accept="image/png, image/jpeg"
                            name="firstPicture"
                            id="firstPicture"
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
                              src={``}
                              variant="square"
                              sx={{ width: `100%`, height: `100%` }}
                            />
                          </label>
                          <input
                            type="file"
                            accept="image/png, image/jpeg"
                            name="lastPicture"
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
                          disabled={!identityEnabled}
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
                        Nom :{" "}
                        <input
                          type="text"
                          name="NomPatient"
                          disabled={!identityEnabled}
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
                        Postnom :{" "}
                        <input
                          type="text"
                          name="postNomPatient"
                          disabled={!identityEnabled}
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
                        Sexe :{" "}
                        <select
                          className="selectDisabled"
                          disabled={!identityEnabled}
                          name="sexePatient"
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
                          disabled={!identityEnabled}
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
                        Provenance :{" "}
                        <input
                          type="text"
                          name="provenancePatient"
                          disabled={!identityEnabled}
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
                        Mode d'arrivé :{" "}
                        <input
                          type="text"
                          name="modeArriver"
                          disabled={!identityEnabled}
                          className="inputDisabled"
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
                          disabled={!identityEnabled}
                          className="inputDisabled"
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
                        >
                          <option value="Oui">Oui</option>
                          <option value="Non">Non</option>
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
                          disabled={!identityEnabled}
                          className="inputDisabled"
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
                          disabled={!identityEnabled}
                          className="inputDisabled"
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
                          disabled={!identityEnabled}
                          className="inputDisabled"
                        />
                      </InputLabel>{" "}
                      {!identityEnabled === true ? (
                        <></>
                      ) : (
                        <LoadingButton
                          type="submit"
                          variant="contained"
                          size="large"
                          loading={loader}
                          sx={{
                            width: 200,
                            marginLeft: "20px",
                            marginTop: "20px",
                          }}
                        >
                          Mettre à jour
                        </LoadingButton>
                      )}
                    </Card>
                  </Grid>
                  <Grid
                    item
                    xs={11}
                    sm={6}
                    md={6}
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
                        Cause malnutrition
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
                          disabled={!malnutritionEnabled}
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
                        Lieu d'accouchement :{" "}
                        <select
                          className="selectDisabled"
                          disabled={!malnutritionEnabled}
                          name="lieuAccouchement"
                        >
                          <option value="Voiture">Voiture</option>
                          <option value="Docmicile">Docmicile</option>
                          <option value="Structure sanitaire">
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
                          name="asphyxiePrerinatale"
                        >
                          <option value="Pas de cri">Pas de cri</option>
                          <option value="A crié spontanément">
                            A crié spontanément
                          </option>
                          <option value="Cri apres réanimation">
                            Cri apres réanimation
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
                          disabled={!malnutritionEnabled}
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
                        Séjour en Neonat :{" "}
                        <select
                          className="selectDisabled"
                          disabled={!malnutritionEnabled}
                          name="sejourNeo"
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
                        Poids naissance :{" "}
                        <input
                          type="text"
                          name="poidsNaissance"
                          disabled={!malnutritionEnabled}
                          className="inputDisabled"
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
                        Allaitement Exclusif :{" "}
                        <input
                          type="text"
                          name="allaitementExclusifSixMois"
                          disabled={!malnutritionEnabled}
                          className="inputDisabled"
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
                          className="inputDisabled"
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
                          disabled={!malnutritionEnabled}
                          className="inputDisabled"
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
                        >
                          <option value="Oui">Oui</option>
                          <option value="Non">Non</option>
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
                          disabled={!malnutritionEnabled}
                          className="inputDisabled"
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
                        >
                          <option value="Oui">Oui</option>
                          <option value="Non">Non</option>
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
                        >
                          <option value="Oui">Oui</option>
                          <option value="Non">Non</option>
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
                        >
                          <option value="Oui">Oui</option>
                          <option value="Non">Non</option>
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
                        Transfert en UNT :{" "}
                        <select
                          className="selectDisabled"
                          disabled={!malnutritionEnabled}
                          name="transfererUnt"
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
                        Hospitalisation recente :{" "}
                        <select
                          className="selectDisabled"
                          disabled={!malnutritionEnabled}
                          name="hospitalisationRecente"
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
                        Diagnostique Hospitalisation :{" "}
                        <input
                          type="text"
                          name="diagnostiqueHospitalisation"
                          className="inputDisabled"
                        />
                      </InputLabel>
                      {!malnutritionEnabled === true ? (
                        <></>
                      ) : (
                        <LoadingButton
                          type="submit"
                          variant="contained"
                          size="large"
                          loading={loader}
                          sx={{
                            width: 200,
                            marginLeft: "20px",
                            marginTop: "20px",
                          }}
                        >
                          Mettre à jour
                        </LoadingButton>
                      )}
                    </Card>
                  </Grid>{" "}
                  <Grid
                    item
                    xs={11}
                    sm={7}
                    md={7}
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
                        Famille
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
                          disabled={!mereEnabled}
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
                        Statut marital :{" "}
                        <select
                          className="selectDisabled"
                          disabled={!mereEnabled}
                          name="statutMarital"
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
                        Type contraception :{" "}
                        <select
                          className="selectDisabled"
                          disabled={!mereEnabled}
                          name="contraceptionType"
                        >
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
                        Methode de contraception :{" "}
                        <input
                          type="text"
                          name="methodeContraceptive"
                          disabled={!mereEnabled}
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
                        Scolarité mère :{" "}
                        <select
                          className="selectDisabled"
                          disabled={!mereEnabled}
                          name="scolariteMere"
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
                          size="large"
                          loading={loader}
                          sx={{
                            width: 200,
                            marginLeft: "20px",
                            marginTop: "20px",
                          }}
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
                        Age du Chef de ménage :{" "}
                        <input
                          type="text"
                          name="dateNaissanceChefMenage"
                          disabled={!pereEnabled}
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
                        Téléphone :{" "}
                        <input
                          type="text"
                          name="telephone"
                          disabled={!pereEnabled}
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
                        Profession :{" "}
                        <select
                          className="selectDisabled"
                          disabled={!pereEnabled}
                          name="ProffessionChefMenage"
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
                        Nombre de femme :{" "}
                        <input
                          type="text"
                          name="nbrFemme"
                          className="inputDisabled"
                        />
                      </InputLabel>
                      {!pereEnabled === true ? (
                        <></>
                      ) : (
                        <LoadingButton
                          type="submit"
                          variant="contained"
                          size="large"
                          loading={loader}
                          sx={{
                            width: 200,
                            marginLeft: "20px",
                            marginTop: "20px",
                          }}
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
                          name="Tribut"
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
                          name="Religion"
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
                          name="NiveauSocioEconomique"
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
                          name="NbrRepasJour"
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
                          name="PossederTeleRadio"
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
                        Terrain VIH :{" "}
                        <select
                          className="selectDisabled"
                          disabled={!menageEnabled}
                          name="terrainVih"
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
                        TBC Chez Parents :{" "}
                        <select
                          className="selectDisabled"
                          disabled={!menageEnabled}
                          name="tbcChezParent"
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
                        ATCD de TBC dans la fratrie :{" "}
                        <select
                          className="selectDisabled"
                          disabled={!menageEnabled}
                          name="atcdDuTbcDansFratrie"
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
                          marginBottom: "25px",
                        }}
                      >
                        ATCD de Rougeole dans la fratrie :{" "}
                        <select
                          className="selectDisabled"
                          disabled={!menageEnabled}
                          name="atcdRougeole"
                        >
                          <option value="Oui">Oui</option>
                          <option value="Non">Non</option>
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
                            width: 200,
                            marginLeft: "20px",
                            marginBottom: "25px",
                          }}
                        >
                          Mettre à jour
                        </LoadingButton>
                      )}
                    </Card>
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
            {/* <DialogActions>
              <Button onClick={handleCloseModaleChangeStatus} color="primary">
                Annuler
              </Button>
              <LoadingButton
                // onClick={handleClickChangeStatus}
                size="medium"
                type="submit"
                variant="contained"
                loading={loader}
                color="primary"
              >
                Changer
              </LoadingButton>
            </DialogActions> 
          </Dialog> 
  
        </MenuItem>*/}
        <MenuItem>
          <ListItemIcon
            sx={{ textAlign: "center", color: "red" }} //sx={{ color: "red" }}
            onClick={handleClickOpen}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                paddingLeft: "8px",
              }}
            >
              <Icon icon={deleteFill} width={40} height={25} />
              <Typography variant="h6" sx={{ fontWeight: "400" }}>
                Supprimer
              </Typography>
            </div>
          </ListItemIcon>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              "Supprimer un patient?"
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Cette action est irreversible, si vous supprimez un patient vous
                ne serrez plus en mésure de recuperer ses informations.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {/* <LoadingButton
                size="medium"
                type="button"
                color="primary"
                variant="contained"
                onClick={handleClose}
              >
                Annuler
              </LoadingButton> */}
              <LoadingButton
                onClick={handleDeleteClick}
                size="medium"
                type="submit"
                variant="contained"
                loading={loader}
                color="error"
              >
                Accepter
              </LoadingButton>
            </DialogActions>
          </Dialog>
        </MenuItem>
      </Menu>
    </>
  );
}
