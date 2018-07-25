import React, { Component } from 'react';
import styled from 'styled-components';
import { BLUE, BLUE_LIGHT, WHITE } from '../constants/style';
import { IconClose } from '../components/icons';

const Wrapper = styled.div`
  position: relative;
  top: 0;
  width: auto;
  height: auto;
  min-height: 30px;
  max-width: 450px;
  padding: .5rem;
  background-color: ${BLUE};
  color: ${BLUE_LIGHT};
  margin: 0 auto;
  left: 0;
  right: 0;
  font-size: .8rem;
  border-radius: 0 0 2px 2px;
  display: flex;
  flex-direction: row;
`;

class Notification extends Component {
  state = {
    open: true,
  }

  closeNotification = () => {
    this.setState({ open: false });
  }

  render() {
    if (!this.state.open) {
      return null;
    }
    return (
      <Wrapper>
        <div>
          {this.props.children}
        </div>
        <IconClose
          fill={BLUE_LIGHT}
          hover={WHITE}
          width={15}
          height={15}
          onClick={this.closeNotification}
        />
      </Wrapper>
    );
  }
}

export default Notification;
