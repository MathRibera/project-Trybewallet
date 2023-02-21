// Coloque aqui suas actions
export const USER = 'USER';
export const WALLET_CURRENCIES = 'WALLET_CURRENCIES';
export const WALLET_EXPENSES = 'WALLET_EXPENSES';
export const TOTAL = 'TOTAL';
export const DELETE = 'DELETE';
export const EDIT = 'EDIT';
export const EDITED = 'EDITED';

export const getUser = (payload) => ({
  type: USER,
  payload,
});

export const getCurrency = (payload) => ({
  type: WALLET_CURRENCIES,
  payload,
});

export const getExpenses = (payload) => ({
  type: WALLET_EXPENSES,
  payload,
});

export const getTotal = () => ({
  type: TOTAL,
});

export const getDelete = (payload) => ({
  type: DELETE,
  payload,
});

export const getEdit = (payload) => ({
  type: EDIT,
  payload,
});

export const getEdited = (payload) => ({
  type: EDITED,
  payload,
});

export const fetchApi = () => async (dispatch) => {
  const moedas = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
  dispatch(getCurrency(moedas));
};
