import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchApi,
  getEdited, getExpenses, getTotal } from '../redux/actions';
import Table from './Table';

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
      <div>
        <div style={ { display: 'flex' } }>
          <div>
            <p>Descrição da Despesa:</p>
            <input
              value={ description }
              onChange={ ({ target }) => this.setState({ description: target.value }) }
              type="text"
              data-testid="description-input"
              placeholder="description"
            />
          </div>
          <div>
            <p>Valor da despesa:</p>
            <input
              value={ value }
              onChange={ ({ target }) => this.setState({ value: target.value }) }
              type="text"
              data-testid="value-input"
              placeholder="value"
            />
          </div>
          <div>
            <p>Moeda:</p>
            <select
              value={ currency }
              data-testid="currency-input"
              onChange={ ({ target }) => this.setState({ currency: target.value }) }
            >
              {currencies.map((moeda) => (
                moeda !== 'USDT' && <option key={ moeda } value={ moeda }>{moeda}</option>
              ))}
            </select>
          </div>
          <div>
            <p>Método de pagamentos:</p>
            <select
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
          <div>
            <p>Tipo de despesa:</p>
            <select
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
          <div>
            <button
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
