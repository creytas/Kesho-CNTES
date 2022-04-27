import * as Yup from "yup";
import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import moment from "moment";
import "moment/locale/fr";
// material
import {
  Box,
  Grid,
  Container,
  Typography,
  TextField,
  Divider,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
// import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from "@material-ui/styles";
import Axios from "axios";

import { LoadingButton } from "@material-ui/lab";
// import { spacing } from '@material-ui/system';
import Page from "../components/Page";
import {
  CardBleu,
  CardRouge,
  CardJaune,
  CardVert,
  AppCurrentVisits,
  AppWebsiteVisits,
} from "../components/_dashboard/app";
import CardOrange from "../components/_dashboard/app/CardOrange";
import CardPurple from "../components/_dashboard/app/CardPurple";
import CardBlue2 from "../components/_dashboard/app/CardBlue2";
import CardStockMatieres from "src/components/_dashboard/app/CardStockMatieres";
import DefaultPage from "../components/DefaultPage";
import image from "../utils/undraw_doctors_reports.svg";
import { isUndefined } from "lodash-es";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [reports, setReports] = useState([]);
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [loader, setLoader] = useState(true);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [displayDate, setDisplayDate] = useState(false);

  const currentMonth = moment().locale("fr").format("MMMM").toUpperCase();
  console.log(currentMonth);
  useEffect(async () => {
    try {
      const response = await Axios.get(
        `https://kesho-api.herokuapp.com/reporting`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.data;
      setReports(await data);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  }, []);

  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));
  useEffect(() => {
    setIsAuth(isAuth);
  }, [isAuth]);
  const location = useLocation();
  const useStyles = makeStyles((theme) => ({
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
        color: "green",
        fontWeight: "bold",
      },
      container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
      label: {
        "&&": {
          color: "green",
          fontWeight: "bold",
        },
      },
    },
  }));
  const classes = useStyles();
  const DateSchema = Yup.object().shape({
    startDate: Yup.date().required("selectionnez une date"),
    endDate: Yup.date(),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      startDate: "",
      endDate: "",
      remember: true,
    },
    validationSchema: DateSchema,
    onSubmit: async ({ startDate, endDate }) => {
      setButtonLoader(true);
      setDisplayDate(false);
      // console.log('les dates', startDate + endDate);
      try {
        const response = await Axios.post(
          "https://kesho-api.herokuapp.com/reporting", //"http://localhost:7000/reporting",https://kesho-congo-api.herokuapp.com/reporting
          {
            starting_date: startDate,
            ending_date: endDate,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.data;
        setReports(await data);
        setButtonLoader(false);
        setStartingDate(startDate);
        setEndingDate(endDate);
        setDisplayDate(true);
      } catch (err) {
        console.log(err);
        setButtonLoader(false);
        setDisplayDate(false);
      }
    },
  });
  const { errors, touched, handleSubmit, getFieldProps } = formik;
  const component = "";

  return isAuth ? (
    <>
      {loader ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {reports.length === 0 ? (
            <DefaultPage image={image} component={component} />
          ) : (
            <Page>
              <Container maxWidth="xl">
                <Box sx={{ pb: 5 }}>
                  <Typography variant="h4">
                    Reporting{" "}
                    {displayDate ? (
                      <>
                        du{" "}
                        <span className={classes.labelRoot}>
                          {moment(startingDate)
                            .format("DD MMM YYYY")
                            .toUpperCase()}
                        </span>{" "}
                        au{" "}
                        <span className={classes.labelRoot}>
                          {moment(endingDate)
                            .format("DD MMM YYYY")
                            .toUpperCase()}
                        </span>
                      </>
                    ) : (
                      <span className={classes.labelRoot}> {currentMonth}</span>
                    )}
                  </Typography>
                </Box>
                <FormikProvider value={formik}>
                  <Form className={classes.container} onSubmit={handleSubmit}>
                    <TextField
                      label="Début"
                      type="date"
                      // defaultValue={todayDate}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...getFieldProps("startDate")}
                      error={Boolean(touched.startDate && errors.startDate)}
                      helperText={touched.startDate && errors.startDate}
                      // onChange={handleChange}
                      // value={values.startDate}
                    />
                    &nbsp;&nbsp;
                    <TextField
                      label="Fin"
                      type="date"
                      // defaultValue="2017-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...getFieldProps("endDate")}
                      error={Boolean(touched.endDate && errors.endDate)}
                      helperText={touched.endDate && errors.endDate}
                      // onChange={formik.handleChange}
                      // value={values.endDate}
                    />
                    &nbsp;&nbsp;
                    <LoadingButton
                      style={{
                        width: "80px",
                        height: "55px",
                      }}
                      // onClick={handleClick}
                      type="submit"
                      variant="contained"
                      loading={buttonLoader}
                    >
                      Trouver
                    </LoadingButton>
                  </Form>
                </FormikProvider>
                <br />
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardBleu
                      title="Total"
                      nombreM={
                        reports.nombre_garcon[0].nombre_garcon === null
                          ? 0
                          : reports.nombre_garcon[0].nombre_garcon
                      }
                      nombreF={
                        reports.nombre_fille[0].nombre_fille === null
                          ? 0
                          : reports.nombre_fille[0].nombre_fille
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardBleu
                      title="En cours"
                      nombreM={
                        reports.nombre_garcon_now[0].nombre_garcon_now === null
                          ? 0
                          : reports.nombre_garcon_now[0].nombre_garcon_now
                      } //reports.nombre_garcon_now[0].nombre_garcon_now
                      nombreF={
                        reports.nombre_fille_now[0].nombre_fille_now === null
                          ? 0
                          : reports.nombre_fille_now[0].nombre_fille_now
                      } //reports.nombre_fille_now[0].nombre_fille_now
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardRouge
                      title="MC"
                      nombreM={
                        reports.chronique_nombre_garcon[0]
                          .chronique_nombre_garcon === null
                          ? 0
                          : reports.chronique_nombre_garcon[0]
                              .chronique_nombre_garcon
                      }
                      nombreF={
                        reports.chronique_nombre_fille[0]
                          .chronique_nombre_fille === null
                          ? 0
                          : reports.chronique_nombre_fille[0]
                              .chronique_nombre_fille
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardOrange
                      title="MAS-K"
                      nombreM={
                        reports.sereve_kwashiorkor_nombre_garcon[0]
                          .sereve_kwashiorkor_nombre_garcon === null
                          ? 0
                          : reports.sereve_kwashiorkor_nombre_garcon[0]
                              .sereve_kwashiorkor_nombre_garcon
                      }
                      nombreF={
                        reports.sereve_kwashiorkor_nombre_fille[0]
                          .sereve_kwashiorkor_nombre_fille === null
                          ? 0
                          : reports.sereve_kwashiorkor_nombre_fille[0]
                              .sereve_kwashiorkor_nombre_fille
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardJaune
                      title="MAS-M"
                      nombreM={
                        reports.sereve_marasme_nombre_garcon[0]
                          .sereve_marasme_nombre_garcon === null
                          ? 0
                          : reports.sereve_marasme_nombre_garcon[0]
                              .sereve_marasme_nombre_garcon
                      }
                      nombreF={
                        reports.sereve_marasme_nombre_fille[0]
                          .sereve_marasme_nombre_fille === null
                          ? 0
                          : reports.sereve_marasme_nombre_fille[0]
                              .sereve_marasme_nombre_fille
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardBlue2
                      title="MAM"
                      nombreM={
                        reports.moderee_nombre_garcon[0]
                          .moderee_nombre_garcon === null
                          ? 0
                          : reports.moderee_nombre_garcon[0]
                              .moderee_nombre_garcon
                      }
                      nombreF={
                        reports.moderee_nombre_fille[0].moderee_nombre_fille ===
                        null
                          ? 0
                          : reports.moderee_nombre_fille[0].moderee_nombre_fille
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardVert
                      title="Guéris"
                      nombreM={
                        reports.nombre_garcon_gueri === null
                          ? 0
                          : reports.nombre_garcon_gueri
                      } //{reports.nombre_garcon_gueri[0].nombre_garcon_gueri}
                      nombreF={
                        reports.nombre_fille_guerie === null
                          ? 0
                          : reports.nombre_fille_guerie
                      } //{reports.nombre_fille_gueri[0].nombre_fille_gueri}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardRouge
                      title="En UNT"
                      nombreM={
                        reports.nombre_garcon_transferer === null
                          ? 0
                          : reports.nombre_garcon_transferer
                      } //{reports.nombre_garcon_transferer[0].nombre_garcon_transferer}
                      nombreF={
                        reports.nombre_fille_transferer === null
                          ? 0
                          : reports.nombre_fille_transferer
                      } //{reports.nombre_fille_transferer[0].nombre_fille_transferer}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardPurple
                      title="6 à 24 mois"
                      nombreM={
                        reports.nombre_garcon_moins_3ans[0]
                          .nombre_garcon_moins_3ans
                      }
                      nombreF={
                        reports.nombre_fille_moins_3ans[0]
                          .nombre_fille_moins_3ans
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardPurple
                      title="24 à 59 mois"
                      nombreM={
                        reports.nombre_garcon_3_5ans[0].nombre_garcon_3_5ans
                      }
                      nombreF={
                        reports.nombre_fille_3_5ans[0].nombre_fille_3_5ans
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardPurple
                      title="Adultes"
                      nombreM={
                        reports.nombre_garcon_adulte[0].nombre_garcon_adulte
                      }
                      nombreF={
                        reports.nombre_fille_adulte[0].nombre_fille_adulte
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardPurple
                      title="Hier"
                      nombreM={reports.nbre_garcon_yesterday}
                      nombreF={reports.nbre_fille_yesterday}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={8}>
                    <AppWebsiteVisits />
                  </Grid>

                  <Grid item xs={12} md={6} lg={4}>
                    <AppCurrentVisits />
                  </Grid>
                </Grid>
                <br />
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardStockMatieres
                      icon="mdi:corn"
                      title="Maïs"
                      nombre={
                        reports.mais === null
                          ? 0
                          : reports.mais.qte_matiere / 1000
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardStockMatieres
                      icon="carbon:wheat"
                      title="Sorgho"
                      nombre={
                        reports.sorgho === null
                          ? 0
                          : reports.sorgho.qte_matiere / 1000
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardStockMatieres
                      icon="mdi:seed"
                      title="Soja"
                      nombre={
                        reports.soja === null
                          ? 0
                          : reports.soja.qte_matiere / 1000
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardStockMatieres
                      icon="mdi:spoon-sugar"
                      title="Sucre"
                      nombre={
                        reports.sucre === null
                          ? 0
                          : reports.sucre.qte_matiere / 1000
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardStockMatieres
                      icon="ri:oil-fill"
                      title="Huiles"
                      nombre={
                        reports.huiles === null
                          ? 0
                          : reports.huiles.qte_matiere / 1000
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardStockMatieres
                      icon="fluent:molecule-24-regular"
                      title="Ext. foliaires"
                      nombre={
                        reports.extrait_foliaires === null
                          ? 0
                          : reports.extrait_foliaires.qte_matiere / 1000
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardStockMatieres
                      icon="fa-solid:soap"
                      title="Savon"
                      nombre={
                        reports.savon === null
                          ? 0
                          : reports.savon.qte_matiere / 1000
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardStockMatieres
                      icon="simple-line-icons:energy"
                      title="Briq. energ"
                      nombre={
                        reports.briquettes === null
                          ? 0
                          : reports.briquettes.qte_matiere / 1000
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardStockMatieres
                      icon="fa-solid:bread-slice"
                      title="Pain"
                      nombre={
                        reports.briquettes === null
                          ? 0
                          : reports.briquettes.qte_matiere / 1000
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardStockMatieres
                      icon="mdi:food-turkey"
                      title="Nourriture"
                      nombre={
                        reports.briquettes === null
                          ? 0
                          : reports.briquettes.qte_matiere / 1000
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardStockMatieres
                      icon="simple-line-icons:energy"
                      title="Vêtement"
                      nombre={
                        reports.briquettes === null
                          ? 0
                          : reports.briquettes.qte_matiere / 1000
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardStockMatieres
                      icon="simple-line-icons:energy"
                      title="Oeufs"
                      nombre={
                        reports.briquettes === null
                          ? 0
                          : reports.briquettes.qte_matiere / 1000
                      }
                    />
                  </Grid>
                </Grid>
              </Container>
            </Page>
          )}
        </>
      )}
    </>
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
}
