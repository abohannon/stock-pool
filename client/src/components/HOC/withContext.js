import React from 'react';
import { Consumer } from '../AppContext';

const withContext = Component => (
  function ComponentWithContext(props) {
    return (
      <Consumer>
        {context => <Component {...props} context={context} /> }
      </Consumer>
    );
  }
);

export default withContext;
