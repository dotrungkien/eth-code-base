import React, { Component } from 'react';
import { Layout, Form, Icon, Input, Button } from 'antd';
import Navbar from './Navbar';
import ActiveAccount from './ActiveAccount';
import '../styles/App.css';
import ERC20json from '../contracts/MyToken.json';
import ERC20_Contract_Address from '../ERC20_Contract_address.json';

const { Content } = Layout;

class Erc20 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      web3: props.web3,
      account: '',
      ERC20Contract: [],
      totalSupply: '',
      token: ''
    };
  }

  async componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();

    await this.state.web3.eth.getCoinbase().then((account) => {
      this.setState({ account });
    });

    // get contract address
    const contractAddress = ERC20_Contract_Address.address;
    const ERC20Contract = new this.state.web3.eth.Contract(ERC20json.abi, contractAddress);
    this.setState({ ERC20Contract });
    var totalSupply = await this.state.ERC20Contract.methods.totalSupply().call({
      from: this.state.account
    });
    this.setState({ totalSupply });
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
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Navbar page={'1'} />
        <Content>
          <ActiveAccount web3={this.state.web3} />
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
              <strong>My balance :</strong> {this.state.mytoken}
            </p>
            <h3>Send Tokens</h3>
            <Form layout='inline' onSubmit={this.handleSubmit}>
              <Form.Item>
                {getFieldDecorator('address', {})(
                  <Input
                    prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder='To Address'
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('amount', {})(
                  <Input
                    prefix={<Icon type='pay-circle' style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder='Amount to Send'
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </div>
    );
  }
}

Erc20 = Form.create({})(Erc20);

export default Erc20;
