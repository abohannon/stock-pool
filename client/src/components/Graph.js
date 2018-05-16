import React from 'react';
import styled from 'styled-components';
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

const data = [
  {
    date: '12-01',
    price: 50,
  },
  {
    date: '12-02',
    price: 100,
  },
  {
    date: '12-03',
    price: 1300,
  },
  {
    date: '12-04',
    price: 10,
  },
];

const calculateMargin = num => ({
  top: num, right: num, bottom: num, left: num,
});

const Graph = () => (
  <Wrapper>
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={calculateMargin(8)}
      >
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
        <XAxis dataKey="date" />
        <YAxis />
      </LineChart>
    </ResponsiveContainer>
  </Wrapper>
);

export default Graph;
