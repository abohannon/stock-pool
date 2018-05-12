import React from 'react';
import styled from 'styled-components';
import StockItem from './StockItem';
import { BOX_SHADOW, GREY_EXTRA_LIGHT, GREY_LIGHTEST } from '../constants/style';

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  background-color: white;
  border-radius: 2px;
  padding: 2rem;
  box-sizing: border-box;
  box-shadow: ${BOX_SHADOW};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.tr`
  text-align: left;
  border-bottom: 1px solid ${GREY_LIGHTEST};
  margin-bottom: .5rem;
  height: 3rem;
  color: ${GREY_EXTRA_LIGHT}
`;

const StyledTh = styled.th`
  padding: .5rem;
`;

const StockItemProps = {
  symbol: 'MSFT',
  open: '$187.74',
  high: '$190.37',
  low: '187.65',
  close: '$190.04',
  volume: '28M',
};

const renderStockItems = () => {
  let count = 6;
  const items = [];

  while (count > 0) {
    items.push(<StockItem {...StockItemProps} />);
    count--;
  }
  return items;
};

const StockList = () => (
  <Wrapper>
    <Table>
      <thead>
        <TableHeader>
          <StyledTh>Symbol</StyledTh>
          <StyledTh>Open</StyledTh>
          <StyledTh>High</StyledTh>
          <StyledTh>Low</StyledTh>
          <StyledTh>Close</StyledTh>
          <StyledTh>Volume</StyledTh>
        </TableHeader>
      </thead>
      <tbody>
        {renderStockItems()}
      </tbody>
    </Table>
  </Wrapper>
);

export default StockList;
