import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.button`
  background-color: ${props => props.backgroundColor};
  width: 2.2rem;
  height: 2.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  transition: all .2s;

  &:active {
    background-color: ${props => props.activeColor};
  }
`;

const propTypes = {
  onClick: PropTypes.func,
  backgroundColor: PropTypes.string,
  activeColor: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
};

const SmallButton = props => (
  <Wrapper
    className={props.className}
    onClick={props.onClick}
    backgroundColor={props.backgroundColor}
    activeColor={props.activeColor}
  >
    {props.children}
  </Wrapper>
);

SmallButton.propTypes = propTypes;


export default SmallButton;
