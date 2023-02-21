import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDelete, getEdit, getTotal } from '../redux/actions';
import styles from './css/Table.module.css'

class Table extends Component {
  render() {
    const { wallet, dispatch, teste } = this.props;
    const { expenses } = wallet;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        {expenses.map((element) => {
          const {
            tag,
            id,
            description,
            method, value, currency, exchangeRates } = element;
          const cambio = exchangeRates[`${currency}`].ask;
          const nomeCambio = exchangeRates[`${currency}`].name;
          const convertido = (parseFloat(value) * parseFloat(cambio));
          return (
            <tbody key={ id }>
              <tr className={styles.containerItens} >
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{parseFloat(value).toFixed(2)}</td>
                <td>{nomeCambio}</td>
                <td>{parseFloat(cambio).toFixed(2)}</td>
                <td>{convertido.toFixed(2)}</td>
                <td>REAL</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    value={ id }
                    onClick={ () => {
                      dispatch(getEdit(element));
                      teste(element);
                    } }
                  >
                    editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    value={ id }
                    onClick={ () => {
                      dispatch(getDelete(element));
                      dispatch(getTotal());
                    } }
                  >
                    excluir
                  </button>
                </td>
              </tr>
            </tbody>
          );
        }) }
      </table>
    );
  }
}

Table.propTypes = {
  wallet: PropTypes.shape({
    expenses: PropTypes.shape({
      forEach: PropTypes.func,
    }),
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Table);
