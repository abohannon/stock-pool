import React from 'react';
import styled from 'styled-components';
import { BLUE, GREEN, RED, GREY, WHITE_ALT } from '../constants/style';

const ItemWrapper = styled.tr`
  height: 3rem;
  font-weight: 600;
  color: ${GREY};

  &:hover {
    background-color: ${WHITE_ALT};
  }
`;

const StyledTd = styled.td`
  padding: .5rem;
`;

const Symbol = styled.td`
  color: ${BLUE};
  padding: .5rem;
`;

const Close = styled.td`
  color: ${props => (props.children > props.open ? GREEN : RED)};
  padding: .5rem;
`;

const StockItem = (props) => {
  const {
    symbol, open, high, low, close, volume, marketCap,
  } = props;
  return (
    <ItemWrapper>
      <Symbol>{symbol}</Symbol>
      <StyledTd>${open}</StyledTd>
      <StyledTd>${high}</StyledTd>
      <StyledTd>${low}</StyledTd>
      <Close open={open}>${close}</Close>
      <StyledTd>{volume}</StyledTd>
      <StyledTd>{marketCap}</StyledTd>
    </ItemWrapper>
  );
};

export default StockItem;
