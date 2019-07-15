import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import '../../styles/App.css';

class SendToken extends Component {
  async componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  // get contract address
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(this.props.ERC721Contract);
        this.props.ERC721Contract.methods
          .safeTransferFrom(this.props.account, values.address, values.id)
          .send({ from: this.props.account });
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
          {getFieldDecorator('id', {})(
            <Input prefix={<Icon type='pay-circle' />} placeholder='ID Token To Send' />
          )}
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Send
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

SendToken = Form.create({})(SendToken);

export default SendToken;
