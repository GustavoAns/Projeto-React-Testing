import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderComRotas from './renderComRotas';
import { Pokedex } from '../components';
import pokemons from '../data';

const idFavorited = {
  25: false,
  4: false,
  10: false,
  23: false,
  65: false,
  151: false,
  78: false,
  143: false,
  148: false,
};

describe('Testa o componente Pokedex', () => {
  test('Testa se renderiza o header 2 com o texto "Encountered Pokémons"', () => {
    renderComRotas(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ idFavorited } />,
    );

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(h2).toBeInTheDocument();
  });

  test('Teste se é renderizado o próximo pokémon da lista', () => {
    renderComRotas(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ idFavorited } />,
    );

    const botaoProx = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(botaoProx).toBeInTheDocument();

    pokemons.forEach((item, index, arr) => {
      const pokemonName = screen.getByText(item.name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(botaoProx);
      // Quando for o ultimo da lista o primeiro pokemon deve aparecer novamente
      if (index === arr.length - 1) {
        const primeiroPokemon = screen.getByText(arr[0].name);
        expect(primeiroPokemon).toBeInTheDocument();
      }
    });
  });

  test('Testa se é renderizado apenas um pokemon por vez', () => {
    const totalDeBotoesLintFix = 9;
    renderComRotas(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ idFavorited } />,
    );

    const detales = screen.getAllByRole('link', { name: /more details/i });
    expect(detales).toHaveLength(1);

    const botoes = screen.getAllByRole('button');
    expect(botoes).toHaveLength(totalDeBotoesLintFix);
    botoes.forEach((botao) => {
      userEvent.click(botao);
      expect(detales).toHaveLength(1);
    });
  });

  test('Testa os botoes de filtro', () => {
    const tiposRenderizados = [];
    const tipos = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    renderComRotas(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ idFavorited } />,
    );
    const botoesFiltro = screen.getAllByTestId('pokemon-type-button');

    botoesFiltro.forEach((elemento) => tiposRenderizados.push(elemento.innerHTML));
    // console.log(tiposRenderizados);
    expect(tiposRenderizados).toStrictEqual(tipos);
  });

  test('Teste se a pokédex contém um botão para resetar o filtro', () => {
    renderComRotas(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ idFavorited } />,
    );

    const button = screen.getByRole('button', { name: 'All' });
    expect(button).toHaveTextContent('All');
  });
});
