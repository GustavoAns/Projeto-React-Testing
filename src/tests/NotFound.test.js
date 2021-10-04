import React from 'react';
import { screen } from '@testing-library/react';
import renderComRotas from './renderComRotas';
import { NotFound } from '../components';

describe('Testa o componente NotFound', () => {
  test('Teste se página contém um heading h2 com Page requested not found', () => {
    renderComRotas(<NotFound />);

    const notFound = screen.getByRole('heading', {
      name: /page requested not found/i,
      nivel: 2,
    });
    expect(notFound).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem', () => {
    renderComRotas(<NotFound />);

    const imgNotFound = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(imgNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
