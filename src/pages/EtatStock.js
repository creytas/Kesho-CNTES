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
  TextField,
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
import DefaultPage from "../components/DefaultPage";
import image from "../utils/undraw_doctors_stock.svg";
import StockMoreMenu from "src/components/_dashboard/stock/StockMoreMenu";

const TABLE_HEAD = [
  { id: "MO", label: "Matière", alignRight: false },
  { id: "QTENT", label: "Quantité réceptionnée", alignRight: false },
  { id: "QTESORT", label: "Quantité depensée", alignRight: false },
  { id: "SOLDE", label: "Solde", alignRight: false },
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
  const [allData, setAllData] = useState([]);
  const [lenghtData, setLenghtData] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("nom_patient");
  const [filterDate, setFilterDate] = useState("");
  const [numberOfElement, setNumberOfElement] = useState(0);
  const [start, setStart] = useState(0);
  const [loadingData, setLoadingData] = useState(false);
  const [loader, setLoader] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  //  const [searchedValue, setSearchedValue] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [buttonLoader, setButtonLoader] = useState(false);
  const [displayDate, setDisplayDate] = useState(false);
  const classes = useStyles();
  const refButtonRefresh = useRef(null);
  useEffect(() => {
    fetch(`https://kesho-api.herokuapp.com/operation/states`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`here's data: ${data}`);
        setAllData(data);
        setLoader(false);
        setLoadingData(false);
      })
      .catch((error) => {
        console.error("MyError:", error);
        setLoader(false);
        setLoadingData(false);
      });
  }, []);
  console.log(allData);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setLoader(true);
      const newSelecteds = allData.map((n) => n.designation);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClickRefresh = () => {
    setLoadingData(true);
    setStart(3);
    setNumberOfElement(0);
  };
  const filteredPatient = allData;

  const location = useLocation();
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setIsAuth(isAuth);
  }, [isAuth]);
  const component = "add_Operation";
  console.log(allData);
  // -------------------FOrmik----------------------------
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
      console.log(`start_date: ${startDate} & end_date: ${endDate}`);
      try {
        const response = await Axios.post(
          "https://kesho-api.herokuapp.com/operation/states",
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
        const output = await response.data;
        //setSearchedValue("");
        setLoadingButton(false);
        setAllData(output);
      } catch (err) {
        console.log("message error :", err.message);
      }
    },
  });
  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return isAuth ? (
    <>
      {loader ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {allData.length === 0 ? (
            <DefaultPage image={image} component={component} />
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
                    Etat stocks{" "}
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
                      <> </>
                    )}
                  </Typography>
                  <div>
                    <Button
                      variant="outlined"
                      component={RouterLink}
                      to="/dashboard/stock"
                      startIcon={<Icon icon="bx:bx-arrow-back" />}
                    >
                      Retour
                    </Button>
                    <Button
                      variant="outlined"
                      component={RouterLink}
                      to={`/dashboard/stock/add_Operation`}
                      sx={{ marginLeft: "1rem" }}
                      startIcon={<Icon icon={plusFill} />}
                    >
                      Opération
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
                          <Form
                            className={classes.container}
                            onSubmit={handleSubmit}
                            style={{
                              marginBottom: "0.5rem 0 2rem 0.5rem",
                            }}
                          >
                            <TextField
                              label="Début"
                              type="date"
                              className={classes.textField}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              {...getFieldProps("startDate")}
                              error={Boolean(
                                touched.startDate && errors.startDate
                              )}
                              helperText={touched.startDate && errors.startDate}
                            />
                            &nbsp;&nbsp;
                            <TextField
                              label="Fin"
                              type="date"
                              className={classes.textField}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              {...getFieldProps("endDate")}
                              error={Boolean(touched.endDate && errors.endDate)}
                              helperText={touched.endDate && errors.endDate}
                            />
                            &nbsp;&nbsp;
                            <LoadingButton
                              style={{
                                width: "80px",
                                height: "55px",
                              }}
                              type="submit"
                              variant="contained"
                              loading={buttonLoader}
                            >
                              Trouver
                            </LoadingButton>
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
                              rowCount={allData.length}
                              numSelected={selected.length}
                              onRequestSort={handleRequestSort}
                              onSelectAllClick={handleSelectAllClick}
                            />
                            {filteredPatient.length > 0 ? (
                              <TableBody>
                                {allData.map((row, i) => {
                                  const { designation, entrance, exit } = row;
                                  const isItemSelected =
                                    selected.indexOf(i) !== -1;
                                  console.log(designation);
                                  return (
                                    <TableRow
                                      className={classes.patientRow}
                                      hover
                                      key={i}
                                      tabIndex={-1}
                                      // role="checkbox"
                                      selected={isItemSelected}
                                      aria-checked={isItemSelected}
                                    >
                                      <TableCell align="left"></TableCell>
                                      <TableCell align="left">
                                        {designation}
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          color: "green",
                                        }}
                                      >
                                        {`${entrance / 1000} ${
                                          designation === "huiles"
                                            ? "L"
                                            : designation === "vêtements" ||
                                              designation === "jouets" ||
                                              designation === "chaussures" ||
                                              designation === "pain/biscuit"
                                            ? "Pces"
                                            : "Kg"
                                        }`}
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          color: "red",
                                        }}
                                      >
                                        {`${exit / 1000} ${
                                          designation === "huiles"
                                            ? "L"
                                            : designation === "pain/biscuit" ||
                                              designation === "vêtements" ||
                                              designation === "jouets" ||
                                              designation === "chaussures"
                                            ? "Pces"
                                            : "Kg"
                                        }`}
                                      </TableCell>

                                      <TableCell>
                                        {`${(entrance - exit) / 1000} ${
                                          designation === "huiles"
                                            ? "L"
                                            : designation === "pain/biscuit" ||
                                              designation === "vêtements" ||
                                              designation === "jouets" ||
                                              designation === "chaussures"
                                            ? "Pces"
                                            : "Kg"
                                        }`}
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
                                    <Typography variant="h6">
                                      Les informations que vous cherchez sont
                                      indisponibles
                                    </Typography>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            )}
                          </Table>
                        )}
                      </>
                    </TableContainer>
                  </Scrollbar>
                </Card>
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
