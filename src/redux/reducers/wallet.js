// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  DELETE, EDIT, EDITED, TOTAL, WALLET_CURRENCIES, WALLET_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  total: 0,
  itemEdit: {},
};

export function wallet(state = INITIAL_STATE, { type, payload }) {
  const exchangeRates = payload;
  switch (type) {
  case WALLET_CURRENCIES:
    delete payload.USDT;
    return {
      ...state,
      currencies: Object.keys(payload),
      exchangeRates,
    };
  case WALLET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };
  case TOTAL:
    return {
      ...state,
      total: state.expenses
        .reduce((acc, curr) => {
          const moeda = curr.currency;
          const valueMoeda = parseFloat(curr.exchangeRates[moeda].ask);
          const a = parseFloat(curr.value) * valueMoeda;
          return acc + a;
        }, 0).toFixed(2),
    };
  case DELETE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense !== payload),
    };
  case EDIT:
    return {
      ...state,
      idToEdit: payload.id,
      itemEdit: payload,
      editor: true,
    };
  case EDITED:
    return {
      ...state,
      expenses: state.expenses.map((e) => (e.id === state.idToEdit ? { ...payload } : e)),
      idToEdit: 0,
      editor: false,
    };
  default:
    return state;
  }
}
