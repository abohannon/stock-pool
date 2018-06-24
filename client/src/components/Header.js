import React, { Component } from 'react';
import styled from 'styled-components';
import Search from './Search';
import RangeSelector from './RangeSelector';

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 2px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Error = styled.div`
opacity: ${props => (props.error ? 1 : 0)};
color: red;
font-size: .8rem;
margin-left: 1rem;
transition: all .2s;

@media (max-width: 600px) {
  order: 0;
  margin-bottom: 1rem;
  margin-left: 0;
}
`;

class Header extends Component {
  state = {
    searchValue: '',
  }

  setTimeRange = (range) => {
    this.props.setRange(range);
  }

  handleInputChange = (event) => {
    const { target: { value } } = event;

    this.setState({ searchValue: value });
  }

  handleInputSubmit = () => {
    if (this.state.searchValue === '') return;

    this.props.updateStocks(this.state);
  }

  render() {
    return (
      <Wrapper>
        <Search
          searchValue={this.state.searchValue}
          handleInputChange={this.handleInputChange}
          handleInputSubmit={this.handleInputSubmit}
        />
        <Error error={this.props.error}>{this.props.error}</Error>
        <RangeSelector setTimeRange={this.setTimeRange} currentRange={this.props.currentRange} />
      </Wrapper>
    );
  }
}

export default Header;

