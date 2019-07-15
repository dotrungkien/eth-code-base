import React, { Component } from 'react';
import { Layout, Form } from 'antd';
import ActiveAccount from '../ActiveAccount';
import Navbar from '../Navbar';
import '../../styles/App.css';
import ERC721json from '../../contracts/MyERC721.json';
import ERC721_Contract_Address from '../../ERC721_Contract_address.json';
import SendToken from './SendToken';
import MintToken from './MintToken';

const { Content } = Layout;

class Erc721 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: null,
      ERC721Contract: null,
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
    const contractAddress = ERC721_Contract_Address.address;

    // get contract
    const ERC721Contract = new this.props.web3.eth.Contract(ERC721json.abi, contractAddress);
    this.setState({ ERC721Contract });
    console.log(this.state.ERC721Contract);

    // interval
    this.interval = setInterval(async () => {
      // myBalanceOf
      var balance = await this.state.ERC721Contract.methods.balanceOf(this.state.account).call({
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
        <Navbar page={'2'} />
        <Content>
          <ActiveAccount web3={this.props.web3} />
          <div className='section'>
            <div>
              <h3>Mint Tokens</h3>
              {!this.state.ERC721Contract ? (
                <div className='section'>Getting contract...</div>
              ) : (
                <MintToken
                  web3={this.props.web3}
                  ERC721Contract={this.state.ERC721Contract}
                  account={this.state.account}
                />
              )}
            </div>
            <div>
              <h3>Send Tokens</h3>
              {!this.state.ERC721Contract ? (
                <div className='section'>Getting contract...</div>
              ) : (
                <SendToken
                  web3={this.props.web3}
                  ERC721Contract={this.state.ERC721Contract}
                  account={this.state.account}
                />
              )}
            </div>
          </div>
        </Content>
      </div>
    );
  }
}

Erc721 = Form.create({})(Erc721);

export default Erc721;
