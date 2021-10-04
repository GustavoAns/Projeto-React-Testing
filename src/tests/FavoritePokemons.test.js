import React from 'react';
import { screen } from '@testing-library/react';
import renderComRotas from './renderComRotas';
import { FavoritePokemons } from '../components';

describe('Testa o componente FavoritePokemons', () => {
  test('Testa se renderiza a mensagem no favorites', () => {
    renderComRotas(<FavoritePokemons pokemons={ [] } />);

    const noFavorite = screen.getByText(/no favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });

  test('Testa se renderiza os cards', () => {
    const listaFavoritas = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
      },
      {
        id: 4,
        name: 'Charmander',
        type: 'Fire',
        averageWeight: {
          value: '8.5',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
      },
    ];
    renderComRotas(<FavoritePokemons pokemons={ listaFavoritas } />);

    const favoritados = screen.getAllByTestId('pokemon-name');
    expect(favoritados).toHaveLength(2);
  });
});
