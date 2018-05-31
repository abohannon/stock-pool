import React from 'react';
import styled from 'styled-components';
import { SmallButton } from '../components/common';
import { BOX_SHADOW, GREY_DARK, GREY_LIGHT } from '../constants/style';

const Wrapper = styled.div`
  display: flex;
  margin-left: auto;
`;

const StyledSmallButton = styled(SmallButton)`
  margin-left: 4px;
  box-shadow: ${BOX_SHADOW};
  border-radius: 2px;
  font-size: 12px;
  color: ${GREY_LIGHT};
`;

const renderButtons = () => {
  const ranges = ['1m', '3m', '6m', 'YTD', '1y', '2y', '5y'];

  return ranges.map(item => <StyledSmallButton key={item}>{item}</StyledSmallButton>);
};

const RangeSelector = () => (
  <Wrapper>
    {renderButtons()}
  </Wrapper>
);

export default RangeSelector;
