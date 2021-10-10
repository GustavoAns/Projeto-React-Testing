import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderComRotas from './renderComRotas';
import Pokemon from '../components/Pokemon';

const pokemonSelec = {
  id: 151,
  name: 'Mew',
  type: 'Psychic',
  averageWeight: {
    value: '4.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Faraway Island',
      map: 'https://cdn2.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png',
    },
  ],
  summary: 'Apparently, it appears only to those people who are pu'
  + 're of heart and have a strong desire to see it.',
};

// const beforeEachRenderPokemon = () => {
//   beforeEach(() => {
//     renderComRotas(<Pokemon
//       pokemon={ pokemonSelec }
//       isFavorite
//     />);
//   });
// };

describe('Testa o componente Pokemon é renderizado', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderComRotas(<Pokemon pokemon={ pokemonSelec } isFavorite />);

    const pokeNome = screen.getByText(pokemonSelec.name);
    expect(pokeNome).toBeInTheDocument();
  });

  test('O tipo correto do Pokémon deve ser mostrado na tela', () => {
    renderComRotas(<Pokemon pokemon={ pokemonSelec } isFavorite />);

    const pokeTipo = screen.getByText(pokemonSelec.type);
    expect(pokeTipo).toBeInTheDocument();
  });

  test('O peso médio do pokémon deve ser mostrado na tela', () => {
    renderComRotas(<Pokemon pokemon={ pokemonSelec } isFavorite />);

    const { value, measurementUnit } = pokemonSelec.averageWeight;
    const texto = `Average weight: ${value} ${measurementUnit}`;
    const pesoMedio = screen.getByText(texto);
    expect(pesoMedio).toBeInTheDocument();
  });

  test('A imagem do Pokémon deve ser mostrado na tela', () => {
    renderComRotas(<Pokemon pokemon={ pokemonSelec } isFavorite />);

    const img = screen.getByAltText(`${pokemonSelec.name} sprite`);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', pokemonSelec.image);
  });

  test('Teste se o card do Pokémon contém um link de navegação', () => {
    renderComRotas(<Pokemon pokemon={ pokemonSelec } isFavorite />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/pokemons/${pokemonSelec.id}`);
  });

  test('Teste se a navegação é funcional', () => {
    const { history } = renderComRotas(<Pokemon pokemon={ pokemonSelec } isFavorite />);

    const link = screen.getByRole('link');
    userEvent.click(link);
    const historicoNavegacao = history.location.pathname;
    expect(historicoNavegacao).toBe(`/pokemons/${pokemonSelec.id}`);
  });

  test('Existe um ícone de estrela nos Pokémons favoritados', () => {
    renderComRotas(<Pokemon pokemon={ pokemonSelec } isFavorite />);

    const iconEstrela = screen.getByAltText(`${pokemonSelec.name} is marked as favorite`);
    expect(iconEstrela).toBeInTheDocument();
    expect(iconEstrela).toHaveAttribute('src', '/star-icon.svg');
  });
});
