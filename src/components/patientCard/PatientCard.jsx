/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* no-nested-ternary */
import "./PatientCard.css";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { CalendarToday, PhoneAndroid } from "@material-ui/icons";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SpeakerNotes from "@material-ui/icons/Assignment";
import Laying from "@material-ui/icons/ArrowBack";
import Flying from "@material-ui/icons/ArrowForward";
import { fakeAuth } from "../../fakeAuth";
import {
  TableCell,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Stack,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import Badge from "@material-ui/core/Badge";
import moment from "moment";
import Label from "../Label";
import { LoadingButton } from "@material-ui/lab";
const exitIcon = "majesticons:door-exit";
const enterIcon = "majesticons:door-enter";

const ExitDialog = ({ openModal, onClose, value }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const id_patient = location.pathname.split("/")[4];
  const { from } = location.state || { from: { pathname: "/dashboard/app" } };
  const [loader, setLoader] = useState(false);
  const [modaliteSortie, setModaliteSortie] = useState("");

  const handleChangeModalite = (event) => {
    const { value } = event.target;
    setModaliteSortie(value);
  };
  const handleClickConfirmExit = () => {
    setLoader(true);
    const sortie = {
      declarer_sorti: true,
      modalite_sortie: modaliteSortie,
    };
    console.log(sortie);
    Axios.request({
      method: "PUT",
      url: `https://kesho-api.herokuapp.com/patient/update-sortie/${value}`,
      data: sortie,
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        const message = response.data;
        console.log(`l'enregistrement ${message} a ete mis a jour`);
        fakeAuth.login(() => {
          navigate(from);
          navigate(`/dashboard/patient/detail_patient/${id_patient}`, {
            replace: true,
          });
          //;
        });
      })
      .catch((err) => {
        alert(`Erreur de mise a jour: ${err.message}`);
        setLoader(false);
      });
  };

  return (
    <Dialog
      open={openModal}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Déclarer sortie</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Stack spacing={3} sx={{ marginTop: `4%` }}>
            <TextField
              sx={{ width: "100%", padding: "2px" }}
              fullWidth
              onChange={handleChangeModalite}
              label="Modalité de sortie"
              value={modaliteSortie}
            />
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Annuler
        </Button>
        <LoadingButton
          onClick={handleClickConfirmExit}
          size="medium"
          type="submit"
          variant="contained"
          loading={loader}
          color="primary"
        >
          Valider
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

const PatientCard = ({
  id,
  patientPicture,
  // lastPicture,
  name,
  sex,
  age,
  birthdate,
  admission,
  healing,
  comments,
  number,
  tutor,
  location,
  sortie,
  modalite,
  malnutrition,
  transfer,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const linkLocation = useLocation();
  const id_patient = linkLocation.pathname.split("/")[4];
  const { from } = linkLocation.state || {
    from: { pathname: "/dashboard/app" },
  };
  const handleClickSortie = () => {
    setOpenModal(true);
  };
  const handleCloseModalSortie = () => {
    setOpenModal(false);
  };
  const handleClickReadmission = () => {
    setLoader(true);
    const sortie = {
      declarer_sorti: false,
      modalite_sortie: "",
    };
    console.log(sortie);
    Axios.request({
      method: "PUT",
      url: `https://kesho-api.herokuapp.com/patient/update-sortie/${id}`,
      data: sortie,
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        const message = response.data;
        console.log(`l'enregistrement ${message} a ete mis a jour`);
        fakeAuth.login(() => {
          navigate(from);
          navigate(`/dashboard/patient/detail_patient/${id_patient}`, {
            replace: true,
          });
          //;
        });
      })
      .catch((err) => {
        alert(`Erreur de mise a jour: ${err.message}`);
        setLoader(false);
      });
  };

  return (
    <div className="userShow">
      <div className="userShowTop">
        <div className="userShowTopTitle" style={{ border: "0px solid red" }}>
          <Avatar
            sx={{ width: "250px", height: "250px", border: "0px solid red" }}
            alt={name}
            src={
              patientPicture !== null || patientPicture !== ""
                ? patientPicture
                : ""
            }
          />

          <h2>
            <span className="userShowUsername">{name}</span>
          </h2>
          <span className="userShowUserTitle">{sex}</span>
        </div>
      </div>
      <div className="userShowBottom">
        <div className="userShowInfo">
          <ChildCareIcon className="userShowIcon" />
          <span className="userShowInfoTitle">{age}</span>
        </div>
        <div className="userShowInfo">
          <CalendarToday className="userShowIcon" />
          <span className="userShowInfoTitle">
            {moment(birthdate).format("DD/MM/YYYY")}
          </span>
        </div>
        <div className="userShowInfo">
          <Laying className="userShowIcon" />
          <span className="userShowInfoTitle">
            {moment(admission).format("dddd DD/MM/YYYY")}
          </span>
        </div>
        <div className="userShowInfo">
          <PhoneAndroid className="userShowIcon" />
          <span className="userShowInfoTitle">
            {number === "" ? "Non renseigné" : number}
          </span>
        </div>
        <div className="userShowInfo">
          <EmojiPeopleIcon className="userShowIcon" />
          <span className="userShowInfoTitle">
            {tutor === "" ? "Non renseigné" : tutor}
          </span>
        </div>
        <div className="userShowInfo">
          <LocationOnIcon className="userShowIcon" />
          <span className="userShowInfoTitle">{location}</span>
        </div>
        <div className="userShowInfo">
          <SpeakerNotes className="userShowIcon" />
          <span className="userShowInfoTitle">
            {comments === "" ? "Aucun comment" : comments}
          </span>
        </div>
        {malnutrition === "Gueri" ? (
          <div className="userShowInfo">
            <Flying className="userShowIcon" />
            <span className="userShowInfoTitle">
              {moment(healing).format("DD/MM/YYYY")}
            </span>
          </div>
        ) : (
          ""
        )}
        <div className="userShowInfo">
          <LocalHospitalIcon className="userShowIcon" />

          <TableCell align="left">
            {transfer ? (
              <>
                <Badge color="error" variant="dot" />
                &nbsp;{" "}
              </>
            ) : (
              ""
            )}{" "}
            {sortie === true ? (
              <span style={{ fontSize: "16px" }}>
                Modalité sortie: {modalite}
              </span>
            ) : (
              <Label
                variant="contained"
                sx={{
                  color: `${
                    malnutrition === "MC"
                      ? "#D32F2F"
                      : malnutrition === "MAM"
                      ? "#ffb74d"
                      : malnutrition === "MAM / FMC"
                      ? "#ffb74d"
                      : malnutrition === "MAS-K"
                      ? "#e57373"
                      : malnutrition === "MAS-K / FMC"
                      ? "#e57373"
                      : malnutrition === "MAS-M"
                      ? "#f57c00"
                      : malnutrition === "MAS-M / FMC"
                      ? "#f57c00"
                      : "#4CAF50"
                  }`,
                }}
              >
                {malnutrition}
              </Label>
            )}
          </TableCell>
        </div>
        {sortie === false ? (
          <>
            <Button
              variant="contained"
              startIcon={<Icon icon={exitIcon} />}
              onClick={handleClickSortie}
            >
              Déclarer sortie
            </Button>
            <ExitDialog
              openModal={openModal}
              onClose={handleCloseModalSortie}
              value={id}
            />
          </>
        ) : (
          <LoadingButton
            size="medium"
            type="submit"
            variant="contained"
            loading={loader}
            color="primary"
            startIcon={<Icon icon={enterIcon} />}
            onClick={handleClickReadmission}
          >
            Réadmettre patient
          </LoadingButton>
        )}
      </div>
    </div>
  );
};

export default PatientCard;
