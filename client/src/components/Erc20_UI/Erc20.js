import React, { Component } from 'react';
import { Layout, Form } from 'antd';
import Navbar from '../Navbar';
import ActiveAccount from '../ActiveAccount';
import '../../styles/App.css';
import ERC20json from '../../contracts/MyToken.json';
import ERC20_Contract_Address from '../../ERC20_Contract_address.json';
import SendToken from './SendToken';

const { Content } = Layout;

class Erc20 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: null,
      ERC20Contract: null,
      totalSupply: '',
      balance: ''
    };
  }

  async componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();

    await this.props.web3.eth.getCoinbase().then((account) => {
      this.setState({ account });
    });

    // get contract address
    const contractAddress = ERC20_Contract_Address.address;

    // get contract
    const ERC20Contract = new this.props.web3.eth.Contract(ERC20json.abi, contractAddress);
    this.setState({ ERC20Contract });

    // get totalSupply
    var totalSupply = await this.state.ERC20Contract.methods.totalSupply().call({
      from: this.state.account
    });
    this.setState({ totalSupply });

    // interval
    this.interval = setInterval(async () => {
      // myBalanceOf
      var balance = await this.state.ERC20Contract.methods.balanceOf(this.state.account).call({
        from: this.state.account
      });
      this.setState({ balance });
    }, 3000);

    // clearInterval(this.interval);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    return (
      <div>
        <Navbar page={'1'} />
        <Content>
          <ActiveAccount web3={this.props.web3} />
          <div className='section'>
            <h2>TutorialToken Erc20</h2>
            <p>
              Here we have a form with custom, friendly labels. Also note the token symbol will not
              display a loading indicator. We've suppressed it with the hideIndicator prop because
              we know this variable is constant.
            </p>
            <p>
              <strong>Total Supply : </strong>
              {this.state.totalSupply} Token
            </p>
            <p>
              <strong>My balance :</strong> {this.state.balance} Token
            </p>
            <h3>Send Tokens</h3>

            {!this.state.ERC20Contract ? (
              <div className='section'>Getting contracts ..</div>
            ) : (
              <SendToken
                web3={this.props.web3}
                ERC20Contract={this.state.ERC20Contract}
                account={this.state.account}
              />
            )}
          </div>
        </Content>
      </div>
    );
  }
}

Erc20 = Form.create({})(Erc20);

export default Erc20;
