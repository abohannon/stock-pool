import React from 'react';
import styled from 'styled-components';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from 'recharts';
import { scaleLog } from 'd3-scale';
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

// TODO: Create default props with default data?
// const data = [
//   {
//     date: '12-01',
//     stockPrice1: 50,
//     stockPrice2: 300,
//   },
//   {
//     date: '12-02',
//     stockPrice1: 100,
//     stockPrice2: 276,
//   },
//   {
//     date: '12-03',
//     stockPrice1: 1300,
//     stockPrice2: 200,
//   },
//   {
//     date: '12-04',
//     stockPrice1: 10,
//     stockPrice2: 290,
//   },
// ];

// TODO: implement color picker. Needs to check if color has already been used.
const colors = ['#5BD365', '#F78154', '#B4436C', '#3D0C11', '#86A5D9', '#9BDEAC', '#D95D39', '#E5BEED'];

const generateColors = () => {

};

const calculateMargin = num => ({
  top: num, right: num, bottom: num, left: num,
});

const renderLines = (props) => {
  if (props.chartData.length > 0) {
    return Object.keys(props.chartData[0]).map((item, i) => {
      if (item !== 'date') {
        return (
          <Line
            type="linear"
            dataKey={item}
            stroke={colors[0]}
          />
        );
      }
    });
  }
  return null;
};

const Graph = props => (
  <Wrapper>
    <ResponsiveContainer>
      <LineChart
        data={props.chartData}
        margin={calculateMargin(8)}
      >
        {renderLines(props)}
        <XAxis dataKey="date" domain={['auto', 'auto']} />
        <YAxis
          type="number"
          domain={['auto', 'auto']}
        />
      </LineChart>
    </ResponsiveContainer>
  </Wrapper>
);

export default Graph;
