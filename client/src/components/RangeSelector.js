import React, { Component } from 'react';
import styled from 'styled-components';
import { SmallButton } from '../components/common';
import { BOX_SHADOW, GREY_LIGHT, BLUE, WHITE } from '../constants/style';

const Wrapper = styled.div`
  display: flex;
  margin-left: auto;

  @media (max-width: 600px) {
    order: 2;
    margin-left: 0;
  }
`;

const StyledSmallButton = styled(SmallButton)`
  margin-left: 4px;
  box-shadow: ${BOX_SHADOW};
  border-radius: 2px;
  font-size: 12px;
  color: ${GREY_LIGHT};
  padding-top: 4px;
  border-bottom: 3px solid ${props => (props.children === props.selectedRange ? BLUE : 'transparent')};
  transition: all .2s;
`;
class RangeSelector extends Component {
  state = {
    selectedRange: null,
  };

  static getDerivedStateFromProps(props, state) {
    if (!state.selectedRange || state.selectedRange !== props.currentRange) {
      return {
        selectedRange: props.currentRange,
      };
    }

    return false;
  }

  handleClick = (range) => {
    this.setState({
      selectedRange: range,
    });

    this.props.setTimeRange(range);
  }

  renderButtons = () => {
    const ranges = ['1m', '3m', '6m', 'YTD', '1y', '2y'];

    return ranges.map(range => (
      <StyledSmallButton
        key={range}
        selectedRange={this.state.selectedRange}
        backgroundColor={WHITE}
        onClick={() => this.handleClick(range)}
      >
        {range}
      </StyledSmallButton>
    ));
  };

  render() {
    return (
      <Wrapper>
        {this.renderButtons()}
      </Wrapper>
    );
  }
}

export default RangeSelector;
