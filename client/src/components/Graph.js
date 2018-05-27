import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from 'recharts';
import { BOX_SHADOW } from '../constants/style';

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  background-color: white;
  height: 400px;
  border-radius: 2px;
  box-shadow: ${BOX_SHADOW};
  padding: 2rem 2rem 1rem 0;
  box-sizing: border-box;
`;
class Graph extends Component {
  static propTypes = {
    stockData: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  state = {
    chartData: [],
  }

  componentDidUpdate(prevProps) {
    const { stockData } = this.props;
    if (stockData.length !== prevProps.stockData.length) {
      this.formatChartData();
    }
  }

  formatChartData = () => {
    const { stockData } = this.props;

    const chartData = stockData
      .reduce((map, stock) => stock.chart.reduce((map2, chartItem) => {
        const chartObj = map.get(chartItem.date) || { date: chartItem.date };

        chartObj[stock.quote.symbol] = chartItem.close;

        return map.set(chartItem.date, chartObj);
      }, map), new Map());

    this.setState({ chartData: [...chartData.values()] });
  }

// TODO: implement color picker. Needs to check if color has already been used.
colors = ['#5BD365', '#F78154', '#B4436C', '#3D0C11', '#86A5D9', '#9BDEAC', '#D95D39', '#E5BEED'];

calculateMargin = num => ({
  top: num, right: num, bottom: num, left: num,
});

renderLines = () => {
  const { chartData } = this.state;
  if (chartData.length > 0) {
    return Object.keys(chartData[0]).map((item, i) => {
      if (item !== 'date') {
        return (
          <Line
            key={item}
            type="linear"
            dataKey={item}
            stroke={this.colors[0]}
          />
        );
      }
    });
  }
  return null;
};

render() {
  const { chartData } = this.state;
  return (
    <Wrapper>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={this.calculateMargin(8)}
        >
          {this.renderLines()}
          <XAxis dataKey="date" domain={['auto', 'auto']} />
          <YAxis
            type="number"
            domain={['auto', 'auto']}
          />
        </LineChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}
}

export default Graph;
