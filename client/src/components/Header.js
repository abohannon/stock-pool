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
`;

const Error = styled.div`
opacity: ${props => (props.error ? 1 : 0)};
color: red;
font-size: .8rem;
margin-left: 1rem;
transition: all .2s;

`;

class Header extends Component {
  state = {
    searchValue: '',
    range: '1m',
  }

  setTimeRange = (range) => {
    console.log(range);
    this.setState({ range });
  }

  handleInputChange = (event) => {
    const { target: { value } } = event;

    this.setState({ searchValue: value });
  }

  handleInputSubmit = () => {
    if (this.state.searchValue === '') return;

    this.props.fetchStockData(this.state);
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
        <RangeSelector setTimeRange={this.setTimeRange} />
      </Wrapper>
    );
  }
}

export default Header;

