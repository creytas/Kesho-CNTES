/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* no-nested-ternary */
import "./PatientCard.css";
import { Link as RouterLink, Navigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { CalendarToday, PhoneAndroid } from "@material-ui/icons";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SpeakerNotes from "@material-ui/icons/Assignment";
import Laying from "@material-ui/icons/ArrowBack";
import Flying from "@material-ui/icons/ArrowForward";
import { TableCell, Avatar, Button } from "@material-ui/core";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import Badge from "@material-ui/core/Badge";
import moment from "moment";
import Update from "../../pages/detailPatient/Update";
import Label from "../Label";
const eyeIcon = "heroicons-solid:eye";

const PatientCard = ({
  firstPicture,
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
  id,
  id_patient,
  malnutrition,
  transfer,
}) => (
  <div className="userShow">
    <div className="userShowTop">
      <div className="userShowTopTitle" style={{ border: "0px solid red" }}>
        <Avatar
          sx={{ width: "250px", height: "250px", border: "0px solid red" }}
          alt={name}
          src={firstPicture === null || firstPicture === "" ? "" : firstPicture}
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
          )}

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
        </TableCell>
        {/* <span className="userShowInfoTitle">{malnutrition}</span> */}
      </div>
      <Button
        variant="contained"
        component={RouterLink}
        to={`update_patient`}
        startIcon={<Icon icon={eyeIcon} />}
      >
        Voir plus
      </Button>
    </div>
  </div>
);

export default PatientCard;
