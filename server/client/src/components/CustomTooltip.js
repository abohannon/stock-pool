import React from 'react';
import styled from 'styled-components';
import { IconCalendar } from './icons';
import { BOX_SHADOW, GREY_LIGHT } from '../constants/style';
import formatDate from '../utils/formatDate';

const Wrapper = styled.div`
  box-sizing: border-box;
  font-size: .8rem;
  background-color: rgba(255,255,255,0.5);
  box-shadow: ${BOX_SHADOW};
  padding: .5rem 1rem;
  border-radius: 2px;
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: baseline;
`;

const Label = styled.div`
  color: ${GREY_LIGHT};
  margin-left: 4px;
`;

const renderPayload = (props) => {
  // sort stocks in descending order by stock price
  const sortedPayload = props.payload.sort((first, second) => second.value - first.value);

  const stocks = sortedPayload.map(item => (
    <div key={item.name}>
      <p><b>{item.name}</b> - ${item.value}</p>
    </div>
  ));

  return (
    <div>
      {stocks}
      <LabelWrapper>
        <IconCalendar fill={GREY_LIGHT} width={12} height={12} />
        <Label>{formatDate(props.label)}</Label>
      </LabelWrapper>
    </div>
  );
};

const CustomTooltip = props => (
  <Wrapper>
    {props.payload && renderPayload(props)}
  </Wrapper>
);

export default CustomTooltip;

