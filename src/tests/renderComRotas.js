import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderComRotas = (elementoRenderizado) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{ elementoRenderizado }</Router>), history,
  });
};

export default renderComRotas;
