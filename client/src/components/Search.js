import React, { Component } from 'react';
import styled from 'styled-components';
import { SmallButton } from '../components/common';
import { IconSearch } from './icons';
import {
  BOX_SHADOW,
  WHITE,
  BLUE,
  BLUE_DARK,
  GREY_DARK,
  GREY_EXTRA_LIGHT,
} from '../constants/style';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 10rem;
  height: 2.2rem;
  border-radius: 2px;
  box-shadow: ${BOX_SHADOW};
  background-color: ${WHITE};
  overflow: hidden;

  @media (max-width: 600px) {
    width: 100%;
    margin-bottom: 1rem;
    order: 1;
  }
`;

const Input = styled.input`
  border: 0;
  height: 100%;
  width: 100%;
  background: transparent;
  padding: 0 1rem;
  font-weight: 700;
  color: ${GREY_DARK};

  &::placeholder {
    color: ${GREY_EXTRA_LIGHT};
  }
`;

class Search extends Component {
  render() {
    return (
      <Wrapper className="search">
        <Input
          type="text"
          placeholder="TSLA"
          value={this.props.searchValue}
          onChange={this.props.handleInputChange}
        />
        <SmallButton
          onClick={this.props.handleInputSubmit}
          backgroundColor={BLUE}
          activeColor={BLUE_DARK}
        >
          <IconSearch
            width={18}
            height={18}
            fill={WHITE}
          />
        </SmallButton>
      </Wrapper>
    );
  }
}

export default Search;

