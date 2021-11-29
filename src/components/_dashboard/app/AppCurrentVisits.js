import { useState, useEffect } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import Axios from 'axios';
import moment from 'moment';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import { Card, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  },
  labelRoot: {
    textAlign: 'center'
  }
}));

export default function AppCurrentVisits() {
  const classes = useStyles();
  const [macData, setMacData] = useState(0);
  const [mamData, setMamData] = useState(0);
  const [masData, setMasData] = useState(0);
  const [gueris, setGueris] = useState(0);
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
      const output = await response.data;
      setMasData(
        await output.rapport_mas_year.map((i) => i[0].sereve_nombre).reduce((a, b) => a + b)
      );
      setMamData(
        await output.rapport_mam_year.map((i) => i[0].moderee_nombre).reduce((a, b) => a + b)
      );
      setMacData(
        await output.rapport_mac_year.map((i) => i[0].chronique_nombre).reduce((a, b) => a + b)
      );
      setGueris(
        await output.rapport_gueri_year.map((i) => i[0].nombre_patient).reduce((a, b) => a + b)
      );
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  }, []);

  const CHART_DATA = [macData, mamData, masData, gueris];
  const theme = useTheme();
  // const CHART_DATA = [
  //   macData.map((i) => i[0].chronique_nombre).reduce((a, b) => a + b),
  //   mamData.map((i) => i[0].moderee_nombre).reduce((a, b) => a + b),
  //   masData.map((i) => i[0].sereve_nombre).reduce((a, b) => a + b)
  // ];

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.error.main,
      theme.palette.error.light,
      theme.palette.warning.main,
      theme.palette.primary.main
    ],
    labels: ['MAC', 'MAS', 'MAM', 'Guéris'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });

  return (
    <Card>
      <CardHeader className={classes.labelRoot} title={`Ratio Annuel ${currentYear}`} />
      {loader ? (
        <div className={classes.root}>
          <LinearProgress />
        </div>
      ) : (
        <ChartWrapperStyle dir="ltr">
          <ReactApexChart type="pie" series={CHART_DATA} options={chartOptions} height={280} />
        </ChartWrapperStyle>
      )}
    </Card>
  );
}
