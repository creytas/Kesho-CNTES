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
  height: "245px",
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
        {fShortenNumber(nombre)}{" "}
        {title === "Huile végétale"
          ? "L"
          : title === "Pains/Biscuits" ||
            title === "Vêtements" ||
            title === "Jouets"
          ? "Pces"
          : "Kg"}
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {(title === "Maïs" && nombre * 1000 <= 42000) ||
        (title === "Sorgho" && nombre * 1000 <= 21000) ||
        (title === "Soja" && nombre * 1000 <= 21000) ||
        (title === "Sucre" && nombre * 1000 <= 11000) ||
        (title === "Huiles" && nombre * 1000 <= 5000) ||
        (title === "Ext. foliaires" && nombre * 1000 <= 2300) ||
        (title === "Briq. energ" && nombre * 1000 <= 10000) ||
        (title === "Savon" && nombre * 1000 <= 700)
          ? "SEUIL CRITIQUE ATTEINT"
          : ""}
      </Typography>
    </RootStyle>
  );
}
