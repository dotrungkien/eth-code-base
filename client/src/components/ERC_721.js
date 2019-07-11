import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import '../styles/App.css';

const { Header, Content } = Layout;

class ERC_721 extends Component {
  render() {
    return (
      <Layout>
        <div className='logo' />
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Menu
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key='1'>
              <Link to='./'>ERC_20 </Link>
            </Menu.Item>
            <Menu.Item key='2'>
              <Link to='./ERC_721'>ERC_721 </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content className='content_ERC'>
          <div className=''>ERC_721</div>
        </Content>
      </Layout>
    );
  }
}

export default ERC_721;
