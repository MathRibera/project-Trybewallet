import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './css/Header.module.css'

class Header extends Component {
  render() {
    const { user, wallet } = this.props;
    const { total } = wallet;
    return (
      <div
      className={styles.cabecalho}
      >
        <Link to="/">
          <h1>TrybeWallet</h1>
        </Link>
        <div
          style={ {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width: '500px',
          } }
        >
          <h3 data-testid="email-field">{user.email}</h3>
          <h3>
            {`Despesas Totais: ${total}` }
          </h3>
          <h3 data-testid="header-currency-field"> BRL </h3>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Header);
