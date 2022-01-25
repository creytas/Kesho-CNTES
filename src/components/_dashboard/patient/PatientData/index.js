/* eslint-disable no-nested-ternary */
import { useState } from "react";
import propTypes from "prop-types";
// import CircularProgress from '@material-ui/core/CircularProgress';
import {
  InputLabel,
  Stack,
  Avatar,
  Grid,
  Card,
  Container,
  Typography,
} from "@material-ui/core";
// import { makeStyles } from '@material-ui/styles';
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import { LoadingButton } from "@material-ui/lab";
import Label from "../../../Label";
import { identity } from "lodash-es";
import moment from "moment";
import { format } from "date-fns";

PatientData.propTypes = {
  DataPatient: propTypes.object,
  PrevStep: propTypes.func,
};
export default function PatientData({ DataPatient, PrevStep }) {
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const { indentity, CauseMalnutrition, FamalyData } = DataPatient;
  console.log(DataPatient);
  const newPatient = {};
  newPatient.ration_seche = indentity.rationSeche;
  newPatient.age_fin_allaitement =
    indentity.ageFinAllaitement === "" ? 6 : indentity.ageFinAllaitement;
  newPatient.allaitement_6mois = indentity.allaitementExclusifSixMois; // bool
  newPatient.peri_cranien = indentity.perimetreCranien;
  newPatient.peri_brachial = indentity.perimetreBrachail;
  newPatient.poids = indentity.poidsActuel;
  newPatient.taille = indentity.taille;
  newPatient.rationSeche = identity.rationSeche;
  newPatient.transferer_unt = indentity.transfererUnt;
  newPatient.type_malnutrition = indentity.typeMalnutrition;
  newPatient.nom_patient = indentity.NomPatient;
  newPatient.postnom_patient = indentity.postNomPatient;
  newPatient.prenom_patient = indentity.fistNamePatient;
  newPatient.sexe_patient = indentity.sexePatient;
  newPatient.adresse_patient = indentity.adressePatient;
  newPatient.date_naissance_patient = indentity.dataNaissancePatient;
  newPatient.provenance_patient =
    indentity.provenancePatient === "Autres"
      ? indentity.ExplicationProvenance
      : indentity.provenancePatient;
  newPatient.mode_arrive =
    indentity.modeArrive === "Autres"
      ? indentity.ExplicationAutre
      : indentity.modeArriver;
  newPatient.poids_naissance = indentity.poidsNaissance;
  newPatient.diversification_aliment = indentity.diversificationAliment; // aquel age (mois)
  newPatient.constitution_aliment = indentity.constitutionAliment;
  newPatient.telephone = indentity.telephone;

  newPatient.cocktail_atb = CauseMalnutrition.cocktailAtb; // bool
  newPatient.duree_prise_atb = CauseMalnutrition.cocktailAtb
    ? "pas de cocktail atb"
    : CauseMalnutrition.cocktailAtbDuree; // varchar
  newPatient.vaccin_non_recu =
    CauseMalnutrition.calendrierVaccin === "Calendrier vaccinal à jour"
      ? "Calendrier vaccinal à jour"
      : CauseMalnutrition.preciserCalendrierVaccinNonjour; //
  newPatient.atcd_mas = CauseMalnutrition.atcdMas;
  newPatient.nbre_chute = CauseMalnutrition.nombreChute;
  newPatient.mas_fratrie = CauseMalnutrition.masFratrie;
  newPatient.terme_grossesse = CauseMalnutrition.termeGrossesse;
  newPatient.sejour_neonat = CauseMalnutrition.sejourNeo;
  newPatient.eig = CauseMalnutrition.eig;
  newPatient.lieu_accouchement = CauseMalnutrition.lieuAccouchement;
  newPatient.asphyxie_perinatal = CauseMalnutrition.asphyxiePrerinatale;
  newPatient.cause_dpm =
    CauseMalnutrition.dpmAnormalPrecision === ""
      ? "rien"
      : CauseMalnutrition.dpmAnormalPrecision;
  newPatient.dpm = CauseMalnutrition.dpm;
  newPatient.calendrier_vaccinal = CauseMalnutrition.calendrierVaccin;

  newPatient.produit_plante = CauseMalnutrition.produitPlante;
  newPatient.duree_produit_plante = CauseMalnutrition.dureeProduitPlante
    ? CauseMalnutrition.dureeProduitPlante
    : "non"; // mettre un ternaire
  newPatient.rang_fratrie = CauseMalnutrition.rangFratrie;
  newPatient.taille_fratrie = CauseMalnutrition.tailleFratrie;
  newPatient.atcd_rougeole_fratrie = CauseMalnutrition.atcdRougeole;
  newPatient.vaccination_rougeole = CauseMalnutrition.vaccinationRougeole;
  newPatient.terrain_vih = CauseMalnutrition.terrainVih;
  newPatient.tbc = CauseMalnutrition.tbc;
  newPatient.atcd_du_tbc_dans_fratrie = CauseMalnutrition.atcdDuTbcDansFratrie;
  newPatient.hospitalisation_recente = CauseMalnutrition.hospitalisationRecente;
  newPatient.diagnostique_hospitalisation =
    CauseMalnutrition.diagnostiqueHospitalisation === ""
      ? "rien"
      : CauseMalnutrition.diagnostiqueHospitalisation;
  newPatient.traitement_nutri =
    CauseMalnutrition.tbcTraiter === ""
      ? "pas de tbc"
      : CauseMalnutrition.tbcTraiter;

  newPatient.atb = FamalyData.atb; // bool prise d'at
  newPatient.liste_atb = FamalyData.atb ? "pas de atb" : FamalyData.listAtb; //  lesquels
  newPatient.type_statut_marital =
    FamalyData.pereMariage === "" ? "non marié" : FamalyData.pereMariage;
  newPatient.taille_menage = FamalyData.tailleMenage;
  newPatient.vivre_deux_parents =
    FamalyData.mereEnVie === "true" || FamalyData.pereEnvie === "true"
      ? "true"
      : "false"; // FamalyData.vivreAvecParent;//
  newPatient.mere_enceinte = FamalyData.mereEnceinte
    ? FamalyData.mereEnceinte
    : false;
  newPatient.mere_en_vie = FamalyData.mereEnVie;
  newPatient.pere_en_vie = FamalyData.pereEnvie;
  newPatient.profession_mere = FamalyData.professionMere;
  newPatient.profession_chef_menage = FamalyData.ProffessionChefMenage;
  newPatient.age_mere = FamalyData.dateNaissanceMere;
  newPatient.scolarite_mere = FamalyData.scolariteMere;
  newPatient.contraception_mere = FamalyData.contraceptionMere;
  newPatient.type_contraception =
    FamalyData.contraceptionType === ""
      ? "pas de contraception"
      : FamalyData.contraceptionType;
  newPatient.contraception_naturelle =
    FamalyData.typeContraceptionNaturel === ""
      ? "pas de contraception naturel"
      : FamalyData.typeContraceptionNaturel;
  newPatient.contraception_moderne =
    FamalyData.typeContraceptionModerne === ""
      ? "pas de contraception moderne"
      : FamalyData.typeContraceptionModerne;
  newPatient.niveau_socioeconomique = FamalyData.NiveauSocioEconomique;
  newPatient.statut_marital =
    FamalyData.statutMarital === "" ? "rien" : FamalyData.statutMarital;
  newPatient.nbre_femme_pere = FamalyData.nbrFemme ? FamalyData.nbrFemme : 1;
  newPatient.tribu = FamalyData.Tribut;
  newPatient.religion = FamalyData.Religion;
  newPatient.posseder_radio_tele = FamalyData.PossederTeleRadio;
  newPatient.nbre_repas = FamalyData.NbrRepasJour;
  newPatient.consommation_poisson = FamalyData.consommationPoisson;
  newPatient.tbc_parents =
    CauseMalnutrition.tbcChezParent === ""
      ? false
      : CauseMalnutrition.tbcChezParent;
  newPatient.tbc_chez =
    CauseMalnutrition.tbcChezParent === ""
      ? "rien"
      : CauseMalnutrition.tbcChezParent;
  newPatient.tbc_gueris =
    CauseMalnutrition.TbcGuerie === "" ? false : CauseMalnutrition.TbcGuerie;
  newPatient.duree_traitement_tbc =
    CauseMalnutrition.dureeTraitementTbc === ""
      ? "0"
      : CauseMalnutrition.dureeTraitementTbc;
  newPatient.tbc_declarer_finie =
    CauseMalnutrition.TbcGuerie === "" ? false : CauseMalnutrition.TbcGuerie;
  newPatient.nom_tuteur = FamalyData.nomTuteur;
  newPatient.declarer_gueri = false;
  newPatient.date_naissance_tuteur = FamalyData.dateNaissanceChefMenage;
  const formatDate = (date) => {
    let formatted_date =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    return formatted_date;
  };
  const handleSubmit = () => {
    setBtnLoading(true);
    Axios.request({
      method: "POST",
      url: `https://kesho-api.herokuapp.com/patient`,
      data: newPatient,
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        setBtnLoading(false);
        const resp = response.data;
        if (resp.message === "Enregistrement effectuer avec succès") {
          navigate("/dashboard/patient", { replace: true });
        } else {
          setBtnLoading(true);
        }
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={11} sm={5} md={5}>
          <Card
            sx={{
              margin: 1,
              padding: 2,
            }}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "nowrap",
                gap: "14px",
              }}
            >
              <Avatar
                variant="circle"
                sizes="50"
                alt={indentity.fistNamePatient}
                src={`/static/mock-images/avatars/avatar_${indentity.fistNamePatient}.jpg`}
              />
              <Typography sx={{ fontWeight: "900", fontSize: "larger" }}>
                {" "}
                {`${indentity.fistNamePatient}  ${indentity.NomPatient}`}
              </Typography>
            </Stack>
            <Label
              variant="filled"
              sx={{
                color: `${
                  indentity.typeMalnutrition === "MAC"
                    ? "#d32f2f"
                    : indentity.typeMalnutrition === "MAM"
                    ? "#1565c0"
                    : indentity.typeMalnutrition === "MAS-K"
                    ? "#ED6C02"
                    : indentity.typeMalnutrition === "MAS-M"
                    ? "#ef5350"
                    : "#4caf50"
                }`,
              }}
            >
              {indentity.typeMalnutrition}
            </Label>
            <InputLabel>
              Ration Seche :
              <span style={{ color: "black" }}>
                {" "}
                {`${indentity.rationSeche ? "Oui" : "Non"}`}
              </span>
            </InputLabel>
            <InputLabel>
              Sexe :{" "}
              <span style={{ color: "black" }}>{indentity.sexePatient}</span>
            </InputLabel>
            <InputLabel>
              Date de naissance :
              <span style={{ color: "black" }}>
                {" "}
                {indentity.dataNaissancePatient}
              </span>
            </InputLabel>
            <InputLabel>
              Séjour en Neonat :
              <span style={{ color: "black" }}>{`${
                CauseMalnutrition.sejourNeo === "true" ? "Oui" : "Non"
              }`}</span>
            </InputLabel>
            <InputLabel>
              Poids naissance :
              <span style={{ color: "black" }}>
                {" "}
                {indentity.poidsNaissance} g
              </span>
            </InputLabel>
            <InputLabel>
              Poids Actuel :
              <span style={{ color: "black" }}> {indentity.poidsActuel}Kg</span>
            </InputLabel>
            <InputLabel>
              Taille :
              <span style={{ color: "black" }}> {indentity.taille} Cm</span>
            </InputLabel>
            <InputLabel>
              Périmètre brachial :
              <span style={{ color: "black" }}>
                {" "}
                {indentity.perimetreBrachail} Cm
              </span>
            </InputLabel>
            <InputLabel>
              Périmètre Cranien :
              <span style={{ color: "black" }}>
                {" "}
                {indentity.perimetreCranien} Cm
              </span>
            </InputLabel>
            <InputLabel>
              Allaitement Exclusif:
              <span style={{ color: "black" }}>
                {`${indentity.allaitementExclusifSixMois ? "6 mois" : "ien"}`}
              </span>
            </InputLabel>
            <InputLabel>
              Age diversification aliment :
              <span style={{ color: "black" }}>
                {" "}
                {indentity.diversificationAliment} mois
              </span>
            </InputLabel>
            <InputLabel>
              Constitution aliment:
              <span style={{ color: "black" }}>
                {" "}
                {indentity.constitutionAliment}
              </span>
            </InputLabel>
            <InputLabel>
              Consommation poisson :
              <span style={{ color: "black" }}>
                {" "}
                {`${FamalyData.consommationPoisson ? "Non" : "Oui"}`}
              </span>
            </InputLabel>
            <InputLabel>
              Provenance :
              <span style={{ color: "black" }}>
                {" "}
                {indentity.provenancePatient}
              </span>
            </InputLabel>
            <InputLabel>
              Adresse :
              <span style={{ color: "black" }}>
                {" "}
                {indentity.adressePatient}
              </span>
            </InputLabel>
            <InputLabel>
              Mode arriver:
              <span style={{ color: "black" }}>
                {" "}
                {`${
                  indentity.modeArrive === "Autres"
                    ? indentity.ExplicationAutre
                    : indentity.modeArriver
                }`}
              </span>
            </InputLabel>
            <InputLabel>
              Traitement Nutritionnel:
              <span style={{ color: "black" }}>
                {" "}
                {indentity.traitementNutritionnel}
              </span>
            </InputLabel>
            <InputLabel>
              Prise d'Atb:
              <span style={{ color: "black" }}>{`${
                FamalyData.atb ? "Non" : "Oui"
              }`}</span>
            </InputLabel>
            <InputLabel>
              List Atb:
              <span style={{ color: "black" }}>
                {" "}
                {`${FamalyData.listAtb === "" ? FamalyData.listAtb : "Aucun"}`}
              </span>
            </InputLabel>
            <InputLabel>
              Rang fratrie :
              <span style={{ color: "black" }}>
                {" "}
                {CauseMalnutrition.rangFratrie}
              </span>
            </InputLabel>
            <InputLabel>
              Taille Fratrie :
              <span style={{ color: "black" }}>
                {" "}
                {CauseMalnutrition.tailleFratrie}
              </span>
            </InputLabel>
            <InputLabel>
              TBC:
              <span style={{ color: "black" }}>
                {" "}
                {CauseMalnutrition.tbc === "false" ? "Non" : "Oui"}
              </span>
            </InputLabel>
            <InputLabel>
              Durée prise de produit plante :
              <span style={{ color: "black" }}>
                {`${
                  indentity.dureeProduitPlante
                    ? indentity.dureeProduitPlante
                    : "aucun mois"
                }`}
              </span>
            </InputLabel>
            <InputLabel>
              Transfert en UNT:
              <span style={{ color: "black" }}>{`${
                indentity.transfererUnt ? "Non" : "oui"
              }`}</span>
            </InputLabel>
            <Typography sx={{ fontWeight: "900", fontSize: "larger" }}>
              Causes malnutrition
            </Typography>
            <InputLabel>
              Terme grossesse :
              <span style={{ color: "black" }}>
                {" "}
                {CauseMalnutrition.termeGrossesse}{" "}
              </span>
            </InputLabel>
            <InputLabel>
              EIG:
              <span style={{ color: "black" }}>
                {" "}
                {CauseMalnutrition.eig >= 12
                  ? `${CauseMalnutrition.eig / 12} ans`
                  : `${CauseMalnutrition.eig} mois`}
              </span>
            </InputLabel>
            <InputLabel>
              Lieu d'accouchement :
              <span style={{ color: "black" }}>
                {" "}
                {CauseMalnutrition.lieuAccouchement}
              </span>
            </InputLabel>
            <InputLabel>
              Asphyxie prerinatale :
              <span style={{ color: "black" }}>
                {" "}
                {CauseMalnutrition.asphyxiePrerinatale}{" "}
              </span>
            </InputLabel>
            <InputLabel>
              DPM :
              <span style={{ color: "black" }}>
                {" "}
                {`${
                  CauseMalnutrition.dpm === "Normal"
                    ? CauseMalnutrition.dpm
                    : CauseMalnutrition.DpmAnormalPrecision
                }`}
              </span>
            </InputLabel>
            <InputLabel>
              ATCD Rougeole :
              <span style={{ color: "black" }}>
                {" "}
                {CauseMalnutrition.AtcdRougeole === "true" ? "Oui" : "Non"}{" "}
              </span>
            </InputLabel>
            <InputLabel>
              Vaccination rougeole :
              <span style={{ color: "black" }}>{`${
                CauseMalnutrition.vaccinationRougeole === "false"
                  ? "Non"
                  : "Oui"
              }`}</span>
            </InputLabel>
            <InputLabel>
              ATCD TBC dans la fratrie :
              <span style={{ color: "black" }}>{`${
                CauseMalnutrition.atcdDuTbcDansFratrie === "false"
                  ? "Non"
                  : "Oui"
              }`}</span>
            </InputLabel>
            <InputLabel>
              ATCD MAS dans la fratrie:
              <span style={{ color: "black" }}>{`${
                CauseMalnutrition.MasFratrie === "true" ? "Oui" : "Non"
              }`}</span>
            </InputLabel>

            <InputLabel>
              Hospitalisation recente :
              <span style={{ color: "black" }}>{`${
                CauseMalnutrition.hospitalisationRecente === "false"
                  ? "Non"
                  : "Oui"
              }`}</span>
            </InputLabel>
            <InputLabel>
              Diagnostique Hospitalisation :
              <span style={{ color: "black" }}>
                {CauseMalnutrition.diagnostiqueHospitalisation === ""
                  ? "Aucun"
                  : CauseMalnutrition.diagnostiqueHospitalisation}
              </span>
            </InputLabel>

            <InputLabel>
              Nombre de chute :
              <span style={{ color: "black" }}>
                {CauseMalnutrition.nombreChute}
              </span>
            </InputLabel>
          </Card>
        </Grid>
        <Grid item xs={11} sm={7} md={7}>
          <Card
            sx={{
              margin: 1,
              padding: 2,
            }}
          >
            <Typography sx={{ fontWeight: "900", fontSize: "larger" }}>
              Famille
            </Typography>
            <Typography>Père</Typography>
            <InputLabel>
              Vit avec ses parents :{" "}
              <span style={{ color: "black" }}>
                {`${
                  FamalyData.mereEnVie === "true" &&
                  FamalyData.pereEnvie === "true"
                    ? "Oui"
                    : "Non"
                }`}
              </span>
            </InputLabel>
            <InputLabel>
              Pere en vie :
              <span style={{ color: "black" }}>
                {" "}
                {`${FamalyData.pereEnvie === "false" ? "Non" : "Oui"}`}
              </span>
            </InputLabel>
            <InputLabel>
              Nom chef Menage :
              <span style={{ color: "black" }}> {FamalyData.nomTuteur}</span>
            </InputLabel>
            <InputLabel>
              Téléphone:
              <span style={{ color: "black" }}> {indentity.telephone}</span>
            </InputLabel>
            <InputLabel>
              Date de naissance :
              <span style={{ color: "black" }}>
                {" "}
                {FamalyData.dateNaissanceChefMenage}
              </span>
            </InputLabel>
            <InputLabel>
              Nombre de femme :
              <span style={{ color: "black" }}>
                {" "}
                {`${FamalyData.nbrFemme ? FamalyData.nbrFemme : 1}`}
              </span>
            </InputLabel>
            <InputLabel>
              Profession :
              <span style={{ color: "black" }}>
                {" "}
                {FamalyData.ProffessionChefMenage}
              </span>
            </InputLabel>
            <Typography>Mère</Typography>
            <InputLabel>
              Mère en vie :{" "}
              <span style={{ color: "black" }}>{`${
                FamalyData.mereEnVie === "false" ? "Non" : "Oui"
              }`}</span>
            </InputLabel>
            <InputLabel>
              Date naisance mère :
              <span style={{ color: "black" }}>
                {" "}
                {FamalyData.dateNaissanceMere}
              </span>
            </InputLabel>
            <InputLabel>
              Mère enceinte :{" "}
              <span style={{ color: "black" }}>{`${
                FamalyData.mereEnceinte === "false" ? "Non" : "Oui"
              }`}</span>
            </InputLabel>
            <InputLabel>
              Contraception mère :{" "}
              <span style={{ color: "black" }}>
                {`${FamalyData.contraceptionMere ? "Non" : "Oui"}`}
              </span>
            </InputLabel>
            <InputLabel>
              Type contraception :
              <span style={{ color: "black" }}>
                {" "}
                {`${
                  FamalyData.contraceptionType === ""
                    ? "Aucune contraception"
                    : FamalyData.contraceptionType
                }`}
              </span>
            </InputLabel>
            <InputLabel>
              Contraception moderne:{" "}
              <span style={{ color: "black" }}>{`${
                FamalyData.typeContraceptionModerne === ""
                  ? "Aucune contraception moderne"
                  : FamalyData.typeContraceptionModerne
              }`}</span>
            </InputLabel>
            <InputLabel>
              Contraception naturel :
              <span style={{ color: "black" }}>{`${
                FamalyData.typeContraceptionNaturel === ""
                  ? "Aucune contraception naturelle"
                  : FamalyData.typeContraceptionNaturel
              }`}</span>
            </InputLabel>
            <InputLabel>
              Scolarité mère :
              <span style={{ color: "black" }}>
                {" "}
                {FamalyData.scolariteMere}
              </span>
            </InputLabel>
            <InputLabel>
              Profession:
              <span style={{ color: "black" }}>
                {" "}
                {FamalyData.professionMere}
              </span>
            </InputLabel>
            <Typography>Autre</Typography>
            <InputLabel>
              Taille ménage :
              <span style={{ color: "black" }}> {FamalyData.tailleMenage}</span>
            </InputLabel>
            <InputLabel>
              Niveau socio :
              <span style={{ color: "black" }}>
                {" "}
                {FamalyData.NiveauSocioEconomique}
              </span>
            </InputLabel>
            <InputLabel>
              Tribu :
              <span style={{ color: "black" }}> {FamalyData.Tribut}</span>
            </InputLabel>
            <InputLabel>
              Réligion :
              <span style={{ color: "black" }}> {FamalyData.Religion}</span>
            </InputLabel>
            <InputLabel>
              Terrain VIH :
              <span style={{ color: "black" }}>{`${
                CauseMalnutrition.terrainVih === "false" ? "Non" : "Oui"
              }`}</span>
            </InputLabel>
            <InputLabel>
              TBC Chez Parents :
              <span style={{ color: "black" }}>{`${
                CauseMalnutrition.TbcChezParent === "true" ? "Oui" : "Non"
              }`}</span>
            </InputLabel>
          </Card>
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
          type="button"
          variant="contained"
          onClick={handleSubmit}
          onSubmit={handleSubmit}
          size="large"
          loading={btnLoading}
          sx={{ width: 200, marginLeft: "20px", marginTop: "20px" }}
        >
          Enregistrer
        </LoadingButton>
      </Stack>
    </Container>
  );
}
