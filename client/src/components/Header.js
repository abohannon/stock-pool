import React from 'react';
import styled from 'styled-components';
import Search from './Search';

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 2px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
`;

const Error = styled.div`
opacity: ${props => (props.error ? 1 : 0)};
color: red;
font-size: .8rem;
margin-left: 1rem;
transition: all .2s;

`;

const Header = props => (
  <Wrapper>
    <Search fetchStockData={props.fetchStockData} />
    <Error error={props.error}>{props.error}</Error>
  </Wrapper>
);

export default Header;

