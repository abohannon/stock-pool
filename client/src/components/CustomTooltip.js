import React from 'react';
import styled from 'styled-components';
import { BOX_SHADOW } from '../constants/style';

const Wrapper = styled.div`
  box-sizing: border-box;
  font-size: .8rem;
  background-color: rgba(255,255,255,0.5);
  box-shadow: ${BOX_SHADOW};
  padding: .5rem 1rem;
  border-radius: 2px;
`;

const renderPayload = (props) => {
  // sort stocks in descending order by stock price
  const sortedPayload = props.payload.sort((first, second) => second.value - first.value);

  return sortedPayload.map(item => (
    <div key={item.name}>
      <p><b>{item.name}</b> - ${item.value}</p>
    </div>
  ));
};

const CustomTooltip = props => (
  <Wrapper>
    {props.payload && renderPayload(props)}
  </Wrapper>
);

export default CustomTooltip;

