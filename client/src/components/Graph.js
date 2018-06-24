import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import { BOX_SHADOW, GREEN, GREY_EXTRA_LIGHT } from '../constants/style';
import { formatDate } from '../utils/helpers';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  background-color: white;
  border-radius: 2px;
  box-shadow: ${BOX_SHADOW};
  padding: 2rem 2rem 2rem 1rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 2rem 2rem 2rem 0rem;
    height: 350px;
  }

  @media (max-width: 415px) {
    height: 250px;
    padding: 1rem 1rem 1rem 0rem;
  }
`;

const Empty = styled.div`
  font-size: 3rem;
  color: ${GREY_EXTRA_LIGHT};
  text-align: center;
  padding: 0 2rem;

  @media (max-width: 415px) {
    font-size: 2rem;
  }
`;

class Graph extends Component {
  static propTypes = {
    stockData: PropTypes.object.isRequired,
  }

  state = {
    chartData: [],
  }

  componentDidUpdate(prevProps) {
    const { stockData } = this.props;

    if (stockData[Object.keys(stockData)[0]] &&
    prevProps.stockData[Object.keys(stockData)[0]]) {
      const currChartLength = stockData[Object.keys(stockData)[0]].chart.length;
      const prevChartLength = prevProps.stockData[Object.keys(stockData)[0]].chart.length;
      if (currChartLength !== prevChartLength) {
        this.formatChartData();
      }
    }

    if (Object.keys(stockData).length !== Object.keys(prevProps.stockData).length) {
      this.formatChartData();
    }
  }

  formatChartData = () => {
    const { stockData } = this.props;

    const chartData = Object.keys(stockData)
      .reduce((map, stock) => {
        stockData[stock].chart.forEach((chart) => {
          const chartObj = map.get(chart.date) || { date: chart.date };
          chartObj[stockData[stock].quote.symbol] = chart.close;
          map.set(chart.date, chartObj);
        });
        return map;
      }, new Map());

    this.setState({ chartData: [...chartData.values()] });
  }

calculateMargin = num => ({
  top: num, right: num, bottom: num, left: num,
});

formatYTick = value => `$${value}`
formatXTick = value => formatDate(value, true)

renderEmpty = () => (
  <Empty>
      No stocks selected. Use the search to get started.
  </Empty>
)

renderLines = () => {
  const { chartData } = this.state;
  if (chartData.length > 0) {
    return Object.keys(chartData[0]).map((item) => {
      if (item !== 'date') {
        return (
          <Line
            key={item}
            type="linear"
            dataKey={item}
            stroke={GREEN}
            dot={false}
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
      { chartData.length < 1
    ? this.renderEmpty() // if no stocks are present, render empty message
    : <ResponsiveContainer margin={{ left: '-20px' }}>
      <LineChart
        data={chartData}
        margin={this.calculateMargin(8)}
      >
        {this.renderLines()}
        <XAxis
          dataKey="date"
          domain={['auto', 'auto']}
          tickFormatter={this.formatXTick}
          tickMargin={10}
        />
        <YAxis
          type="number"
          domain={['auto', 'auto']}
          tickFormatter={this.formatYTick}
        />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
    }
    </Wrapper>
  );
}
}

export default Graph;
