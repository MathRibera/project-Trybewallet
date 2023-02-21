import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchApi,
  getEdited, getExpenses, getTotal } from '../redux/actions';
import Table from './Table';
import styles from './css/WalletForm.module.css'

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchApi());
  }

  handleForms = () => {
    const DEFAULT_STATE = {
      id: 0,
      value: '',
      description: '',
    };
    const { dispatch, wallet } = this.props;
    const { expenses, exchangeRates, editor, idToEdit } = wallet;
    const { method, tag, value, currency, description } = this.state;
    this.setState({ id: expenses.length }, () => {
      const { id } = this.state;
      const obj = {
        id: editor ? idToEdit : id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      };
      if (editor) dispatch(getEdited(obj));
      if (!editor) {
        dispatch(fetchApi());
        dispatch(getExpenses(obj));
      }
      dispatch(getTotal());
      this.setState({ ...DEFAULT_STATE });
    });
  };

  teste = (element) => {
    this.setState({
      id: element.id,
      value: element.value,
      description: element.description,
      currency: element.currency,
      method: element.method,
      tag: element.tag,
    });
  };

  render() {
    const { wallet: { currencies, editor } } = this.props;
    const { method, tag, value, currency, description } = this.state;
    return (
      <div className={styles.background}>
        <div className={styles.menu}>
          <div className={styles.container}>
            <p>Descrição da Despesa:</p>
            <input
              className={styles['inputs']}
              value={ description }
              onChange={ ({ target }) => this.setState({ description: target.value }) }
              type="text"
              data-testid="description-input"
              placeholder="description"
            />
          </div>
          <div className={styles.container}>
            <p>Valor da despesa:</p>
            <input
              className={styles['inputs']}
              value={ value }
              onChange={ ({ target }) => this.setState({ value: target.value }) }
              type="text"
              data-testid="value-input"
              placeholder="value"
            />
          </div>
          <div className={styles.container}>
            <p>Moeda:</p>
            <select
              className={styles.inputs}
              value={ currency }
              data-testid="currency-input"
              onChange={ ({ target }) => this.setState({ currency: target.value }) }
            >
              {currencies.map((moeda) => (
                moeda !== 'USDT' && <option key={ moeda } value={ moeda }>{moeda}</option>
              ))}
            </select>
          </div>
          <div className={styles.container}>
            <p>Método de pagamentos</p>
            <select
              className={styles.inputs}
              value={ method }
              data-testid="method-input"
              style={ { width: '97%' } }
              onChange={ ({ target }) => this.setState({ method: target.value }) }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </div>
          <div className={styles.container}>
            <p>Tipo de despesa</p>
            <select
              className={styles.inputs}
              value={ tag }
              data-testid="tag-input"
              style={ { width: '97%' } }
              onChange={ ({ target }) => this.setState({ tag: target.value }) }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </div>
          <div className={styles.containerButton}>
            <button
              className={ styles.buttonSubmit}
              data-testid="buttonSubmit"
              onClick={ this.handleForms }
            >
              {editor ? 'Editar despesa' : 'Adicionar despesa'}
            </button>
          </div>
        </div>
        <Table teste={ this.teste } />
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(WalletForm);
