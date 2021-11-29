import { Icon } from '@iconify/react';
import propTypes from 'prop-types';
import { useRef, useState } from 'react';
import Axios from 'axios';
import eyeFill from '@iconify/icons-eva/eye-fill';
import deleteFill from '@iconify/icons-eva/person-delete-fill';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// import { makeStyles } from '@material-ui/styles';
// import red from '@material-ui/core/colors/red';
// -------------------MODAL
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Button from '@material-ui/core/Button';
import { LoadingButton } from '@material-ui/lab';
import { Menu, MenuItem, IconButton, ListItemIcon, Typography } from '@material-ui/core';
import { fakeAuth } from '../../../fakeAuth';

PatientMoreMenu.propTypes = {
  id_patient: propTypes.string
};

export default function PatientMoreMenu({ id_patient }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/dashboard/app' } };
  // ---------------------------------LOgic state-------------------------------------
  const handleDeleteClick = () => {
    setLoader(true);
    Axios.delete(`https://kesho-congo-api.herokuapp.com/patient?id_patient=${id_patient}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${localStorage.getItem('token')}`
      }
    })
      .then((response) => {
        const message = response.data;
        console.log('Yves', message);
        fakeAuth.login(() => {
          navigate(from);
          navigate('/dashboard/patient', { replace: true });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // ---------------------------------LOgic state------------------------------------
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          sx: { width: 189, maxWidth: '100%', py: 3 }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          component={RouterLink}
          to={`detail_patient/${id_patient}`}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                paddingLeft: '8px'
              }}
            >
              <Icon icon={eyeFill} width={40} height={25} />
              <Typography variant="h6">voir</Typography>
            </div>
          </ListItemIcon>
        </MenuItem>
        <MenuItem>
          <ListItemIcon
            sx={{ textAlign: 'center', color: 'text.secondary' }}
            onClick={handleClickOpen}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                paddingLeft: '8px'
              }}
            >
              <Icon icon={deleteFill} width={40} height={25} />
              <Typography variant="h6">supprimer</Typography>
            </div>
          </ListItemIcon>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">"Supprimer un patient?"</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Cette action est irreversible, si vous supprimez un patient vous ne serrez plus en
                mésure de recuperer ses informations.
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
                variant="contained"
                loading={loader}
                color="error"
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
