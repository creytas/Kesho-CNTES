import propTypes from "prop-types";
// material
import { styled } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";
import { Icon } from "@iconify/react";
// utils
import { fShortenNumber } from "../../../utils/formatNumber";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.light,
}));
// ----------------------------------------------------------------------

CardStockMatieres.propTypes = {
  title: propTypes.string,
  nombre: propTypes.number,
  icon: propTypes.string,
};
export default function CardStockMatieres({ title, nombre, icon }) {
  //   const total = nombreM + nombreF || 0;
  return (
    <RootStyle>
      <Icon icon={icon} style={{ fontSize: "50px" }} />
      <Typography variant="h3">{title}</Typography>
      <Typography variant="h3">
        {fShortenNumber(nombre)} {title === "Huiles" ? "L" : "Kg"}
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}></Typography>
    </RootStyle>
  );
}
