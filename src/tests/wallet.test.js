import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

describe('Testa a pagina de Wallet', () => {
  afterEach(() => jest.clearAllMocks());
  it('Verifica se esta entrando na pagina', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email = 'test1@test.com';
    const password = '@@aa11//';

    const emailInput = screen.getByRole('textbox');
    expect(emailInput).toHaveValue('');

    userEvent.type(emailInput, email);
    expect(emailInput).toHaveValue(email);

    const passwordInput = screen.getByPlaceholderText('Password');
    expect(passwordInput).toHaveValue('');

    userEvent.type(passwordInput, password);
    expect(passwordInput).toHaveValue(password);

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    expect(history.location.pathname).toBe('/carteira');
    const emailField = screen.getByTestId('email-field');
    const totalField = screen.getByTestId('total-field');

    expect(emailField).toBeInTheDocument();
    expect(totalField).toBeInTheDocument();
    expect(emailField).toContainHTML('test1@test.com');
    expect(totalField).toContainHTML('0');
  });

  it('Verifica se os componentes wallet estao na tela. ', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputDescription = screen.getByPlaceholderText('description');
    const inputValue = screen.getByPlaceholderText('value');
    const inputCurrency = screen.getByTestId('currency-input');
    const inputMethod = screen.getByTestId('method-input');
    const inputTag = screen.getByTestId('tag-input');
    const buttonSubmit = screen.getByTestId('buttonSubmit');

    expect(inputDescription).toBeInTheDocument();
    expect(inputValue).toBeInTheDocument();
    expect(inputCurrency).toBeInTheDocument();
    expect(inputMethod).toBeInTheDocument();
    expect(inputTag).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
  });
  it('Verifica se os componentes da tabela estao na tela. ', async () => {
    renderWithRouterAndRedux(<App />);
    jest.spyOn(global, 'fetch');

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
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

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText('USD')).toBeInTheDocument());
    const inputDescription = screen.getByPlaceholderText('description');
    const inputValue = screen.getByPlaceholderText('value');
    const buttonSubmit = screen.getByTestId('buttonSubmit');

    const description = 'batata';
    const value = '20';

    userEvent.type(inputDescription, description);
    userEvent.type(inputValue, value);
    act(() => {
      userEvent.click(buttonSubmit);
    });

    await waitFor(async () => expect(await screen.findByTestId('edit-btn')).toBeInTheDocument());
    const deleteSubmit = screen.getByTestId('delete-btn');
    const editSubmit = screen.getByTestId('edit-btn');
    expect(screen.getByTestId('currency-input')).toBeInTheDocument();
    expect(screen.getByTestId('method-input')).toBeInTheDocument();
    expect(screen.getByTestId('tag-input')).toBeInTheDocument();
    expect(screen.getByText('batata')).toBeInTheDocument();
    expect(screen.getAllByText('Alimentação')[1]).toBeInTheDocument();
    expect(screen.getAllByText('Dinheiro')[1]).toBeInTheDocument();
    expect(screen.getByText('20.00')).toBeInTheDocument();
    expect(screen.getByText('Dólar Americano/Real Brasileiro')).toBeInTheDocument();
    expect(screen.getByText('4.75')).toBeInTheDocument();
    expect(screen.getAllByText('95.06')[1]).toBeInTheDocument();
    expect(screen.getByText('REAL')).toBeInTheDocument();
    expect(deleteSubmit).toBeInTheDocument();
    expect(editSubmit).toBeInTheDocument();

    act(() => {
      userEvent.click(editSubmit);
      userEvent.type(inputValue, '3');
      expect(buttonSubmit).toHaveTextContent('Editar despesa');
      userEvent.click(buttonSubmit);
    });
    await waitFor(async () => expect(await screen.findByTestId('edit-btn')).toBeInTheDocument());
    expect(buttonSubmit).toHaveTextContent('Adicionar despesa');
    expect(screen.getAllByText('14.26')[1]).toBeInTheDocument();
    act(() => {
      userEvent.click(deleteSubmit);
    });
    expect(deleteSubmit).not.toBeInTheDocument();
  });
});
