import { USER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

export function user(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case USER:
    return { ...state, email: payload };
  default:
    return state;
  }
}
