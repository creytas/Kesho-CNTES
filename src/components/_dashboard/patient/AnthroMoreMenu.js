import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import Axios from "axios";
import PropTypes from "prop-types";
// import { FiEdit } from 'react-icons';
import { useNavigate, useLocation } from "react-router-dom";
// import { Link as RouterLink } from 'react-router-dom';
// material  Typography
// -------------------MODAL
import Dialog from "@material-ui/core/Dialog";
// import deleteFill from '@iconify/icons-eva/person-delete-fill';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Button,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Stack,
  FormControlLabel,
  FormLabel,
  TextField,
  TextareaAutosize,
  Radio,
  RadioGroup,
  Select,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
// import { makeStyles } from '@material-ui/styles';

// ----------------------------------------------------------------------
import { Delete, Edit } from "@material-ui/icons";

import { fakeAuth } from "../../../fakeAuth";
// ----------------------------------------------------------------------
import style from "../../_dashboard/patient/PatientForm/patient.module.css";

AnthroListToolbar.propTypes = {
  value: PropTypes.string,
  peri_brachial: PropTypes.number,
  peri_cranien: PropTypes.number,
  oedeme: PropTypes.string,
  type_oedeme: PropTypes.string,
  type_malnutrition: PropTypes.string,
  commentaires: PropTypes.string,
  poids: PropTypes.number,
  taille: PropTypes.number,
};
export default function AnthroListToolbar({
  value,
  peri_brachial,
  peri_cranien,
  oedeme,
  type_oedeme,
  type_malnutrition,
  commentaires,
  poids,
  taille,
}) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [statutPersonnel, setStatutPersonnel] = useState("");
  const [openModalChangeStatus, setopenModalChangeStatus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/dashboard/app" } };
  const handleDeleteClick = () => {
    setLoader(true);
    Axios.delete(`https://kesho-api.herokuapp.com/user?id=${value}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        const message = response.data;
        console.log("Yves", message);
        fakeAuth.login(() => {
          navigate(from);
          navigate("/dashboard/personnel", { replace: true });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickOpenStatus = () => {
    setopenModalChangeStatus(true);
  };
  const handleCloseModaleChangeStatus = () => {
    setopenModalChangeStatus(false);
  };
  const handleSelectChangeStatus = (event) => {
    const { value } = event.target;
    console.log(value);
    const status = value && value;
    setStatutPersonnel(status);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // changer le status d'une personne
  const handleClickChangeStatus = () => {
    setLoader(true);
    Axios.request({
      method: "PUT",
      url: `https://kesho-api.herokuapp.com/user/status?id=${value}`,
      data: {
        statut: statutPersonnel,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        const message = response.data;
        console.log("Yves", message);
        fakeAuth.login(() => {
          navigate(from);
          navigate("/dashboard/personnel", { replace: true });
          setopenModalChangeStatus(false);
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
        PaperProps={{
          sx: { width: 189, maxWidth: "100%", py: 3 },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem>
          <ListItemIcon
            sx={{ textAlign: "center", color: "text.secondary" }}
            onClick={handleClickOpenStatus}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                paddingLeft: "8px",
              }}
            >
              <Edit />
              <Typography>Modifier</Typography>
            </div>
          </ListItemIcon>
          <Dialog
            open={openModalChangeStatus}
            onClose={handleCloseModaleChangeStatus}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Anthropometrie du patient
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Stack spacing={3} sx={{ marginTop: `4%` }}>
                  <TextField
                    sx={{ width: "100%", padding: "2px" }}
                    fullWidth
                    value={poids}
                    label="Poids (kg)"
                    // {...getFieldProps("weight")}
                    // helperText={touched.weight && errors.weight}
                    // error={Boolean(touched.weight && errors.weight)}
                  />
                  <TextField
                    sx={{ width: "100%", padding: "2px" }}
                    fullWidth
                    value={taille}
                    label="Taille (cm) "
                    // {...getFieldProps("height")}
                    // helperText={touched.height && errors.height}
                    // error={Boolean(touched.height && errors.height)}
                  />
                  <TextField
                    sx={{ width: "100%", padding: "2px" }}
                    fullWidth
                    value={peri_cranien}
                    label="Périmètre crânien (cm) "
                    // {...getFieldProps("cranian")}
                    // helperText={touched.cranian && errors.cranian}
                    // error={Boolean(touched.cranian && errors.cranian)}
                  />
                  <TextField
                    sx={{ width: "100%", padding: "2px" }}
                    fullWidth
                    label="Périmètre brachial(cm)"
                    value={peri_brachial}
                    // {...getFieldProps("brachial")}
                    // helperText={touched.brachial && errors.brachial}
                    // error={Boolean(touched.brachial && errors.brachial)}
                  />
                  <Select
                    native
                    sx={{ width: "100%", padding: "2px" }}
                    value={type_malnutrition}
                    // {...getFieldProps("malnutrition")}
                    // error={Boolean(touched.malnutrition && errors.malnutrition)}
                  >
                    <option value="" selected disabled hidden>
                      Type de malnutrition
                    </option>
                    <option value="MAM">Malnutrition Aigue Modérée</option>
                    <option value="MAM / FMC">
                      Malnutrition Aigue Modérée / Fond de Malnutrition
                      Chronique
                    </option>
                    <option value="MAS-M">
                      Malnutrition Aigue Sévère Marasme
                    </option>
                    <option value="MAS-M / FMC">
                      Malnutrition Aigue Sévère Marasme / Fond de Malnutrition
                      Chronique
                    </option>
                    <option value="MAS-K">
                      Malnutrition Aigue Sévère Kwashiorkor
                    </option>
                    <option value="MAS-K / FMC">
                      Malnutrition Aigue Sévère Kwashiorkor / Fond de
                      Malnutrition Chronique
                    </option>
                    <option value="MC">Malnutrition Chronique</option>
                    <option value="Guéri">Declaré Guéri</option>
                  </Select>
                  <TextareaAutosize
                    minRows={8}
                    maxRows={8}
                    value={commentaires}
                    // {...getFieldProps("commentaires")}
                    placeholder="Observations sur le patient"
                    className={style.textarea}
                    // helperText={touched.commentaires && errors.commentaires}
                    // error={Boolean(touched.commentaires && errors.commentaires)}
                  />
                </Stack>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModaleChangeStatus} color="primary">
                Annuler
              </Button>
              <LoadingButton
                onClick={handleClickChangeStatus}
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
        </MenuItem>
        <MenuItem>
          <ListItemIcon sx={{ color: "red" }} onClick={handleClickOpen}>
            <Delete width={35} height={35} />
            <Typography>Supprimer</Typography>
          </ListItemIcon>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Supprimer un utilisateur?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Cette action est irreversible, si vous supprimez un utilisateur
                vous ne serrez plus en mésure de recuperer ses informations.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <LoadingButton
                size="medium"
                type="button"
                color="primary"
                variant="contained"
                onClick={handleClose}
              >
                Annuler
              </LoadingButton>
              <LoadingButton
                onClick={handleDeleteClick}
                size="medium"
                type="submit"
                color="error"
                variant="contained"
                loading={loader}
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
