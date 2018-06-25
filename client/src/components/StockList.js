import React from 'react';
import styled from 'styled-components';
import StockItem from './StockItem';
import { BOX_SHADOW, GREY_EXTRA_LIGHT, GREY_LIGHTEST, WHITE } from '../constants/style';

const Wrapper = styled.div`
  position: relative;
`;

const InnerWrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  background-color: white;
  border-radius: 2px;
  padding: 2rem;
  box-sizing: border-box;
  box-shadow: ${BOX_SHADOW};
  overflow: scroll;

  @media (max-width: 768px) {
    padding-right: 2rem;
  }
`;

const FadeRight = styled.div`
  width: 30px;
  height: 100%;
  background: linear-gradient(to left, ${WHITE}, ${WHITE} 70%, transparent);
  position: absolute;
  right: 0;
  z-index: 999;
`;

const FadeLeft = styled.div`
  width: 30px;
  height: 100%;
  background: linear-gradient(to right, ${WHITE}, ${WHITE} 70%, transparent);
  position: absolute;
  left: 0;
  z-index: 999;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  display: inline-table;
`;

const TableHeader = styled.tr`
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid ${GREY_LIGHTEST};
  margin-bottom: .5rem;
  height: 3rem;
  color: ${GREY_EXTRA_LIGHT};

  @media (max-width: 768px) {
    font-size: .8rem;
  }
`;

const StyledTh = styled.th`
  padding: .5rem;
`;

const renderStockItems = (props) => {
  const { stockData } = props;

  return Object.keys(stockData).map((stock, index) => {
    const {
      quote:
      {
        symbol,
        open,
        high,
        low,
        close,
        latestVolume,
        marketCap,
      },
    } = stockData[stock];
    return (
      <StockItem
        key={symbol}
        index={index}
        symbol={symbol}
        open={open}
        high={high}
        low={low}
        close={close}
        volume={latestVolume}
        marketCap={marketCap}
        removeStock={props.removeStock}
      />
    );
  });
};

const StockList = props => (
  <Wrapper>
    <FadeRight />
    <FadeLeft />
    <InnerWrapper>
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
    </InnerWrapper>
  </Wrapper>
);

export default StockList;

