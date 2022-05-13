import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import Axios from "axios";
import PropTypes from "prop-types";
// import { FiEdit } from 'react-icons';
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
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
  TextField,
  Stack,
  FormControlLabel,
  // FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
// import { makeStyles } from '@material-ui/styles';

// ----------------------------------------------------------------------
import { Delete, Edit } from "@material-ui/icons";

import { fakeAuth } from "../../../fakeAuth";
// ----------------------------------------------------------------------

StockListToolbar.propTypes = {
  value: PropTypes.number,
  matId: PropTypes.number,
  typeOperation: PropTypes.string,
  quantite: PropTypes.number,
  raison: PropTypes.string,
  dateOperation: PropTypes.string,
};
export default function StockListToolbar({
  value,
  matId,
  typeOperation,
  raison,
  quantite,
  dateOperation,
}) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [dateOp, setDateOp] = useState(dateOperation);
  const [amount, setAmount] = useState(quantite);
  const [comment, setComment] = useState(raison);
  const [openModalChangeStatus, setopenModalChangeStatus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/dashboard/app" } };
  const handleDeleteClick = () => {
    setLoader(true);
    Axios.delete(`https://kesho-api.herokuapp.com/operation/${value}`, {
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
          navigate("/dashboard/stock", { replace: true });
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
  const handleChangeDateOperation = (event) => {
    setDateOp(event.target.value);
  };
  const handleChangeAmount = (event) => {
    const { value } = event.target;
    console.log(value);
    const quantite = value;
    setAmount(quantite);
  };
  const handleChangeComment = (event) => {
    const { value } = event.target;
    console.log(value);
    const status = value && value;
    setComment(value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickChangeOperation = async () => {
    setLoader(true);
    const data = {
      date_operation: dateOp,
      matiere_id: matId,
      type_operation: typeOperation,
      qte_operation: amount,
      commentaire_operation: comment,
    };
    console.log(data);
    await Axios.request({
      method: "PUT",
      url: `https://kesho-api.herokuapp.com/operation/${value}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    })
      .then((response) => {
        const message = response.data;
        console.log(`l'enregistrement ${message} a ete mis a jour`);
        fakeAuth.login(() => {
          navigate(from);
          navigate("/dashboard/stock", { replace: true });
          setopenModalChangeStatus(false);
        });
      })
      .catch((err) => {
        alert(`Erreur de mise a jour: ${err.message}`);
        setLoader(false);
      });

    console.log("stock operation updated successfully");
  };
  // changer le status d'une personne
  // const handleClickChangeStatus = () => {
  //   setLoader(true);
  //   Axios.request({
  //     method: "PUT",
  //     url: `https://kesho-api.herokuapp.com/user/status?id=${value}`,
  //     data: {
  //       // statut: statutPersonnel,
  //       quantite: amount,
  //       raison: comment,
  //     },
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `bearer ${localStorage.getItem("token")}`,
  //     },
  //   })
  //     .then((response) => {
  //       const message = response.data;
  //       console.log("Yves", message);
  //       fakeAuth.login(() => {
  //         navigate(from);
  //         navigate("/dashboard/personnel", { replace: true });
  //         setopenModalChangeStatus(false);
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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
              <Typography>Modifier Opération</Typography>
            </div>
          </ListItemIcon>
          <Dialog
            open={openModalChangeStatus}
            onClose={handleCloseModaleChangeStatus}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Modification Opération
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Stack spacing={3} sx={{ marginTop: `4%` }}>
                  <TextField
                    sx={{ width: "100%", padding: "2px" }}
                    type="date"
                    fullWidth
                    label="Date operation"
                    onChange={handleChangeDateOperation}
                    value={moment(dateOp).format("YYYY-MM-DD")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    sx={{ width: "100%", padding: "2px" }}
                    fullWidth
                    onChange={handleChangeAmount}
                    value={amount}
                    label="Quantité"
                    // {...getFieldProps("weight")}
                    // helperText={touched.weight && errors.weight}
                    // error={Boolean(touched.weight && errors.weight)}
                  />
                  <TextField
                    sx={{ width: "100%", padding: "2px" }}
                    fullWidth
                    onChange={handleChangeComment}
                    value={comment} //{!comment ? raison : comment}
                    label="Raison"
                    // {...getFieldProps("weight")}
                    // helperText={touched.weight && errors.weight}
                    // error={Boolean(touched.weight && errors.weight)}
                  />
                </Stack>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModaleChangeStatus} color="primary">
                Annuler
              </Button>
              <LoadingButton
                onClick={handleClickChangeOperation}
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
              Supprimer une opération?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Cette action est irreversible, si vous supprimez une opération
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
