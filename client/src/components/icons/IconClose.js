import React from 'react';
import styled from 'styled-components';
import { GREY } from '../../constants/style';

const StyledRect = styled.rect`
  fill: transparent;
  cursor: pointer;
`;

const StyledSvg = styled.svg`
transition: all .2s;

&:hover {
  fill: ${props => (props.hover ? props.hover : GREY)};
}

&:active {
  fill: ${props => props.fill}
}
`;

const IconClose = (props) => {
  const {
    className, width, height, fill, onClick, hover,
  } = props;
  return (
    <StyledSvg version="1.1" xmlns="http://www.w3.org/2000/svg" className={className} width={width || 20} height={height || 20} fill={fill} viewBox="0 0 20 20" hover={hover}>
      <title>close</title>
      <path d="M10 8.586l-7.071-7.071-1.414 1.414 7.071 7.071-7.071 7.071 1.414 1.414 7.071-7.071 7.071 7.071 1.414-1.414-7.071-7.071 7.071-7.071-1.414-1.414-7.071 7.071z" />
      <StyledRect x="0" y="0" width="100%" height="100%" onClick={onClick} />
    </StyledSvg>
  );
};

export { IconClose };
