import './chart.css';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

Chart.propTypes = {
  title: PropTypes.object,
  data: PropTypes.any,
  dataKey: PropTypes.any,
  grid: PropTypes.any
};

export default function Chart({ title, data, dataKey, grid }) {
  return (
    <div className="chart">
      <h4 className="chartTitle">{title}</h4>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
