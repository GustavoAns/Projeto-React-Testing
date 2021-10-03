import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderComRotas from './renderComRotas';
import { About } from '../components';

describe('Testa o componente About', () => {
// O primeiro teste já e feito se os outros passarem
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderComRotas(<About />);

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });

    expect(h2).toBeInTheDocument();
  });

  test('Teste se a página contém 2 elementos com os textos desejados', () => {
    renderComRotas(<About />);

    const P1 = screen.getByText(/this application simulates a pokédex/i);
    expect(P1).toBeInTheDocument();

    const P2 = screen.getByText(/one can filter pokémons by type/i);
    expect(P2).toBeInTheDocument();
  });

  it('Testa se a pagina renderiza a imagem da pokedex', () => {
    renderComRotas(<About />);
    const imagem = screen.getByRole('img', {
      name: 'Pokédex',
    });

    expect(imagem.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
