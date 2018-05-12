import React from 'react';
import styled from 'styled-components';
import StockItem from './StockItem';
import { BOX_SHADOW } from '../constants/style';

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  background-color: white;
  height: 200px;
  border-radius: 2px;
  padding: 1rem;
  box-sizing: border-box;
  box-shadow: ${BOX_SHADOW};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.tr`
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: .5rem;
  height: 3rem;
`;

const StockList = () => (
  <Wrapper>
    <Table>
      <thead>
        <TableHeader>
          <th>Symbol</th>
          <th>Open</th>
          <th>High</th>
          <th>Low</th>
          <th>Close</th>
          <th>Volume</th>
        </TableHeader>
      </thead>
      <tbody>
        <StockItem />
      </tbody>
    </Table>
  </Wrapper>
);

export default StockList;
