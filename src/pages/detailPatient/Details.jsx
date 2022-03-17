import * as Yup from "yup";
import React, { useState, useEffect } from "react";

import {
  Link as RouterLink,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./Details.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Icon } from "@iconify/react";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import Box from "@material-ui/core/Box";
import Axios from "axios";
import moment from "moment";
import { useFormik, Form, FormikProvider } from "formik";
import Chart from "../../components/charts/chart/Chart";
import PatientCard from "../../components/patientCard/PatientCard";
import AddAnthro from "../../components/addAnthro/AddAnthro";
import MoreDetails from "./MoreDetails";
import { fakeAuth } from "../../fakeAuth";

export default function Details() {
  console.log("hobed", moment().toDate("MM/DD/YYYY"));
  const location = useLocation();
  const navigate = useNavigate();
  const { from } = location.state || { from: { pathname: "/dashboard/app" } };
  const [loader, setLoader] = useState(true);
  const [transferUNT, setTransferUNT] = useState(false);
  const [onePatient, setOnePatient] = useState([]);
  const [anthro, setAnthro] = useState([]);
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));
  const myId = location.pathname.split("/")[4];
  useEffect(async () => {
    try {
      const response = await Axios.get(
        `https://kesho-api.herokuapp.com/patient?id_patient=${myId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.data;
      const Patient = await data;
      const PatientBrachial = Patient.Anthropometrique;
      setAnthro(PatientBrachial);
      setOnePatient(Patient);
      setLoader(false);
      console.log(anthro.commentaires);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const RegisterSchema = Yup.object().shape();

  const formik = useFormik({
    initialValues: {},
    validationSchema: RegisterSchema,
    onSubmit: () => {
      setTransferUNT(true);
      Axios.put(
        `https://kesho-api.herokuapp.com/patient/transfert?id_patient=${myId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then(() => {
          setTransferUNT(false);
          fakeAuth.login(() => {
            navigate(from);
            navigate(`/dashboard/patient/detail_patient/${myId}`, {
              replace: true,
            });
          });
        })
        .catch((err) => {
          console.log("mon erreur 2", err);
          setTransferUNT(false);
        });
    },
  });
  const { handleSubmit } = formik;
  // -------------------------------------------------

  const brachialPerim = [];
  const cranianPerim = [];
  const height = [];
  const weight = [];
  const comments = [];
  const admission = [];
  const healing = [];
  const putInPB = (arr) => {
    anthro.map((item) =>
      arr.push({ name: item.date_examen, Valeur: item.peri_brachial })
    );
  };
  const putInPC = (arr) => {
    anthro.map((item) =>
      arr.push({ name: item.date_examen, Valeur: item.peri_cranien })
    );
  };
  const putInT = (arr) => {
    anthro.map((item) =>
      arr.push({ name: item.date_examen, Valeur: item.taille })
    );
  };
  const putInP = (arr) => {
    anthro.map((item) =>
      arr.push({ name: item.date_examen, Valeur: item.poids })
    );
  };
  const putInAdmission = (arr) => {
    anthro.map((item) =>
      arr.push({ name: item.date_examen, Valeur: item.date_admission_patient })
    );
  };
  const putInHealing = (arr) => {
    anthro.map((item) =>
      arr.push({ name: item.date_examen, Valeur: item.date_guerison_patient })
    );
  };
  const putInComments = (arr) => {
    anthro.map((item) =>
      arr.push({ name: item.date_examen, Valeur: item.commentaires })
    );
  };

  putInPB(brachialPerim);
  putInPC(cranianPerim);
  putInT(height);
  putInP(weight);
  putInAdmission(admission);
  putInHealing(healing);
  putInComments(comments);

  useEffect(() => {
    setIsAuth(isAuth);
  }, []);
  const useStyles = makeStyles(() => ({
    root: {
      display: "flex",
      position: "relative",
      // left: '50%',
      // flexDirection: 'column',
      justifyContent: "center",
      top: "50%",
    },
    labelRoot: {
      "&&": {
        color: "red",
      },
    },
    div: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "78%",
      position: "relative",
      left: "5%",
    },
  }));
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return isAuth ? (
    <>
      {loader ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Box>
            <div className={classes.div}>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/dashboard/patient"
                // onClick={(e) => exportToCSV(allData, exportedFileName)}
                startIcon={<Icon icon="bx:bx-arrow-back" />}
              >
                Retour
              </Button>
              <Box sx={{ position: "absolute", left: "100%" }}>
                <FormikProvider value={formik}>
                  <Form onSubmit={handleSubmit}>
                    <LoadingButton
                      variant="contained"
                      type="submit"
                      disabled={onePatient.Patient.transferer_unt}
                      // onClick={handleClickOpen}
                      loading={transferUNT}
                      // onClick={(e) => exportToCSV(allData, exportedFileName)}
                      endIcon={<Icon icon="bx:bx-send" />}
                    >
                      Transferer
                    </LoadingButton>
                  </Form>
                </FormikProvider>
              </Box>
            </div>
            <div className="product">
              <div className="productLeft">
                <PatientCard
                  name={`${onePatient.Patient.nom_patient} ${onePatient.Patient.postnom_patient}`}
                  sex={onePatient.Patient.sexe_patient}
                  age={
                    onePatient.PatientAge[0].ageEnMois <= 59
                      ? `${onePatient.PatientAge[0].ageEnMois} mois`
                      : `${Math.round(onePatient.PatientAge[0].ageEnAnnee)} ans`
                  }
                  birthdate={onePatient.Patient.date_naissance_patient}
                  number={onePatient.Patient.telephone}
                  tutor={onePatient.Famille.nom_tuteur}
                  location={onePatient.Patient.provenance_patient}
                  healing={onePatient.Anthropometrique[0].date_guerison_patient}
                  admission={
                    onePatient.Anthropometrique[0].date_admission_patient
                  }
                  comments={onePatient.Anthropometrique[0].commentaires}
                  malnutrition={
                    onePatient.Anthropometrique[0].type_malnutrition
                  }
                  transfer={onePatient.Patient.transferer_unt}
                />
                <br />
                <br />
                <AddAnthro
                  id={myId}
                  admission={
                    onePatient.Anthropometrique[0].date_admission_patient
                  }
                />
              </div>
              <div className="productRight">
                <div className="productRightCard">
                  <Chart
                    data={brachialPerim}
                    dataKey="Valeur"
                    title={`Périmètre brachial: ${
                      brachialPerim.reverse()[brachialPerim.length - 1].Valeur
                    } cm`}
                  />
                </div>
                <div className="productRightCard">
                  <Chart
                    data={cranianPerim}
                    dataKey="Valeur"
                    title={`Périmètre cranien: ${
                      cranianPerim.reverse()[cranianPerim.length - 1].Valeur
                    } cm`}
                  />
                </div>
                <div className="productRightCard">
                  <Chart
                    data={weight}
                    dataKey="Valeur"
                    title={`Poids: ${
                      weight.reverse()[weight.length - 1].Valeur
                    } kg`}
                  />
                </div>
                <div className="productRightCard">
                  <Chart
                    data={height}
                    dataKey="Valeur"
                    title={`Taille: ${
                      height.reverse()[height.length - 1].Valeur
                    } cm`}
                  />
                </div>
                {Math.round(onePatient.PatientAge[0].ageEnAnnee) > 5 ? (
                  <></>
                ) : onePatient.Patient.sexe_patient === "M" ? (
                  <div className="buttonCard">
                    <a
                      href="https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/length-height-for-age/cht-lhfa-boys-z-0-5.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      rapport taille - age
                    </a>
                    <a
                      href="https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/weight-for-age/cht-wfa-boys-z-0-5.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      rapport poids - age
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
                      indice de masse corporel
                    </a>
                  </div>
                ) : (
                  <div className="buttonCard">
                    <a
                      href="https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/length-height-for-age/cht-lhfa-girls-z-0-5.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      rapport taille - age
                    </a>
                    <a
                      href="https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/indicators/weight-for-age/cht-wfa-girls-z-0-5.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      rapport poids - age
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
                      indice de masse corporel
                    </a>
                  </div>
                )}
              </div>
            </div>
          </Box>
          <br />
          <br />
          <MoreDetails id={myId} />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Transferer le patient en Unité Nutritionnelle de Traitement
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Le patient étant malade, sera declaré transferé en UNT dans
                notre base de données.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <LoadingButton
                onClick={handleClose}
                size="medium"
                type="submit"
                variant="outlined"
                // loading={loader}
                color="primary"
              >
                OK
              </LoadingButton>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
}
