import React from 'react';
import styled from 'styled-components';
import { GREY_LIGHT } from '../../constants/style';

const StyledRect = styled.rect`
  fill: transparent;
  cursor: pointer;
`;

const StyledSvg = styled.svg`
&:hover {
  fill: ${GREY_LIGHT};
}
`;

const IconCalendar = (props) => {
  const {
    className, width, height, fill, onClick,
  } = props;
  return (
    <StyledSvg version="1.1" xmlns="http://www.w3.org/2000/svg" className={className} width={width || 20} height={height || 20} fill={fill} viewBox="0 0 20 20">
      <title>calendar</title>
      <path d="M1 4c0-1.1 0.9-2 2-2h14c1.105 0 2 0.895 2 2v0 14c0 1.105-0.895 2-2 2v0h-14c-1.105 0-2-0.895-2-2v0-14zM3 6v12h14v-12h-14zM5 0h2v2h-2v-2zM13 0h2v2h-2v-2zM5 9h2v2h-2v-2zM5 13h2v2h-2v-2zM9 9h2v2h-2v-2zM9 13h2v2h-2v-2zM13 9h2v2h-2v-2zM13 13h2v2h-2v-2z" />
      <StyledRect x="0" y="0" width="100%" height="100%" onClick={onClick} />
    </StyledSvg>
  );
};

export { IconCalendar };
