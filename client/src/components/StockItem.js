import React from 'react';
import styled from 'styled-components';
import { IconClose } from '../assets/icons';
import { BLUE, GREEN, RED, GREY } from '../constants/style';

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

const handleClick = (index) => {
  console.log(index);
};

const StockItem = (props) => {
  const {
    symbol, open, high, low, close, volume, marketCap, index, removeStock,
  } = props;

  return (
    <ItemWrapper>
      <Symbol>{symbol}</Symbol>
      <StyledTd>${open}</StyledTd>
      <StyledTd>${high}</StyledTd>
      <StyledTd>${low}</StyledTd>
      <Close
        open={open}
        close={close}
      >
      ${close}
      </Close>
      <StyledTd>{volume}</StyledTd>
      <StyledTd>{marketCap}</StyledTd>
      <StyledTd>
        <IconClose
          width={15}
          height={15}
          onClick={() => removeStock(index)}
        />
      </StyledTd>
    </ItemWrapper>
  );
};

export default StockItem;
