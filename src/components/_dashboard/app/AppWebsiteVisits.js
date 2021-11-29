import { useEffect, useState } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import Axios from 'axios';
import moment from 'moment';
import { useTheme } from '@material-ui/core/styles';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function AppWebsiteVisits() {
  const classes = useStyles();
  const [macData, setMacData] = useState([]);
  const [mamData, setMamData] = useState([]);
  const [masData, setMasData] = useState([]);
  const [gueris, setGueris] = useState([]);
  const [repData, setRepData] = useState([]);
  const [loader, setLoader] = useState(true);
  const currentYear = moment().format('YYYY');

  useEffect(async () => {
    try {
      const response = await Axios.get(`https://kesho-congo-api.herokuapp.com/reporting/annuel`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.data;
      setRepData(await data.rapport_patient_year);
      setMasData(await data.rapport_mas_year);
      setMamData(await data.rapport_mam_year);
      setMacData(await data.rapport_mac_year);
      setGueris(await data.rapport_gueri_year);
      setLoader(false);

      // setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  }, []);
  const CHART_DATA = [
    {
      name: 'Nombre de patients',
      type: 'column',
      data: repData.map((i) => i[0].nombre_patient)
    },
    {
      name: 'MAC',
      type: 'line',
      data: macData.map((i) => i[0].chronique_nombre)
    },
    {
      name: 'MAS',
      type: 'line',
      data: masData.map((i) => i[0].sereve_nombre)
    },
    {
      name: 'MAM',
      type: 'line',
      data: mamData.map((i) => i[0].moderee_nombre)
    },
    {
      name: 'Guéris',
      type: 'line',
      data: gueris.map((i) => i[0].nombre_patient)
    }
  ];
  const theme = useTheme();
  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.info.main,
      theme.palette.error.main,
      theme.palette.error.light,
      theme.palette.warning.main,
      theme.palette.primary.main
    ],
    stroke: { width: [0, 3, 3, 3, 3] },
    plotOptions: { bar: { columnWidth: '10%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid', 'solid', 'solid'] },
    labels: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Decembre'
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} patients`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Visualisation annuelle" subheader={`Kesho Congo ${currentYear}`} />
      {loader ? (
        <div className={classes.root}>
          <LinearProgress />
        </div>
      ) : (
        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
          <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
        </Box>
      )}
    </Card>
  );
}
