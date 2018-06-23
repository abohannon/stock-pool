import React from 'react';
import styled from 'styled-components';
import { IconClose } from './icons';
import { BLUE, GREEN, RED, GREY } from '../constants/style';
import { formatNumber } from '../utils/helpers';

const ItemWrapper = styled.tr`
  height: 3rem;
  font-weight: 600;
  color: ${GREY};
`;

const StyledTd = styled.td`
  padding: .5rem;
`;

const Symbol = styled.td`
  color: ${BLUE};
  padding: .5rem;
`;

const Close = styled.td`
  color: ${props => (props.close > props.open ? GREEN : RED)};
  padding: .5rem;
`;

const StockItem = (props) => {
  const {
    symbol, open, high, low, close, volume, marketCap, index, removeStock,
  } = props;

  return (
    <ItemWrapper>
      <Symbol>{symbol}</Symbol>
      <StyledTd>${formatNumber(open)}</StyledTd>
      <StyledTd>${formatNumber(high)}</StyledTd>
      <StyledTd>${formatNumber(low)}</StyledTd>
      <Close
        open={open}
        close={close}
      >
      ${formatNumber(close)}
      </Close>
      <StyledTd>{formatNumber(volume)}</StyledTd>
      <StyledTd>${formatNumber(marketCap)}</StyledTd>
      <StyledTd style={{ textAlign: 'center' }}>
        <IconClose
          width={12}
          height={12}
          onClick={() => removeStock(index)}
        />
      </StyledTd>
    </ItemWrapper>
  );
};

export default StockItem;
