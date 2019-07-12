import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import '../../styles/App.css';

class SendToken extends Component {
  constructor(props) {
    super(props);

    this.state = {
      web3: props.web3,
      account: props.account,
      ERC20Contract: props.ERC20Contract,
      token: ''
    };
  }

  async componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  // get contract address

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(values);
        console.log(this.state.ERC20Contract);
        this.state.ERC20Contract.methods
          .transfer(values.address, values.amount)
          .send({ from: this.state.account })
          .on('receipt', (receipt) => {
            // receipt example
            console.log(receipt);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout='inline' onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('address', {})(
            <Input prefix={<Icon type='user' />} placeholder='To Address' />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('amount', {})(
            <Input prefix={<Icon type='pay-circle' />} placeholder='Amount to Send' />
          )}
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

SendToken = Form.create({})(SendToken);

export default SendToken;
