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

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  background-color: white;
  height: 500px;
  border-radius: 2px;
  box-shadow: ${BOX_SHADOW};
  padding: 2rem 2rem 2rem 2rem;
  box-sizing: border-box;
`;

const Empty = styled.div`
  font-size: 3rem;
  color: ${GREY_EXTRA_LIGHT};
  text-align: center;
  padding: 0 2rem;
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
      .reduce((map, stock) => {
        stock.chart.forEach((chart) => {
          const chartObj = map.get(chart.date) || { date: chart.date };
          chartObj[stock.quote.symbol] = chart.close;
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
formatXTick = (value) => {
  const split = value.split('-');

  const day = split[2];
  const month = split[1];
  const year = split[0];

  return `${month}/${day}/${year}`;
}

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
    ? this.renderEmpty()
    : <ResponsiveContainer>
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
