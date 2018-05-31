import React, { Component } from 'react';
import styled from 'styled-components';
import { SmallButton } from '../components/common';
import { IconSearch } from '../assets/icons';
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

const IconWrapper = styled.button`
  background-color: ${BLUE};
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  transition: all .2s;

  &:active {
    background-color: ${BLUE_DARK};
  }
`;

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  handleChange = (event) => {
    const { target: { value } } = event;

    this.setState({ value });
  }

  handleSubmit = () => {
    if (this.state.value === '') return;

    this.props.fetchStockData(this.state.value);
  }

  render() {
    return (
      <Wrapper className="search">
        <Input
          type="text"
          placeholder="TSLA"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <SmallButton
          onClick={this.handleSubmit}
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

