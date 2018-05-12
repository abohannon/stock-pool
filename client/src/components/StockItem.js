import React from 'react';
import styled from 'styled-components';

const Item = styled.tr`
  height: 3rem;
`;

const StockItem = () => (
  <Item>
    <td>MSFT</td>
    <td>Microsoft</td>
    <td>$400</td>
    <td>$30</td>
    <td>10%</td>
    <td>43.4B</td>
  </Item>
);

export default StockItem;
