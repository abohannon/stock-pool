import React from 'react';
import styled from 'styled-components';
import Search from './Search';

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 2px;
  box-sizing: border-box;
`;

const Header = () => (
  <Wrapper>
    <Search />
  </Wrapper>
);

export default Header;

