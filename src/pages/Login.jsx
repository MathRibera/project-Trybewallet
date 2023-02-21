import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    password: '',
    email: '',
  };

  render() {
    const { password, email } = this.state;
    const { history, dispatch } = this.props;
    const authPass = 6;
    const regexEmail = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;
    return (
      <div>
        <input
          type="email"
          name="email"
          data-testid="email-input"
          value={ email }
          onChange={ ({ target }) => this.setState({ email: target.value }) }
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          placeholder="Password"
          value={ password }
          onChange={ ({ target }) => this.setState({ password: target.value }) }
        />
        <button
          type="button"
          disabled={ password.length < authPass || !regexEmail.test(email) }
          onClick={ () => {
            dispatch(getUser(email));
            history.push('/carteira');
          } }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
