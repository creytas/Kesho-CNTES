import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
// import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import { alpha } from "@material-ui/core/styles";
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
} from "@material-ui/core";
// components
import MenuPopover from "../../components/MenuPopover";
//
import Label from "../../components/Label";
// import account from '../../_mocks_/account';
import { fakeAuth } from "../../fakeAuth";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Publications",
    icon: `mdi:account-edit-outline`,
    linkTo: "/",
  },
  {
    label: "Paramètres",
    icon: `mdi:account-cog-outline`,
    linkTo: "/dashboard/setting",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  // console.log(localStorage.getItem('name'));
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 50,
          height: 50,
          ...(open && {
            "&:before": {
              zIndex: 223,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar
          sizes="100"
          src="/static/mock-images/avatars/avatar_1.jpg"
          alt={localStorage.getItem("name")}
        />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 2.5, px: 2.5, textAlign: "center" }}>
          <Typography variant="subtitle1" noWrap>
            {localStorage.getItem("name")}
          </Typography>
          <Label variant="subtitle1" noWrap>
            {localStorage.getItem("status")}
          </Label>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: "body2", py: 2.5, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={() => {
              fakeAuth.logout(() =>
                navigate("/", {
                  state: { from: { pathname: "/dashboard/app" } },
                })
              );
            }}
          >
            Déconnexion
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
