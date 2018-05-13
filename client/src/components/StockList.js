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
  font-weight: 600;
  border-bottom: 1px solid ${GREY_LIGHTEST};
  margin-bottom: .5rem;
  height: 3rem;
  color: ${GREY_EXTRA_LIGHT}
`;

const StyledTh = styled.th`
  padding: .5rem;
`;

const renderStockItems = (props) => {
  const { stockData } = props;

  return stockData.map((stock, i) => {
    const {
      symbol, open, high, low, close, latestVolume, marketCap,
    } = stock.quote;
    return (
      <StockItem
        key={symbol}
        symbol={symbol}
        open={open}
        high={high}
        low={low}
        close={close}
        volume={latestVolume}
        marketCap={marketCap}
      />
    );
  });
};

const StockList = props => (
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
          <StyledTh>Market Cap</StyledTh>
        </TableHeader>
      </thead>
      <tbody>
        {renderStockItems(props)}
      </tbody>
    </Table>
  </Wrapper>
);

export default StockList;

