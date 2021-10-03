import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderComRotas from './renderComRotas';
import App from '../App';

describe('Testa o componente App', () => {
  test('Testa se renderiza o header de links fixos', () => {
    renderComRotas(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    const pokemonFavoritoLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(pokemonFavoritoLink).toBeInTheDocument();
  });

  test('Testa se o usuario é redirecionado ao home ou clicar no link do Home', () => {
    const { history } = renderComRotas(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testa se o usuario é redirecionado ao home ou clicar no link do About', () => {
    const { history } = renderComRotas(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Testa se o usuario é redirecionado ao home ou clicar no link do Fav', () => {
    const { history } = renderComRotas(<App />);
    const pokemonFavoritoLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(pokemonFavoritoLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Testa se o usuario é redirecionado ao NotFound em caso de rota errada', () => {
    const { history } = renderComRotas(<App />);
    history.push('/qualquerCoisa');

    const NotFound = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });

    expect(NotFound).toBeInTheDocument();
  });
});
