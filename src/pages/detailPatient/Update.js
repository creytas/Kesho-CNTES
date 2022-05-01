import { useState } from "react";
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
} from "@material-ui/core";
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

export default function Update({ id }) {
  const [identityEnabled, setIdentityEnabled] = useState(false);
  const date = new Date();
  const RegisterSchema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: {},
    validationSchema: RegisterSchema,
    onSubmit: (patient) => {
      try {
      } catch (e) {
        console.log(e);
      }
    },
  });
  const { errors, setFieldValue, touched, values, handleSubmit, isSubmitting } =
    formik;

  return (
    <div>
      <Button
        variant="outlined"
        component={RouterLink}
        to="/dashboard/patient"
        // onClick={(e) => exportToCSV(allData, exportedFileName)}
        startIcon={<Icon icon="bx:bx-arrow-back" />}
      >
        Retour
      </Button>
      <FormikProvider value={formik}>
        <Form autoComplete="off" onSubmit={handleSubmit}>
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
                    name="firstName"
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
                    name="firstName"
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
                    name="lastName"
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
                  {/* <input type="text" name="gender" className="inputDisabled" /> */}
                  <select
                    className="selectDisabled"
                    disabled={!identityEnabled}
                    name="gender"
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
                    name="birthdate"
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
                    name="arrival"
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
                    name="arrivalMode"
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
                    name="adress"
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
                    name="liveWithParents"
                  >
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                  {/* <input
                    type="text"
                    name="liveWithParents"
                    className="inputDisabled"
                  /> */}
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
                    name="tutor"
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
                    name="rankInSiblings"
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
                    name="siblingsNumber"
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
                  Transfert en UNT :{" "}
                  <input
                    type="text"
                    name="transferToUNT"
                    className="inputDisabled"
                  />
                </InputLabel>
                <Stack sx={{ margin: `10% auto`, border: `1px solid blue` }}>
                  <Typography
                    sx={{
                      fontWeight: "900",
                      fontSize: "larger",
                      width: `100%`,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    Causes malnutrition
                    <Button sx={{ border: `0px solid red` }}>
                      <Edit />
                    </Button>
                  </Typography>
                </Stack>
              </Card>
            </Grid>
            <Grid
              item
              xs={11}
              sm={5}
              md={5}
              sx={{ display: `flex`, border: `3px solid green` }}
            >
              <Card
                sx={{
                  margin: 1,
                  padding: 2,
                  border: `3px solid red`,
                }}
              >
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
                  <div style={{ border: `1px solid black`, width: `50%` }}>
                    <Avatar alt="avant" src={``} variant="square" />
                  </div>
                  <div style={{ border: `1px solid black`, width: `50%` }}>
                    <Avatar alt="apres" src={``} variant="square" />
                  </div>
                </Stack>
              </Card>
            </Grid>{" "}
            <Grid
              item
              xs={11}
              sm={5}
              md={5}
              sx={{ display: `flex`, border: `3px solid green` }}
            >
              <Card
                sx={{
                  margin: 1,
                  padding: 2,
                  border: `3px solid red`,
                }}
              >
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
                  <div style={{ border: `1px solid black`, width: `50%` }}>
                    <Avatar alt="avant" src={``} variant="square" />
                  </div>
                  <div style={{ border: `1px solid black`, width: `50%` }}>
                    <Avatar alt="apres" src={``} variant="square" />
                  </div>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </div>
  );
}
