import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderComRotas from './renderComRotas';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  const pokeName = 'pokemon-name';
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderComRotas(<App />);

    const h2 = screen.getByRole('heading', { level: 2, name: /encountered pokémons/i });
    expect(h2).toBeInTheDocument();
  });

  test('Testa se é renderizado os pokémons quando o botão é clicado.', () => {
    renderComRotas(<App />);

    const botao = screen.getByRole('button', { name: /próximo pokémon/i });
    const pokemonSelec = screen.getByTestId(pokeName);

    expect(pokemonSelec).toHaveTextContent('Pikachu');
    userEvent.click(botao);
    expect(pokemonSelec).toHaveTextContent('Charmander');
    userEvent.click(botao);
    expect(pokemonSelec).toHaveTextContent('Caterpie');
    userEvent.click(botao);
    expect(pokemonSelec).toHaveTextContent('Ekans');
  });

  test('Testa se o botão é renderizado com o texto Próximo pokémon', () => {
    renderComRotas(<App />);

    const botao = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(botao).toBeInTheDocument();
  });

  test('Testa se renderiza apenas um pokemon por vez', () => {
    renderComRotas(<App />);

    const pokemonSelec = screen.getAllByTestId(pokeName);
    expect(pokemonSelec.length).toBe(1);
  });

  test('Testa se renderiza os filtros e funcionam', () => {
    renderComRotas(<App />);

    const pokemonSelec = screen.getByTestId(pokeName);
    const botaoAll = screen.getByRole('button', { name: /all/i });
    const filtroPsychic = screen.getByRole('button', { name: /psychic/i });

    expect(botaoAll).toBeInTheDocument();
    expect(pokemonSelec).toHaveTextContent('Pikachu');
    userEvent.click(filtroPsychic);
    expect(pokemonSelec).toHaveTextContent('Alakazam');
    expect(botaoAll).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderComRotas(<App />);

    const botaoProx = screen.getByRole('button', { name: /próximo pokémon/i });

    expect(botaoProx).toBeEnabled();
  });
});
