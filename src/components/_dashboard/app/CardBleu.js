import propTypes from 'prop-types';
// material
import { styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

// ----------------------------------------------------------------------

CardBleu.propTypes = {
  title: propTypes.string,
  nombreM: propTypes.number,
  nombreF: propTypes.number
};
export default function CardBleu({ title, nombreM, nombreF }) {
  const total = nombreM + nombreF || 0;
  return (
    <RootStyle>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="h3">{fShortenNumber(total)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        <Typography variant="subtitle2">Masculin:{nombreM}</Typography>
        <Typography variant="subtitle2">Féminin:{nombreF}</Typography>
      </Typography>
    </RootStyle>
  );
}
