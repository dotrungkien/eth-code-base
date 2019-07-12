import React, { Component } from 'react';
import { Layout } from 'antd';
import '../styles/App.css';

const { Content } = Layout;

class ActiveAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: '',
      balance: ''
    };
  }

  async componentDidMount() {
    await this.props.web3.eth.getCoinbase().then((account) => {
      this.setState({ account });
    });

    // interval
    this.interval = setInterval(async () => {
      await this.props.web3.eth.getBalance(this.state.account).then((balance) => {
        balance = this.props.web3.utils.fromWei(balance);
        this.setState({ balance });
      });
    }, 3000);
  }

  render() {
    return (
      <div>
        <Content>
          <div className='section'>
            <h1>Eth-coin-base Examples</h1>
          </div>

          <div className='section'>
            <h2>Active Account</h2>
            <p>
              <strong>{this.state.account}</strong>
            </p>
            <p>{this.state.balance} Ether</p>
          </div>
        </Content>
      </div>
    );
  }
}

export default ActiveAccount;
