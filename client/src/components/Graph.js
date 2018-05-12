import React from 'react';
import styled from 'styled-components';
import { BOX_SHADOW } from '../constants/style';

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  background-color: white;
  height: 400px;
  border-radius: 2 px;
  box-shadow: ${BOX_SHADOW};
`;

const Graph = () => (
  <Wrapper>
      Graph
  </Wrapper>
);

export default Graph;
