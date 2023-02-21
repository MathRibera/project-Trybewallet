import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import styles from './css/Wallet.module.css'

class Wallet extends React.Component {
  render() {
    return (
      <div
        className={styles.background}
      >
        <Header />
        <WalletForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Wallet);
