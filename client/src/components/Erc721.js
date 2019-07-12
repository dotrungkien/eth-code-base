import React, { Component } from 'react';
import { Layout } from 'antd';
import ActiveAccount from './ActiveAccount';
import Navbar from './Navbar';
import '../styles/App.css';

const { Content } = Layout;

class Erc721 extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Navbar page={'2'} />
        <Content>
          <ActiveAccount web3={this.props.web3} />
        </Content>
      </div>
    );
  }
}

export default Erc721;
