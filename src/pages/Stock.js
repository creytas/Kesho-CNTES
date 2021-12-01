/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* no-nested-ternary */
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink, Navigate, useLocation } from "react-router-dom";
import Axios from "axios";
import { useFormik, Form, FormikProvider } from "formik";
import moment from "moment";
// ----------Excele Export-----------------------------
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  OutlinedInput,
  Toolbar,
} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import { styled } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { LoadingButton } from "@material-ui/lab";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import RefreshIcon from "@material-ui/icons/Refresh";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import { PatientListHead } from "../components/_dashboard/patient";
import Label from "../components/Label";

const TABLE_HEAD = [
  { id: "DO", label: "Date", alignLeft: true },
  { id: "MO", label: "Matiere", alignRight: false },
  { id: "TO", label: "Type operation", alignRight: false },
  { id: "QTE", label: "Quantité", alignRight: false },
  { id: "CO", label: "Commentaire", alignRight: false },
];
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    position: "relative",
    justifyContent: "center",
    top: "50%",
  },
  loading: {
    minWidth: 800,
    minHeight: "200px",
    display: "flex",
    position: "relative",
    justifyContent: "center",
    margin: "auto",
    top: "50%",
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

const SearchStyle = styled(OutlinedInput)(() => ({
  width: 240,
}));

export default function Patient() {
  const operations = [
    {
      id_operation: 1,
      date_operation: `12/12/2021`,
      matiere: `mais`,
      type_operation: `entree`,
      quantite: 250,
      commentaire: `achat sac de mais`,
    },
    {
      id_operation: 2,
      date_operation: `12/12/2021`,
      matiere: `soja`,
      type_operation: `entree`,
      quantite: 250,
      commentaire: `achat sac de soja`,
    },
    {
      id_operation: 3,
      date_operation: `12/12/2021`,
      matiere: `sorgho`,
      type_operation: `entree`,
      quantite: 250,
      commentaire: `achat sac de sorgho`,
    },
    {
      id_operation: 4,
      date_operation: `12/12/2021`,
      matiere: `sucre`,
      type_operation: `entree`,
      quantite: 250,
      commentaire: `achat sac de sucre`,
    },
    {
      id_operation: 5,
      date_operation: `12/12/2021`,
      matiere: `extrait foliaire`,
      type_operation: `entree`,
      quantite: 1500,
      commentaire: `reception extrait foliaire`,
    },
    {
      id_operation: 6,
      date_operation: `12/12/2021`,
      matiere: `huiles`,
      type_operation: `entree`,
      quantite: 25,
      commentaire: `achat bidon 25L huile`,
    },
    {
      id_operation: 7,
      date_operation: `12/12/2021`,
      matiere: `savon`,
      type_operation: `entree`,
      quantite: 250,
      commentaire: `achat savon OMO`,
    },
    {
      id_operation: 8,
      date_operation: `12/12/2021`,
      matiere: `briquette energetique`,
      type_operation: `entree`,
      quantite: 250,
      commentaire: `achat briquette energetique`,
    },
  ];

  const [patientsList, setPatientsList] = useState([]);
  const [allData, setAllData] = useState([]);
  const [lenghtData, setLenghtData] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("nom_patient");
  const [filterName, setFilterName] = useState("");
  const [numberOfElement, setNumberOfElement] = useState(0);
  const [start, setStart] = useState(0);
  const [loadingData, setLoadingData] = useState(false);
  const [loader, setLoader] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [searchedValue, setSearchedValue] = useState("");
  const classes = useStyles();
  const refButtonRefresh = useRef(null);
  useEffect(() => {
    fetch(
      `https://kesho-congo-api.herokuapp.com/patient/all?limit_start=${start}&limit_end=${5}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const { Patients, nombre_patient } = data;
        setNumberOfElement(
          numberOfElement === 0 ? Patients.length : numberOfElement
        );
        setLenghtData(nombre_patient);
        setPatientsList(operations);
        setLoader(false);
        setLoadingData(false);
      })
      .catch((error) => {
        console.error("MyError:", error);
      });
  }, [start, numberOfElement]);
  console.log("donnees patients :", patientsList, numberOfElement);

  useEffect(() => {
    fetch(`https://kesho-congo-api.herokuapp.com/patient/export`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAllData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // ------Excel Export-----------------
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const exportedFileName = `keshoCongoPatients${moment().format("DDMMMMYYYY")}`;
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setLoader(true);
      const newSelecteds = patientsList.map((n) => n.nom_patient);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClickPrev = () => {
    if (numberOfElement > 3) {
      setLoadingData(true);
      const step = numberOfElement % 3 === 0 ? 3 : patientsList.length;
      setStart((prevState) => prevState - step);
      const number = numberOfElement % 3 === 0 ? 3 : patientsList.length;
      setNumberOfElement((prevState) => prevState - number);
    }
  };
  const handleClickNext = () => {
    if (numberOfElement < lenghtData) {
      setLoadingData(true);
      const step =
        numberOfElement + 3 > lenghtData
          ? lenghtData - numberOfElement + 1
          : patientsList.length;
      setStart((prevState) => prevState + step);
      const number =
        numberOfElement + 3 > lenghtData
          ? lenghtData - numberOfElement
          : patientsList.length;
      setNumberOfElement((prevState) => prevState + number);
    }
  };

  // -------------------FOrmik----------------------------
  const SearchSchema = Yup.object().shape({
    searchValue: Yup.string().required("Entrez un nom"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      searchValue: searchedValue,
    },
    validationSchema: SearchSchema,
    onSubmit: async ({ searchValue }) => {
      setLoadingButton(true);
      try {
        const response = await Axios.post(
          "https://kesho-congo-api.herokuapp.com/patient/search",
          {
            nom_patient: searchValue,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const output = await response.data;
        setSearchedValue("");
        setLoadingButton(false);
        setPatientsList(output);
      } catch (err) {
        console.log("message error :", err.message);
        setLoadingButton(false);
      }
    },
  });
  const { handleSubmit, setFieldValue } = formik;

  const handleFilterByName = (event) => {
    setFieldValue("searchValue", event.target.value);
    setFilterName(event.target.value);
  };
  const handleClickRefresh = () => {
    setFilterName("");
    console.dir(refButtonRefresh.current.value);
    refButtonRefresh.current.value = "";
    refButtonRefresh.current.value = "";
    setLoadingData(true);
    setStart(3);
    setNumberOfElement(0);
  };
  const filteredPatient = patientsList;

  const location = useLocation();
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setIsAuth(isAuth);
  }, [isAuth]);

  return isAuth ? (
    <>
      {loader ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <Page>
          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <Typography variant="h4" gutterBottom>
                Stocks
              </Typography>
              <div>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="add_Operation"
                  startIcon={<Icon icon={plusFill} />}
                >
                  operation
                </Button>
                &nbsp; &nbsp;
                <Button
                  variant="outlined"
                  onClick={() => exportToCSV(allData, exportedFileName)}
                  startIcon={<Icon icon="bx:bx-export" />}
                >
                  Exporter
                </Button>
              </div>
            </Stack>

            <Card>
              <RootStyle
                sx={{
                  ...(selected.length > 0 && {
                    color: "primary.main",
                    bgcolor: "primary.lighter",
                  }),
                }}
              >
                {selected.length > 0 ? (
                  <Typography component="div" variant="subtitle1">
                    {selected.length} selectionés
                  </Typography>
                ) : (
                  <>
                    <FormikProvider value={formik}>
                      <Form onSubmit={handleSubmit}>
                        <LoadingButton
                          style={{
                            width: "auto",
                            height: "55px",
                          }}
                          variant="contained"
                          color="primary"
                          type="submit"
                          loading={loadingButton}
                          className={classes.button}
                          startIcon={
                            <Icon>
                              <SearchIcon />
                            </Icon>
                          }
                        >
                          Rechercher
                        </LoadingButton>
                        <SearchStyle
                          value={filterName}
                          inputRef={refButtonRefresh}
                          onChange={handleFilterByName}
                          placeholder="Tapez un nom"
                        />
                      </Form>
                    </FormikProvider>
                    <Tooltip
                      title="Rafraîchir"
                      color="primary"
                      onClick={handleClickRefresh}
                    >
                      <IconButton>
                        <RefreshIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </RootStyle>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <>
                    {loadingData ? (
                      <div className={classes.loading}>
                        <CircularProgress />
                      </div>
                    ) : (
                      <Table>
                        <PatientListHead
                          order={order}
                          orderBy={orderBy}
                          headLabel={TABLE_HEAD}
                          rowCount={patientsList.length}
                          numSelected={selected.length}
                          onRequestSort={handleRequestSort}
                          onSelectAllClick={handleSelectAllClick}
                        />
                        {filteredPatient.length > 0 ? (
                          <TableBody>
                            {filteredPatient.map((row, i) => {
                              const {
                                date_operation,
                                matiere,
                                quantite,
                                type_operation,
                                commentaire,
                                id_operation,
                                nom_patient,
                                type_malnutrition,
                                date_naissance,
                                sexe_patient,
                                date_Consultation,
                                nom_consultant,
                                postnom_consultant,
                                prenom_patient,
                                transferer_unt,
                              } = row;
                              const isItemSelected =
                                selected.indexOf(nom_patient) !== -1;

                              return (
                                <TableRow
                                  component={RouterLink}
                                  to={`detail_patient/${id_operation}`}
                                  className={classes.patientRow}
                                  hover
                                  key={id_operation}
                                  tabIndex={-1}
                                  // role="checkbox"
                                  selected={isItemSelected}
                                  aria-checked={isItemSelected}
                                >
                                  <TableCell padding="left">
                                    <TableCell
                                      padding="checkbox"
                                      variant="subtitle2"
                                      noWrap
                                    >
                                      {i + 1}
                                    </TableCell>
                                  </TableCell>
                                  <TableCell align="left">
                                    {moment(date_operation).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </TableCell>
                                  <TableCell align="left">{matiere}</TableCell>
                                  <TableCell align="left">
                                    {type_operation}
                                  </TableCell>

                                  <TableCell align="left">{quantite}</TableCell>

                                  <TableCell align="left">
                                    {commentaire}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        ) : (
                          <TableBody>
                            <TableRow>
                              <TableCell
                                align="center"
                                colSpan={6}
                                sx={{ py: 3 }}
                              >
                                <SearchNotFound searchQuery={filterName} />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        )}
                      </Table>
                    )}
                  </>
                </TableContainer>
              </Scrollbar>
              <TableRow>
                <TableCell>
                  <GrFormPrevious
                    style={{
                      width: "30px",
                      height: "30px",
                      color: "#1f2b35",
                      cursor: "pointer",
                    }}
                    onClick={handleClickPrev}
                  />
                </TableCell>
                <TableCell>
                  <GrFormNext
                    style={{
                      width: "30px",
                      height: "30px",
                      color: "#1f2b35",
                      cursor: "pointer",
                    }}
                    onClick={handleClickNext}
                    // disabled={}
                  />
                </TableCell>
                <TableCell style={{ fontWeight: "900px" }}>
                  {numberOfElement}/{lenghtData}
                </TableCell>
              </TableRow>
            </Card>
          </Container>
        </Page>
      )}
    </>
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
}
