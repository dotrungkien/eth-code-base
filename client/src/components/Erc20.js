import React, { Component } from 'react';
import { Layout } from 'antd';
import Navbar from './Navbar';
import '../styles/App.css';

const { Content } = Layout;

class Erc20 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      web3: props.web3
    };
  }

  render() {
    console.log('hello', this.state.web3);
    return (
      <div>
        <Navbar page={'1'} />
        <Content>
          <div>ERC_20</div>
        </Content>
      </div>
    );
  }
}

export default Erc20;
