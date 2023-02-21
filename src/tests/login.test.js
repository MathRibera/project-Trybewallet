import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Pagina de login', () => {
  it('Verifica se os itens estão na tela', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('Verifica se o botao esta desabilitado', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('Digitar nos inputs', () => {
    renderWithRouterAndRedux(<App />);
    const email = 'test@test.com';
    const password = '@@aa11//';

    const emailInput = screen.getByRole('textbox');
    expect(emailInput).toHaveValue('');

    userEvent.type(emailInput, email);
    expect(emailInput).toHaveValue(email);

    const passwordInput = screen.getByPlaceholderText('Password');
    expect(passwordInput).toHaveValue('');

    userEvent.type(passwordInput, password);
    expect(passwordInput).toHaveValue(password);
  });
});
