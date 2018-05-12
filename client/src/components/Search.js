import React, { Component } from 'react';
import styled from 'styled-components';
import { IconSearch } from '../assets/icons';
import {
  BOX_SHADOW,
  WHITE,
  BLUE,
  BLUE_DARK,
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
    console.log('Submit');
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
        <IconWrapper onClick={this.handleSubmit}>
          <IconSearch
            width={18}
            height={18}
            fill={WHITE}
          />
        </IconWrapper>
      </Wrapper>
    );
  }
}

export default Search;

