import React from 'react';
import styled from 'styled-components';

const Item = styled.tr`
  height: 3rem;
`;

const StockItem = () => (
  <Item>
    <td>MSFT</td>
    <td>$187.74</td>
    <td>$190.37</td>
    <td>$187.65</td>
    <td>$190.04</td>
    <td>27,939,657</td>
  </Item>
);

export default StockItem;
